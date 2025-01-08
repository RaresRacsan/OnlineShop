const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import routes
const indexRoutes = require('./routes/index');
const categoryRoutes = require('./routes/categories');

// Set ejs as the view engine
app.set('view engine', 'ejs');

// Middleware to serve for static files
app.use(express.static('public'));

// Body parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);
app.use('/category', categoryRoutes);

// Start server on port 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
})