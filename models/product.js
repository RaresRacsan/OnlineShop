const { query } = require('express');
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
    },

    searchProducts: function(searchQuery, callback) {
        const sqlQuery = `
            select p.*, c.name as category_name
            from products p
            join categories c on p.category_id = c.id
            where p.name like ? or c.name like ?`;
        
        const searchParam = `${searchQuery}%`;

        db.all(sqlQuery, [searchParam, searchParam], (err, rows) => {
            if(err) {
                return callback(err);
            }
            callback(null, rows);
        });
    },

    addRating: function(productId, rating, callback) {        
        const query = `
            UPDATE products 
            SET rating_count = rating_count + 1,
                rating_sum = rating_sum + ?
            WHERE id = ?`;
        
        db.run(query, [rating, productId], function(err) {
            if(err) {
                console.error('Database error:', err); // Add error logging
            }
            callback(err);
        });
    }
};