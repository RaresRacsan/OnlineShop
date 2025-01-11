const db = require('../database/db');

module.exports = {
    getCartItems: function(callback) {
        const query = `
            SELECT c.id, c.product_id, c.quantity, 
                   p.name, p.price, SUM(c.quantity) as total_quantity
            FROM cart c
            JOIN products p ON c.product_id = p.id
            GROUP BY p.id`;
        
        db.all(query, [], callback);
    }, 
    
    addToCart: function(productId, quantity, callback) {
        const checkStock = `
            SELECT quantity as stock_quantity
            FROM products 
            WHERE id = ?`;
            
        db.get(checkStock, [productId], (err, product) => {
            if(err) return callback(err);
            if(!product) return callback(new Error('Product not found'));
            
            // Check current cart quantity
            const cartCheck = 'SELECT SUM(quantity) as cart_quantity FROM cart WHERE product_id = ?';
            db.get(cartCheck, [productId], (err, cartItem) => {
                if(err) return callback(err);
                
                const currentCartQty = cartItem ? cartItem.cart_quantity || 0 : 0;
                const totalRequestedQty = currentCartQty + quantity;
                
                if(totalRequestedQty > product.stock_quantity) {
                    return callback(new Error(`Only ${product.stock_quantity} items available in stock`));
                }
                
                // If we have enough stock, proceed with cart update
                if(currentCartQty > 0) {
                    const updateQuery = 'UPDATE cart SET quantity = quantity + ? WHERE product_id = ?';
                    db.run(updateQuery, [quantity, productId], callback);
                } else {
                    const insertQuery = 'INSERT INTO cart (product_id, quantity) VALUES (?, ?)';
                    db.run(insertQuery, [productId, quantity], callback);
                }
            });
        });
    },

    removeFromCart: function(cartItemId, callback) {
        const query = 'DELETE FROM cart WHERE id = ?';
        db.run(query, [cartItemId], callback);
    },

    resetCart: function(callback) {
        const query = 'DELETE FROM cart';
        db.run(query, [], callback);
    },
    
    checkout: function(callback) {
        db.serialize(() => {
            db.run('BEGIN TRANSACTION');
            
            const updateQuery = `
                UPDATE products 
                SET quantity = quantity - (
                    SELECT SUM(c.quantity)
                    FROM cart c 
                    WHERE c.product_id = products.id
                )
                WHERE id IN (SELECT product_id FROM cart)`;
                
            db.run(updateQuery, [], (err) => {
                if(err) {
                    db.run('ROLLBACK');
                    return callback(err);
                }
                
                db.run('DELETE FROM cart', [], (err) => {
                    if(err) {
                        db.run('ROLLBACK');
                        return callback(err);
                    }
                    
                    db.run('COMMIT', callback);
                });
            });
        });
    }
};