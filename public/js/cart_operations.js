document.getElementById('resetCart').addEventListener('click', function() {
    if(confirm('Are you sure you want to reset your cart?')) {
        fetch('/cart/reset', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                window.location.reload();
            }
        })
        .catch(error => console.error('Error:', error));
    }
});

document.getElementById('checkout').addEventListener('click', function() {
    fetch('/cart/checkout', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            alert('Thank you for your purchase!');
            window.location.reload();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error during checkout');
    });
});