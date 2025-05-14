// Checkout functionality
let deliveryFee = 5000; // Default delivery fee

function proceedToCheckout() {
    if (cartItems.length === 0) {
        alert('Keranjang Anda kosong!');
        return;
    }
    
    // Hide cart
    document.getElementById('cart').style.display = 'none';
    
    // Show checkout screen
    const checkoutScreen = document.getElementById('checkout-screen');
    checkoutScreen.style.display = 'block';
    
    // Show bottom navigation
    document.querySelector('.bottom-nav').style.display = 'flex';
    
    // Populate checkout items
    updateCheckoutItems();
    
    // Update summary
    updateCheckoutSummary();
}

function backToCart() {
    // Hide checkout screen
    document.getElementById('checkout-screen').style.display = 'none';
    
    // Show cart again
    document.getElementById('cart').style.display = 'block';
}

function updateCheckoutItems() {
    const checkoutItemsContainer = document.getElementById('checkout-items');
    checkoutItemsContainer.innerHTML = '';
    
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
        storeElement.className = 'checkout-store-name';
        storeElement.innerHTML = `<i class="fas fa-store"></i> ${storeGroup.storeName}`;
        checkoutItemsContainer.appendChild(storeElement);
        
        // Add each item in this store
        storeGroup.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'checkout-item';
            
            let notesDisplay = '';
            if (item.notes && item.notes.trim() !== '') {
                notesDisplay = `<div class="checkout-item-notes">Catatan: ${item.notes}</div>`;
            }
            
            itemElement.innerHTML = `
                <div class="checkout-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.quantity} x Rp ${item.price.toLocaleString('id-ID')}</p>
                    ${notesDisplay}
                </div>
                <div class="checkout-item-total">
                    Rp ${(item.price * item.quantity).toLocaleString('id-ID')}
                </div>
            `;
            checkoutItemsContainer.appendChild(itemElement);
        });
        
        // Add a separator between stores if there are multiple stores
        if (Object.keys(storeGroups).length > 1) {
            const separator = document.createElement('div');
            separator.className = 'checkout-store-separator';
            checkoutItemsContainer.appendChild(separator);
        }
    });
}

function updateCheckoutSummary() {
    // Calculate delivery fee based on selected location and number of stores
    const locationSelect = document.getElementById('customer-location');
    let baseDeliveryFee = 2000; // Default base fee
    
    if (locationSelect.value) {
        // Adjust base delivery fee based on location (example logic)
        switch (locationSelect.value) {
            case 'Cibingbin':
                baseDeliveryFee = 3000;
                break;
            case 'Sukamaju':
                baseDeliveryFee = 3000;
                break;
            case 'Sukaharja':
                baseDeliveryFee = 3000;
                break;
            case 'Sindangjawa':
                baseDeliveryFee = 3000;
                break;
            case 'Citenjo':
                baseDeliveryFee = 3000;
                break;
            default:
                baseDeliveryFee = 2000;
        }
    }
    
    // Count unique stores
    const uniqueStores = new Set(cartItems.map(item => item.storeId)).size;
    
    // Multiply delivery fee by number of stores (with a small discount for multiple stores)
    if (uniqueStores > 1) {
        // Apply a small discount for multiple stores (e.g., 10% off per additional store)
        deliveryFee = baseDeliveryFee * uniqueStores * 0.9;
    } else {
        deliveryFee = baseDeliveryFee;
    }
    
    // Update delivery fee display
    document.getElementById('delivery-fee').textContent = `Rp ${deliveryFee.toLocaleString('id-ID')}`;
    document.getElementById('checkout-delivery').textContent = `Rp ${deliveryFee.toLocaleString('id-ID')}`;
    
    // Update subtotal
    document.getElementById('checkout-subtotal').textContent = `Rp ${cartTotal.toLocaleString('id-ID')}`;
    
    // Update total
    const total = cartTotal + deliveryFee;
    document.getElementById('checkout-total').textContent = `Rp ${total.toLocaleString('id-ID')}`;
}

// Update delivery fee when location changes
document.addEventListener('DOMContentLoaded', function() {
    const locationSelect = document.getElementById('customer-location');
    if (locationSelect) {
        locationSelect.addEventListener('change', updateCheckoutSummary);
    }
});

function confirmOrder() {
    // Validate form
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const location = document.getElementById('customer-location').value;
    const address = document.getElementById('customer-address').value;
    
    if (!name || !phone || !location || !address) {
        alert('Mohon lengkapi semua data pengiriman!');
        return;
    }
    
    // Validate phone number format
    if (!validatePhone(phone)) {
        alert('Format nomor telepon tidak valid. Contoh format yang benar: 08123456789');
        return;
    }
    
    // Group items by store for the order message
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
    
    // Format order for WhatsApp
    let orderMessage = `*Pesanan Baru dari JajanAh*\n\n`;
    orderMessage += `*Nama:* ${name}\n`;
    orderMessage += `*Telepon:* ${phone}\n`;
    orderMessage += `*Desa:* ${location}\n`;
    orderMessage += `*Alamat:* ${address}\n\n`;
    
    // Add items grouped by store
    Object.keys(storeGroups).forEach((storeId, index) => {
        const storeGroup = storeGroups[storeId];
        
        orderMessage += `*Toko ${index + 1}: ${storeGroup.storeName}*\n`;
        
        let storeTotalItems = 0;
        let storeTotal = 0;
        
        storeGroup.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            storeTotal += itemTotal;
            storeTotalItems += item.quantity;
            
            orderMessage += `- ${item.name} x${item.quantity}: Rp ${itemTotal.toLocaleString('id-ID')}`;
            
            // Add notes if any
            if (item.notes && item.notes.trim() !== '') {
                orderMessage += `\n  Catatan: ${item.notes}`;
            }
            
            orderMessage += '\n';
        });
        
        orderMessage += `Subtotal ${storeGroup.storeName} (${storeTotalItems} item): Rp ${storeTotal.toLocaleString('id-ID')}\n\n`;
    });
    
    orderMessage += `*Subtotal:* Rp ${cartTotal.toLocaleString('id-ID')}\n`;
    orderMessage += `*Ongkir (${new Set(cartItems.map(item => item.storeId)).size} toko):* Rp ${deliveryFee.toLocaleString('id-ID')}\n`;
    orderMessage += `*Total:* Rp ${(cartTotal + deliveryFee).toLocaleString('id-ID')}`;
    
    // Encode for WhatsApp
    const encodedMessage = encodeURIComponent(orderMessage);
    const whatsappLink = `https://wa.me/6283157142163?text=${encodedMessage}`;
    
    // Open WhatsApp
    window.open(whatsappLink, '_blank');
    
    // Clear cart and return to home
    cartItems = [];
    updateCart();
    
    // Hide checkout screen
    document.getElementById('checkout-screen').style.display = 'none';
    
    // Show main container
    document.querySelector('.mobile-container').style.display = 'block';
    
    // Show confirmation
    alert('Pesanan Anda telah dikirim! Terima kasih telah berbelanja di JajanAh.');
}

// Helper function to validate phone number
function validatePhone(phone) {
    // Simple validation for Indonesian phone numbers
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    return phoneRegex.test(phone);
}