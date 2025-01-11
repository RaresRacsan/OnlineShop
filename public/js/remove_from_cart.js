function removeItem(cartItemId) {
    if(confirm('Are you sure you want to remove this item?')) {
        fetch(`/cart/remove/${cartItemId}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if(data.success) {
                const item = document.getElementById(`cart-item-${cartItemId}`);
                item.remove();
                
                const cartItems = document.getElementById('cart-items');
                if(!cartItems || cartItems.children.length === 0) {
                    location.reload();
                }
            }
        })
        .catch(error => console.error('Error:', error));
        location.reload();
    }
}