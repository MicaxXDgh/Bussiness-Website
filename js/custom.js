const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 15.00 },
    { id: 3, name: 'Product 3', price: 20.00 }
];

function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'card mb-3';
        productDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">Price: $${product.price.toFixed(2)}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productDiv);
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItems = document.getElementById('cart-items');
        const totalElement = document.getElementById('total');
        const cartItem = document.createElement('li');
        cartItem.id = `cart-item-${productId}`;
        cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartItem.dataset.price = product.price.toFixed(2);
        cartItem.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${product.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);

        const currentTotal = parseFloat(totalElement.textContent);
        totalElement.textContent = (currentTotal + product.price).toFixed(2);
    }
}

function removeFromCart(productId) {
    const cartItem = document.getElementById(`cart-item-${productId}`);
    if (cartItem) {
        const totalElement = document.getElementById('total');
        const price = parseFloat(cartItem.dataset.price);
        cartItem.remove();

        const currentTotal = parseFloat(totalElement.textContent);
        totalElement.textContent = (currentTotal - price).toFixed(2);
    }
}

function checkout() {
    alert('Thank you for shopping!');
}

function initializeShop() {
    displayProducts();
}

function initiatePayPalCheckout() {
    // Replace 'YOUR_PAYPAL_CLIENT_ID' with your actual PayPal client ID
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: parseFloat(document.getElementById('total').textContent),
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Transaction completed. Thanks for shopping!');
            });
        },
        onError: function(err) {
            console.error('PayPal error:', err);
            alert('Something went wrong with PayPal. Please try again.');
        }
    }).render('#paypal-button-container');
}

window.onload = initializeShop;