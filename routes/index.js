const express = require('express');
const router = express.Router();

// Dummy categories data
const categories = [
    {id: 1, name: 'Electronics'},
    {id: 2, name: 'Books'},
    {id: 3, name: 'Clothing'}
];

// Index route
router.get('/', (req, res) => {
    res.render('index', {categories});
});

module.exports = router;