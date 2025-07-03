"use client"

import { useState } from "react"

import { all_crops, all_states, all_districts } from "./constants";

const states = all_states;
const districts = all_districts;
const crops = all_crops;

const MarketplaceBox = () => { 
const [selectedState, setSelectedState] = useState("");
const [selectedDistrict, setSelectedDistrict] = useState("");
const [selectedCrops, setSelectedCrops] = useState([]);
const [mandiResults, setMandiResults] = useState(null);

const handleCropChange = (crop) => {
    setSelectedCrops((prev) =>
      prev.includes(crop)
        ? prev.filter((c) => c !== crop)
        : [...prev, crop]
    );
    setMandiResults(null);
  };

const handleStateChange = (e) => {
  setSelectedState(e.target.value);
  setSelectedDistrict("");
  setSelectedCrops([]); // Reset crops
  setMandiResults(null);
};

const handleDistrictChange = (e) => {
  setSelectedDistrict(e.target.value);
  setSelectedCrops([]); // Reset crops
  setMandiResults(null);
};


const handleGetPrice = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/prompt/cropQuery", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        state: selectedState,
        district: selectedDistrict,
        crop_list: selectedCrops,
      }),
    });
    

    const data = await response.json();
    console.log("LLM response:", data);
    setMandiResults(data.response.llm_resoponce); 
  } catch (err) {
    console.error("Error Fetching Mandi Prices:", err);
    setMandiResults("Error Fetching Data");
  }
};


return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-blue-500 rounded-xl shadow-lg z-20 flex flex-col justify-center items-center w-full max-w-lg h-[70vh] p-8">
        <h2 className="text-white font-bold text-2xl mb-6">Find Crop Prices</h2>

        {/* State Dropdown */}
        <div className="mb-4 w-full">
          <label className="block text-white mb-2" htmlFor="state">State</label>
          <select
            id="state"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
            value={selectedState}
            onChange={handleStateChange}
          >
            <option value="">Select State</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* District Dropdown */}
        <div className="mb-4 w-full">
          <label className="block text-white mb-2" htmlFor="district">District</label>
          <select
            id="district"
            className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
            value={selectedDistrict}
            onChange={handleDistrictChange}
            disabled={!selectedState}
          >
            <option value="">Select District</option>
            {selectedState &&
              districts[selectedState].map(district => (
                <option key={district} value={district}>{district}</option>
              ))}
          </select>
        </div>

        {/* Crop Checkbox List */}
        <div className="mb-4 w-full">
          <label className="block text-white mb-2">Crops</label>
          <div className="flex flex-wrap max-h-40 overflow-y-auto bg-white rounded p-2">
            {crops.map(crop => (
              <label key={crop} className="mr-4 mb-2 flex items-center text-blue-700 text-sm">
                <input
                  type="checkbox"
                  value={crop}
                  checked={selectedCrops.includes(crop)}
                  onChange={() => handleCropChange(crop)}
                  className="mr-2"
                />
                {crop}
              </label>
            ))}
          </div>
        </div>

        <button
          className="bg-white text-blue-700 px-6 py-2 rounded-lg mt-4 hover:bg-blue-100 transition font-semibold"
          disabled={!selectedState || !selectedDistrict || selectedCrops.length === 0}
          onClick={handleGetPrice}
        >
          Get Best Price
        </button>
      </div>

      {/* Show LLM Result */}
      {mandiResults && (
        <div className="bg-white mt-6 p-4 rounded shadow-lg max-w-xl w-full text-sm text-gray-800 whitespace-pre-wrap">
          {mandiResults}
        </div>
      )}
    </div>
  );
};

export default MarketplaceBox
