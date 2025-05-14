// About/Settings functionality
function openSettings() {
    document.getElementById('settings-screen').style.display = 'block';
}

function closeSettings() {
    document.getElementById('settings-screen').style.display = 'none';
}

function changeLocation(location) {
    // Save the selected location to localStorage
    localStorage.setItem('userLocation', location);
    showToast(`Lokasi diubah ke ${location}`);
}

function showFAQ() {
    // Show FAQ content
    alert('Halaman FAQ akan segera hadir!');
}

function contactSupport() {
    // Open contact support options
    alert('Hubungi kami di WhatsApp: 0812-3456-7890 atau Email: support@jajanah.id');
}

function showTerms() {
    // Show terms and conditions
    alert('Halaman Syarat & Ketentuan akan segera hadir!');
}

// Function to show toast notification
function showToast(message) {
    // Check if toast already exists
    let toast = document.querySelector('.toast');
    
    if (!toast) {
        // Create toast element if it doesn't exist
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    
    // Set message and show toast
    toast.textContent = message;
    toast.classList.add('show');
    
    // Hide toast after 2 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2000);
}

// Initialize location from localStorage if available
document.addEventListener('DOMContentLoaded', function() {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
        document.getElementById('location-settings').value = savedLocation;
    }
});
