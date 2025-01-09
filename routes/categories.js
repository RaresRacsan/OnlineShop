const express = require('express');
const router = express.Router();
const Products = require('../models/product');

router.get('/:categoryName', (req, res) => {
    const categoryName = req.params.categoryName;
    
    Products.getProductByCategoryName(categoryName, (err, filteredProducts) => {
        if(err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error on getProductByCategoryId');
        }
        if(filteredProducts.length === 0) {
            return res.status(404).send('Category not found');
        }

        res.render('categories', { categoryName, filteredProducts });
    });
});

router.get('/product/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    
    Products.getProductById(productId, (err, product) => {
        if(err) {
            return res.status(500).send('Database error on getProductById');
        }
        if(!product) {
            return res.status(404).send('Product not found');
        }
        res.render('product', { product });
    });
});

module.exports = router;