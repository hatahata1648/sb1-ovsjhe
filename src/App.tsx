import React, { useState } from 'react';
import Camera from './components/Camera';
import Gallery from './components/Gallery';
import Header from './components/Header';
import { Photo } from './types';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const addPhoto = (photo: Photo) => {
    setPhotos((prevPhotos) => [photo, ...prevPhotos]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Camera onCapture={addPhoto} />
        <Gallery photos={photos} />
      </main>
    </div>
  );
}

export default App;