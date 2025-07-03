import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-white text-xl font-bold">MyWebsite</div>
      <div className="space-x-4">
        <a href="#" className="text-gray-300 hover:text-white">Home</a>
        <a href="#" className="text-gray-300 hover:text-white">About</a>
        <a href="#" className="text-gray-300 hover:text-white">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;