const products = [
    { id: 1, name: 'Product 1', price: 10.00 },
    { id: 2, name: 'Product 2', price: 15.00 },
    { id: 3, name: 'Product 3', price: 20.00 }
];

const cartItems = [];
let cartTotal = 0;

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
};

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const cartItemsList = document.getElementById('cart-items');
        const totalElement = document.getElementById('total');
        const cartItem = document.createElement('li');
        cartItem.id = `cart-item-${productId}`;
        cartItem.className = 'list-group-item d-flex justify-content-between align-items-center';
        cartItem.dataset.price = product.price.toFixed(2);
        cartItem.innerHTML = `
            ${product.name} - $${product.price.toFixed(2)}
            <button class="btn btn-danger btn-sm" onclick="removeFromCart(${productId})">Remove</button>
        `;
        cartItemsList.appendChild(cartItem);
        cartItems.push({ id: product.id, name: product.name, price: parseFloat(product.price) });
        cartTotal += parseFloat(product.price);
        updateTotals();
    }
}

function removeFromCart(productId) {
    const cartItem = document.getElementById(`cart-item-${productId}`);
    if (cartItem) {
        const price = parseFloat(cartItem.dataset.price);
        cartItem.remove();

        const index = cartItems.findIndex(item => item.id === productId);
        if (index !== -1) {
            cartItems.splice(index, 1);
            cartTotal -= price;
        }

        updateTotals();
    }
}

function updateTotals() {
    const totalElement = document.getElementById('total');
    totalElement.textContent = cartTotal.toFixed(2);

    const footerTotalElement = document.getElementById('footer-total');
    footerTotalElement.textContent = cartTotal.toFixed(2);

    updateNavbarTotal();
}

function viewCart() {
    const modalCartItems = document.getElementById('modal-cart-items');
    const modalTotalElement = document.getElementById('modal-total');
    modalCartItems.innerHTML = '';

    cartItems.forEach(cartItem => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${cartItem.name} - $${parseFloat(cartItem.price).toFixed(2)}`;
        modalCartItems.appendChild(li);
    });

    modalTotalElement.textContent = `$${cartTotal.toFixed(2)}`;

    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    cartModal.show();
}

function initializeShop() {
    displayProducts();
}

function initiatePayPalCheckout() {
    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: cartTotal.toFixed(2),
                    }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert('Transaction completed. Thanks for shopping!');
            });
        },
        onError: function (err) {
            console.error('PayPal error:', err);
            alert('Something went wrong with PayPal. Please try again.');
        }
    }).render('#paypal-button-container');
}

window.onload = initializeShop;
