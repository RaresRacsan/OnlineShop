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

    CREATE TABLE cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        product_id INTEGER,
        quantity INTEGER NOT NULL DEFAULT 1,
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    -- Insert categories
    INSERT INTO categories (name) VALUES 
        ('Accessories'),
        ('Art'),
        ('Books'),
        ('Clothing'),
        ('Electronics'),
        ('Food'),
        ('Gaming'),
        ('Health'),
        ('Home'),
        ('Jewelry'),
        ('Kids'),
        ('Music'),
        ('Office'),
        ('Outdoors'),
        ('Pets'),
        ('Sports'),
        ('Tools'),
        ('Toys'),
        ('Travel'),
        ('Vehicles');

    -- Insert products
    INSERT INTO products (name, price, quantity, description, category_id, rating_count, rating_sum) VALUES 
        ('Air Purifier', 199.99, 15, 'HEPA filter air purifier', 9, 12, 55),
        ('Backpack', 49.99, 30, 'Waterproof hiking backpack', 19, 25, 115),
        ('Baseball Glove', 29.99, 40, 'Leather baseball glove', 16, 8, 35),
        ('Basketball', 24.99, 50, 'Official size basketball', 16, 15, 65),
        ('Bluetooth Speaker', 79.99, 25, 'Portable wireless speaker', 5, 45, 200),
        ('Book Shelf', 149.99, 10, 'Modern 5-tier bookshelf', 9, 18, 80),
        ('Camera', 599.99, 8, 'Digital SLR camera', 5, 30, 140),
        ('Cat Food', 19.99, 100, 'Premium dry cat food', 15, 55, 250),
        ('Chess Set', 34.99, 20, 'Wooden chess set', 18, 12, 55),
        ('Coffee Maker', 89.99, 15, 'Programmable coffee maker', 9, 28, 125),
        ('Desk Chair', 199.99, 12, 'Ergonomic office chair', 13, 22, 95),
        ('Desktop Computer', 999.99, 5, 'High-performance PC', 5, 15, 68),
        ('Diamond Ring', 1999.99, 3, '14K gold diamond ring', 10, 7, 32),
        ('Dog Leash', 14.99, 60, 'Durable nylon leash', 15, 42, 185),
        ('Drawing Tablet', 299.99, 10, 'Digital art tablet', 2, 16, 72),
        ('Dress Shirt', 45.99, 40, 'Cotton dress shirt', 4, 33, 145),
        ('Dumbbell Set', 129.99, 15, '5-25lb dumbbell set', 16, 28, 125),
        ('Electric Guitar', 399.99, 6, 'Solid body electric guitar', 12, 11, 48),
        ('External Hard Drive', 89.99, 25, '2TB portable drive', 5, 38, 170),
        ('First Aid Kit', 29.99, 45, 'Complete emergency kit', 8, 47, 215),
        ('Gaming Console', 499.99, 10, 'Latest gaming system', 7, 85, 395),
        ('Garden Tools Set', 79.99, 20, 'Essential gardening tools', 17, 19, 85),
        ('GPS Navigator', 159.99, 12, 'Car GPS system', 20, 23, 100),
        ('Hammock', 39.99, 30, 'Portable camping hammock', 14, 31, 140),
        ('Headphones', 199.99, 20, 'Noise-cancelling wireless', 5, 92, 435),
        ('Hiking Boots', 129.99, 25, 'Waterproof hiking boots', 14, 44, 200),
        ('Instant Camera', 69.99, 15, 'Digital instant camera', 5, 27, 120),
        ('Jeans', 59.99, 50, 'Classic blue jeans', 4, 67, 305),
        ('Keyboard', 49.99, 30, 'Mechanical gaming keyboard', 7, 54, 245),
        ('Kitchen Mixer', 299.99, 8, 'Stand mixer with attachments', 9, 36, 165),
        ('Laptop', 1299.99, 10, 'Ultra-thin laptop', 5, 63, 290),
        ('LED TV', 799.99, 5, '55-inch 4K Smart TV', 5, 41, 185),
        ('Lego Set', 99.99, 20, 'Classic building blocks', 18, 73, 335),
        ('Makeup Kit', 79.99, 25, 'Professional makeup set', 1, 48, 220),
        ('Monitor', 299.99, 15, '27-inch gaming monitor', 5, 34, 155),
        ('Mouse', 29.99, 40, 'Wireless optical mouse', 5, 82, 375),
        ('Necklace', 299.99, 8, 'Sterling silver pendant', 10, 16, 70),
        ('Novel Collection', 149.99, 15, 'Classic literature set', 3, 29, 130),
        ('Oil Diffuser', 39.99, 30, 'Aromatherapy diffuser', 8, 57, 260),
        ('Paint Set', 49.99, 25, 'Acrylic paint collection', 2, 38, 170),
        ('Piano Keyboard', 299.99, 6, '88-key digital piano', 12, 21, 95),
        ('Pillow', 29.99, 50, 'Memory foam pillow', 9, 104, 475),
        ('Printer', 199.99, 12, 'Wireless color printer', 13, 43, 195),
        ('Protein Powder', 49.99, 35, 'Whey protein supplement', 8, 76, 345),
        ('Running Shoes', 89.99, 30, 'Lightweight running shoes', 16, 88, 400),
        ('Sleeping Bag', 79.99, 20, 'All-season sleeping bag', 14, 33, 150),
        ('Smart Watch', 299.99, 15, 'Fitness tracking watch', 5, 95, 435),
        ('Soccer Ball', 19.99, 40, 'Official size soccer ball', 16, 51, 230),
        ('Sunglasses', 129.99, 25, 'Polarized sunglasses', 1, 64, 290),
        ('Tablet', 399.99, 12, '10-inch Android tablet', 5, 57, 260),
        ('Zero Sugar Energy Drink', 2.99, 100, 'Zero sugar energy drink', 6, 55, 250);

        ALTER TABLE products ADD COLUMN image TEXT DEFAULT 'default.jpg';
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