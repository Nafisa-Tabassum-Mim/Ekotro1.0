import React from 'react';
import Navbar from '../../components/Navbar';
import { NavLink } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import Section2 from './Section2';
import Footer from './Footer';

const Home = () => {
    return (
        <div>
            <div className="relative h-screen overflow-hidden">
                {/* Navbar*/}
                <div className="absolute top-0 left-0 w-full z-20">
                    <Navbar />
                </div>

                {/* Background Video */}
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover object-top"
                    src="/images/video.mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                />

                <div className="absolute inset-0 "></div>

                {/* Hero Content */}
                <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-6">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl md:mt-16 font-bold mb-6 text-[#461992]">
                            NEXT STUDENT<a className=' text-white'> EVENT</a>  COLLABORATION
                        </h1>
                        <p className='playfair-display text-xl'>Join us at the EKOTRO1.0 for an exhilarating journey into innovation and collaboration!</p>

                        <div className="flex my-6 flex-col md:flex-row  justify-evenly">

                            <input
                                type="text"
                                placeholder="Apply for funding..."
                                className="px-4 py-3 rounded-lg border border-[#5c34a0] focus:ring-2 focus:ring-[#5c34a0] focus:outline-none w-full md:w-64"
                                readOnly
                            />

                            <input
                                type="text"
                                placeholder="Join in our events..."
                                className="px-4 py-3 rounded-lg border bg-gradient-to-r from-[#5c34a0] via-[#3b82f6] to-[#9baee2]  w-full md:w-64" readOnly
                            />
                        </div>
                    </div>
                </div>


            </div>
            <div>
                {/* section 1 */}

                {/* section 2 */}
                <Section2></Section2>
                {/* footer  */}
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;
