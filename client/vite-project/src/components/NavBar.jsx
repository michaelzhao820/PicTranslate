import React from 'react';
import { Link as ScrollLink } from 'react-scroll'; // import the ScrollLink component

const NavBar = () => {
    return (
        <>
          <nav className="fixed w-full top-0 flex items-center justify-between pr-10 py-4 px-6 bg-sky-950 shadow-md transition duration-500 ease-in-out z-20">
            <div className="flex items-center space-x-4">
            {/* <img src="logo.png" alt="Logo" className="w-8 h-8"/> */}
            <div className="text-white text-2xl font-semibold font-bold">PicTranslate</div>
          </div>
          <div className="flex space-x-4">
            <ScrollLink to="home" smooth={true} duration={500} className="text-white hover:bg-pink-300 px-3 py-2 rounded font-bold">Home</ScrollLink> 
            <ScrollLink to="about" smooth={true} duration={500} className="text-white hover:bg-pink-300 px-3 py-2 rounded font-bold">About</ScrollLink>
            <ScrollLink to="translate" smooth={true} duration={500} className="text-black bg-white hover:bg-gray-200 px-3 py-2 rounded font-bold">Translate</ScrollLink> 
           </div>
        </nav>
        </>
    );  
}
export default NavBar;
