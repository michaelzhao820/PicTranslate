import React from 'react';
import NavBar from "./components/NavBar";
import Hero from "./components/Hero";
import About from "./components/About"; // make sure to import the About component
import Translate from "./components/Translate";
import "react-image-crop/dist/ReactCrop.css";


function App() {
  return (
    <>
      <NavBar/>
      <div id="home">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="translate">
        <Translate />
      </div>
    </>
  );
}

export default App;
