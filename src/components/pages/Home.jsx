

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import "../App.css";
import Chart from "react-apexcharts";
import { data as databaseData } from '../components/Database'; // Adjust the path based on your actual file structure

const TriplePieCharts = () => {
  const domains = [...new Set(databaseData.map(item => item.name))];
  const difficulties = [...new Set(databaseData.map(item => item.difficulty))];

  const chartData = {};

  domains.forEach(domain => {
    chartData[domain] = {};
    difficulties.forEach(difficulty => {
      chartData[domain][difficulty] = databaseData.filter(item => item.name === domain && item.difficulty === difficulty)[0];
    });
  });

  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState(difficulties[0]);
  const selectedChart = chartData[selectedDomain][selectedDifficulty];

  const handleDomainChange = (event) => {
    const domain = event.target.value;
    setSelectedDomain(domain);
  };

  const handleDifficultyChange = (event) => {
    const difficulty = event.target.value;
    setSelectedDifficulty(difficulty);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="App">
            <h1>
              Triple Pie Chart for {selectedDomain} - {selectedDifficulty} <i className="fas fa-chart-pie"></i>
            </h1>
            <div className="dropdowns">
              <div className="dropdown">
                <label htmlFor="domain">Select Domain:</label>
                <select id="domain" onChange={handleDomainChange} value={selectedDomain}>
                  {domains.map(domain => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
              </div>
              <div className="dropdown">
                <label htmlFor="difficulty">Select Difficulty:</label>
                <select id="difficulty" onChange={handleDifficultyChange} value={selectedDifficulty}>
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="chart-container">
              <div className="chart" style={{ width: '100%' }}>
                <Chart
                  options={{ colors: ["#36A2EB", "#FFCE56"] }}
                  series={[selectedChart.questions_correct, selectedChart.questions_wrong]}
                  type="pie"
                  width="55%"
                />
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default TriplePieCharts;

