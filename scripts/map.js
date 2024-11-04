// Initialize the map with London coordinates
const map = L.map("map").setView([-13.1828962, 28.991803], 13);

// Add OpenStreetMap tiles
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// Style for GeoJSON features
function style(feature) {
    return {
        fillColor: "#8a8a8a34",
        weight: 0.5,
        opacity: 0.1,
        color: "#202020ec",
        fillOpacity: 0.1,
    };
}

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
fetch("./data/geoBoundaries-MWI-ADM3-all/geoBoundaries-MWI-ADM3.geojson")
    .then((response) => response.json())
    .then((geojsonData) => {
        // Add GeoJSON to map
        L.geoJSON(geojsonData, {
            style: style,
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
