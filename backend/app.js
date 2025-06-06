const express = require('express');
const cors = require('cors');
const app = express();
const studentRoutes = require('./routes/student_route');

// Enable CORS
app.use(cors());

app.use(express.json());
app.use('/students', studentRoutes); // API route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
