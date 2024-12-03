const regionData = {
  regions: [],
  areas: [],
  locations: [],
};

// Search Bar
let data = [];
const searchInput = document.getElementById("searchInput");
console.log(searchInput);
const districtsResultsContainer = document.getElementById("DistrictsResultsContainer");
const regionResultsContainer = document.getElementById("RegionResultsContainer");
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
		 return await response.json();
    } catch (error) {
        console.error("Error fetching region data:", error);
        return null;
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

// Load JSON data when page loads
document.addEventListener("DOMContentLoaded", () => {
  loadJsonData();
  searchInput = document.getElementById("searchInput").value.toLowerCase();
  console.log("search term", searchInput);
});

// Function to load JSON data
async function loadJsonData() {
  try {
    // Show loading message
    districtsResultsContainer.innerHTML = '<div class="loading">Loading data...</div>';

    // Fetch JSON file
    const response = await fetch("./data/escom.json");
    if (!response.ok) {
      throw new Error("Failed to load");
    }

    // Parse JSON data
    data = await response.json();
    console.log("searchData", data);

    

    const regions = data.regions;
    // console.log("region data", regions);

    for (region of regions) {
      // console.log(region.name);
      const regionNames = region.name;
    }

    searchInput.addEventListener("input", (event) => {
    
		
		if(event.target.value.length > 1) {
			let filteredDistrictResults = searchDistricts(event.target.value);
			let filteredRegionResults = searchRegions(event.target.value);
			displayDistrictResults(filteredDistrictResults, event.target.value);
			displayRegionResults(filteredRegionResults, event.target.value);
		} else {
			 districtsResultsContainer.innerHTML = ""
			regionResultsContainer.innerHTML = ""
		}
		
    });

    function searchRegions(inputValue) {
  // console.log('Starting search with input:', inputValue);
  
  // Search in regions
  const filteredRegions = regions.filter((region) => {
    // console.log('Checking region:', region.name);
    return region.name.toLowerCase().includes(inputValue.toLowerCase());
  });
  
  console.log("filtered regions:", filteredRegions);
  return filteredRegions;
}

    function searchDistricts(inputValue) {
      const districtsNames = new Set([]);
     for (const region of regions) {
        // console.log(region)
        for (let index = 0; index < regions.length; index++) {
            // console.log('number of regions',regions.length)
            // console.log("district names", regions[index].districts);
            for (const district of regions[index].districts) {
                // console.log('names of district', district.name)
                districtsNames.add(district.name);
                
            }
          }
        
     }
      // console.log('district names array', districtsNames);
      const filteredDistricts = [...districtsNames].filter((district) => {
			 const districtLower = district.toLowerCase();
			 const searchTermLower = inputValue.toLowerCase();
			 // Check if the district name contains the search term in any case
			return districtLower.includes(searchTermLower);
		 }

      );
      console.log("filtered districts", filteredDistricts);
		return filteredDistricts;
    }
	 
	 function searchLocations(inputValue) {
      const districtsNames = new Set([]);
     for (const region of regions) {
        // console.log(region)
        for (let index = 0; index < regions.length; index++) {
            // console.log('number of regions',regions.length)
            // console.log("district names", regions[index].districts);
            for (const district of regions[index].districts) {
                // console.log('names of district', district.name)
                districtsNames.add(district.name);
                
            }
          }
        
     }
      // console.log('district names array', districtsNames);
      const filteredDistricts = [...districtsNames].filter((district) => {
			 const districtLower = district.toLowerCase();
			 const searchTermLower = inputValue.toLowerCase();
			 // Check if the district name contains the search term in any case
			return districtLower.includes(searchTermLower);
		 }

      );
      console.log("filtered districts", filteredDistricts);
    }

    // Clear loading message
    districtsResultsContainer.innerHTML = "";
  } catch (error) {
    // Show error message
    districtsResultsContainer.innerHTML = `
             <div class="error">
                 Error loading data: ${error.message}
                 <br>Please make sure your JSON file exists and is accessible.
             </div>
         `;
    console.error("Error:", error);
  }
}

// Function to display results
function displayDistrictResults(results, searchTerm) {
  // Ensure districtsResultsContainer exists and is valid
  if (!districtsResultsContainer || typeof districtsResultsContainer.innerHTML === 'undefined') {
      console.error("Error: 'districtsResultsContainer' is not defined or invalid.");
      return;
  }

  // If results are empty, display "No Districts found"
  if (!Array.isArray(results) || results.length === 0) {
      districtsResultsContainer.innerHTML = `
          <div class="no-results">
              No Districts found for "${searchTerm}"
          </div>
      `;
      return;
  }

  // If results are present, display them
  const resultsHtml = results.map(district => `
      <div class="district-result">
          ${district}
      </div>
  `).join('');

  districtsResultsContainer.innerHTML = resultsHtml;


		results
	  .map((item) => `
         <ul class="result-item">
             <li>${highlightText(item, searchTerm)}</li>
         </ul>
     `)
	  .join("");
}
function displayRegionResults(results, searchTerm) {
  if (results.length === 0) {
    regionResultsContainer.innerHTML = `
             <div class="no-results">
                 No Regions found for "${searchTerm}"
             </div>
         `;
    return;
  }

	 regionResultsContainer.innerHTML = results
	  .map((item) => `
         <ul class="result-item">
             <li>${highlightText(item.name, searchTerm)}</li>
         </ul>
     `)
	  .join("");
}

// Function to highlight matching text
function highlightText(text, searchTerm) {
  const regex = new RegExp(`(${searchTerm})`, "gi");
  return text.replace(regex, '<span class="highlight">$1</span>');
}

async function initializeWithAPI() {
  const response = await fetchRegionData();
  console.log(response);
  if (response) {
    regionData.regions = response.regions;
    populateRegionDropdown();
  }
}