'use client';

import React, { useState } from 'react';
import SplashScreen from './SplashScreen'; // استيراد المكون الجديد
import {
  Flower,
  Leaf,
  Globe,
  Info,
  Brain,
  Sprout,
  Sun,
  TreePine,
  Factory,
  Zap,
  Cloudy,
  Droplets,
  Feather,
  Tornado,
  Bug,
  Lightbulb,
  Wind,
  Waves,
  HeartPulse,
  LayoutDashboard,
} from 'lucide-react';

const HomePage = () => {
  const [showContent, setShowContent] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const phenologyStages = [
    {
      title: "Seed Germination",
      description: "Seeds begin to germinate in the soil, the first step in a plant's life cycle.",
      icon: <Sprout size={48} className="text-gray-700 dark:text-gray-300" />,
      image: "https://images.unsplash.com/photo-1542601098-8fc114e183e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Leaf Emergence",
      description: "The first leaves appear, and the plant begins to use sunlight to produce energy.",
      icon: <Leaf size={48} className="text-gray-700 dark:text-gray-300" />,
      image: "/MG_3987.webp"
    },
    {
      title: "Flowering",
      description: "Flowers bloom in vibrant colors, a crucial stage for pollination.",
      icon: <Flower size={48} className="text-gray-700 dark:text-gray-300" />,
      image: "https://images.unsplash.com/photo-1526433290948-c9235d644d6a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Fruiting",
      description: "Fruits form after pollination and grow in preparation for harvest.",
      icon: <Droplets size={48} className="text-gray-700 dark:text-gray-300" />,
      image: "https://images.unsplash.com/photo-1582283925761-004543794d07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      title: "Leaf Fall",
      description: "Leaves change color and fall as winter approaches, a critical stage in the plant's life cycle.",
      icon: <Feather size={48} className="text-gray-700 dark:text-gray-300" />,
      image: "https://images.unsplash.com/photo-1523784157549-06048d086202?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  ];

  const sectionImages = [
    {
      section: "What is Phenology?",
      image: "https://images.unsplash.com/photo-1470240731273-756410476e3e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Phenology is the science of the seasons in nature, helping us understand the cycles of life and their relationship with climate."
    },
    {
      section: "The Plant Life Cycle",
      image: "https://images.unsplash.com/photo-1510414842594-be12934b22c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVnfDB8fHx8fA%3D%3D",
      text: "From seed to bloom, every plant follows a unique life cycle vital for its survival and reproduction."
    },
    {
      section: "Why Do We Care About Phenology?",
      image: "https://images.unsplash.com/photo-1507537330278-6872a95c7dd4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Phenological shifts are a critical indicator of climate change, showing how ecosystems are adapting or struggling."
    },
    {
      section: "Causes of Phenological Shifts",
      image: "https://images.unsplash.com/photo-1558235282-55038f465d3a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Changes in temperature, rain, and human-caused factors like pollution and urban heat islands can disrupt the natural timing of plant life cycles."
    },
    {
      section: "Consequences for Ecosystems",
      image: "https://images.unsplash.com/photo-1543949826-6b219f71587b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "A 'mismatch' between plants and pollinators can occur when blooming times are out of sync, affecting entire food chains and biodiversity."
    },
    {
      section: "Impact on Carbon Cycle",
      image: "https://images.unsplash.com/photo-1621255577661-096b4122d4f2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "The timing of plant growth has a direct impact on the global carbon cycle, affecting how much CO2 is absorbed from the atmosphere."
    },
    {
      section: "Impact on Water Cycle",
      image: "https://images.unsplash.com/photo-1534067783941-51c9c23ecc8f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Changes in plant life cycles can alter water availability and soil health, playing a key role in local and regional water cycles."
    },
    {
      section: "What BloomTrack Solves",
      image: "https://images.unsplash.com/photo-1616231940742-990a038f906f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "BloomTrack uses technology to simplify the complex task of tracking phenology and provides actionable insights for a greener future."
    },
    {
      section: "How We Apply This Science",
      image: "https://images.unsplash.com/photo-1610996489063-8d071424e4d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "We use a combination of satellite imagery, AI-powered analysis, and community contributions to track and analyze changes in plant life cycles on a global scale."
    },
    {
      section: "AI Assistant",
      image: "https://images.unsplash.com/photo-1620712943372-e1d88f615e45?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Our intelligent assistant provides personalized information on plant care, local phenology data, and environmental insights, helping you learn more about your local ecosystem."
    }
  ];

  const handleImageClick = (imageSrc: string, altText: string) => {
    setModalContent({
      imageSrc,
      altText
    });
  };

  function handleCloseModal() {
    setModalContent(null);
  }

  function handleConnectToAI(_event: MouseEvent<HTMLButtonElement, MouseEvent>): void {
    throw new Error('Function not implemented.');
  }
  
  // دالة لاستدعائها عند انتهاء شاشة الترحيب
  const handleSplashComplete = () => {
    setShowContent(true);
  };

  return (
    <>
      {!showContent && <SplashScreen onComplete={handleSplashComplete} />}
      {showContent && (
        <div className="flex flex-col items-center justify-center text-center min-h-screen p-4 bg-white transition-colors duration-500 animate-gradient-slow" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');
            
            @keyframes gradient-slow {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            .animate-gradient-slow {
              background-size: 200% 200%;
              animation: none;
            }
            .animate-spin-slow {
              animation: spin 8s linear infinite;
            }
            .animate-bounce-custom {
              animation: bounce 2s infinite;
            }
            .animate-wiggle {
              animation: wiggle 1s ease-in-out infinite;
            }
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes wiggle {
              0%, 100% { transform: rotate(-3deg); }
              50% { transform: rotate(3deg); }
            }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 1s ease-out;
            }
            .plant-lifecycle-container {
              position: relative;
            }
            .plant-lifecycle-item {
              transition: all 0.5s ease-in-out;
              cursor: pointer;
            }
            .plant-lifecycle-item:hover {
              transform: scale(1.1);
            }
            /* New style for the main logo text */
            .main-logo-text {
              font-family: 'Poppins', sans-serif;
              font-weight: 700;
            }
            /* Animation for the flower icon color change */
            @keyframes flower-color-change {
              0%  { color: #fdd835; } /* Yellow */
              50%  { color: #32CD32; } /* Green */
              100% { color: #fdd835; } /* Yellow */
            }
            .animate-flower-color {
              animation: flower-color-change 3s infinite alternate; /* 3 seconds, infinite, alternates direction */
            }
          `}</style>
          
          {modalContent && (
            <div 
              className="fixed inset-0 z-50 bg-black bg-opacity-75 flex justify-center items-center p-4"
              onClick={handleCloseModal}
            >
              <div className="relative max-w-4xl max-h-full" onClick={e => e.stopPropagation()}>
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

          {/* Section 1: Main Interface */}
          <section className="w-full mt-0 shadow-xl transform transition-transform duration-500 animate-fadeIn">
            <div className="relative w-full overflow-hidden h-[600px] flex flex-col items-center justify-center text-center rounded-3xl">
              <img
                src="/cape-7404790.jpg"
                alt="Field of flowers"
                className="absolute inset-0 w-full h-full object-cover z-0 rounded-3xl"
              />
              <div className="absolute inset-0 bg-black opacity-40 z-10 rounded-3xl"></div> 

              <div className="relative z-20 flex flex-col items-center justify-center text-center px-4">
                <Flower size={80} className="mx-auto mb-6 animate-pulse animate-flower-color" />
                <h1 className="text-4xl md:text-6xl font-extrabold main-logo-text mb-2 leading-tight">
                  <span className="text-[#32CD32] dark:text-green-400">Bloom</span><span className="text-white">Track</span>
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-4 font-semibold">
                  We watch our planet bloom.
                </p>
                <p className="text-white text-xl md:text-2xl max-w-3xl mb-10 font-medium leading-relaxed">
                  Discover the beauty and changes of global ecosystems. Monitor plant blooms, track environmental health, and join us in nurturing a greener future.
                </p>
                <div className="flex justify-center flex-wrap gap-6">
                  <a href="/map" className="px-10 py-5 text-lg font-bold rounded-full bg-[#32CD32] text-white shadow-xl hover:bg-[#28a745] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3">
                    <Globe size={28} /> Explore the Map
                  </a>
                  <a href="/about" className="px-10 py-5 text-lg font-bold rounded-full bg-white text-gray-900 shadow-xl hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3">
                    <Info size={28} /> Learn More
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: What is Phenology? */}
          <section className="mt-20 max-w-6xl w-full text-gray-800">
            <div className="bg-[#f0fdf4] rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-4 border-[#d4f9d8] animate-fadeIn delay-300">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#32CD32] mb-4">
                What is <span className="text-gray-800">Phenology</span>?
              </h2>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Phenology is the study of cyclical changes in the lives of living organisms, especially plants, and their relationship with seasons and climate. It's the science of "when" things happen in nature.
              </p>
              <img
                src="unnamed (8).png"
                alt={sectionImages[0].section}
                className="rounded-2xl mt-6 mx-auto block max-w-[900px] h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105 mb-10"
                onClick={() => handleImageClick("unnamed (8).png", sectionImages[0].section)}
              />
            </div>
          </section>

          {/* Section 3: The Plant Life Cycle */}
          <section className="mt-20 max-w-6xl w-full text-gray-800">
            <div className="bg-[#f0fdf4] rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-4 border-[#d4f9d8] animate-fadeIn delay-500">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#32CD32] mb-8 text-center">
                The <span className="text-gray-800">Plant Life Cycle</span>
              </h2>
              <img
                src="unnamed (10).png"
                // alt={sectionImages[1].section}
                onClick={() => handleImageClick("unnamed (10).png", sectionImages[1].section)}
                className="rounded-2xl mt-6 mx-auto block max-w-[900px] h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105 mb-10"
              />
              <div className="relative flex flex-col md:flex-row justify-around items-center plant-lifecycle-container">
                <div className="plant-lifecycle-item p-4 text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-inner border-2 border-[#d4f9d8]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM7.5 12a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0ZM12 16.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0ZM16.5 12a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0ZM12 7.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z" fill="#32CD32" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-800">Seeds</p>
                </div>
                <div className="plant-lifecycle-item p-4 text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-inner border-2 border-[#d4f9d8]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM12 18.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0ZM12 12.5a1.5 1.5 0 1 1 3 0a1.5 1.5 0 0 1-3 0Z" fill="#32CD32" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-800">Germination</p>
                </div>
                <div className="plant-lifecycle-item p-4 text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-inner border-2 border-[#d4f9d8]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2ZM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6s6 2.69 6 6s-2.69 6-6 6Z" fill="#32CD32" />
                      <path d="M12 12.5a.5.5 0 1 1 0-1a.5.5 0 0 1 0 1Z" fill="#32CD32" />
                    </svg>
                  </div>
                  <p className="font-semibold text-gray-800">Stems & Roots</p>
                </div>
                <div className="plant-lifecycle-item p-4 text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-inner border-2 border-[#d4f9d8]">
                    <Leaf size={48} className="text-[#32CD32]" />
                  </div>
                  <p className="font-semibold text-gray-800">Leaves</p>
                </div>
                <div className="plant-lifecycle-item p-4 text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-inner border-2 border-[#d4f9d8]">
                    <Flower size={48} className="text-[#32CD32]" />
                  </div>
                  <p className="font-semibold text-gray-800">Flowers</p>
                </div>
                <div className="plant-lifecycle-item p-4 text-center">
                  <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto mb-2 shadow-inner border-2 border-[#d4f9d8]">
                    <Zap size={48} className="text-[#32CD32]" />
                  </div>
                  <p className="font-semibold text-gray-800">Pollination</p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Why Do We Care About Phenology? */}
          <section className="mt-20 max-w-6xl w-full text-gray-800">
            <div className="bg-[#f0fdf4] rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-4 border-[#d4f9d8] animate-fadeIn delay-500">
              <h3 className="text-3xl font-extrabold text-[#32CD32] mb-6 text-center">
                Why Do We Care About <span className="text-gray-800">Phenology</span>?
              </h3>
              <img
                src="Gemini_Generated_Image_3mdug83mdug83mdu.png"
                alt={sectionImages[2].section}
                onClick={() => handleImageClick("Gemini_Generated_Image_3mdug83mdug83mdu.png", sectionImages[2].section)}
                className="rounded-2xl mt-6 mx-auto block max-w-[900px] h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105 mb-10"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <Cloudy size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:scale-125" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">An Indicator of Climate Change</h4>
                  <p className="text-gray-700 text-center">
                    Early or late blooming times are a sensitive indicator of changing global temperatures and weather patterns.
                  </p>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <Sun size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:scale-125" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Essential for Agriculture</h4>
                  <p className="text-gray-700 text-center">
                    Phenology helps farmers determine the best times for planting and harvesting, ensuring optimal crops.
                  </p>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <TreePine size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:scale-125" />
                  <h4 className="text-xl font-bold mb-2 text-gray-900">Biodiversity Protection</h4>
                  <p className="text-gray-700 text-center">
                    The relationship between flowering times and pollinators (like bees) is vital. Any change that affects this relationship threatens the entire ecosystem.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: The Causes and Consequences of Phenological Shifts */}
          <section className="mt-20 max-w-6xl w-full text-gray-800">
            <div className="bg-[#f0fdf4] rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-4 border-[#d4f9d8] animate-fadeIn delay-700">
              <h3 className="text-3xl font-extrabold text-[#32CD32] mb-6 text-center">
                Causes and Consequences of <span className="text-gray-800">Phenological Shifts</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                The timing of flowering is a complex process influenced by various environmental factors. When these factors change, the natural rhythm of plants can be disrupted, leading to significant ecological and agricultural effects.
              </p>
              <img
                src="licensed-image (2).jpeg"
                alt={sectionImages[3].section}
                onClick={() => handleImageClick("licensed-image (2).jpeg", sectionImages[3].section)}
                className="rounded-2xl mb-8 w-full h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105"
              />

              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-left">
                Causes of Delayed or Advanced Blooming:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="group flex items-start p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Wind size={40} className="text-[#32CD32] mr-4 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:rotate-12" />
                  <div>
                    <h5 className="text-xl font-semibold mb-1 text-gray-900">Temperature Changes</h5>
                    <p className="text-gray-700">
                      Global warming often leads to earlier springs, causing plants to bloom too early.
                    </p>
                  </div>
                </div>
                <div className="group flex items-start p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Droplets size={40} className="text-[#32CD32] mr-4 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <h5 className="text-xl font-semibold mb-1 text-gray-900">Rain and Humidity</h5>
                    <p className="text-gray-700">
                      Severe drought stresses plants and prevents blooming, while heavy rains can cause root rot.
                    </p>
                  </div>
                </div>
                <div className="group flex items-start p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Lightbulb size={40} className="text-[#32CD32] mr-4 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:animate-pulse" />
                  <div>
                    <h5 className="text-xl font-semibold mb-1 text-gray-900">Light and Pollution</h5>
                    <p className="text-gray-700">
                      Light pollution in urban areas confuses plants that rely on day-night cycles for blooming.
                    </p>
                  </div>
                </div>
                <div className="group flex items-start p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Factory size={40} className="text-[#32CD32] mr-4 mt-1 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <h5 className="text-xl font-semibold mb-1 text-gray-900">Urban Heat Islands</h5>
                    <p className="text-gray-700">
                      Cities absorb and retain more heat, leading to increased local temperatures and accelerated plant growth.
                    </p>
                  </div>
                </div>
              </div>

              <h4 className="text-2xl font-bold text-gray-900 mb-4 text-left">
                Consequences for Ecosystems and Humans:
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <Tornado size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:scale-125" />
                  <h5 className="text-xl font-bold mb-2 text-gray-900">Ecological Mismatch</h5>
                  <p className="text-gray-700 text-center">
                    When plants bloom out of sync with pollinators, a "mismatch" occurs, leading to a lack of food for pollinators and reduced pollination for plants.
                  </p>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <Bug size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:animate-wiggle" />
                  <h5 className="text-xl font-bold mb-2 text-gray-900">Impact on Food Chains</h5>
                  <p className="text-gray-700 text-center">
                    This "mismatch" has a cascading effect on the entire food chain.
                  </p>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <HeartPulse size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:scale-125" />
                  <h5 className="text-xl font-bold mb-2 text-gray-900">Human Health and Economy</h5>
                  <p className="text-gray-700 text-center">
                    Changing bloom times can lead to prolonged allergy seasons. Unpredictable growing seasons also threaten crops, affecting food security.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Broader Impacts */}
          <section className="mt-20 max-w-6xl w-full text-gray-800">
            <div className="bg-[#f0fdf4] rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-4 border-[#d4f9d8] animate-fadeIn delay-900">
              <h3 className="text-3xl font-extrabold text-[#32CD32] mb-6 text-center">
                Broader <span className="text-gray-800">Environmental Impacts</span>
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                The effects of phenological shifts extend beyond plants and animals, impacting key global systems.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group flex items-start p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="flex-shrink-0">
                    <svg className="w-12 h-12 text-[#32CD32] mr-4 mt-1 transition-transform duration-300 group-hover:rotate-180" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2A10 10 0 1 0 12 22A10 10 0 1 0 12 2Zm0 18A8 8 0 1 1 12 4A8 8 0 1 1 12 20ZM12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6Z" />
                    </svg>
                  </div>
                  <div>
                    <h5 className="text-xl font-semibold mb-1 text-gray-900">On the Carbon Cycle</h5>
                    <p className="text-gray-700">
                      Since plants absorb carbon dioxide, any change in their growing seasons directly impacts the planet's ability to pull carbon from the atmosphere.
                    </p>
                    <img
                      src="licensed-image (4).jpeg"
                      alt={sectionImages[5].section}
                      onClick={() => handleImageClick("licensed-image (4).jpeg", sectionImages[5].section)}
                      className="rounded-2xl mt-4 w-full h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
                <div className="group flex items-start p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <Waves size={48} className="text-[#32CD32] mr-4 mt-1 transition-transform duration-300 group-hover:scale-110" />
                  <div>
                    <h5 className="text-xl font-semibold mb-1 text-gray-900">On the Water Cycle</h5>
                    <p className="text-gray-700">
                      Changes in plant timing can alter local and regional water cycles, affecting moisture availability and soil health.
                    </p>
                    <img
                      src="unnamed.png"
                      alt={sectionImages[6].section}
                      onClick={() => handleImageClick("unnamed.png", sectionImages[6].section)}
                      className="rounded-2xl mt-4 w-full h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 7: What BloomTrack Solves */}
          <section className="mt-20 max-w-6xl w-full text-gray-800">
            <div className="bg-[#f0fdf4] rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-4 border-[#d4f9d8] animate-fadeIn delay-1000">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#32CD32] mb-8 text-center">
                What <span className="text-gray-800">BloomTrack</span> Solves
              </h2>
              <img
                src="licensed-image (5).jpeg"
                alt={sectionImages[7].section}
                onClick={() => handleImageClick("licensed-image (5).jpeg", sectionImages[7].section)}
                className="rounded-2xl mb-8 w-full h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <Zap size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:scale-125" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Simplifying Phenology Tracking</h3>
                  <p className="text-gray-700 text-center">
                    A centralized digital platform to easily record, visualize, and analyze bloom data, surpassing slow manual observation methods.
                  </p>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <Cloudy size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:animate-bounce-custom" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Climate Change Insights</h3>
                  <p className="text-700 text-center">
                    By leveraging citizen science (like **GLOBE Observer App**) and data from NASA's **Takes to the Air to Study Wildflowers** project, we track effects of global warming in real time.
                  </p>
                </div>
                <div className="group flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border-2 border-[#d4f9d8] transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                  <Sun size={48} className="text-[#32CD32] mb-4 transition-transform duration-300 group-hover:animate-spin-slow" />
                  <h3 className="text-xl font-bold mb-2 text-gray-900">Agriculture and Crop Management</h3>
                  <p className="text-gray-700 text-center">
                    Accurate forecasts and monitoring of bloom times can help farmers optimize their crops and minimize losses.
                  </p>
                </div>
              </div>
            </div>
          </section>
            {/* Section 8: How Does BloomTrack Apply This Science? */}
          <section className="mt-20 max-w-6xl w-full text-gray-800">
            <div className="group bg-[#f0fdf4] rounded-3xl shadow-2xl p-8 md:p-12 lg:p-16 border-4 border-[#d4f9d8] transition-all duration-500 hover:shadow-[0_0_40px_rgba(50,205,50,0.7)]">
              <h3 className="text-3xl font-extrabold text-[#32CD32] mb-6 text-center">
                How Does <span className="text-gray-800">BloomTrack</span> Apply This Science?
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8">
                The BloomTrack project is a practical application of phenology, using advanced satellite data to monitor changes in vegetation cover. We track when plants change their state from growth to flowering to fruiting, which makes our project an essential part of plant phenology.
              </p>
              <img
                src="licensed-image (6).jpeg"
                alt={sectionImages[8].section}
                // onClick={() => handleImageClick(sectionImages[8])} // Removed onClick
                className="rounded-2xl mb-8 w-full h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105"
              />
              <div className="flex flex-col md:flex-row justify-between gap-6 p-6 bg-white rounded-3xl shadow-inner border-2 border-[#d4f9d8]">
                <div className="flex-1 text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Satellite Monitoring & Visualizations</h4>
                  <p className="text-gray-700">
                    We utilize high-resolution satellite imagery from sources like **NASA Worldview Superbloom Visualizations** to detect changes in color and density, which are key indicators of phenological stages.
                  </p>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Analysis & Spectral Signatures</h4>
                  <p className="text-gray-700">
                    Our AI models analyze satellite data to provide accurate and real-time insights, including the detection of **California Superblooms** and analysis of **spectral signatures** to map bloom dynamics.
                  </p>
                </div>
                <div className="flex-1 text-left">
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Community Engagement (Ground-Truth)</h4>
                  <p className="text-gray-700">
                    Users can upload their own observations and photos (**Ground-Truth data**), contributing to a massive, real-time dataset that enhances our models and validates satellite data, as emphasized by NASA.
                  </p>
                </div>
              </div>
              <div className="mt-10 flex justify-center">
                <a href="/dashboard" className="px-10 py-5 text-lg font-bold rounded-full bg-[#fdd835] text-gray-900 shadow-xl hover:bg-[#fbc02d] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3">
                  <LayoutDashboard size={28} /> Go to Dashboard
                </a>
              </div>
            </div>
          </section>
          
          {/* Section 9: Call to Action */}
          <section className="mt-20 mb-20 max-w-6xl w-full text-gray-800">
            <div className="bg-[#f0fdf4] rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border-4 border-[#d4f9d8] flex flex-col items-center justify-center text-center animate-fadeIn delay-[1.2s]">
              <img
                src="unnamed (7).png"
                alt={sectionImages[9].section}
                // onClick={() => handleImageClick(sectionImages[9])} // Removed onClick
                className="rounded-2xl mb-8 s-full h-auto object-cover border-4 border-[#d4f9d8] cursor-pointer transition-transform duration-300 hover:scale-105"
              />
              <Brain size={64} className="text-[#32CD32] mb-6 animate-pulse" />
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                Connect with Our <span className="text-[#fdd835]">AI Assistant</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mb-8">
                Our intelligent assistant can provide personalized information on plant care, local phenology data, and environmental insights. Ask questions, get recommendations, and learn more about your local ecosystem.
              </p>
              <div className="mt-6">
                <button
                  onClick={handleConnectToAI}
                  className="px-10 py-5 text-lg font-bold rounded-full bg-[#32CD32] text-white shadow-xl hover:bg-[#28a745] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-3"
                >
                  <Brain size={28} /> Start a Conversation
                </button>
              </div>
            </div>
          </section>

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
      )}
    </>
  );
};

export default HomePage;