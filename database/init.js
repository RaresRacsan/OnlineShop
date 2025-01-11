const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, 'shop.db');

if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('Deleted the existing database');
}

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error creating database:', err);
        return;
    }

    // Create tables
    const schema = `
        CREATE TABLE categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        );

        CREATE TABLE products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            quantity INTEGER NOT NULL DEFAULT 0,
            description TEXT,
            rating_count INTEGER NOT NULL DEFAULT 0,
            rating_sum INTEGER NOT NULL DEFAULT 0,
            category_id INTEGER,
            FOREIGN KEY (category_id) REFERENCES categories(id)
        );

        -- Insert sample data
        INSERT INTO categories (name) VALUES 
            ('Electronics'),
            ('Books'),
            ('Clothing');

        INSERT INTO products (name, price, quantity, description, category_id, rating_count, rating_sum) VALUES 
        ('Laptop', 999.99, 10, 'High performance laptop', 1, 2, 5),
        ('Smartphone', 499.99, 20, 'Latest model', 1, 0, 0),
        ('Harry Potter', 19.99, 50, 'Fantasy novel', 2, 0, 0),
        ('T-Shirt', 29.99, 100, 'Cotton t-shirt', 3, 0, 0);
    `;

    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database:', err);
            return;
        }
        console.log('Database initialized successfully');
        db.close();
    });
});