import React from 'react';
import './App.css';
import CreateSuperhero from "./components/CreateSuperhero";
import SuperheroList from "./components/SuperheroList";

function App() {
  return (
    <div className="App" style={{
      backgroundImage: `url("/comic-style-wallpaper.jpg")`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      width: "100vw",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}>
      <CreateSuperhero/>
      <SuperheroList />
    </div>
  );
}

export default App;
