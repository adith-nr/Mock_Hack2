import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SchemesBox from "./SchemesBox";
import ScanPlantBox from "./ScanPlantBox";
import MarketplaceBox from "./MarketplaceBox";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Section: Above Columns */}
      <section className="w-full bg-gray-100 flex justify-center items-center py-10 h-screen">
        {/* Make SchemesBox clickable */}
        <div className="w-full flex justify-center items-center">
          <div
            className="w-full max-w-2xl cursor-pointer"
            onClick={() => navigate("/schemes")}
          >
            <SchemesBox />
          </div>
        </div>
      </section>
      {/* Section: Columns */}
      <section className="flex flex-1 h-screen">
        {/* Left Column */}
        <div className="w-1/2 bg-blue-500 flex items-center justify-center relative">
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/scan")}
          >
            <ScanPlantBox />
          </div>
        </div>
        {/* Right Column */}
        <div className="w-1/2 bg-white flex items-center justify-center relative">
          <div
            className="w-full h-full flex items-center justify-center cursor-pointer"
            onClick={() => navigate("/marketplace")}
          >
            <MarketplaceBox />
          </div>
        </div>
      </section>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/schemes" element={<SchemesBox />} />
        <Route path="/scan" element={<ScanPlantBox />} />
        <Route path="/marketplace" element={<MarketplaceBox />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;