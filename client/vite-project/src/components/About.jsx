import React from 'react';
import familyImage from '../assets/family.jpg';

const About = () => {
    return (
            <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-4">
            
            {/* Content Section */}
            <div className="flex flex-row items-center justify-center space-x-8">
                
                {/* Image Section */}
                <div className="flex flex-col items-center">
                    <img src={familyImage} alt="Family" className="rounded-lg shadow-xl w-80 h-100" loading="lazy"/>
                    <p className="italic text-gray-600 mt-4">me and my family</p>
                </div>
                
                {/* Note Section */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">a note about PicTranslate</h2>
                    <p className="text-sm text-gray-600">
                        i was born and raised here in america, and grew up pretty oblivious to my heritage. being chinese was an afterthought,
                        nothing important to me. embarrassingly, i took this attitude with pride all the way up till learning my grandpa had written
                        an autobiography. it hurts, feeling disconnected with family because of stubbornness. that's why i wrote this image translator
                        software, as baby steps for me to getting closer to my family. i hope that this code brings you closer to your goals as it has mine.       
                    </p>
                </div>
                
            </div>
        </div>
    );
};

export default About;
