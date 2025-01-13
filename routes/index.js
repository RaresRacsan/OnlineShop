const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const db = require('../database/db');

router.get('/', (req, res) => {
    const getTrendingItems = `
        SELECT p.*, c.name as category_name,
        CAST(rating_sum AS FLOAT) / CASE WHEN rating_count = 0 THEN 1 ELSE rating_count END as avg_rating
        FROM products p
        JOIN categories c ON p.category_id = c.id
        WHERE rating_count > 0
        ORDER BY avg_rating DESC
        LIMIT 20`;

    db.all(getTrendingItems, [], (err, trendingItems) => {
        if(err) {
            return res.status(500).send('Database error');
        }
        Category.getAllCategories((err, categories) => {
            if(err) {
                return res.status(500).send('Database error');
            }
            res.render('index', { categories, trendingItems });
        });
    });
});

module.exports = router;