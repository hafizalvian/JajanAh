// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Bottom navigation functionality
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Skip if this is the cart or settings item (they have their own handlers)
            if (this.querySelector('i') && (
                this.querySelector('i').classList.contains('fa-shopping-cart') || 
                this.querySelector('i').classList.contains('fa-info-circle'))) {
                return;
            }
            
            // If home icon is clicked, go back to home
            if (this.querySelector('i') && this.querySelector('i').classList.contains('fa-house')) {
                // Close any open screens
                document.getElementById('store-detail').style.display = 'none';
                document.getElementById('cart').style.display = 'none';
                document.getElementById('checkout-screen').style.display = 'none';
                document.getElementById('settings-screen').style.display = 'none';
                
                // Show main container
                document.querySelector('.mobile-container').style.display = 'block';
            }
            
            // Remove active class from all items
            navItems.forEach(navItem => {
                navItem.classList.remove('active');
            });
            
            // Add active class to clicked item
            this.classList.add('active');
        });
    });
    
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchFood();
            }
        });
    }
});

function searchFood() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        alert('Silakan masukkan kata kunci pencarian');
        return;
    }
    
    // For now, just show an alert with the search term
    alert(`Mencari: ${searchTerm}`);
    
    // In a real app, you would filter stores/food items based on the search term
    // and update the UI accordingly
}