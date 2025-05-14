// Main application functionality

// Global variables
let currentLocation = 'Cibingbin'; // Default location

// Function to handle search
function searchFood() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    
    if (!searchTerm) {
        alert('Silakan masukkan kata kunci pencarian');
        return;
    }
    
    // In a real app, this would search through available stores and food items
    // For now, just show an alert
    alert(`Mencari: ${searchTerm} di ${currentLocation}`);
}

// Function to filter by category
function filterByCategory(category) {
    // In a real app, this would filter stores/food by category
    alert(`Menampilkan kategori: ${category}`);
}

// Function to handle location change
function changeLocation(location) {
    currentLocation = location;
    
    // In a real app, this would reload stores and food items based on the new location
    console.log(`Location changed to: ${location}`);
    
    // Update UI to reflect new location
    document.querySelectorAll('.location-display').forEach(el => {
        el.textContent = location;
    });
}

// Function to handle errors
function handleError(error) {
    console.error('Error:', error);
    alert('Terjadi kesalahan. Silakan coba lagi nanti.');
}

// Function to format currency
function formatCurrency(amount) {
    return `Rp ${amount.toLocaleString('id-ID')}`;
}

// Function to show loading indicator
function showLoading(show = true) {
    // In a real app, this would show/hide a loading spinner
    console.log(show ? 'Loading...' : 'Loading complete');
}

// Function to validate phone number
function validatePhone(phone) {
    // Simple validation for Indonesian phone numbers
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,10}$/;
    return phoneRegex.test(phone);
}

// Function to get current position
function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation is not supported by your browser');
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            error => {
                reject(`Error getting location: ${error.message}`);
            }
        );
    });
}

// Function to calculate distance between two points (in km)
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km
    return distance;
}

function deg2rad(deg) {
    return deg * (Math.PI/180);
}