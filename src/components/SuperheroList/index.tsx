import React, { useEffect, useState } from 'react';
import useSuperheroes from '../../hooks/useSuperheroes';
import './style.css';

const SuperheroList: React.FC = () => {
  const { superheroes, fetchSuperheroes, isConnected } = useSuperheroes();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isConnected) {
      fetchSuperheroes();
    }
  }, [isConnected]);

  if (!isVisible) {
    return (
      <button
        className="terminal-icon"
        onClick={() => setIsVisible(true)}
        aria-label="Open terminal"
      >
      </button>
    );
  }

  return (
    <div className="console-overlay">
      <div className="console">
        <div className="console-header">
          <button
            className="close-button"
            onClick={() => setIsVisible(false)}
            aria-label="Close terminal"
          >
            X
          </button>
          <h2>Superheroes</h2>
        </div>
        <ul>
          {superheroes.map((hero) => (
            <li key={hero.id}>
              {hero.name} - Humility: {hero.humility}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SuperheroList;
