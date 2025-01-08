const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Index route
router.get('/', (req, res) => {
    Category.getAllCategories((err, categories) => {
        if(err) {
            return res.status(500).send('Database error on getAllCategories');
        }
        res.render('index', {categories});
    });
});

module.exports = router;