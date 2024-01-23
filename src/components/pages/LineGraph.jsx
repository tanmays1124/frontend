
import React, { useState } from 'react';
import Chart from "react-apexcharts";
import Box from '@mui/material/Box';
// import "../App.css";
// import "../home.css";
import { data } from '../Database';

function LineGraph() {
  const initialData = {
    options: {
      colors: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"],
      chart: {
        id: "basic-bar",
      },
    },
    series: data.map(item => ({
      name: `${item.name}-${item.difficulty}`,
      data: item.data,
    })),
  };

  const [state, setState] = useState({ ...initialData });
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const handleDomainChange = (event) => {
    const selectedDomain = event.target.value;
    setSelectedDomain(selectedDomain);

    const filteredSeries = initialData.series.filter((series) =>
      series.name.includes(selectedDomain)
    );

    setState({
      options: {
        ...initialData.options,
      },
      series: filteredSeries,
    });

    setSelectedDifficulty(""); // Reset selected difficulty when domain changes
  };

  const handleDifficultyChange = (event) => {
    const selectedDifficulty = event.target.value;
    setSelectedDifficulty(selectedDifficulty);

    let filteredSeries;

    if (selectedDifficulty === "easy" || selectedDifficulty === "Medium" || selectedDifficulty === "Difficult") {
      // Display all levels for the selected difficulty
      filteredSeries = initialData.series.filter((series) =>
        series.name.includes(selectedDomain) && series.name.includes(selectedDifficulty)
      );
    } else {
      // Display only the selected difficulty level
      filteredSeries = initialData.series.filter((series) =>
        series.name.includes(selectedDomain)
      );
    }

    setState({
      options: {
        ...initialData.options,
      },
      series: filteredSeries,
    });
  };

  const domainNames = [...new Set(data.map(item => item.name))];
  const difficultyLevels = ["easy", "Medium", "Difficult"];

  return (
    <>
      <Box sx={{ display: 'flex' }}>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="App">
            <h1>
              Line Chart <i className="fas fa-user"></i>
            </h1>
            <label>Select Domain:</label>
            <select onChange={handleDomainChange} value={selectedDomain}>
              <option value="">Select Domain</option>
              {domainNames.map((name, index) => (
                <option key={index} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {selectedDomain && (
              <div>
                <label>Select Difficulty:</label>
                <select onChange={handleDifficultyChange} value={selectedDifficulty}>
                  <option value="">Select Difficulty</option>
                  {difficultyLevels.map((level, index) => (
                    <option key={index} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="chart-container">
              <div className="chart-title">Performance Comparison</div>
              <div className="chart">
                <Chart
                  options={state.options}
                  series={state.series}
                  type="line"
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

export default LineGraph;



