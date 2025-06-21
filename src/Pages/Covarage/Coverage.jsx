import React, { useState, useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaSearch, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import useCoverageData from '../../Hooks/useCoverageData';

// Custom hook to handle map center and zoom updates
function MapUpdater({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const Coverage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [mapCenter, setMapCenter] = useState([23.685, 90.3563]); // Center of Bangladesh
  const [mapZoom, setMapZoom] = useState(7); // Default zoom level

  // Use custom hook for data management
  const { data: districtData, loading, getStatistics, filterData } = useCoverageData();

  // Filter districts based on search term
  const filteredDistricts = useMemo(() => {
    return filterData(searchTerm);
  }, [searchTerm, filterData]);

  // Get statistics
  const statistics = useMemo(() => {
    return getStatistics();
  }, [getStatistics]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      Swal.fire({
        icon: 'warning',
        title: 'Search Required',
        text: 'Please enter a search term.',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    if (filteredDistricts.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No Results Found',
        text: `No districts found matching "${searchTerm}".`,
        confirmButtonColor: '#3085d6'
      });
    } else if (filteredDistricts.length === 1) {
      // Auto-center and zoom map to the single result
      const district = filteredDistricts[0];
      handleDistrictSelect(district, true);
      Swal.fire({
        icon: 'success',
        title: 'District Found!',
        text: `Found ${district.district} district.`,
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Multiple Results',
        text: `Found ${filteredDistricts.length} districts matching your search.`,
        confirmButtonColor: '#3085d6'
      });
    }
  };

  // Handle district selection with zoom functionality
  const handleDistrictSelect = (district, fromSearch = false) => {
    setSelectedDistrict(district);
    setMapCenter([district.latitude, district.longitude]);
    
    // Set appropriate zoom level based on context
    if (fromSearch || filteredDistricts.length === 1) {
      // Zoom in closer for single district selection
      setMapZoom(12);
    } else {
      // Moderate zoom for manual selection
      setMapZoom(10);
    }
    
    setSearchTerm(district.district);
    
    // Scroll to map section for better visibility
    setTimeout(() => {
      const mapElement = document.querySelector('.leaflet-container');
      if (mapElement) {
        mapElement.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 100);
  };

  // Handle marker click with enhanced zoom
  const handleMarkerClick = (district) => {
    setSelectedDistrict(district);
    setMapCenter([district.latitude, district.longitude]);
    setMapZoom(12); // Zoom in closer when clicking marker
    
    // Swal.fire({
    //   icon: 'info',
    //   title: district.district,
    //   html: `
    //     <div class="text-left">
    //       <p><strong>Region:</strong> ${district.region}</p>
    //       <p><strong>City:</strong> ${district.city}</p>
    //       <p><strong>Status:</strong> <span class="text-green-600">${district.status}</span></p>
    //       <p><strong>Covered Areas:</strong></p>
    //       <ul class="list-disc ml-4">
    //         ${district.covered_area.map(area => `<li>${area}</li>`).join('')}
    //       </ul>
    //     </div>
    //   `,
    //   confirmButtonColor: '#3085d6'
    // });
  };

  // Clear search and reset map
  const clearSearch = () => {
    setSearchTerm('');
    setSelectedDistrict(null);
    setMapCenter([23.685, 90.3563]); // Reset to Bangladesh center
    setMapZoom(7); // Reset to default zoom
  };

  // Handle district card click with enhanced zoom
  const handleDistrictCardClick = (district) => {
    handleDistrictSelect(district);
    
    // Show a brief notification
    // Swal.fire({
    //   icon: 'success',
    //   title: 'Location Selected',
    //   text: `Zooming to ${district.district}`,
    //   timer: 1500,
    //   showConfirmButton: false,
    //   toast: true,
    //   position: 'top-end'
    // });
  };

  if (loading) {
    return (
      <section className="bg-base-200 py-12 my-6 px-6 md:px-10 rounded-3xl max-w-11/12 mx-auto">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <span className="loading loading-spinner loading-lg text-lime-400"></span>
            <p className="mt-4 text-lg">Loading coverage data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-base-200 my-6 py-12 px-6 md:px-10 rounded-3xl max-w-11/12 mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-8">
        We are available in <span className="text-lime-400">{statistics.totalDistricts} districts</span>
      </h2>

      {/* Search Bar */}
      <div className="w-full max-w-lg mb-10">
        <form onSubmit={handleSearch} className="flex items-center gap-2 bg-base-100 rounded-full px-4 py-2 shadow-sm">
          <FaSearch className="text-base-content/60 text-lg" />
          <input
            type="text"
            placeholder="Search districts, regions, or areas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-base"
          />
          <button 
            type="submit"
            className="btn btn-sm bg-lime-300 text-black rounded-full hover:bg-lime-400 px-5"
          >
            Search
          </button>
          {searchTerm && (
            <button 
              type="button"
              onClick={clearSearch}
              className="btn btn-sm btn-ghost text-base-content/60 hover:text-base-content"
            >
              ✕
            </button>
          )}
        </form>
      </div>

      {/* Search Results Summary */}
      {searchTerm && (
        <div className="mb-6 p-4 bg-base-100 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaInfoCircle className="text-lime-400" />
              <span className="text-sm">
                Found <span className="font-bold text-lime-400">{filteredDistricts.length}</span> districts
                {searchTerm && ` matching "${searchTerm}"`}
              </span>
            </div>
            <button 
              onClick={clearSearch}
              className="btn btn-xs btn-ghost"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      <hr className="border-base-300 mb-8" />

      <h3 className="text-xl font-semibold text-base-content mb-6">
        We deliver almost all over Bangladesh
      </h3>

      {/* Districts List */}
      {searchTerm && filteredDistricts.length > 0 && (
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-3">Search Results:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredDistricts.slice(0, 6).map((district, idx) => (
              <div 
                key={idx}
                onClick={() => handleDistrictCardClick(district)}
                className="p-3 bg-base-100 rounded-lg cursor-pointer hover:bg-lime-50 transition-colors border border-base-300 hover:border-lime-400"
              >
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-lime-400" />
                  <div>
                    <h5 className="font-semibold text-sm">{district.district}</h5>
                    <p className="text-xs text-base-content/70">{district.region}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredDistricts.length > 6 && (
            <p className="text-sm text-base-content/70 mt-2">
              Showing first 6 results. Use the map to see all locations.
            </p>
          )}
        </div>
      )}

      {/* Selected District Info */}
      {selectedDistrict && (
        <div className="mb-6 p-4 bg-lime-50 border border-lime-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-lime-600 text-xl" />
              <div>
                <h4 className="font-bold text-lime-800">{selectedDistrict.district}</h4>
                <p className="text-sm text-lime-700">{selectedDistrict.region} • {selectedDistrict.city}</p>
              </div>
            </div>
            <button 
              onClick={clearSearch}
              className="btn btn-xs btn-ghost text-lime-600 hover:text-lime-800"
            >
              Clear Selection
            </button>
          </div>
        </div>
      )}

      {/* Leaflet Map */}
      <div className="rounded-2xl overflow-hidden border border-base-300 shadow-md">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          scrollWheelZoom={true}
          style={{ height: '500px', width: '100%' }}
        >
          <MapUpdater center={mapCenter} zoom={mapZoom} />
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          />
          {filteredDistricts.map((district, idx) => (
            <Marker 
              key={idx} 
              position={[district.latitude, district.longitude]}
              eventHandlers={{
                click: () => handleMarkerClick(district)
              }}
            >
              <Popup>
                <div className="text-sm">
                  <h4 className="font-bold text-lime-600">{district.district}</h4>
                  <p className="text-xs mt-1 text-base-content/70">{district.region}</p>
                  <p className="text-xs mt-1">Covered areas:</p>
                  <ul className="list-disc ml-4 text-xs">
                    {district.covered_area.slice(0, 3).map((area, i) => (
                      <li key={i}>{area}</li>
                    ))}
                    {district.covered_area.length > 3 && (
                      <li className="text-lime-600">+{district.covered_area.length - 3} more</li>
                    )}
                  </ul>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-base-100 p-4 rounded-lg text-center">
          <h4 className="text-2xl font-bold text-lime-400">{statistics.totalDistricts}</h4>
          <p className="text-sm">Total Districts</p>
        </div>
        <div className="bg-base-100 p-4 rounded-lg text-center">
          <h4 className="text-2xl font-bold text-lime-400">{statistics.activeCoverage}</h4>
          <p className="text-sm">Active Coverage</p>
        </div>
        <div className="bg-base-100 p-4 rounded-lg text-center">
          <h4 className="text-2xl font-bold text-lime-400">{statistics.totalAreas}</h4>
          <p className="text-sm">Covered Areas</p>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
