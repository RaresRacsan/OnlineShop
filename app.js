const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Import Routes
const indexRoute = require('./routes/index');
const categoriesRoute = require('./routes/categories');
const searchRoute = require('./routes/search');
const cartRoute = require('./routes/cart');

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to serve static files (CSS)
app.use(express.static('public'));

// Body parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoute);
app.use('/categories', categoriesRoute);
app.use('/search', searchRoute);
app.use('/cart', cartRoute);

// Start server on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
