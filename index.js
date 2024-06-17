const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan'); // Example logging middleware
const apiRoutes = require('./api/routes/index');

// Middleware
app.use(express.json());
// app.use(morgan('dev')); // Logging middleware

// Routes
app.use(apiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const port = process.env.PORT || 3000; // Default port 3000 if not specified
const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
