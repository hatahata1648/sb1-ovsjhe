import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { Camera as CameraIcon, Image, Sliders } from 'lucide-react';
import { Photo } from '../types';

interface CameraProps {
  onCapture: (photo: Photo) => void;
}

const Camera: React.FC<CameraProps> = ({ onCapture }) => {
  const webcamRef = useRef<Webcam>(null);
  const [selectedUniform, setSelectedUniform] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('');

  const uniforms = [
    '/uniforms/uniform1.png',
    '/uniforms/uniform2.png',
    '/uniforms/uniform3.png',
    '/uniforms/uniform4.png',
  ];

  const filters = [
    { name: 'None', value: '' },
    { name: 'Sepia', value: 'sepia(100%)' },
    { name: 'Grayscale', value: 'grayscale(100%)' },
    { name: 'Vintage', value: 'contrast(110%) brightness(110%) sepia(30%)' },
  ];

  const capturePhoto = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      const photo: Photo = {
        id: Date.now(),
        src: imageSrc,
        uniform: selectedUniform,
        filter,
      };
      onCapture(photo);
    }
  };

  return (
    <div className="mb-8">
      <div className="relative aspect-w-16 aspect-h-9">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-lg shadow-lg object-cover w-full h-full"
          style={{ filter }}
          videoConstraints={{ facingMode: 'environment' }}
        />
        {selectedUniform && (
          <img
            src={selectedUniform}
            alt="Uniform overlay"
            className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
          />
        )}
        <div className="absolute top-4 left-4 right-4 flex justify-center space-x-2">
          <button
            onClick={() => setSelectedUniform(null)}
            className="bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-colors"
          >
            <Image size={20} className="text-gray-800" />
          </button>
          {uniforms.map((uniform, index) => (
            <button
              key={index}
              onClick={() => setSelectedUniform(uniform)}
              className="bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-colors"
            >
              <img src={uniform} alt={`Uniform ${index + 1}`} className="w-6 h-6" />
            </button>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <button
          onClick={capturePhoto}
          className="bg-pink-500 text-white px-6 py-2 rounded-full flex items-center justify-center w-full sm:w-auto hover:bg-pink-600 transition-colors"
        >
          <CameraIcon className="mr-2" size={20} />
          Capture
        </button>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Sliders size={20} className="text-gray-600" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded-md px-2 py-1 w-full sm:w-auto"
          >
            {filters.map((f) => (
              <option key={f.name} value={f.value}>
                {f.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Camera;