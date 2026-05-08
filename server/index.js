const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./jobs/reminderCron');

const applicationRoutes = require('./routes/applications');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

// Routes
app.use('/api/applications', applicationRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('Job Tracker API is running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});