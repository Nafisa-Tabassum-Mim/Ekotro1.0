import React from 'react';

const ContactUs = () => {
 return (
    <div className="bg-[#f5f2fb] min-h-screen py-16 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-6 text-[#9672d6]">Get in Touch</h1>
          <p className="text-gray-600 mb-6">
            Have questions or want to collaborate? Reach out to us through any of the channels below.
          </p>

          {/* Contact Details */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg text-[#5c34a0]">Email</h3>
              <p className="text-gray-700">ekotro@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#5c34a0]">Phone</h3>
              <p className="text-gray-700">+880 1234 567890</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg text-[#5c34a0]">Follow Us</h3>
              <div className="flex space-x-4 mt-2">
                <a href="#" className="text-[#9672d6] hover:text-[#5c34a0]">Twitter</a>
                <a href="#" className="text-[#9672d6] hover:text-[#5c34a0]">LinkedIn</a>
                <a href="#" className="text-[#9672d6] hover:text-[#5c34a0]">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links & Events */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-[#9672d6]">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-lg text-[#5c34a0] mb-3">Quick Links</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#upcoming" className="hover:text-[#9672d6]">Upcoming Event</a></li>
                <li><a href="#internship" className="hover:text-[#9672d6]">Internship</a></li>
                <li><a href="#funding" className="hover:text-[#9672d6]">Funding</a></li>
                <li><a href="#about" className="hover:text-[#9672d6]">About</a></li>
                <li><a href="#get-started" className="hover:text-[#9672d6]">Get Started</a></li>
              </ul>
            </div>

            {/* Events */}
            <div>
              <h3 className="font-semibold text-lg text-[#5c34a0] mb-3">Highlighted Events</h3>
              <ul className="space-y-2 text-gray-700">
                <li><a href="#event1" className="hover:text-[#9672d6]">NEXT EVENT: Student Collaboration</a></li>
                <li><a href="#event2" className="hover:text-[#9672d6]">Hackathon & Workshops</a></li>
                <li><a href="#event3" className="hover:text-[#9672d6]">Project Showcase</a></li>
                <li><a href="#event4" className="hover:text-[#9672d6]">Funding Opportunities</a></li>
              </ul>
            </div>

          </div>
        </div>

      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center text-gray-500 text-sm">
        &copy; 2025 EKOTRO1.0. All rights reserved.
      </div>
    </div>
  );
};
export default ContactUs;