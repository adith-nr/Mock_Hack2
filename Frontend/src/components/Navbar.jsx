"use client"
import { useNavigate } from "react-router-dom"

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <nav className="w-full bg-gradient-to-r from-green-600 to-blue-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/home")}>
            <span className="text-2xl mr-2">🌱</span>
            <span className="text-white text-xl font-bold">PlantScan</span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <button
                onClick={() => navigate("/home")}
                className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Home
              </button>
              <button
                onClick={() => navigate("/scan")}
                className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Plant Scanner
              </button>
              <button
                onClick={() => navigate("/marketplace")}
                className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Marketplace
              </button>
              <button
                onClick={() => navigate("/schemes")}
                className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200"
              >
                Schemes
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-md">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
