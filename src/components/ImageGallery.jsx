import React, {useState} from 'react';

import { Transition } from '@headlessui/react';
import { useLocation } from 'react-router-dom';

export default function ImageGallery(props) {
  let  location = useLocation();
  let images = location.state.data.gallery
  let title = location.state.data.title
  let description = location.state.data.description

  const [selectedImageIndex, setSelectedImageIndex] = useState(-1);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleCloseClick = () => {
    setSelectedImageIndex(-1);
  };

  console.log(props, " props");
  console.log(location, " useLocation Hook");
  console.log(images);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-900">
      <header className="bg-gray-900 text-white shadow-md py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-gray-300">{description}</p>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="rounded-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out overflow-hidden aspect-w-1 aspect-h-1 cursor-pointer"
              onClick={() => handleImageClick(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-center object-cover"
              />
            </div>
          ))}
        </div>
      </main>
      <Transition
        show={selectedImageIndex !== -1}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={handleCloseClick}
        >
          <div className="bg-gray-900 absolute inset-0 opacity-75"></div>
          <div className="relative">
            <button
              className="absolute top-0 right-0 m-4 text-white font-bold text-xl cursor-pointer"
              onClick={handleCloseClick}
            >
              X
            </button>
            <img
              src={selectedImageIndex !== -1 ? images[selectedImageIndex].src : ''}
              alt={selectedImageIndex !== -1 ? images[selectedImageIndex].alt : ''}
              className="max-w-30 max-h-30 object-center object-cover"
            />
          </div>
        </div>
      </Transition>
    </div>
  );
};

