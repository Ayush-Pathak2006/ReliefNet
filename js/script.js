
let map;
console.log("Chart.js loaded:", typeof Chart !== 'undefined');console.log("Chart.js loaded:", typeof Chart !== 'undefined');

function initMap() {
    // Initialize map
    map = new google.maps.Map(document.getElementById('disasterMap'), {
        center: {lat: 20.5937, lng: 78.9629}, // India coordinates
        zoom: 5,
        mapTypeId: 'terrain'
    });

    // Add disaster markers
    const disasters = [
        {lat: 26.9124, lng: 75.7873, type: 'flood', title: 'Jaipur Flood Zone'},
        {lat: 19.0760, lng: 72.8777, type: 'fire', title: 'Mumbai Forest Fire'},
        {lat: 28.7041, lng: 77.1025, type: 'earthquake', title: 'Delhi Seismic Zone'}
    ];

    disasters.forEach(disaster => {
        new google.maps.Marker({
            position: {lat: disaster.lat, lng: disaster.lng},
            map: map,
            title: disaster.title,
            icon: getDisasterIcon(disaster.type)
        });
    });

    // Add flood risk zone polygon
    const floodZoneCoordinates = [
        {lat: 26.5, lng: 75.5}, {lat: 27.5, lng: 75.5},
        {lat: 27.5, lng: 76.5}, {lat: 26.5, lng: 76.5}
    ];

    new google.maps.Polygon({
        paths: floodZoneCoordinates,
        strokeColor: "#0000FF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0000FF",
        fillOpacity: 0.1
    }).setMap(map);
}

function getDisasterIcon(type) {
    const icons = {
        flood: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        fire: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
        earthquake: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
    };
    return icons[type] || null;
}

document.querySelector('.login-btn').addEventListener('click', () => {
    const loginForm = document.getElementById('login-form');
    if (loginForm.style.display === "none") {
        loginForm.style.display = "block";
    } else {
        loginForm.style.display = "none";
    }
});

document.querySelectorAll('.login-btn, .register-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.getElementById('authModal').style.display = 'block';
    });
});

// Close Modal
document.getElementById('authModal').addEventListener('click', (e) => {
    if(e.target === document.getElementById('authModal')) {
        document.getElementById('authModal').style.display = 'none';
    }
});

// Toggle Between Admin/Volunteer
// grab elements
const authModal      = document.getElementById('authModal');
const toggleContainer= authModal.querySelector('.toggle-container');
const toggleBtns     = toggleContainer.querySelectorAll('.toggle-btn');
const volRegForm     = authModal.querySelector('.volunteer-register-form');
const volLoginForm   = authModal.querySelector('.volunteer-login-form');
const adminLoginForm = authModal.querySelector('.admin-login-form');
const navLogin       = document.getElementById('navLogin');
const navRegister    = document.getElementById('navRegister');
const closeBtn       = authModal.querySelector('.close-modal');

let mode       = 'register';   // 'register' or 'login'
let activeRole = 'volunteer';  // 'volunteer' or 'admin'

// open handlers
navRegister.addEventListener('click', e => {
  e.preventDefault();
  mode = 'register';
  activeRole = 'volunteer';
  updateUI();
  authModal.style.display = 'block';
});
navLogin.addEventListener('click', e => {
  e.preventDefault();
  mode = 'login';
  activeRole = 'volunteer';
  updateUI();
  authModal.style.display = 'block';
});

// close handler
closeBtn.addEventListener('click', () => authModal.style.display = 'none');

// toggle between Volunteer/Admin in login
toggleBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    activeRole = btn.dataset.role;
    updateUI();
  });
});

function updateUI() {
  if (mode === 'register') {
    // **REGISTER**: only volunteer-register
    toggleContainer.style.display     = 'none';
    volRegForm.style.display          = 'block';
    volLoginForm.style.display        = 'none';
    adminLoginForm.style.display      = 'none';

  } else {
    // **LOGIN**: toggle bar + one of the two login forms
    toggleContainer.style.display     = 'flex';
    volRegForm.style.display          = 'none';

    // highlight active toggle
    toggleBtns.forEach(b => {
      b.classList.toggle('active', b.dataset.role === activeRole);
    });

    if (activeRole === 'volunteer') {
      volLoginForm.style.display      = 'block';
      adminLoginForm.style.display    = 'none';
    } else {
      volLoginForm.style.display      = 'none';
      adminLoginForm.style.display    = 'block';
    }
  }
}

// click outside to close (optional)
window.addEventListener('click', e => {
  if (e.target === authModal) authModal.style.display = 'none';
});

// Add this toggle functionality
function toggleWeatherWidget() {
    const popup = document.getElementById('weatherPopup');
    const trigger = document.getElementById('weatherTrigger');
    
    if (window.matchMedia("(max-width: 767px)").matches) {
      // Mobile behavior
      popup.classList.toggle('active');
      trigger.style.display = popup.classList.contains('active') ? 'none' : 'flex';
    } else {
      // Desktop behavior
      popup.classList.toggle('minimized');
      trigger.style.display = popup.classList.contains('minimized') ? 'flex' : 'none';
    }
  }
  
  // Add event listeners
  document.getElementById('weatherPopup').addEventListener('click', function(e) {
    if (!window.matchMedia("(max-width: 767px)").matches && !e.target.closest('.weather-card')) {
      toggleWeatherWidget();
    }
  });
  
  document.getElementById('weatherTrigger').addEventListener('click', toggleWeatherWidget);
  
  // Initialize based on device
  window.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('weatherPopup');
    const trigger = document.getElementById('weatherTrigger');
    
    if (window.matchMedia("(max-width: 767px)").matches) {
      popup.classList.remove('active');
      trigger.style.display = 'flex';
    } else {
      trigger.style.display = 'none';
      popup.classList.remove('minimized');
    }
  });

  function classifyCondition(temperature, humidity) {
    // Example thresholds (customize these)
    if (temperature >= 35 || humidity >= 80) return { 
      status: '🌡️ Harsh', 
      className: 'harsh' 
    };
    if (temperature >= 25 || humidity >= 60) return { 
      status: '⛅ Moderate', 
      className: 'moderate' 
    };
    return { 
      status: '🌤️ Normal', 
      className: 'normal' 
    };
  }
  
  // Example update function (your backend developer can use this)
  function updateWeather(apiData) {
    const condition = classifyCondition(30, 38);
                                    // apiData.temp_c, apiData.humidity
    // Clear previous status classes
    const statusElement = document.querySelector('.weather-status');
    statusElement.classList.remove('harsh', 'moderate', 'normal');
    
    // Update values
    statusElement.textContent = condition.status;
    statusElement.classList.add(condition.className);
    
    document.querySelectorAll('.value')[0].textContent = `${31}°C`;
    document.querySelectorAll('.value')[1].textContent = `${38}%`;
    document.querySelectorAll('.value')[2].textContent = `${30}°C`;
  }
  
  // Sample data - Backend will replace this with real API data
  const sampleData = {
    temperature: '50°C',
    humidity: '65%',
    feels_like: '30°C',
    condition: 'harsh'
  };
  updateWeather(sampleData);

// volunteer js
document.addEventListener('DOMContentLoaded', function() {
    const volunteerStatsCard = document.getElementById('volunteer-stats-card');
    
    volunteerStatsCard.addEventListener('click', function() {
        // Open the statistics page in a new window/tab
        window.open('volunteer.html', '_blank');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Volunteer Growth Chart
    const growthCtx = document.getElementById('volunteerGrowthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Number of Volunteers',
                data: [800, 850, 900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350],
                fill: true,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Number of Volunteers'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });

    // Department Distribution Chart
    const deptCtx = document.getElementById('departmentChart').getContext('2d');
    new Chart(deptCtx, {
        type: 'pie',
        data: {
            labels: ['Education', 'Healthcare', 'Environment', 'Community Service', 'Elderly Care', 'Youth Programs'],
            datasets: [{
                data: [350, 275, 225, 175, 125, 100],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });

    // Hours Contributed Chart
    const hoursCtx = document.getElementById('hoursContributedChart').getContext('2d');
    new Chart(hoursCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Hours Contributed',
                data: [5200, 5600, 6100, 6500, 7000, 7300, 7800, 8200, 8600, 9000, 9300, 9540],
                backgroundColor: 'rgba(54, 162, 235, 0.7)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Total Hours'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });

    // Age Distribution Chart
    const ageCtx = document.getElementById('ageDistributionChart').getContext('2d');
    new Chart(ageCtx, {
        type: 'doughnut',
        data: {
            labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
            datasets: [{
                data: [250, 350, 300, 200, 100, 50],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right'
                }
            }
        }
    });
});



// Payment



// SOSCONFRM
        // Generate a random SOS ID
        function generateSOSId() {
            const prefix = "SOS";
            const randomNum = Math.floor(10000 + Math.random() * 90000);
            const countrySuffix = "IN";
            return `${prefix}-${randomNum}-${countrySuffix}`;
        }
        
        // Set random SOS ID when page loads
        window.onload = function() {
            document.getElementById('sosId').innerText = generateSOSId();
            
            // Simulate a random ETA between 10-30 minutes
            const minTime = 10;
            const maxTime = 30;
            const randomETA = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime;
            document.getElementById('etaTime').innerText = `${randomETA} minutes`;
        };
        
        // Copy SOS ID to clipboard
        function copyToClipboard(elementId) {
            const text = document.getElementById(elementId).innerText;
            navigator.clipboard.writeText(text).then(function() {
                alert("SOS ID copied to clipboard!");
            }, function() {
                alert("Failed to copy text");
            });
        }


        // volunteer imag
        // Slideshow logic
  const images = [
    "images/Bihar.jpg",
    "images/Disaster.jpg",
    "images/Heroo.jpg",
    // "images/Bihar.jpg"
    // Add more URLs of natural disaster images of India
  ];

  let currentImageIndex = 0;
  const slideshow = document.getElementById('slideshow');

  setInterval(() => {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    slideshow.src = images[currentImageIndex];
  }, 3000); // Change image every 3 seconds

  // Typing effect logic
  const texts = [
    "Hey, we're here to help you. Don't worry!",
    "Stay calm, stay safe. We've got your back.",
    "Together, we can face any storm.",
    "Help is just around the corner."
  ];

  let currentTextIndex = 0;
  let charIndex = 0;
  let typing = true;
  const typedText = document.getElementById('typed-text');

  function typeText() {
    const currentText = texts[currentTextIndex];
    if (typing) {
      typedText.innerText = currentText.substring(0, charIndex++);
      if (charIndex > currentText.length) {
        typing = false;
        setTimeout(typeText, 2000); // Wait before erasing
      } else {
        setTimeout(typeText, 100);
      }
    } else {
      typedText.innerText = currentText.substring(0, charIndex--);
      if (charIndex < 0) {
        typing = true;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeText, 500);
      } else {
        setTimeout(typeText, 50);
      }
    }
  }

  typeText();
