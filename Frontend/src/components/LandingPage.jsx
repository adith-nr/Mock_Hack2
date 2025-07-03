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
            className="w-4/5 h-4/5 bg-white rounded-xl shadow-lg z-20 m-8 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col justify-center items-center"
            onClick={() => navigate("/scan")}
          >
            <h2 className="text-blue-700 font-semibold text-2xl">Scan the plant</h2>
            <p className="text-gray-600 mt-4 text-lg text-center">
              Upload an image of your plant to check its health and get suggestions.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition font-semibold">
              Go to Plant Scanner
            </button>
          </div>
        </div>
        {/* Right Column */}
        <div className="w-1/2 bg-white flex items-center justify-center relative">
          <div
            className="w-4/5 h-4/5 bg-blue-500 rounded-xl shadow-lg z-20 m-8 cursor-pointer hover:scale-105 transition-transform duration-200 flex flex-col justify-center items-center"
            onClick={() => navigate("/marketplace")}
          >
            <h2 className="text-white font-semibold text-2xl">Marketplace</h2>
            <p className="text-blue-100 mt-4 text-lg text-center">
              Get the best price for your crops. Connect with buyers directly.
            </p>
            <button className="bg-white text-blue-700 px-4 py-2 rounded-lg mt-4 hover:bg-blue-100 transition font-semibold">
              Visit Marketplace
            </button>
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