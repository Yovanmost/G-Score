// routes/students.js
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student_controller');

// Report route: GET /students/report/score-distribution 
router.get('/report/score-distribution', studentController.getScoreDistribution);

// Route: GET /students/top
router.get('/top', studentController.getTopNStudentsBySubjects);

// Route: GET /students/:sbd
router.get('/:sbd', studentController.getStudentBySbd);



module.exports = router;
