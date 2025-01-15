document.getElementById('ratingForm').onsubmit = function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const rating = formData.get('rating');
    const productId = formData.get('productId');
    
    fetch(`/categories/product/${productId}/rate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating: parseInt(rating) })
    })
    .then(response => response.json())
    .then(data => {
        const messageDiv = document.getElementById('ratingMessage');
        messageDiv.style.display = 'block';
        
        if(data.success) {
            messageDiv.textContent = 'Thank you for your rating!';
            messageDiv.style.color = 'green';
            setTimeout(() => {
                location.reload();
            }, 1000);
        } else {
            messageDiv.textContent = data.message;
            messageDiv.style.color = 'red';
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
};