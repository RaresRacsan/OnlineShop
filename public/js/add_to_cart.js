document.getElementById('addToCartForm').onsubmit = function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    fetch('/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formData)
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('message');
        messageDiv.style.display = 'block';
        messageDiv.style.padding = '10px';
        messageDiv.style.margin = '10px 0';
        
        if(data.success) {
            messageDiv.textContent = 'Product added to cart!';
            messageDiv.style.backgroundColor = '#4CAF50';
            messageDiv.style.color = 'white';
        } else {
            messageDiv.textContent = data.message;
            messageDiv.style.backgroundColor = '#f44336';
            messageDiv.style.color = 'white';
        }
        
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
    });
};