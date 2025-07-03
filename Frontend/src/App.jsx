import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SchemesBox from "./components/SchemesBox";
import ScanPlantBox from "./components/ScanPlantBox";
import MarketplaceBox from "./components/MarketplaceBox";
import Auth from "./components/Auth";
import LandingPage from "./components/LandingPage"; 
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />              
        <Route path="/home" element={<><Navbar /><LandingPage /></>} />
        <Route path="/schemes" element={<SchemesBox />} />
        <Route path="/scan" element={<ScanPlantBox />} />
        <Route path="/marketplace" element={<MarketplaceBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
