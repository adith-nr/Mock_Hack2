"use client"

import { useState } from "react"

const states = ["Maharashtra", "Punjab", "Uttar Pradesh", "Karnataka"]
const districts = {
  Maharashtra: ["Pune", "Nashik", "Nagpur"],
  Punjab: ["Ludhiana", "Amritsar", "Jalandhar"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
  Karnataka: ["Bengaluru", "Mysore", "Hubli"],
}
const crops = ["Wheat", "Rice", "Sugarcane", "Cotton"]

const MarketplaceBox = () => {
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("")
  const [mandiResults, setMandiResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleGetPrice = async () => {
    setLoading(true)
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
      })

      const data = await response.json()
      console.log("LLM response:", data)
      setMandiResults(data.response.llm_resoponce)
    } catch (err) {
      console.error("Error fetching Mandi Prices:", err)
      setMandiResults("Error Fetching Data. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">💰 Crop Marketplace</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get real-time crop prices from different markets and find the best deals for your produce
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-green-100">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find Crop Prices</h2>

              {/* State Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="state">
                  Select State
                </label>
                <select
                  id="state"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-200"
                  value={selectedState}
                  onChange={(e) => {
                    setSelectedState(e.target.value)
                    setSelectedDistrict("")
                    setMandiResults(null)
                  }}
                >
                  <option value="">Choose your state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {/* District Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="district">
                  Select District
                </label>
                <select
                  id="district"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-200 disabled:bg-gray-100"
                  value={selectedDistrict}
                  onChange={(e) => {
                    setSelectedDistrict(e.target.value)
                    setMandiResults(null)
                  }}
                  disabled={!selectedState}
                >
                  <option value="">Choose your district</option>
                  {selectedState &&
                    districts[selectedState].map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
              </div>

              {/* Crop Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="crop">
                  Select Crop
                </label>
                <select
                  id="crop"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none transition-all duration-200"
                  value={selectedCrop}
                  onChange={(e) => {
                    setSelectedCrop(e.target.value)
                    setMandiResults(null)
                  }}
                >
                  <option value="">Choose your crop</option>
                  {crops.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              <button
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg mt-6 hover:from-green-600 hover:to-green-700 transition-all duration-200 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg"
                disabled={!selectedState || !selectedDistrict || !selectedCrop || loading}
                onClick={handleGetPrice}
              >
                {loading ? "Getting Prices..." : "Get Best Price"}
              </button>
            </div>

            {/* Results Section */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Price Information</h3>
              {mandiResults ? (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">{mandiResults}</pre>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-gray-500">Select your location and crop to get current market prices</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketplaceBox
