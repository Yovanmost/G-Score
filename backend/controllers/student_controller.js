// controllers/studentController.js
const { Student } = require('../models');

const { sequelize } = require('../models'); // get Sequelize instance

// Get a student by registration number (SBD)
exports.getStudentBySbd = async (req, res) => {
  const { sbd } = req.params;
  try {
    const student = await Student.findByPk(sbd);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    return res.json(student);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Report: Get score level statistics for all students
exports.getScoreDistribution = async (req, res) => {
  try {
    const subjects = ['toan', 'van', 'ngoaiNgu', 'ly', 'hoa', 'sinh', 'su', 'dia', 'gdcd'];

    const queries = subjects.map(subject => `
      SELECT 
        '${subject}' AS subject,
        COUNT(*) FILTER (WHERE "${subject}" >= 8) AS ">=8",
        COUNT(*) FILTER (WHERE "${subject}" >= 6 AND "${subject}" < 8) AS "6-7.99",
        COUNT(*) FILTER (WHERE "${subject}" >= 4 AND "${subject}" < 6) AS "4-5.99",
        COUNT(*) FILTER (WHERE "${subject}" < 4) AS "<4"
      FROM "Students"
      WHERE "${subject}" IS NOT NULL
    `);

    const results = await Promise.all(
      queries.map(q => sequelize.query(q, { type: sequelize.QueryTypes.SELECT }))
    );

    const formatted = {};
    results.forEach(([row]) => {
      const { subject, ...levels } = row;
      formatted[subject] = levels;
    });

    return res.json(formatted);
  } catch (err) {
    console.error('Error generating score distribution:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.getTopNStudentsBySubjects = async (req, res) => {
  try {
    const { subject1, subject2, subject3, n } = req.query;

    // Validate subjects
    const validSubjects = ['toan', 'van', 'ngoaiNgu', 'ly', 'hoa', 'sinh', 'su', 'dia', 'gdcd'];
    if (![subject1, subject2, subject3].every(sub => validSubjects.includes(sub))) {
      return res.status(400).json({ message: 'Invalid subject(s) provided' });
    }

    let limit = parseInt(n);
    if (isNaN(limit) || limit === 0) limit = 0;
    const isLowest = limit < 0;
    const absLimit = Math.abs(limit);

    const orderDirection = isLowest ? 'ASC' : 'DESC';

    const query = `
      SELECT 
        "sbd", 
        "${subject1}", 
        "${subject2}", 
        "${subject3}", 
        ("${subject1}" + "${subject2}" + "${subject3}") AS total_score
      FROM "Students"
      WHERE "${subject1}" IS NOT NULL AND "${subject2}" IS NOT NULL AND "${subject3}" IS NOT NULL
      ORDER BY total_score ${orderDirection}
      LIMIT :limit
    `;

    const topStudents = await sequelize.query(query, {
      replacements: { limit: absLimit },
      type: sequelize.QueryTypes.SELECT
    });

    return res.json(topStudents);
  } catch (error) {
    console.error('Error fetching top students:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
