const regionData = {
    regions: [],
    areas: [],
    locations: [],
};

let selectedRegionId = "";
const selectedDistrictId = "";
// Function to populate the region dropdown
function populateRegionDropdown() {
    const regionSelect = document.getElementById("region");

    console.log("Region Element", regionSelect);

    // Clear existing options except the first one (Select Region)
    if (regionSelect.options.length > 1) {
        regionSelect.remove(1);
    }

    // Add regions from the data
    for (const region of regionData.regions) {
        const option = new Option(region.name, region.id);
        regionSelect.add(option);
    }
}

// Function to populate the region dropdown
function populateAreaDropdown() {
    const areaSelect = document.getElementById("area");

    console.log("Area Element", areaSelect);

    // if (regionData.areas.length > 1) {
    //     areaSelect.remove(0);
    //     const option = new Option("Select Area", "#");
    //     areaSelect.add(option);
    // }

    // Clear existing options except the first one (Select Region)
    if (areaSelect.options.length > 1) {
        areaSelect.innerHTML = ' ';
        const option = new Option("Select Region First", "#");
        areaSelect.add(option);
    }



    for (let index = 0; index < regionData.areas.length; index++) {
        const option = new Option(regionData.areas[index].name, regionData.areas[index].id);
        areaSelect.add(option);
    }


}

// Function to populate the region dropdown
function populateTableData() {
    const tableElement = document.getElementById("data-table");
    const placeholders = document.getElementById("placeholder");
    // Clear existing table content
    tableElement.innerHTML = "";
    if (placeholders) {
        placeholders.remove();
    }

    // Add header row
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th>ID</th>
        <th>Name</th>
        <th>Locations</th>
    `;
    tableElement.appendChild(headerRow);

    // Add data rows
    for (const location of regionData.locations) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${location.id}</td>
            <td>${location.name}</td>
            <td>${location.locations}</td>
        `;
        tableElement.appendChild(row);
    }
}

// Function to populate the region dropdown
function populateLocations() {
    const tableSelect = document.getElementById("data-table");

    console.log("Area Element", tableSelect);

    // Add regions from the data
    for (const location of regionData.locations) {
        const option = new Option(area.name, area.id);
        areaSelect.add(option);
    }
}
// Function to get districts for a selected region
function getDistricts(regionId) {
    const region = regionData.regions.find((r) => r.id === regionId);
    return region ? region.districts : [];
}

// Function to get areas for a selected district
function getLocations(regionId, districtId) {
    const region = regionData.regions.find((r) => r.id === regionId);
    if (region) {
        const district = region.districts.find((d) => d.id === districtId);
        return district ? district.areas : [];
    }
    return [];
}

// Event listener for region selection
document.getElementById("region").addEventListener("change", function () {
    const selectedRegion = this.value;
    selectedRegionId = selectedRegion;
    console.log('Selected Region', selectedRegionId);
    const districts = getDistricts(selectedRegion);

    // You can use this data to populate a district dropdown if needed
    console.log("Selected Region Districts:", districts);
    regionData.areas = districts;
    populateAreaDropdown();
});

document.getElementById("area").addEventListener("change", function () {
    const selectedArea = this.value;
    const locations = getLocations(selectedRegionId, selectedArea);

    // You can use this data to populate a district dropdown if needed
    console.log("Selected Area Locations:", locations);

    regionData.locations = locations;
    populateTableData();



// Initialize the dropdown when the page loads
document.addEventListener("DOMContentLoaded", () => {
    initializeWithAPI();
});

// Optional: Function to fetch data from an API instead of using static data
async function fetchRegionData() {
    try {
        const response = await fetch("./data/escom.json");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching region data:", error);
        return null;
    }
}

// Example usage with API:

async function initializeWithAPI() {
    const response = await fetchRegionData();
    console.log(response.data);
    if (response) {
        regionData.regions = response.data.regions;
        populateRegionDropdown();
    }
}
