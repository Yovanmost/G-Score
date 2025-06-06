'use strict';
module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    sbd: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    toan: DataTypes.FLOAT,
    van: DataTypes.FLOAT,
    ngoaiNgu: DataTypes.FLOAT,
    ly: DataTypes.FLOAT,
    hoa: DataTypes.FLOAT,
    sinh: DataTypes.FLOAT,
    su: DataTypes.FLOAT,
    dia: DataTypes.FLOAT,
    gdcd: DataTypes.FLOAT,
    maNgoaiNgu: DataTypes.STRING
  }, {});
  return Student;
};
