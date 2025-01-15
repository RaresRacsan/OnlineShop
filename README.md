# Online Shop Application

## Overview
A full-stack e-commerce platform built with Node.js, Express, and SQLite, featuring product management, shopping cart, and rating system.

## Features
- Browse products by categories
- Search functionality
- Shopping cart management
- Product rating system (1-5 stars)
- Responsive design
- Product image support

## Technology Stack
- Node.js (v14+)
- Express.js
- SQLite3
- EJS templating
- CSS3
- JavaScript (ES6+)

## Setup Instructions

### Prerequisites
- Node.js (v14+ recommended)
- npm (comes with Node.js)
- Git

### Installation
1. Clone the repository:
```bash
git clone https://github.com/RaresRacsan/OnlineShop.git
cd OnlineShop
```
2. Install dependencies:
```bash
npm install
```
3. Initialize database:
```bash
node database/init.js
```
4. Start application:
```bash
npm start
```
5. Access at: http://localhost:3000

### Project Structure
```
OnlineShop/
├── database/
│   ├── db.js            # Database connection
│   ├── shop.db          # Database
│   └── init.js          # Database initialization
├── models/
│   ├── category.js      # Category model
│   ├── product.js       # Product model
│   └── cart.js          # Cart model
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── routes/
│   ├── index.js         # Main routes
│   ├── categories.js    # Category routes
│   ├── search.js        # search route
│   └── cart.js          # Cart routes
├── views/
│   ├── index.ejs        # Home page
│   ├── categories.ejs
│   ├── product.ejs
│   ├── search.ejs
│   └── cart.ejs
└── app.js               # Application entry
```

### Database schema
Presented in the database_schema file.

## Features Documentation

### Product features
- Category browsing
- Product details view
- Rating system
- Product search
- Image display

### Cart features
- Add/remove items
- Update quantities
- View total
- Checkout process
- Cart reset

## Screenshots
![image](https://github.com/user-attachments/assets/2ac73b5a-d61d-4f1b-ae73-a4ae5c766654)
![image](https://github.com/user-attachments/assets/a2660ee3-60c3-4978-b974-db0597ed61dd)
![image](https://github.com/user-attachments/assets/bd74c185-89e7-40d4-af6f-cae10b5fbd16)
![image](https://github.com/user-attachments/assets/17b0a2e3-ce29-4c0a-a3de-76939a5f3495)




