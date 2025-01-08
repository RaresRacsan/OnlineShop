const express = require('express');
const router = express.Router();
const Products = require('../models/product');

router.get('/:categoryId', (req, res) => {
    const categoryId = parseInt(req.params.categoryId);
    
    Products.getProductByCategoryId(categoryId, (err, filteredProducts) => {
        if(err) {
            console.error('Database error:', err);
            return res.status(500).send('Database error on getProductByCategoryId');
        }
        if(filteredProducts.length === 0) {
            return res.status(404).send('Category not found');
        }
        res.render('categories', { categoryId, filteredProducts });
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