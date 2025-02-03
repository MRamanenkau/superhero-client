import React, { useEffect, useState } from 'react';
import useSocket from '../../hooks/useSoket';
import './style.css';

const SuperheroList: React.FC = () => {
  const { superheroes, fetchSuperheroes } = useSocket();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    fetchSuperheroes();
  }, []);

  if (!isVisible) {
    return (
      <button
        className="terminal-icon"
        onClick={() => setIsVisible(true)}
        aria-label="Open terminal"
      >
        {/* The terminal icon is added via CSS background-image */}
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
