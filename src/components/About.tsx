import React from 'react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">About UniformSnap</h2>
      <p className="mb-4">
        UniformSnap is an innovative app that allows you to try on different uniforms virtually.
        Using your device's camera, you can see how you look in various uniforms in real-time.
      </p>
      <p className="mb-4">
        Features:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Real-time uniform overlay</li>
        <li>Multiple uniform options</li>
        <li>Photo capture and gallery</li>
        <li>Image filters</li>
      </ul>
      <Link to="/" className="text-blue-500 hover:text-blue-700 transition-colors">
        Back to Camera
      </Link>
    </div>
  );
};

export default About;