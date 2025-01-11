const db = require('../database/db');

module.exports = {
    getCartItems: function(callback) {
        const query = `
            SELECT c.id, c.quantity, p.name, p.price, p.description
            FROM cart c
            JOIN products p ON c.product_id = p.id`;
        
        db.all(query, [], (err, rows) => {
            if(err) return callback(err);
            callback(null, rows);
        });
    }, 
    
    addToCart: function(productId, quantity, callback) {
        const query = 'INSERT INTO cart(product_id, quantity) VALUES(?, ?)';
        db.run(query, [productId, quantity], (err) => {
            if(err) return callback(err);
            callback(null);
        });
    }
};