const express = require('express');
const router = express.Router();
const Products = require('../models/product');

router.get('/', (req, res) => {
    const searchQuery = req.query.query;

    if(!searchQuery) {
        return res.redirect('/');
    }

    Products.searchProducts(searchQuery, (err, products) => {
        if(err) {
            return res.status(500).send('Database error on searchProducts');
        }

        res.render('search', { products, searchQuery });
    });
});

module.exports = router;