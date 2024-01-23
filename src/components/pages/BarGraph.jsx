
import React, { useState } from 'react';
import Chart from "react-apexcharts";
import Box from '@mui/material/Box';
import "../App.css";
import "../home.css";

// Import your data array
import { data } from '../components/Database'; // Adjust the path accordingly

function BarGraph() {
  const domainNames = [...new Set(data.map(item => item.name))];
  const difficultyLevels = ['easy', 'Medium', 'Difficult'];

  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const filteredData = data.filter(item => 
    (!selectedDomain || item.name === selectedDomain) &&
    (!selectedDifficulty || item.difficulty === selectedDifficulty)
  );
  const initialData = {
    options: {
      colors: selectedDomain && selectedDifficulty
        ? ["#FF6384"] // Use a single color when a specific domain and difficulty are selected
        : ["#FF6384", "#36A2EB", "#FFCE56"], // Use different colors for different difficulty levels or domains
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: selectedDomain
          ? filteredData.map(item => item.difficulty)
          : domainNames,
      },
    },
    series: selectedDomain && selectedDifficulty
      ? [{
          name: `${selectedDomain}-${selectedDifficulty}`,
          data: (filteredData[0]?.data || []).map(score => (score !== undefined ? score : 0)),
        }]
      : difficultyLevels.map(difficulty => ({
          name: selectedDomain
            ? `${selectedDomain}-${difficulty}`
            : difficulty,
          data: selectedDomain
            ? (filteredData.find(item => item.name === selectedDomain && item.difficulty === difficulty)?.data || []).map(score => (score !== undefined ? score : 0))
            : domainNames.map(domain => {
                const domainData = filteredData.find(
                  item => item.name === domain && item.difficulty === difficulty
                );
                return domainData
                  ? Math.max(...(domainData.data || []).map(score => (score !== undefined ? score : 0))) || 0
                  : 0;
              }),
        })),
  };
  
  // Rest of your code...
  
  
  // Rest of your code...
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  const handleDomainChange = (event) => {
    const selectedDomain = event.target.value;
    setSelectedDomain(selectedDomain);
    setSelectedDifficulty('');
  };

  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setSelectedDifficulty(selectedDifficulty);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="App">
            <h1>
              Bar Chart <i className="fas fa-user"></i>
            </h1>
            <div className="dropdown-container">
              <label htmlFor="domainDropdown">Select Domain:</label>
              <select id="domainDropdown" onChange={handleDomainChange} value={selectedDomain}>
                <option value="">All Domains</option>
                {domainNames.map((domain, index) => (
                  <option key={index} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
              {selectedDomain && (
                <>
                  <label htmlFor="difficultyDropdown">Select Difficulty:</label>
                  <select id="difficultyDropdown" onChange={handleDifficultyChange} value={selectedDifficulty}>
                    <option value="">All Difficulties</option>
                    {difficultyLevels.map((difficulty, index) => (
                      <option key={index} value={difficulty}>
                        {difficulty}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
            <div className="chart-container">
              <div className="chart-title">Performance Comparison</div>
              <div className="chart">
                <Chart
                  options={initialData.options}
                  series={initialData.series}
                  type="bar"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
}

export default BarGraph;
