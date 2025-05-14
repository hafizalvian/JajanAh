// Store detail functionality
const storeData = {
    'esteh': {
        name: 'Esteh Solo',
        image: 'asset/img/esteh.jpg',
        rating: '4.8',
        orders: '1.2rb+ pesanan',
        distance: '0.5 km',
        menuItems: [
            { id: 'es1', name: 'Es Teh Original', price: 5000, description: 'Teh manis dingin segar', stock: 20 },
            { id: 'es2', name: 'Es Teh Susu', price: 8000, description: 'Teh dengan susu segar', stock: 15 },
            { id: 'es3', name: 'Es Jeruk', price: 7000, description: 'Jeruk segar dengan es', stock: 10 },
            { id: 'es4', name: 'Es Teh Tawar', price: 4000, description: 'Teh dingin tanpa gula', stock: 0 }
        ]
    },
    'chicken': {
        name: 'RB Chicken Crisbar',
        image: 'asset/img/ayam.png',
        rating: '4.6',
        orders: '980+ pesanan',
        distance: '0.8 km',
        menuItems: [
            { id: 'ch1', name: 'Ayam Crispy (1 pc)', price: 12000, description: 'Ayam goreng tepung renyah', stock: 8 },
            { id: 'ch2', name: 'Ayam Spicy (1 pc)', price: 13000, description: 'Ayam goreng pedas', stock: 5 },
            { id: 'ch3', name: 'Chicken Burger', price: 15000, description: 'Burger dengan patty ayam crispy', stock: 12 },
            { id: 'ch4', name: 'French Fries', price: 10000, description: 'Kentang goreng renyah', stock: 20 }
        ]
    }
};

function openStoreDetail(storeId) {
    console.log("Opening store detail for:", storeId);
    
    if (!storeId || !storeData[storeId]) {
        console.error("Invalid store ID or store data not found:", storeId);
        return;
    }
    
    // Hide the main container
    document.querySelector('.mobile-container').style.display = 'none';
    
    // Show the store detail view
    const storeDetailElement = document.getElementById('store-detail');
    storeDetailElement.style.display = 'block';
    
    // Show bottom navigation
    document.querySelector('.bottom-nav').style.display = 'flex';
    
    // Get store data
    const store = storeData[storeId];
    
    // Update store detail elements
    document.getElementById('store-detail-name').textContent = store.name;
    document.getElementById('store-detail-image').src = store.image;
    document.getElementById('store-detail-image').alt = store.name;
    document.getElementById('store-detail-rating').textContent = store.rating;
    document.getElementById('store-detail-orders').textContent = store.orders;
    document.getElementById('store-detail-distance').textContent = store.distance;
    
    // Clear and populate menu items
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = ''; // Clear existing menu items
    
    console.log(`Adding ${store.menuItems.length} menu items`);
    
    // Add each menu item
    store.menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        
        // Add out of stock class if stock is 0
        if (item.stock <= 0) {
            menuItemElement.classList.add('out-of-stock');
        }
        
        menuItemElement.innerHTML = `
            <div class="menu-item-info">
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p class="menu-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
                <div class="stock-indicator">
                    ${item.stock > 0 
                        ? `<span class="in-stock">Stok: ${item.stock}</span>` 
                        : '<span class="no-stock">Stok Habis</span>'}
                </div>
            </div>
            <button class="add-to-cart-btn ${item.stock <= 0 ? 'disabled' : ''}" 
                onclick="addToCart('${item.id}', '${item.name}', ${item.price}, '${storeId}', '${store.name}', ${item.stock})">
                ${item.stock > 0 ? '+' : '<i class="fas fa-ban"></i>'}
            </button>
        `;
        
        menuList.appendChild(menuItemElement);
    });
}

function closeStoreDetail() {
    // Show the main container again
    document.querySelector('.mobile-container').style.display = 'block';
    
    // Hide the store detail view
    document.getElementById('store-detail').style.display = 'none';
}