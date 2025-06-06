'use strict';

const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

const safeFloat = (value) => {
  const num = parseFloat(value);
  return isNaN(num) ? null : num;
};

const BATCH_SIZE = 2000;

module.exports = {
  async up(queryInterface, Sequelize) {
    return new Promise((resolve, reject) => {
      const studentsBatch = [];
      let batchPromises = Promise.resolve();

      const stream = fs.createReadStream(path.join(__dirname, '..', 'dataset', 'diem_thi_thpt_2024.csv'));

      stream
        .pipe(csv())
        .on('data', (row) => {
          studentsBatch.push({
            sbd: row.sbd,
            toan: safeFloat(row.toan),
            van: safeFloat(row.ngu_van),
            ngoaiNgu: safeFloat(row.ngoai_ngu),
            ly: safeFloat(row.vat_li),
            hoa: safeFloat(row.hoa_hoc),
            sinh: safeFloat(row.sinh_hoc),
            su: safeFloat(row.lich_su),
            dia: safeFloat(row.dia_li),
            gdcd: safeFloat(row.gdcd),
            maNgoaiNgu: row.ma_ngoai_ngu || null,
            createdAt: new Date(),
            updatedAt: new Date()
          });

          if (studentsBatch.length >= BATCH_SIZE) {
            stream.pause();

            batchPromises = batchPromises.then(() => {
              if (studentsBatch.length > 0) {
                console.log(`Inserting batch of size: ${studentsBatch.length}`);
                return queryInterface.bulkInsert('Students', studentsBatch.splice(0, BATCH_SIZE));
              }
              return Promise.resolve();
            }).then(() => {
              stream.resume();
            }).catch(reject);
          }
        })
        .on('end', () => {
          batchPromises = batchPromises.then(() => {
            if (studentsBatch.length > 0) {
              console.log(`Inserting final batch of size: ${studentsBatch.length}`);
              return queryInterface.bulkInsert('Students', studentsBatch);
            }
            return Promise.resolve();
          });
          batchPromises.then(resolve).catch(reject);
        })
        .on('error', reject);
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Students', null, {});
  }
};
