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
            return res.status(400).json({ 
                success: false, 
                message: err.message 
            });
        }
        res.json({ 
            success: true, 
            message: 'Product added to cart' 
        });
    });
});

router.delete('/remove/:id', (req, res) => {
    const cartItemId = req.params.id;
    Cart.removeFromCart(cartItemId, (err) => {
        if(err) {
            return res.status(500).json({ success: false, message: 'Error removing item' });
        }
        res.json({ success: true, message: 'Item removed from cart' });
    });
});

router.post('/reset', (req, res) => {
    Cart.resetCart((err) => {
        if(err) {
            return res.status(500).json({ success: false, message: 'Error resetting cart' });
        }
        res.json({ success: true, message: 'Cart reset successfully' });
    });
});

router.post('/checkout', (req, res) => {
    Cart.checkout((err) => {
        if(err) {
            return res.status(500).json({ success: false, message: 'Error during checkout' });
        }
        res.json({ success: true, message: 'Checkout successful' });
    });
});

module.exports = router;