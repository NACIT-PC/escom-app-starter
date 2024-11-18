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
        console.log(areaSelect.option);
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

  const locationSelect = document.getElementById("data-table");

  console.log("Table Element", locationSelect);

  // Add regions from the data
  for (const location of regionData.locations) {
    console.log(location);
    const row = document.createElement("tr");
    row.innerHTML = `<td>${location.id}</td><td>${location.name}</td><td>${location.locations}</td>`;
    // row.innerHTML = `<td>${location.id}</td><td>${location.name}</td><td>${location.locations}</td><td>${location.locations}</td>`;
    locationSelect.appendChild(row);
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
  console.log("Selected Region", selectedRegionId);
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
});




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

// Search Bar
// Initialize variables
let data = [];
const searchInput = document.getElementById("searchInput");
console.log(searchInput);
const resultsContainer = document.getElementById("resultsContainer");

// Load JSON data when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadJsonData();
  searchInput = document.getElementById("searchInput").value.toLowerCase();
  console.log("search term", searchInput);
  // Add event listener for search input
  searchInput.addEventListener("input", handleSearch);
});

// Function to load JSON data
async function loadJsonData() {
  try {
    // Show loading message
    resultsContainer.innerHTML = '<div class="loading">Loading data...</div>';

    // Fetch JSON file
    const response = await fetch("./data/escom.json");
    if (!response.ok) {
      throw new Error("Failed to load");
    }

    // Parse JSON data
    data = await response.json();
    console.log("searchData", data.data);

    //  const regionskeys =Object.keys(data.data.regions   );
    //  console.log ('region keys',regionskeys);

    const regions = data.data.regions;
    console.log("region data", regions);

    for (region of regions) {
      console.log(region.name);
      const regionNames = region.name;
    }

    searchInput.addEventListener("input", (event) => {
      searchRegions(event.target.value);
      searchDistricts(event.target.value);
    });

    function searchRegions(inputValue) {
      const districts = region.districts;
      const filteredRegions = regions.filter((regions) =>
        regions.name.toLowerCase().includes(inputValue)
      );
      console.log("filtered data", filteredRegions);
      const filteredDistricts = districts.filter((districts) =>
        districts.name.toLowerCase().includes(inputValue)
      );
    }

    function searchDistricts(inputValue) {
      const districtsNames = new Set([]);
     for (const region of regions) {
        console.log(region)
        for (let index = 0; index < regions.length; index++) {
            console.log('number of regions',regions.length)
            console.log("district names", regions[index].districts);
            for (const district of regions[index].districts) {
                console.log('names of district', district.name)
                districtsNames.add(district.name);
                
            }
          }
        
     }
      console.log('district names array', districtsNames);
      const filteredDistricts = [...districtsNames].filter((district) =>
        district.toLowerCase().includes(inputValue)
      );
      console.log("filtered districts", filteredDistricts);
    }

    // Clear loading message
    resultsContainer.innerHTML = "";
  } catch (error) {
    // Show error message
    resultsContainer.innerHTML = `
             <div class="error">
                 Error loading data: ${error.message}
                 <br>Please make sure your JSON file exists and is accessible.
             </div>
         `;
    console.error("Error:", error);
  }
}

// Function to handle search
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();

  // Clear results if search term is empty
  if (!searchTerm) {
    resultsContainer.innerHTML = "";
    return;
  }

  // Filter results
  const filteredResults = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm)
  );

  // Display results
  displayResults(filteredResults, searchTerm);
}

// Function to display results
function displayResults(results, searchTerm) {
  if (results.length === 0) {
    resultsContainer.innerHTML = `
             <div class="no-results">
                 No results found for "${searchTerm}"
             </div>
         `;
    return;
  }

  const resultsHTML = results
    .map(
      (item) => `
         <div class="result-item">
             <h3>${highlightText(item.title, searchTerm)}</h3>
             <p>${highlightText(item.description, searchTerm)}</p>
         </div>
     `
    )
    .join("");

  resultsContainer.innerHTML = resultsHTML;
}

// Function to highlight matching text
function highlightText(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
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
