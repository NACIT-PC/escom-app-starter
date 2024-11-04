// Initialize the map with London coordinates
const map = L.map("map").setView([-13.1828962, 28.991803], 13);

// Add OpenStreetMap tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// // Style for GeoJSON features
// function style(feature) {
//     return {
//         // fillColor: "#3388ff",
//         weight: 2,
//         opacity: 1,
//         // color: "#2b6bc7",
//         fillOpacity: 0.7,
//     };
// }

// Add popup for each feature
function onEachFeature(feature, layer) {
    if (feature.properties) {
        layer.bindPopup(`
            <div class="info-panel">
                <h3>${feature.properties.name}</h3>
                <p>${feature.properties.description}</p>
            </div>
        `);
    }
}

// Fetch and load GeoJSON data
fetch("./data/malawi.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
        // Add GeoJSON to map
        L.geoJSON(geojsonData, {
            // style: style,
            onEachFeature: onEachFeature,
            pointToLayer: (feature, latlng) =>
                L.circleMarker(latlng, {
                    radius: 8,
                    fillColor: "#ff7800",
                    color: "#000",
                    weight: 1,
                    opacity: 1,
                    fillOpacity: 0.8,
                }),
        }).addTo(map);

        // Optional: Fit the map to the GeoJSON bounds
        const geoJsonLayer = L.geoJSON(geojsonData);
        map.fitBounds(geoJsonLayer.getBounds());
    })
    .catch((error) => {
        console.error("Error loading GeoJSON:", error);
    });
