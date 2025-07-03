import React, { useState } from "react";
 // Adjust the path as needed

const states = ["Maharashtra", "Punjab", "Uttar Pradesh","Karnataka"];
const districts = {
  Maharashtra: ["Pune", "Nashik", "Nagpur"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  Karnataka: ["Bengaluru", "Mysore", "Hubli"],
};
const crops = ["Wheat", "Rice", "Sugarcane", "Cotton"];

const MarketplaceBox = () => { 
  const [selectedState, setSelectedState] = useState("");
const [selectedDistrict, setSelectedDistrict] = useState("");
const [selectedCrop, setSelectedCrop] = useState("");
const [mandiResults, setMandiResults] = useState(null);


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
        crop_list: [selectedCrop],
      }),
    });

    const data = await response.json();
    console.log("LLM response:", data);
    setMandiResults(data.response.llm_resoponce); 
  } catch (err) {
    console.error("Error fetching mandi prices:", err);
    setMandiResults("Error fetching data");
  }
};

return (
  <div className="w-full min-h-screen flex items-center justify-center bg-blue-100">
    <div className="bg-blue-500 rounded-xl shadow-lg z-20 flex flex-col justify-center items-center w-full max-w-lg h-[60vh] p-8">
      <h2 className="text-white font-bold text-2xl mb-6">Find Crop Prices</h2>

      {/* State Dropdown */}
      <div className="mb-4 w-full">
        <label className="block text-white mb-2" htmlFor="state">State</label>
        <select
          id="state"
          className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
          value={selectedState}
          onChange={e => {
            setSelectedState(e.target.value);
            setSelectedDistrict("");
            setMandiResults(null);
          }}
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
          onChange={e => {
            setSelectedDistrict(e.target.value);
            setMandiResults(null);
          }}
          disabled={!selectedState}
        >
          <option value="">Select District</option>
          {selectedState &&
            districts[selectedState].map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
        </select>
      </div>

      {/* Crop Dropdown */}
      <div className="mb-4 w-full">
        <label className="block text-white mb-2" htmlFor="crop">Crop Name</label>
        <select
          id="crop"
          className="w-full px-3 py-2 rounded-lg border border-blue-200 focus:outline-none"
          value={selectedCrop}
          onChange={e => {
            setSelectedCrop(e.target.value);
            setMandiResults(null);
          }}
        >
          <option value="">Select Crop</option>
          {crops.map(crop => (
            <option key={crop} value={crop}>{crop}</option>
          ))}
        </select>
      </div>

      <button
        className="bg-white text-blue-700 px-6 py-2 rounded-lg mt-4 hover:bg-blue-100 transition font-semibold"
        disabled={!selectedState || !selectedDistrict || !selectedCrop}
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

export default MarketplaceBox;