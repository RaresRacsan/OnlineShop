const db = require('../database/db');

module.exports = {
    getAllCategories: function(callback) {
        db.all('select * from categories', (err, rows) => {
            if(err) {
                return callback(err);
            }
            callback(null, rows);
        });
    }
};