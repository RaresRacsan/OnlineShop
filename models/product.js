const db = require('../database/db');

module.exports = {
    getProductByCategoryName: function(categoryName, callback) {
        const query = `
            SELECT p.*, c.name as category_name 
            FROM products p 
            JOIN categories c ON p.category_id = c.id 
            WHERE c.name = ?`;

        db.all(query, [categoryName], (err, rows) => {
            if(err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },

    getProductById: function(productId, callback) {
        db.get('SELECT * FROM products WHERE id = ?', [productId], (err, row) => {
            if(err) {
                return callback(err);
            }
            callback(null, row);
        });
    }
};