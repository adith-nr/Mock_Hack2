"use client"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Smart Farming Made Simple</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Diagnose plant diseases, check crop prices, and access government schemes - all in one place
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/scan")}
                className="bg-white text-green-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                🔍 Scan Your Plant
              </button>
              <button
                onClick={() => navigate("/marketplace")}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-green-600 transform transition-all duration-200 hover:scale-105"
              >
                💰 Check Prices
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Everything You Need for Smart Farming</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform helps farmers make informed decisions and maximize their crop yields
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Plant Scanner Card */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-green-100"
              onClick={() => navigate("/scan")}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Plant Disease Scanner</h3>
                <p className="text-gray-600 mb-6">
                  Upload photos of your plants and get instant AI-powered disease diagnosis with treatment
                  recommendations.
                </p>
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200">
                  Start Scanning
                </button>
              </div>
            </div>

            {/* Marketplace Card */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-100"
              onClick={() => navigate("/marketplace")}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-blue-400 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Crop Marketplace</h3>
                <p className="text-gray-600 mb-6">
                  Get real-time crop prices from different markets and find the best deals for your produce.
                </p>
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200">
                  Check Prices
                </button>
              </div>
            </div>

            {/* Government Schemes Card */}
            <div
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-purple-100 md:col-span-2 lg:col-span-1"
              onClick={() => navigate("/schemes")}
            >
              <div className="text-center">
                <div className="bg-gradient-to-r from-purple-400 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl">📋</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Government Schemes</h3>
                <p className="text-gray-600 mb-6">
                  Discover and apply for government schemes and subsidies available for farmers in your region.
                </p>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-200">
                  View Schemes
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid  gap-8 text-center text-3xl font-bold mb-2 opacity-65">
          Empowering Farmers, Cultivating the Future.
          </div>
        </div>
      </section>
    </div>
  )
}

export default LandingPage
