import React from 'react';

const AboutPage = () => {
  return (
    <div className="py-10 px-4 min-h-[calc(100vh-80px)] flex flex-col justify-center items-center bg-gradient-to-br from-lime-50 to-emerald-100 dark:from-gray-900 dark:to-green-950 transition-colors duration-500">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-2">
          About BloomWatch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Our mission is to empower global environmental awareness.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 max-w-4xl w-full border-4 border-yellow-300 dark:border-green-600">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          BloomWatch is a community-driven platform built to track and visualize environmental phenomena. We use cutting-edge technology to create a dynamic database of changes in our planet's flora and fauna, empowering researchers and citizens alike to make informed decisions.
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          By contributing to BloomWatch, you become part of a global effort to document and protect our natural resources. Join us in building a healthier future for our planet.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;