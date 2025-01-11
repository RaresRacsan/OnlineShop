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
    }
};