import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Modal from "./Modal";
import languages from '../assets/languages.json';

const Translate = () => {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [translatedText, setTranslatedText] = useState('');
  const imageURL = useRef(
    "https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg"
  );
  const [modalOpen, setModalOpen] = useState(false);

  const updateImage = (imgSrc) => {
    setTranslatedText('');
    imageURL.current = imgSrc;
  };

  const onFileUpload = async () => {
    if (sourceLanguage === targetLanguage) {
      alert('Source and target languages must be different.');
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    const response = await fetch(imageURL.current);
    const blob = await response.blob();

    if (blob.type === "image/png" || blob.type === "image/jpeg") {
      const file = new File([blob], "image.jpg", { type: blob.type });
      formData.append("myFile", file);
      formData.append("sourceLanguage", sourceLanguage);
      formData.append("targetLanguage", targetLanguage);
      try {
        await axios.post("https://pic-translate-backend.vercel.app/upload", formData);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please select a .png or .jpeg image.');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await axios.get("https://pic-translate-backend.vercel.app/status");
        if (response.data.status === 'Processed') {
          if (response.data.data === '') {
            setTranslatedText('Image was not properly analyzed. Please crop the image to include more of the character to be viewed');
          } else {
            setTranslatedText(response.data.data);
          }
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching status:', error);
        alert('Error fetching translation status. Please try again.');
        setIsLoading(false);
      }
    };

    if (isLoading) {
      const interval = setInterval(fetchStatus, 3000);
      return () => clearInterval(interval);
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl">
        <div className="text-center">
          <h2 className="mt-5 text-3xl font-bold text-gray-900 pb-5">
            Choose an image to Translate!
          </h2>
        </div>
        <div className="mb-4">
          <label className="text-sm font-bold text-gray-500 tracking-wide">Source Language</label>
          <select className="w-full p-2 mt-2 border rounded" value={sourceLanguage} onChange={(e) => setSourceLanguage(e.target.value)}>
            {languages.map((language) => (
              <option key={language.code} value={language.code}>{language.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="text-sm font-bold text-gray-500 tracking-wide">Target Language</label>
          <select className="w-full p-2 mt-2 border rounded" value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
            {languages.map((language) => (
              <option key={language.code} value={language.code}>{language.name}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 space-y-2">
          <label className="text-sm font-bold text-gray-500 tracking-wide">Attach Image</label>
          <div className="flex items-center justify-center w-full">
            <div className="flex flex-col items-center">
              <div className="relative">
                {translatedText ? (
                  <div className="text-center p-4">
                    <p className="text-lg font-medium mb-4">
                      <span className="font-bold underline">Translated Text:</span>
                    </p>
                    <p className="text-lg font-medium">
                      {translatedText}
                    </p>
                  </div>
                ) : (
                  <img src={imageURL.current} alt="Image" />
                )}
                <p className="pointer-none text-gray-500 ">
                  <a className="text-blue-600 hover:underline" onClick={() => setModalOpen(true)}>Select a file</a> from your computer
                </p>
              </div>
              {modalOpen && (<Modal updateImage={updateImage} closeModal={() => setModalOpen(false)} />)}
            </div>
          </div>
        </div>
        <div>
          <button type="button" onClick={onFileUpload} className="my-5 w-full flex justify-center bg-blue-500 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg cursor-pointer transition ease-in duration-300">
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-4 border-white"></div>
                <span className="font-bold"> GIVE ME A MINUTE!</span>
              </div>
            ) : (
              'Translate!'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Translate;
