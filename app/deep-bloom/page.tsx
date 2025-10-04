// app/deep-bloom/page.tsx

"use client";

import React, { useState } from "react";
// 🌟 تم إضافة استيراد IndexCalculator
import IndexCalculator from "../components/IndexCalculator";
import {
  Leaf,
  Palette,
  Zap,
  Flower,
  Scan,
  Microscope,
  Target,
  LineChart,
  TrendingUp,
  Sun,
} from "lucide-react";


type ModalContent = {
  imageSrc: string;
  altText: string;
} | null;

const DeepBloomPage = () => {
  const [modalContent, setModalContent] = useState<ModalContent>(null);

  const handleImageClick = (imageSrc: string, altText: string) => {
    setModalContent({ imageSrc, altText });
  };

  function handleCloseModal() {
    setModalContent(null);
  }

  // Color Palette Definitions
  const PrimaryGreen = "#32CD32"; // Lime Green
  const AccentYellow = "#fdd835"; // Yellow
  const SectionBg = "#f0fdf4"; // Very light mint/green for sections
  const SectionBorder = "#d4f9d8"; // Lighter mint/green for borders
  const AnthocyaninViolet = "#800080"; // Deep Purple
  const IndexAccentColor = "#2563eb"; // Blue for EVI

  return (
    <div
      className="min-h-screen bg-white transition-colors duration-500"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');
        .font-sans, h1, h2, h3, h4, p, a {
          font-family: 'Poppins', sans-serif;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out;
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-pulse-custom {
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-custom {
          animation: bounce 2s infinite;
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-wiggle {
          animation: wiggle 1s ease-in-out infinite;
        }
        .plant-lifecycle-item:hover {
          transform: scale(1.05);
        }
        html, body {
          background-color: white !important;
        }
      `}</style>

      {modalContent && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl font-bold p-2"
              onClick={handleCloseModal}
            >
              &times;
            </button>
            <img
              src={modalContent.imageSrc}
              alt={modalContent.altText}
              className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            />
          </div>
        </div>
      )}

      <main className="container mx-auto px-4 md:px-8">
        {/* 1. The Science of Deep Bloom Section */}
        <section
          id="nasa-tech"
          className="mt-16 w-full mb-16 p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl border-4 animate-fadeIn transition-all duration-500 group"
          style={{
            backgroundColor: SectionBg,
            borderColor: SectionBorder,
            boxShadow: `0 0 40px var(--shadow-color, rgba(0, 0, 0, 0.1))`,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
            The Science of{" "}
            <span style={{ color: PrimaryGreen }}>Deep Bloom</span>: How We
            Track Blooms
          </h2>
          <p className="text-center text-lg text-gray-700 max-w-5xl mx-auto mb-12">
            We leverage NASA-inspired remote sensing methodologies to analyze
            spectral data from satellites and aircraft, tracking changes in
            vegetation and predicting bloom cycles.
          </p>
          <div className="mb-12 w-full max-w-7xl mx-auto">
            <img
              src="/Gemini_Generated_Image_byze1obyze1obyze.png"
              alt="Illustration of an imaging spectrometer measuring light reflection from the air"
              onClick={() =>
                handleImageClick(
                  "/Gemini_Generated_Image_byze1obyze1obyze.png",
                  "Illustration of an imaging spectrometer measuring light reflection from the air"
                )
              }
              className="w-full h-auto rounded-xl shadow-xl border-4 cursor-pointer transition-transform duration-300 hover:scale-105"
              style={{ borderColor: SectionBorder }}
            />
            <p className="text-center text-sm text-gray-500 mt-3 italic">
              Conceptual visualization of hyperspectral remote sensing. (Source:
              <a
                href="https://www.jpl.nasa.gov/news/nasa-takes-to-the-air-to-study-wildflowers/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 "
              >
                {" "}
                NASA/JPL: NASA Takes to the Air to Study Wildflowers
              </a>
              )
            </p>
          </div>

          <div className="flex flex-row flex-nowrap justify-start md:justify-center gap-10 overflow-x-auto py-4">
            {/* Card 1: Data Collection */}
            <div
              className="group p-6 bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-96 h-[550px] flex-shrink-0 flex flex-col justify-between"
              style={{ borderColor: SectionBorder }}
            >
              <div>
                <Microscope
                  size={40}
                  className="mb-4 transition-transform duration-300 group-hover:scale-125"
                  style={{ color: PrimaryGreen }}
                />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  1. Data Collection
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  We use an **imaging spectrometer** (like AVIRIS-NG) to collect
                  data. This tool divides light into over 200 bands, revealing
                  chemical information invisible to the naked eye.
                </p>
              </div>
              <div
                className="w-full h-48 rounded-lg overflow-hidden border-2 shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() =>
                  handleImageClick(
                    "/Gemini_Generated_Image_byze1obyze1obyze (1).png",
                    "Visual representation of a light spectrum graph"
                  )
                }
                style={{ borderColor: PrimaryGreen }}
              >
                <img
                  src="/Gemini_Generated_Image_byze1obyze1obyze (1).png"
                  alt="Visual representation of a light spectrum graph"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card 2: Spectral Signature Analysis */}
            <div
              className="group p-6 bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-96 h-[550px] flex-shrink-0 flex flex-col justify-between"
              style={{ borderColor: SectionBorder }}
            >
              <div>
                <Scan
                  size={40}
                  className="mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ color: AccentYellow }}
                />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  2. Spectral Signature Analysis
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  Every flowering stage has a **unique spectral fingerprint**.
                  Our Machine Learning algorithms match the satellite data to
                  these known signatures, providing accurate bloom status.
                </p>
              </div>

              <div
                className="w-full h-48 rounded-lg overflow-hidden border-2 shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() =>
                  handleImageClick(
                    "/Gemini_Generated_Image_i5h7cdi5h7cdi5h7.png",
                    "A visual of a plant's unique spectral signature curve"
                  )
                }
                style={{ borderColor: PrimaryGreen }}
              >
                <img
                  src="/Gemini_Generated_Image_i5h7cdi5h7cdi5h7.png"
                  alt="A visual of a plant's unique spectral signature curve"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Card 3: Phenological Prediction */}
            <div
              className="group p-6 bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-xl w-96 h-[550px] flex-shrink-0 flex flex-col justify-between"
              style={{ borderColor: SectionBorder }}
            >
              <div>
                <Target
                  size={40}
                  className="mb-4 transition-transform duration-300 group-hover:rotate-12"
                  style={{ color: PrimaryGreen }}
                />
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  3. Phenological Prediction
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  We track **phenological shifts** globally, turning complex
                  spectral data into simple, actionable insights for climate
                  research, agriculture, and ecosystem management.
                </p>
              </div>

              <div
                className="w-full h-48 rounded-lg overflow-hidden border-2 shadow-xl cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                onClick={() =>
                  handleImageClick(
                    "/Gemini_Generated_Image_wa5g8cwa5g8cwa5g.png",
                    "Graphic showing a calendar or timeline with plant growth"
                  )
                }
                style={{ borderColor: PrimaryGreen }}
              >
                <img
                  src="/Gemini_Generated_Image_wa5g8cwa5g8cwa5g.png"
                  alt="Graphic showing a calendar or timeline with plant growth"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 2. Color Keys: Hidden Chemistry Section */}
        <section
          id="chemical-fingerprints"
          className="mt-16 w-full mb-16 p-8 md:p-12 lg:p-16 bg-white rounded-3xl shadow-2xl border-4 animate-fadeIn transition-all duration-500"
          style={{ borderColor: SectionBorder, backgroundColor: SectionBg }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
            Color Keys: How the Spectrometer Reads the Hidden Chemistry of
            Blooms
          </h2>
          <p className="text-center text-lg text-gray-700 max-w-5xl mx-auto mb-12">
            Every color is a result of unique chemical pigments, analyzed by the
            spectrometer to determine the precise bloom stage, even before the
            human eye can see it.
          </p>

          <div className="mb-12 w-full max-w-md mx-auto">
            <img
              src="/Gemini_Generated_Image_43ohfd43ohfd43oh.png"
              alt="A compact field spectrometer device used for measuring plant spectra"
              onClick={() =>
                handleImageClick(
                  "/Gemini_Generated_Image_43ohfd43ohfd43oh.png",
                  "A compact field spectrometer device used for measuring plant spectra"
                )
              }
              className="w-full h-auto rounded-xl shadow-xl border-4 cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
              style={{ borderColor: AccentYellow }}
            />
            <p className="text-center text-sm text-gray-500 mt-3 italic">
              Conceptual visualization of hyperspectral remote sensing. (Source:
              <a
                href="https://www.jpl.nasa.gov/news/nasa-takes-to-the-air-to-study-wildflowers/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 "
              >
                {" "}
                NASA/JPL: NASA Takes to the Air to Study Wildflowers
              </a>
              )
            </p>
          </div>

          <div className="flex flex-row flex-nowrap justify-start md:justify-center gap-8 overflow-x-auto py-4">
            {/* Plant Lifecycle Card 1: Chlorophyll */}
            <div
              className="plant-lifecycle-item group p-6 bg-gray-50 rounded-2xl shadow-xl border-2 transition-all duration-300 w-80 flex-shrink-0 text-center"
              style={{
                borderColor: SectionBorder,
              }}
            >
              <Leaf
                size={48}
                className="mx-auto mb-4 animate-bounce-custom"
                style={{ color: PrimaryGreen, animationDuration: "3s" }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Chlorophyll (Green): Plant Health
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Monitoring **chlorophyll absorption** (green matter) determines
                plant health and estimates biomass, the crucial pre-bloom growth
                stage.
              </p>
            </div>

            {/* Plant Lifecycle Card 2: Carotenoids */}
            <div
              className="plant-lifecycle-item group p-6 bg-gray-50 rounded-2xl shadow-xl border-2 transition-all duration-300 w-80 flex-shrink-0 text-center"
              style={{
                borderColor: SectionBorder,
              }}
            >
              <Palette
                size={48}
                className="mx-auto mb-4 animate-pulse-custom"
                style={{ color: AccentYellow, animationDuration: "2.5s" }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Carotenoids: Bud Signal
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Tracking yellow and orange pigments (Carotenoids) confirms the
                **start of bud formation**, providing an early prediction for
                the bloom phase.
              </p>
            </div>

            {/* Plant Lifecycle Card 3: Anthocyanins */}
            <div
              className="plant-lifecycle-item group p-6 bg-gray-50 rounded-2xl shadow-xl border-2 transition-all duration-300 w-80 flex-shrink-0 text-center"
              style={{
                borderColor: SectionBorder,
              }}
            >
              <Flower
                size={48}
                className="mx-auto mb-4 animate-wiggle"
                style={{ color: AnthocyaninViolet, animationDuration: "1s" }}
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Anthocyanins: Peak Bloom
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                Analyzing violet and deep red pigments (Anthocyanins) confirms
                the plant has reached **peak bloom**, the optimal time for
                pollination and data collection.
              </p>
            </div>


          </div>
        </section>

        {/* 3. Key Metrics and Health Indices Section */}
        <section
          id="key-metrics"
          className="mt-16 w-full mb-16 p-8 md:p-12 lg:p-16 rounded-3xl shadow-2xl border-4 animate-fadeIn transition-all duration-500"
          style={{
            backgroundColor: SectionBg,
            borderColor: SectionBorder,
            boxShadow: `0 0 40px var(--shadow-color, rgba(0, 0, 0, 0.1))`,
          }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 text-center">
            Key Metrics: Converting Light Data into Actionable Health Indices
          </h2>
          <p className="text-center text-lg text-gray-700 max-w-5xl mx-auto mb-12">
            Spectral reflectance data is mathematically converted into powerful
            vegetation indices, providing a simple score for the plant’s health,
            density, and stress levels.
          </p>

          {/* 🌟 تم وضع قسم الـ Cards هنا (أصبح أولاً) */}
          <div className="flex flex-row flex-nowrap justify-start md:justify-center gap-10 overflow-x-auto py-4">
            {/* 📈 Card 1: NDVI (Normalized Difference Vegetation Index) */}
            <div
              className="group p-6 bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-96 flex-shrink-0"
              style={{
                borderColor: SectionBorder,
                boxShadow: `0 0 20px var(--shadow-color, rgba(0, 0, 0, 0.05))`,
              }}
            >
              <TrendingUp
                size={40}
                className="mb-4 transition-transform duration-300 group-hover:scale-110"
                style={{ color: PrimaryGreen }}
              />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                <span
                  className="text-2xl font-extrabold"
                  style={{ color: PrimaryGreen }}
                >
                  NDVI
                </span>
                : Biomass & Coverage
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                The **Normalized Difference Vegetation Index** is the gold
                standard for measuring **vegetation density** and health. It
                contrasts near-infrared (high reflection) with red light (high
                absorption).
              </p>
              <div className="text-sm font-mono p-3  bg-green-50 rounded-lg border border-green-200" style={{ color: 'black' }}>
                NDVI = (NIR - Red) / (NIR + Red)
              </div>
            </div>

            {/* ☀️ Card 2: PRI (Photochemical Reflectance Index) */}
            <div
              className="group p-6 bg-white rounded-2xl text-black shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-96 flex-shrink-0"
              style={{
                borderColor: SectionBorder,
                boxShadow: `0 0 20px var(--shadow-color, rgba(0, 0, 0, 0.05))`,
              }}
            >
              <Sun
                size={40}
                className="mb-4 transition-transform duration-300 group-hover:rotate-45"
                style={{ color: AccentYellow }}
              />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                <span
                  className="text-2xl font-extrabold"
                  style={{ color: AccentYellow }}
                >
                  PRI
                </span>
                : Photosynthesis & Stress
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                The **Photochemical Reflectance Index** measures **light use
                efficiency**. It detects subtle changes in xanthophyll cycle
                pigments, which are key indicators of plant water or heat
                stress.
              </p>
              <div className="text-sm font-mono p-3 bg-yellow-50 rounded-lg border border-yellow-200" style={{ color: 'black' }}>
                PRI = (R_531 - R_570) / (R_531 + R_570)
              </div>
            </div>

            {/* 📊 Card 3: EVI (Enhanced Vegetation Index) */}
            <div
              className="group p-6 bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl w-96 flex-shrink-0"
              style={{
                borderColor: SectionBorder,
                boxShadow: `0 0 20px var(--shadow-color, rgba(0, 0, 0, 0.05))`,
              }}
            >
              <LineChart
                size={40}
                className="mb-4 transition-transform duration-300 group-hover:scale-110"
                // MODIFIED: Used AnthocyaninViolet for the icon
                style={{ color: AnthocyaninViolet }}
              />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                <span
                  className="text-2xl font-extrabold"
                  // MODIFIED: Used AnthocyaninViolet for the title accent
                  style={{ color: AnthocyaninViolet }}
                >
                  EVI
                </span>
                : Canopy Structure
              </h3>
              <p className="text-gray-700 text-base leading-relaxed mb-4">
                The **Enhanced Vegetation Index** is an advanced index that
                minimizes atmospheric influence and soil background noise,
                providing a more accurate measure of the **plant canopy
                structure**.
              </p>
              <div className="text-sm font-mono  text-black p-3 bg-purple-50 rounded-lg border border-purple-200">
                EVI = G * (NIR - Red) / (L + NIR + C1 * Red - C2 * Blue)
              </div>
            </div>
          </div>

          {/* 🌟 المكون IndexCalculator تم وضعه هنا (أصبح ثانياً) */}
          <div className="w-full max-w-3xl mx-auto mb-16 mt-12">
            <IndexCalculator />
          </div>
          <p className="text-center text-sm text-gray-500 mt-3 italic">
            Conceptual visualization of hyperspectral remote sensing. (Source:
            <a
              href="https://esajournals.onlinelibrary.wiley.com/doi/10.1002/ecs2.70127"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 "
            >
              {" "}
              ECOSPHERE Journal: Deciphering the spectra of flowers to map landscape-scale blooming dynamics
            </a>
            )
          </p>

        </section>
      </main>
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

export default DeepBloomPage;