import React from 'react';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-center sm:justify-start">
        <Camera size={32} className="mr-2" />
        <h1 className="text-2xl font-bold">UniformSnap</h1>
      </div>
    </header>
  );
};

export default Header;