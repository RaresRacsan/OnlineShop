const express = require('express');
const router = express.Router();

// Dummy data for products
const products = [
    { id: 1, name: 'Laptop', price: 999.99, category_id: 1 },
    { id: 2, name: 'Smartphone', price: 699.99, category_id: 1 },
    { id: 3, name: 'Novel', price: 19.99, category_id: 2 },
    { id: 4, name: 'T-Shirt', price: 14.99, category_id: 3 }
];

router.get('/:categoryId', (req, res) => {
    console.log(`Request for Category ID: ${req.params.categoryId}`);  // Log Category ID
    
    const categoryId = parseInt(req.params.categoryId);  
    const filteredProducts = products.filter(p => p.category_id === categoryId);
  
    if (filteredProducts.length === 0) {
      return res.status(404).send('Category not found');
    }
  
    res.render('categories', { categoryId, filteredProducts });
  });
  

router.get('/:product/:productId', (req, res) => {
    const productId = parseInt(req.params.productId);
    const product = products.find(p => p.id === productId);

    if(!product) {
        return res.status(404).send('Product not found');
    }

    res.render('product', { product });
});

module.exports = router;