const map = L.map('map').setView([51.505, -0.09], 3);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const marker = L.marker([0, 0]).addTo(map);
marker.bindPopup("<b>Current Location</b>").openPopup();

async function updateMarkerPosition() {
    const response = await fetch("/api/location");
    const {latitude, longitude} = await response.json();
    const newLatLng = new L.LatLng(latitude, longitude);
    marker.setLatLng(newLatLng);
}

updateMarkerPosition();

setInterval(updateMarkerPosition, 15000);