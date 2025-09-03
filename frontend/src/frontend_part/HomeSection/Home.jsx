import React from 'react';
import Navbar from '../../components/Navbar';

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Navbar on top */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover object-top"
        src="/images/video.mp4" // inside public/images/
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Gradient Overlay (lighter, no extra black) */}
      <div className="absolute inset-0 "></div>

      {/* Hero Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
        <div className="max-w-3xl">
          <h1 className="text-2xl md:text-3xl md:mt-16 font-bold mb-6">
            NEXT <a className=' text-[#5c34a0]'>EVENT</a> <br /> STUDENT COLLABORATION
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
