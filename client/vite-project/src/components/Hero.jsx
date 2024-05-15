import React, { useState } from 'react';
import ReactCountryFlag from "react-country-flag";
import { Link as ScrollLink } from 'react-scroll'; // import the ScrollLink component
import logoImage from '../assets/logo.png';
import backgroundImage from '../assets/background.jpg'; // Import your background image

const Hero = () => {
    //State Hook for the Flags
    const [selectedFlag, setSelectedFlag] = useState(0);
    const flags = ['US', 'FR', 'ES', 'IT', 'DE']; // Add more flags as needed
    const greetings = {
        'US': 'Translate Images!',
        'FR': 'Traduisez des images !',
        'ES': '¡Traduce imágenes!',
        'IT': 'Traduci le immagini!',
        'DE': 'Bilder übersetzen!',
    };

    const nextFlag = () => {
        //moves index of which flag is currently selected
        setSelectedFlag((selectedFlag + 1) % flags.length);
    };

    const prevFlag = () => {
        setSelectedFlag((selectedFlag - 1 + flags.length) % flags.length);
    };

    return (
        <div id="home" className="hero min-h-screen flex flex-col items-center p-4 pb-2 transition duration-500 ease-in-out z-20"
             style={{ 
                backgroundImage: `url(${backgroundImage})`, 
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
             }}
        >
            <button className="focus:outline-none logo pt-12">
                <img src={logoImage} alt="PicTranslate Logo" className="w-auto h-60 transition duration-300 ease-in-out" />
            </button>
            <div className="flex space-x-2 my-4">
                <button onClick={prevFlag} className="bg-white px-3 py-1 rounded-full shadow-lg font-bold text-sky-500 hover:bg-sky-100 transition duration-300 ease-in-out">←</button>
                {/* Creating the Carousel of flags*/}
                <div className="flex justify-center items-center">
                    <ReactCountryFlag countryCode={flags[(selectedFlag - 1 + flags.length) % flags.length]} svg style={{ width: '2em', height: '2em', opacity: 0.5 }} />
                    <ReactCountryFlag countryCode={flags[selectedFlag]} svg style={{ width: '8em', height: '8em' }} title={greetings[flags[selectedFlag]]} className="mx-4" />
                    <ReactCountryFlag countryCode={flags[(selectedFlag + 1) % flags.length]} svg style={{ width: '2em', height: '2em', opacity: 0.5 }} />
                </div>
                <button onClick={nextFlag} className="bg-white px-3 py-1 rounded-full shadow-lg font-bold text-sky-500 hover:bg-sky-100 transition duration-300 ease-in-out">→</button>
            </div>
            <p className="text-3xl font-semibold animate-bounce py-2 px-4 rounded-lg drop-shadow-[0_1.2px_3px_rgba(0,0,0,0.8)] text-white">{greetings[flags[selectedFlag]]}</p>
            <div className="flex space-x-4 mt-4">
                {/*Added scroll Link Feature*/}
                <ScrollLink to="about" smooth={true} duration={500} className="bg-gray-200 px-6 py-3 rounded-full shadow-lg font-bold text-gray-700 hover:bg-gray-300 transition duration-300 ease-in-out">About</ScrollLink>
                <ScrollLink to="translate" smooth={true} duration={500} className="bg-gray-200 px-6 py-3 rounded-full shadow-lg font-bold text-gray-700 hover:bg-gray-300 transition duration-300 ease-in-out">Translate</ScrollLink>
            </div>
        </div>
    );
};

export default Hero;
