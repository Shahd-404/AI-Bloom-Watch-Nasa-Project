import { Flower } from 'lucide-react';
import React from 'react';

const AboutPage = () => {
  return (
    <div className="py-10 px-4 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-lime-50 to-emerald-100 dark:from-gray-900 dark:to-green-950 transition-colors duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
          About BloomTrack
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Our mission is to bridge the gap between space science and everyday needs, empowering individuals and communities to make informed decisions for our planet.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-4xl w-full border-4 border-yellow-300 dark:border-green-600">
        <ul className="list-disc list-inside space-y-4 text-lg text-gray-700 dark:text-gray-300">
          <li>
            <strong className="font-bold">AI-Powered Insights:</strong> <strong>BloomTrack</strong> is an AI-powered platform that transforms raw NASA satellite data from <strong>Landsat</strong> and <strong>Sentinel-2</strong> into actionable insights about plant life. Our deep learning model accurately detects and predicts blooming events in regions like <strong>California and Brazil</strong>.
          </li>
          <li>
            <strong className="font-bold">Actionable Data:</strong> We provide valuable, timely information to <strong>farmers, scientists, and the general public</strong>, visualized on an interactive map.
          </li>
          <li>
            <strong className="font-bold">Community-Driven Approach:</strong> What truly sets us apart is our "Add Your Bloom" feature, which enables citizen scientists to upload real-world observations.
          </li>
          <li>
            <strong className="font-bold">Continuous Improvement:</strong> This vital data creates a powerful feedback loop that continuously enhances our model's accuracy, ensuring our platform is a collaborative tool for environmental protection.
          </li>
        </ul>
      </div>
      
      {/* هنا يبدأ الكود الجديد لإضافة صورة الفريق.
        تأكد من استبدال الرابط داخل الـ "src"
      */}
      <div className="text-center mt-16 max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-6">
          Meet the Team
        </h2>
        <img
          src="/Black and White Fun Meet the Team Facebook Post.png"
          alt="A photo of the BloomTrack development team"
          className="w-full h-auto rounded-3xl shadow-2xl border-4 border-yellow-300 dark:border-green-600"
        />
      </div>
<footer className="w-full bg-[#f0fdf4] text-gray-800 py-12 mt-20 rounded-t-3xl border-t-4 border-[#d4f9d8] animate-fadeIn delay-1000">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center justify-center md:justify-start">
              <Flower size={32} className="text-[#FDD835] mr-2 transition-colors duration-300 hover:text-yellow-500" />
              <h3 className="text-2xl font-bold main-logo-text">
                <span className="text-[#32CD32]">Bloom</span><span className="text-gray-800">Track</span>
              </h3>
            </div>
            <p className="mt-4 text-sm max-w-sm">
              Tracking the pulse of our planet, one bloom at a time. Join us in monitoring Earth's natural cycles and contributing to a greener future.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6 md:gap-x-12 md:gap-y-0 text-sm">
            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">Platform</h4>
              <a href="/map" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Map</a>
              <a href="/dashboard" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Dashboard</a>
              <a href="/data" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Data & APIs</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">About Us</h4>
              <a href="/about" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Our Mission</a>
              <a href="/team" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Team</a>
              <a href="/contact" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Contact</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">Resources</h4>
              <a href="/blog" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Blog</a>
              <a href="/research" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Research</a>
              <a href="/faq" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">FAQ</a>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <h4 className="font-semibold text-gray-900 mb-2">Connect</h4>
              <a href="#" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">Twitter</a>
              <a href="#" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">LinkedIn</a>
              <a href="#" className="hover:underline hover:text-[#FDD835] transition-colors duration-200">GitHub</a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#d4f9d8] text-center text-xs text-gray-600">
          &copy; 2025 BloomTrack. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;