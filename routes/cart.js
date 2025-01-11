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

module.exports = router;