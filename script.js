// Global Variables
let isSOSActivated = false;
let currentStep = 0;
let volunteers = [];

// Navigation Functions
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuIcon.textContent = '✕';
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.textContent = '☰';
    }
}

function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    mobileMenu.classList.add('hidden');
    menuIcon.textContent = '☰';
}

// SOS Demo Functions
function activateSOS() {
    if (isSOSActivated) return;
    
    isSOSActivated = true;
    currentStep = 0;
    
    // Hide SOS button and show alert message
    document.getElementById('sos-button').style.display = 'none';
    document.getElementById('alert-message').classList.remove('hidden');
    
    // Add activated class for animation
    const sosButton = document.getElementById('sos-button');
    sosButton.classList.add('activated');
    
    // Simulate emergency response steps
    simulateEmergencyResponse();
}

function simulateEmergencyResponse() {
    const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
    const delays = [1000, 2000, 3000, 4000]; // Delays for each step
    
    steps.forEach((stepId, index) => {
        setTimeout(() => {
            // Activate current step
            document.getElementById(stepId).classList.add('active');
            currentStep = index + 1;
            
            // Show success message after all steps
            if (index === steps.length - 1) {
                setTimeout(() => {
                    document.getElementById('success-message').classList.remove('hidden');
                }, 1000);
            }
        }, delays[index]);
    });
}

function resetDemo() {
    isSOSActivated = false;
    currentStep = 0;
    
    // Reset UI elements
    document.getElementById('sos-button').style.display = 'flex';
    document.getElementById('alert-message').classList.add('hidden');
    document.getElementById('success-message').classList.add('hidden');
    
    // Remove activated class
    document.getElementById('sos-button').classList.remove('activated');
    
    // Reset all steps
    const steps = ['step-1', 'step-2', 'step-3', 'step-4'];
    steps.forEach(stepId => {
        document.getElementById(stepId).classList.remove('active');
    });
}

// Volunteer Registration Functions
function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const volunteerData = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address'),
        occupation: formData.get('occupation'),
        experience: formData.get('experience'),
        availability: formData.getAll('availability'),
        registrationDate: new Date().toLocaleDateString()
    };
    
    // Add to volunteers array (in real app, this would go to database)
    volunteers.push(volunteerData);
    
    // Show success message
    alert(Thank you ${volunteerData.name}! Your registration has been submitted successfully. You will receive a confirmation email shortly.);
    
    // Reset form
    event.target.reset();
    
    // In a real application, you would:
    // 1. Send data to server/database
    // 2. Send confirmation email
    // 3. Start background verification process
    console.log('New volunteer registered:', volunteerData);
    console.log('Total volunteers:', volunteers.length);
}

// Geolocation Functions (for real SOS functionality)
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            position => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toISOString()
                };
                resolve(location);
            },
            error => {
                reject(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
            }
        );
    });
}

// Emergency Functions (for real implementation)
function sendEmergencyAlert(location) {
    // In real app, this would:
    // 1. Send location to server
    // 2. Find nearby volunteers from database
    // 3. Send notifications to volunteers
    // 4. Call police with location
    // 5. Send SMS to family contacts
    
    console.log('Emergency alert sent with location:', location);
    
    // Simulate API calls
    const emergencyData = {
        alertId: generateAlertId(),
        location: location,
        timestamp: new Date().toISOString(),
        status: 'active'
    };
    
    // Mock API calls
    notifyVolunteers(location);
    contactPolice(location);
    notifyFamily(location);
    
    return emergencyData;
}

function generateAlertId() {
    return 'SOS_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function notifyVolunteers(location) {
    // In real app: find volunteers within 2km radius
    console.log('Notifying nearby volunteers about emergency at:', location);
    
    // Mock finding nearby volunteers
    const nearbyVolunteers = volunteers.filter(v => {
        // In real app: calculate distance using coordinates
        return Math.random() > 0.5; // Mock nearby check
    });
    
    console.log(Found ${nearbyVolunteers.length} nearby volunteers);
}

function contactPolice(location) {
    // In real app: make automatic call to 112
    console.log('Contacting police with location:', location);
    
    // Mock police contact
    const policeData = {
        phoneNumber: '112',
        message: Emergency alert: Location - ${location.latitude}, ${location.longitude},
        timestamp: new Date().toISOString()
    };
    
    console.log('Police contacted:', policeData);
}

function notifyFamily(location) {
    // In real app: send SMS/call to pre-registered family contacts
    console.log('Notifying family members about emergency');
    
    // Mock family notification
    const familyContacts = [
        '+91-XXXX-XXXX-XX1',
        '+91-XXXX-XXXX-XX2'
    ];
    
    familyContacts.forEach(contact => {
        console.log(SMS sent to ${contact} with location link);
    });
}

// Real SOS Function (for actual implementation)
async function realSOSActivation() {
    try {
        // Get current location
        const location = await getCurrentLocation();
        
        // Send emergency alert
        const alertData = await sendEmergencyAlert(location);
        
        console.log('Emergency system activated successfully:', alertData);
        return alertData;
        
    } catch (error) {
        console.error('Error activating emergency system:', error);
        
        // Fallback: still send alert without precise location
        const fallbackLocation = {
            latitude: null,
            longitude: null,
            error: error.message,
            timestamp: new Date().toISOString()
        };
        
        return sendEmergencyAlert(fallbackLocation);
    }
}

// Volunteer Management Functions
function displayVolunteers() {
    // This would be used for the "Safe Tab" feature
    console.log('Registered Volunteers:');
    volunteers.forEach((volunteer, index) => {
        console.log(${index + 1}. ${volunteer.name} - ${volunteer.occupation} - ${volunteer.phone});
    });
    
    return volunteers;
}

function searchVolunteers(query) {
    return volunteers.filter(volunteer => 
        volunteer.name.toLowerCase().includes(query.toLowerCase()) ||
        volunteer.occupation.toLowerCase().includes(query.toLowerCase()) ||
        volunteer.address.toLowerCase().includes(query.toLowerCase())
    );
}

// Utility Functions
function formatTime(date) {
    return new Date(date).toLocaleTimeString();
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    // Haversine formula for calculating distance between two points
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    
    return distance;
}

function toRad(degrees) {
    return degrees * (Math.PI / 180);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('SafeGuard Community Safety System initialized');
    console.log('Built with HTML, CSS, and JavaScript for Smart India Hackathon 2024');
    
    // Add event listeners for forms and buttons
    const volunteerForm = document.getElementById('volunteer-form');
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Add smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export functions for potential use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        activateSOS,
        resetDemo,
        handleFormSubmit,
        getCurrentLocation,
        sendEmergencyAlert,
        displayVolunteers,
        searchVolunteers,
        realSOSActivation
    };
}