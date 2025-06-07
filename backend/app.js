const express = require('express');
const cors = require('cors');
const app = express();

// Import student routes
const studentRoutes = require('./routes/student_route');

// Enable CORS for all origins
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Basic root route for health check or browser visits
app.get('/', (req, res) => {
  res.send('Student API is running');
});

// Mount the student routes at /students
app.use('/students', studentRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
