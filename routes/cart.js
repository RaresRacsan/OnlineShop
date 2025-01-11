const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

router.get('/', (req, res) => {
    Cart.getCartItems((err, cartItems) => {
        if(err) {
            return res.status(500).send('Database error on getCartItems');
        }
        res.render('cart', { cartItems });
    });
});

router.post('/add', (req, res) => {
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);

    Cart.addToCart(productId, quantity, (err) => {
        if(err) {
            return res.status(500).json({success:false, error: 'Database error on addToCart' });
        }
        res.json({ success: true, message: 'Product added to cart' });
    });
});

module.exports = router;