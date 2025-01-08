const db = require('../database/db');

module.exports = {
    getProductByCategoryId: function(categoryId, callback) {
        db.all('select * from products where category_id = ?', [categoryId], (err, rows) => {
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