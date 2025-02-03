document.addEventListener("DOMContentLoaded", function () {
    // Contact Agent Buttons
    document.querySelectorAll(".contact-btn").forEach(button => {
        button.addEventListener("click", function () {
            let agentCard = this.closest(".agent-card");
            let name = agentCard.querySelector("h3").textContent;
            let email = agentCard.querySelector("p:nth-of-type(1)").textContent.replace("Email: ", "");
            let phone = agentCard.querySelector("p:nth-of-type(2)").textContent.replace("Phone: ", "");
            alert(`Contact ${name}\nEmail: ${email}\nPhone: ${phone}`);
        });
    });

    // Form Submission
    let contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert("Thank you for reaching out! We will get back to you soon.");
            this.reset();
        });
    }

    // Auto-fill remembered username
    let rememberedUser = localStorage.getItem("rememberedUser");
    if (rememberedUser) {
        document.getElementById("username").value = rememberedUser;
        document.getElementById("rememberMe").checked = true;
    }
});

// Search Properties
function searchProperties() {
    let input = document.getElementById("search-input").value.toLowerCase();
    let properties = document.querySelectorAll(".property-card");
    let matchFound = false;

    properties.forEach(property => {
        let title = property.querySelector("h2").textContent.toLowerCase();
        let location = property.querySelector("p:nth-of-type(1)").textContent.toLowerCase();

        if (title.includes(input) || location.includes(input)) {
            property.style.display = "flex";
            matchFound = true;
        } else {
            property.style.display = "none";
        }
    });

    document.getElementById("property-listings").style.display = matchFound ? "grid" : "none";
}

// Manage Favorites
function addToFavorites(property) {
    let listItem = document.createElement("li");
    listItem.textContent = property;
    document.getElementById("favorites-list").appendChild(listItem);
}

function clearFavorites() {
    document.getElementById("favorites-list").innerHTML = "";
}

// Initialize Map
function initMap() {
    const properties = [
        { name: "3 Bedroom, 3 Bath Modern Home", lat: -26.2041, lng: 28.0473 },
        { name: "4 Bedroom, 2 Bath Townhouse", lat: -26.2025, lng: 28.0456 },
        { name: "3 Bedroom, 2 Bath Suburban Home", lat: -26.2037, lng: 28.0490 },
        { name: "4 Bedroom, 2 Bath Estate House", lat: -26.2050, lng: 28.0480 }
    ];

    const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -26.2041, lng: 28.0473 },
        zoom: 14
    });

    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: { lat: property.lat, lng: property.lng },
            map,
            title: property.name
        });

        const infoWindow = new google.maps.InfoWindow({ content: `<h3>${property.name}</h3>` });
        marker.addListener("click", () => infoWindow.open(map, marker));
    });
}

// Login Form Handling
if (document.getElementById("login-form")) {
    document.getElementById("login-form").addEventListener("submit", function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const rememberMe = document.getElementById("rememberMe").checked;
        const errorMessage = document.getElementById("error-message");

        const storedUser = localStorage.getItem("username");
        const storedPass = localStorage.getItem("password");

        if (username === storedUser && password === storedPass) {
            errorMessage.textContent = "Login successful!";
            errorMessage.style.color = "green";
            
            rememberMe ? localStorage.setItem("rememberedUser", username) : localStorage.removeItem("rememberedUser");
            setTimeout(() => window.location.href = "dashboard.html", 1000);
        } else {
            errorMessage.textContent = "Invalid username or password!";
        }
    });
}
