import React, { useState } from "react";
import mandiData from "../data/mandiData.json"; // Adjust the path as needed

const states = ["Maharashtra", "Punjab", "Uttar Pradesh"];
const districts = {
  Maharashtra: ["Pune", "Nashik", "Nagpur"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
};
const crops = ["Wheat", "Rice", "Sugarcane", "Cotton"];

const MarketplaceBox = () => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [mandiResults, setMandiResults] = useState(null);

  const handleGetPrice = () => {
    // Find all mandis in the selected state/district/crop
    const filtered = mandiData.filter(
      (item) =>
        item.state === selectedState &&
        item.crop === selectedCrop &&
        (
          item.district === selectedDistrict ||
          // Also show mandis in other districts of the same state for "nearby"
          item.state === selectedState
        )
    );
    // Sort by price descending
    filtered.sort((a, b) => b.price - a.price);

    // LLM suggestion: suggest the mandi with the highest price
    const suggestion = filtered.length
      ? `Suggestion: Sell at ${filtered[0].mandi} in ${filtered[0].district}, ${filtered[0].state} for the best price of ₹${filtered[0].price} per quintal.`
      : "No mandi data found for your selection.";

    setMandiResults({ filtered, suggestion });
  };

  // If mandiResults exists, show the result area
  if (mandiResults) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-blue-100">
        <div className="bg-white rounded-xl shadow-lg z-20 flex flex-col justify-center items-center w-full max-w-2xl h-auto p-8">
          <h2 className="text-blue-700 font-bold text-2xl mb-6">Nearby Mandis & Prices</h2>
          {mandiResults.filtered.length > 0 ? (
            <>
              <table className="w-full mb-6 border">
                <thead>
                  <tr className="bg-blue-200">
                    <th className="py-2 px-4 border">Mandi</th>
                    <th className="py-2 px-4 border">District</th>
                    <th className="py-2 px-4 border">Price (₹/quintal)</th>
                  </tr>
                </thead>
                <tbody>
                  {mandiResults.filtered.map((mandi, idx) => (
                    <tr key={idx} className="text-center">
                      <td className="py-2 px-4 border">{mandi.mandi}</td>
                      <td className="py-2 px-4 border">{mandi.district}</td>
                      <td className="py-2 px-4 border">{mandi.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="bg-blue-100 text-blue-900 rounded-lg px-6 py-4 font-semibold text-lg shadow">
                {mandiResults.suggestion}
              </div>
            </>
          ) : (
            <div className="text-red-600 font-semibold">No mandi data found for your selection.</div>
          )}
        </div>
      </div>
    );
  }

  // Otherwise, show the dropdowns
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-blue-500 rounded-xl shadow-lg z-20 flex flex-col justify-center items-center w-full max-w-lg h-[60vh] p-8">
        <h2 className="text-white font-bold text-2xl mb-6">Find Crop Prices</h2>
        {/* State Dropdown */}
        <div className="mb-4 w-full">
          <label className="block text-white mb-2" htmlFor="state">
            State
          </label>
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
          <label className="block text-white mb-2" htmlFor="district">
            District
          </label>
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
          <label className="block text-white mb-2" htmlFor="crop">
            Crop Name
          </label>
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
    </div>
  );
};

export default MarketplaceBox;