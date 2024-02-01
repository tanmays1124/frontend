import React, { useState } from 'react';
import Profiles from './profiles';
import { Leaderboard } from './database';
import './board.css'; // Import the CSS file

export default function Board() {
  const [difficulty, setDifficulty] = useState('Easy'); // Default difficulty set to 'Easy'
  const [domain, setDomain] = useState('All');
  const [showDomainSelection, setShowDomainSelection] = useState(false);

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    if (newDifficulty !== 'All') {
      setShowDomainSelection(true);
    } else {
      setShowDomainSelection(false);
      setDomain('All');
    }
  };

  const handleDomainChange = (newDomain) => {
    setDomain(newDomain);
    // Perform any other necessary actions related to domain selection
  };

  const filteredProfiles = Leaderboard.map(profile => ({
    ...profile,
    selectedDifficulty: difficulty,
    selectedDomain: domain,
    highlight: profile.scores[`${difficulty}-${domain}`] > 0
  })).filter(profile => {
    const score = profile.scores[`${profile.selectedDifficulty}-${profile.selectedDomain}`];
    return difficulty === 'All' || score !== undefined;
  });

  return (
    <div className="container">
      <div className="sidebar">
        <h2>LEADERBOARD</h2>
        <br></br>
        <hr></hr>
        <br></br>
        <h2>Select Difficulty:</h2>
        <div className="difficulty-buttons">
          <button onClick={() => handleDifficultyChange('Easy')}>Easy</button>
          <button onClick={() => handleDifficultyChange('Medium')}>Medium</button>
          <button onClick={() => handleDifficultyChange('Difficult')}>Difficult</button>
        </div>

        {showDomainSelection && (
          <>
            <h2>Select Domain:</h2>
            <div className="domain-buttons">
              <button onClick={() => handleDomainChange('Python')}>Python</button>
              <button onClick={() => handleDomainChange('Linux')}>Linux</button>
              {/* Add other domains as needed */}
            </div>
          </>
        )}
      </div>

     
      {(!showDomainSelection || domain !== 'All') && (
        <div className="board" style={{ textAlign: 'mid-center' }}>
          <h1 className='leaderboard'>LEADERBOARD</h1>
          <div>
            {domain !== 'All' && difficulty !== 'All' && (
              <h2>{`${difficulty} - ${domain}`}</h2>
            )}
            <Profiles Leaderboard={filteredProfiles} />
          </div>
        </div>
      )}
    </div>
  );
}
