// Cart functionality
let cartItems = [];
let cartTotal = 0;

function openCart() {
    document.getElementById('cart').style.display = 'block';
    updateCartDisplay();
}

function closeCart() {
    document.getElementById('cart').style.display = 'none';
}

function addToCart(itemId, itemName, itemPrice, storeId, storeName, stock) {
    // Check if item is out of stock
    if (stock <= 0) {
        alert('Maaf, item ini sedang tidak tersedia.');
        return;
    }
    
    // Check if item already in cart
    const existingItemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (existingItemIndex !== -1) {
        // Check if adding more would exceed stock
        if (cartItems[existingItemIndex].quantity >= stock) {
            alert(`Maaf, stok ${itemName} hanya tersisa ${stock} item.`);
            return;
        }
        
        // Increment quantity if item exists
        cartItems[existingItemIndex].quantity += 1;
    } else {
        // Add new item
        cartItems.push({
            id: itemId,
            name: itemName,
            price: itemPrice,
            quantity: 1,
            storeId: storeId,
            storeName: storeName,
            stock: stock,
            notes: ''
        });
    }
    
    updateCart();
    
    // Show notification
    alert(`${itemName} ditambahkan ke keranjang!`);
}

function removeFromCart(itemId) {
    cartItems = cartItems.filter(item => item.id !== itemId);
    updateCart();
}

function updateQuantity(itemId, change) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        const newQuantity = cartItems[itemIndex].quantity + change;
        
        // Check stock limits
        if (newQuantity > cartItems[itemIndex].stock) {
            alert(`Maaf, stok ${cartItems[itemIndex].name} hanya tersisa ${cartItems[itemIndex].stock} item.`);
            return;
        }
        
        cartItems[itemIndex].quantity = newQuantity;
        
        // Remove item if quantity becomes 0
        if (cartItems[itemIndex].quantity <= 0) {
            removeFromCart(itemId);
            return;
        }
        
        updateCart();
    }
}

function updateItemNotes(itemId, notes) {
    const itemIndex = cartItems.findIndex(item => item.id === itemId);
    
    if (itemIndex !== -1) {
        cartItems[itemIndex].notes = notes;
        updateCart();
    }
}

function updateCart() {
    // Update cart total
    cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    
    // Update cart badge
    const cartBadge = document.getElementById('cart-badge');
    const cartBadgeNav = document.getElementById('cart-badge-nav');
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    
    if (totalItems > 0) {
        cartBadge.textContent = totalItems;
        cartBadge.style.display = 'block';
        cartBadgeNav.textContent = totalItems;
        cartBadgeNav.style.display = 'block';
    } else {
        cartBadge.style.display = 'none';
        cartBadgeNav.style.display = 'none';
    }
    
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total-price');
    const checkoutButton = document.getElementById('checkout-button');
    
    // Clear current items
    cartItemsContainer.innerHTML = '';
    
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Keranjang belanja kosong</p>';
        checkoutButton.disabled = true;
        checkoutButton.classList.add('disabled');
    } else {
        checkoutButton.disabled = false;
        checkoutButton.classList.remove('disabled');
        
        // Group items by store
        const storeGroups = {};
        
        cartItems.forEach(item => {
            if (!storeGroups[item.storeId]) {
                storeGroups[item.storeId] = {
                    storeName: item.storeName,
                    items: []
                };
            }
            storeGroups[item.storeId].items.push(item);
        });
        
        // Add each store group
        Object.keys(storeGroups).forEach(storeId => {
            const storeGroup = storeGroups[storeId];
            
            // Add store name
            const storeElement = document.createElement('div');
            storeElement.className = 'cart-store-name';
            storeElement.innerHTML = `<i class="fas fa-store"></i> ${storeGroup.storeName}`;
            cartItemsContainer.appendChild(storeElement);
            
            // Add each item in this store
            storeGroup.items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'cart-item';
                itemElement.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <p>Rp ${item.price.toLocaleString('id-ID')}</p>
                        <div class="stock-info">
                            <small>Stok: ${item.stock}</small>
                        </div>
                    </div>
                    <div class="cart-item-quantity">
                        <button onclick="updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    </div>
                `;
                
                // Add notes input
                const notesElement = document.createElement('div');
                notesElement.className = 'cart-item-notes';
                notesElement.innerHTML = `
                    <textarea 
                        placeholder="Tambahkan catatan untuk item ini" 
                        onchange="updateItemNotes('${item.id}', this.value)"
                    >${item.notes || ''}</textarea>
                `;
                
                itemElement.appendChild(notesElement);
                cartItemsContainer.appendChild(itemElement);
            });
            
            // Add a separator between stores
            if (Object.keys(storeGroups).length > 1) {
                const separator = document.createElement('div');
                separator.className = 'cart-store-separator';
                cartItemsContainer.appendChild(separator);
            }
        });
    }
    
    // Update total
    cartTotalElement.textContent = `Rp ${cartTotal.toLocaleString('id-ID')}`;
}