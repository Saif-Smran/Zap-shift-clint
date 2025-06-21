import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import districtData from '../assets/Data/warehouses.json';

const useCoverageData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real application, you would fetch from an API
        // const response = await fetch('/api/coverage');
        // const result = await response.json();
        
        setData(districtData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching coverage data:', err);
        setError('Failed to load coverage data');
        setLoading(false);
        
        Swal.fire({
          icon: 'error',
          title: 'Error Loading Data',
          text: 'Failed to load coverage data. Please try again.',
          confirmButtonColor: '#3085d6'
        });
      }
    };

    fetchData();
  }, []);

  // Get statistics
  const getStatistics = () => {
    if (!data.length) return { totalDistricts: 0, activeCoverage: 0, totalAreas: 0 };
    
    return {
      totalDistricts: data.length,
      activeCoverage: data.filter(d => d.status === 'active').length,
      totalAreas: data.reduce((acc, district) => acc + district.covered_area.length, 0)
    };
  };

  // Filter data by search term
  const filterData = (searchTerm) => {
    if (!searchTerm.trim()) return data;
    
    return data.filter(district => 
      district.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      district.covered_area.some(area => 
        area.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  // Get districts by region
  const getDistrictsByRegion = (region) => {
    return data.filter(district => district.region === region);
  };

  // Get active districts
  const getActiveDistricts = () => {
    return data.filter(district => district.status === 'active');
  };

  return {
    data,
    loading,
    error,
    getStatistics,
    filterData,
    getDistrictsByRegion,
    getActiveDistricts
  };
};

export default useCoverageData; 