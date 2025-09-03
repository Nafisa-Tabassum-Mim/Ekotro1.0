import React from 'react';

const Footer = () => {
    return (
       <footer className="bg-[#ece5f8b4] story-script-regular text-xl text-[#9672d6] pt-16 py-6 px-6">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    {/* Logo & About */}
    <div>
      <h2 className="text-2xl font-bold mb-4">EKOTRO1.0</h2>
      <p className="text-gray-400">
        Join us for an exhilarating journey into innovation, collaboration, and student projects.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="#upcoming" className="hover:text-[#5c34a0]">Upcoming Event</a></li>
        <li><a href="#internship" className="hover:text-[#5c34a0]">Internship</a></li>
        <li><a href="#funding" className="hover:text-[#5c34a0]">Funding</a></li>
        <li><a href="#about" className="hover:text-[#5c34a0]">About</a></li>
        <li><a href="#get-started" className="hover:text-[#5c34a0]">Get Started</a></li>
      </ul>
    </div>

    {/* Events */}
    <div>
      <h3 className="text-xl font-semibold mb-4">All Events</h3>
      <ul className="space-y-2 text-gray-400">
        <li><a href="#event1" className="hover:text-[#5c34a0]">NEXT EVENT: Student Collaboration</a></li>
        <li><a href="#event2" className="hover:text-[#5c34a0]">Hackathon & Workshops</a></li>
        <li><a href="#event3" className="hover:text-[#5c34a0]">Project Showcase</a></li>
        <li><a href="#event4" className="hover:text-[#5c34a0]">Funding Opportunities</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div>
      <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
      <p className="text-gray-400 mb-2">Email: ekotro@gmail.com</p>
      <p className="text-gray-400 mb-2">Phone: +880 1234 567890</p>
      <div className="flex space-x-4 mt-4">
        <a href="#" className="hover:text-[#5c34a0]">Twitter</a>
        <a href="#" className="hover:text-[#5c34a0]">LinkedIn</a>
        <a href="#" className="hover:text-[#5c34a0]">Instagram</a>
      </div>
    </div>
  </div>

  {/* Footer Bottom */}
  <div className="mt-16 border-t border-gray-800 pt-4 text-center text-gray-500 text-md">
    &copy; 2025 EKOTRO1.0. All rights reserved.
  </div>
</footer>

    );
};

export default Footer;