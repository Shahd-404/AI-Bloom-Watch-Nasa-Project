'use client';

import Link from 'next/link';
import LeafletMap from '../components/map';
import { LayoutDashboard } from 'lucide-react';

export default function AddBloomPage() {
  return (
    <main className="font-[Poppins] bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          BloomWatch: <span className="text-pink-500">The Pulse of Earth's Vegetation</span>
        </h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Join the global citizen science effort. Track when, where, and how Earth's plants bloom
          to predict harvests and manage ecosystems.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <a href="#form" className="btn-main bg-yellow-400 px-6 py-3 rounded-lg font-semibold">Add Your Observation</a>
          <a href="#features" className="btn-main bg-gray-200 dark:bg-gray-700 px-6 py-3 rounded-lg font-semibold">Features</a>
        </div>
      </section>

      {/* Cards Section */}
      <section id="features" className="py-12 px-6 bg-white dark:bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-10">What You Can Do</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
            <img src="/image1.jpg" alt="Observation" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Ground Truth Observation</h3>
              <p>Document plant bloom presence, color, and coverage in your local area.</p>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
            <img src="/image2.jpg" alt="AI" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">AI Analysis & Forecasting</h3>
              <p>We combine your reports with NASA satellite imagery and AI for real-time bloom detection.</p>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md">
            <img src="/image3.jpg" alt="Impact" className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-bold text-lg">Actionable Insights</h3>
              <p>Our data translates into practical solutions for Agriculture, Environment, and Health.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Observation Form + Map */}
      <section id="form" className="py-16 px-6 grid md:grid-cols-2 gap-10">
        {/* Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Submit New Bloom Observation</h2>
          <form className="space-y-4">
            <div>
              <label className="block mb-1">Bloom Type / Plant Species</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg text-gray-900"
                placeholder="e.g., Cotton Crop, Wildflower"
              />
            </div>
            <div>
              <label className="block mb-1">Observed Bloom Color</label>
              <select className="w-full px-3 py-2 border rounded-lg text-gray-900">
                <option>Blue</option>
                <option>Purple</option>
                <option>Green</option>
                <option>Orange</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Percent Surface Coverage (%)</label>
              <input type="range" min="0" max="100" className="w-full" />
            </div>
            <div>
              <label className="block mb-1">Upload Photo</label>
              <input type="file" className="w-full" multiple />
            </div>
            <div>
              <label className="block mb-1">Location</label>
              <input type="text" placeholder="Latitude, Longitude" className="w-full px-3 py-2 border rounded-lg text-gray-900" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block mb-1">Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-lg text-gray-900" />
              </div>
              <div className="flex-1">
                <label className="block mb-1">Time</label>
                <input type="time" className="w-full px-3 py-2 border rounded-lg text-gray-900" />
              </div>
            </div>
            <div>
              <label className="block mb-1">Notes</label>
              <textarea className="w-full px-3 py-2 border rounded-lg text-gray-900"></textarea>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="pledge" />
              <label htmlFor="pledge">I pledge to contribute accurate bloom data</label>
            </div>
            <div className="flex gap-4">
              <button type="button" className="px-4 py-2 bg-gray-400 rounded-lg">Save Draft</button>
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">Submit</button>
            </div>
          </form>
        </div>

        {/* Map */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Live Bloom Map</h2>
          <LeafletMap />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-200 py-6 text-center">
        <p>NASA + BloomWatch</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-facebook"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
      </footer>
    </main>
  );
}
