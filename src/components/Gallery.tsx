import React, { useState } from 'react';
import { Photo } from '../types';
import { Move, X } from 'lucide-react';

interface GalleryProps {
  photos: Photo[];
}

const Gallery: React.FC<GalleryProps> = ({ photos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setTransform({ x: 0, y: 0, scale: 1 });
  };

  const handleClose = () => {
    setSelectedPhoto(null);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setStartPos({ x: clientX - transform.x, y: clientY - transform.y });
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (isDragging) {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setTransform({
        ...transform,
        x: clientX - startPos.x,
        y: clientY - startPos.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const newScale = transform.scale - e.deltaY * 0.01;
    setTransform({
      ...transform,
      scale: Math.max(0.1, Math.min(newScale, 5)),
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative cursor-pointer aspect-w-1 aspect-h-1" onClick={() => handlePhotoClick(photo)}>
            <img
              src={photo.src}
              alt={`Photo ${photo.id}`}
              className="w-full h-full object-cover rounded-lg shadow-md"
              style={{ filter: photo.filter }}
            />
            {photo.uniform && (
              <img
                src={photo.uniform}
                alt="Uniform overlay"
                className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
              />
            )}
          </div>
        ))}
      </div>
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="absolute inset-0 flex items-center justify-center"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              onWheel={handleWheel}
            >
              <img
                src={selectedPhoto.src}
                alt="Selected photo"
                className="max-w-full max-h-full object-contain"
                style={{
                  filter: selectedPhoto.filter,
                  transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                }}
              />
              {selectedPhoto.uniform && (
                <img
                  src={selectedPhoto.uniform}
                  alt="Uniform overlay"
                  className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
                  style={{
                    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                  }}
                />
              )}
            </div>
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 bg-white bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-colors"
            >
              <X size={24} className="text-gray-800" />
            </button>
            <div className="absolute bottom-4 left-4 bg-white bg-opacity-70 px-3 py-1 rounded-full flex items-center">
              <Move size={20} className="mr-2" />
              <span className="text-sm">Move and zoom</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;