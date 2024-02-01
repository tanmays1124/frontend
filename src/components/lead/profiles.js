import React from 'react';
import './profiles.css'; // Assuming you have a CSS file named profiles.css for styling

export default function Profiles({ Leaderboard }) {
    const sortedLeaderboard = Leaderboard.sort((a, b) => b.scores[`${b.selectedDifficulty}-${b.selectedDomain}`] - a.scores[`${a.selectedDifficulty}-${a.selectedDomain}`]);
  
    return (
      <div className="profile-container">
        {/* Top 3 profiles */}
        <div className="top-three">
          {sortedLeaderboard.slice(0, 3).map((profile, index) => (
            <div className={`top-profile rank-${index + 1}`} key={index}>
              <span className="rank">#{index + 1}</span>
              <div className="podium-profile">
                <img className="profile-image-medium" src={profile.img} alt={profile.name} />
                <div className="info">
                  <h3 className='name'>{profile.name}</h3>
                  <div className="score-time">
                    <h4>Score</h4>
                    <span>{profile.scores[`${profile.selectedDifficulty}-${profile.selectedDomain}`]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
  
        {/* Remaining profiles */}
        <div className="other-profiles">
          {sortedLeaderboard.slice(3).map((profile, index) => (
            <div className={`flex ${profile.highlight ? 'highlight' : ''}`} key={index}>
              <span className="rank"># {index + 4}</span>
              <img className="profile-image" src={profile.img} alt={profile.name} />
              <div className="info">
                <h3 className='name'>{profile.name}</h3>
                <span className="location">{profile.location}</span>
              </div>
              <div className="score-time">
                <h4>Score</h4>
                <span>{profile.scores[`${profile.selectedDifficulty}-${profile.selectedDomain}`]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
