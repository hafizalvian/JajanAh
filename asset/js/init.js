// Initialization script
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing JajanAh app...');
    
    // Initialize cart
    updateCart();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadInitialData();
});

function setupEventListeners() {
    // Cart button in header
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }
    
    // Search button
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', searchFood);
    }
    
    // Store cards
    const storeCards = document.querySelectorAll('.store-card');
    storeCards.forEach(card => {
        // The onclick attribute is already set in HTML
        console.log('Store card event listener set up');
    });
    
    // Category items
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.querySelector('p').textContent;
            alert(`Category selected: ${category}`);
        });
    });
    
    // Bottom nav items
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        if (item.querySelector('i.fa-info-circle')) {
            item.addEventListener('click', openSettings);
        } else if (item.querySelector('i.fa-shopping-cart')) {
            item.addEventListener('click', openCart);
        }
    });
    
    // Customer location in checkout
    const locationSelect = document.getElementById('customer-location');
    if (locationSelect) {
        locationSelect.addEventListener('change', updateCheckoutSummary);
    }
}

function loadInitialData() {
    // This function would typically load data from an API
    // For now, we'll just set up some initial state
    
    // Check if there's any saved cart data in localStorage
    const savedCart = localStorage.getItem('jajanah-cart');
    if (savedCart) {
        try {
            cartItems = JSON.parse(savedCart);
            updateCart();
        } catch (e) {
            console.error('Error loading saved cart:', e);
            // Reset cart if there's an error
            cartItems = [];
            updateCart();
        }
    }
}

// Save cart to localStorage whenever it changes
function saveCart() {
    localStorage.setItem('jajanah-cart', JSON.stringify(cartItems));
}

// Update the updateCart function in cart.js to call saveCart
const originalUpdateCart = updateCart;
updateCart = function() {
    originalUpdateCart();
    saveCart();
};