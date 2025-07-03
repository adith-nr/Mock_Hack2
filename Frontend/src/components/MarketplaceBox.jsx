"use client"

import { useState } from "react"
import { DollarSign, BarChart3 } from "lucide-react"

import { all_crops, all_states, all_districts } from "./constants"

const states = all_states
const districts = all_districts
const crops = all_crops

const MarketplaceBox = () => {
  const [selectedState, setSelectedState] = useState("")
  const [selectedDistrict, setSelectedDistrict] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("")
  const [mandiResults, setMandiResults] = useState(null)

  const handleStateChange = (e) => {
    setSelectedState(e.target.value)
    setSelectedDistrict("")
    setSelectedCrop("")
    setMandiResults(null)
  }

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value)
    setSelectedCrop("")
    setMandiResults(null)
  }

  const handleCropChange = (e) => {
    setSelectedCrop(e.target.value)
    setMandiResults(null)
  }

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
      })

      const data = await response.json()
      console.log("LLM response:", data)
      setMandiResults(data.response.llm_resoponce)
    } catch (err) {
      console.error("Error Fetching Mandi Prices:", err)
      setMandiResults("Error Fetching Data")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-100 p-4">
      {/* Header Section */}
      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-amber-100 p-3 rounded-full mr-3">
            <DollarSign className="w-8 h-8 text-amber-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Crop Marketplace</h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Get real-time crop prices from different markets and find the best deals for your produce
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Find Crop Prices */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Find Crop Prices</h2>

              {/* State Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="state">
                  Select State
                </label>
                <select
                  id="state"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  value={selectedState}
                  onChange={handleStateChange}
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
                <label className="block text-gray-700 font-medium mb-2" htmlFor="district">
                  Select District
                </label>
                <select
                  id="district"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white disabled:bg-gray-100"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedState}
                >
                  <option value="">Choose your district</option>
                  {selectedState &&
                    districts[selectedState]?.map((district) => (
                      <option key={district} value={district}>
                        {district}
                      </option>
                    ))}
                </select>
              </div>

              {/* Crop Dropdown */}
              <div>
                <label className="block text-gray-700 font-medium mb-2" htmlFor="crop">
                  Select Crop
                </label>
                <select
                  id="crop"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white disabled:bg-gray-100"
                  value={selectedCrop}
                  onChange={handleCropChange}
                  disabled={!selectedDistrict}
                >
                  <option value="">Choose your crop</option>
                  {crops.map((crop) => (
                    <option key={crop} value={crop}>
                      {crop}
                    </option>
                  ))}
                </select>
              </div>

              {/* Get Best Price Button */}
              <button
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={!selectedState || !selectedDistrict || !selectedCrop}
                onClick={handleGetPrice}
              >
                Get Best Price
              </button>
            </div>

            {/* Right Column - Price Information */}
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800">Price Information</h2>

              {/* Chart Icon */}
              <div className="bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 p-6 rounded-lg">
                <BarChart3 className="w-16 h-16 text-white" />
              </div>

              <p className="text-gray-600 text-lg leading-relaxed">
                Select your location and crop to get current market prices
              </p>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {mandiResults && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Market Analysis</h3>
            <div className="bg-gray-50 rounded-lg p-4 text-gray-700 whitespace-pre-wrap">{mandiResults}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketplaceBox
