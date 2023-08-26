import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NumberManagementService = () => {
  const [mergedNumbers, setMergedNumbers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const urlParams = queryParams.getAll('url');
      
      const requests = urlParams.map(url => axios.get(url));

      try {
        const responses = await Promise.all(
          requests.map(request => 
            axios({
              ...request,
              timeout: 500, // Timeout in milliseconds
            })
            .then(response => response.data.numbers)
            .catch(error => [])
          )
        );
        
        const allNumbers = responses.flatMap(numbers => numbers);
        const uniqueNumbers = Array.from(new Set(allNumbers));
        const sortedNumbers = uniqueNumbers.sort((a, b) => a - b);
        
        setMergedNumbers(sortedNumbers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Merged Unique Integers</h1>
      <p>Numbers: {mergedNumbers.join(', ')}</p>
    </div>
  );
};

export default NumberManagementService;
