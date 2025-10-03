// IndexCalculator.jsx

"use client";

import React, { useState } from "react";
import { Leaf, Sun, TrendingUp, Zap, MinusCircle, CheckCircle } from "lucide-react";

// Define colors for consistency
const PrimaryGreen = "#32CD32"; // Lime Green
const AccentYellow = "#fdd835"; // Yellow
const IndexAccentColor = "#2563eb"; // Blue
const SectionBorder = "#d4f9d8"; // Light Mint

const IndexCalculator = () => {
  // Near Infrared (NIR) Reflectance
  const [nir, setNir] = useState("");
  // Red (RED light) Reflectance
  const [red, setRed] = useState("");
  // 531 nm Reflectance
  const [r531, setR531] = useState("");
  // 570 nm Reflectance
  const [r570, setR570] = useState("");
  const [results, setResults] = useState({ ndvi: null, pri: null });
  const [error, setError] = useState("");

  const calculateIndices = () => {
    setError("");
    const NIR = parseFloat(nir);
    const RED = parseFloat(red);
    const R531 = parseFloat(r531);
    const R570 = parseFloat(r570);

    // Check if input values are valid reflectance (between 0 and 1)
    // NOTE: This validation is now CRITICAL since input type is 'text'.
    if (
      (nir !== "" && (isNaN(NIR) || NIR < 0 || NIR > 1)) ||
      (red !== "" && (isNaN(RED) || RED < 0 || RED > 1)) ||
      (r531 !== "" && (isNaN(R531) || R531 < 0 || R531 > 1)) ||
      (r570 !== "" && (isNaN(R570) || R570 < 0 || R570 > 1))
    ) {
      setError("Please enter valid Reflectance values between 0.0 and 1.0.");
      setResults({ ndvi: null, pri: null });
      return;
    }

    let calculatedNDVI = null;
    let calculatedPRI = null;

    // Calculate NDVI (Normalized Difference Vegetation Index)
    if (NIR !== "" && RED !== "" && !isNaN(NIR) && !isNaN(RED)) {
      if (NIR + RED === 0) {
        calculatedNDVI = 0; // Avoid division by zero
      } else {
        calculatedNDVI = (NIR - RED) / (NIR + RED);
      }
    }

    // Calculate PRI (Photochemical Reflectance Index)
    if (R531 !== "" && R570 !== "" && !isNaN(R531) && !isNaN(R570)) {
      if (R531 + R570 === 0) {
        calculatedPRI = 0; // Avoid division by zero
      } else {
        calculatedPRI = (R531 - R570) / (R531 + R570);
      }
    }

    setResults({
      // Values are kept as standard Latin/English numerals
      ndvi: calculatedNDVI !== null ? calculatedNDVI.toFixed(3) : null,
      pri: calculatedPRI !== null ? calculatedPRI.toFixed(3) : null,
    });
  };

  // Function to determine plant status based on NDVI index
  const getNdviStatus = (ndviValue) => {
    const val = parseFloat(ndviValue);
    if (val === null || isNaN(val))
      return { text: "Awaiting input...", color: "#6b7280" };
    if (val >= 0.6)
      return {
        text: "Excellent health and density! 🌱 Dense vegetation cover and high photosynthetic activity.",
        color: PrimaryGreen,
      };
    if (val >= 0.3)
      return {
        text: "Good health. Plant is actively growing but may need more density.",
        color: IndexAccentColor,
      };
    if (val >= 0.1)
      return {
        text: "Weak to moderate. May indicate sparse vegetation or plants under stress.",
        color: AccentYellow,
      };
    return {
      text: "Very poor vegetation cover or bare/dead ground. Pay attention to plant status.",
      color: "#ef4444", // Red color
    };
  };

  // Function to determine photosynthetic efficiency based on PRI index
  const getPriStatus = (priValue) => {
    const val = parseFloat(priValue);
    if (val === null || isNaN(val))
      return { text: "Awaiting input...", color: "#6b7280" };
    if (val >= 0.0)
      return {
        text: "Good photosynthetic efficiency. Plant is utilizing light effectively.",
        color: PrimaryGreen,
      };
    return {
      text: "Low efficiency. Plant may be under stress (heat, drought) or preparing for rest.",
      color: AccentYellow,
    };
  };

  return (
    <div
      className="p-6 bg-white rounded-xl shadow-lg border-2 transition-all duration-300"
      style={{ borderColor: SectionBorder }}
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Zap size={30} className="mr-3" style={{ color: IndexAccentColor }} />
        Vegetation Index Calculator (NDVI & PRI)
      </h3>
      <p className="text-gray-700 mb-6">
        Enter the spectral **Reflectance** values (between 0.0 and 1.0) obtained
        from your remote sensing device to calculate the indices.
      </p>

      {/* NDVI input section */}
      <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
        <h4
          className="text-xl font-semibold mb-3 flex items-center"
          style={{ color: PrimaryGreen }}
        >
          <Leaf size={24} className="mr-2" />
          Calculate NDVI Index (Biomass)
        </h4>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Changed type to 'text' and added inputMode='decimal' to override browser localization and eliminate native number arrows, ensuring Latin numerals (1, 2, 3...) are used. */}
          <input
            type="text"
            inputMode="decimal"
            placeholder="NIR (Near Infrared)"
            value={nir}
            onChange={(e) => setNir(e.target.value)}
            onBlur={calculateIndices}
            className="flex-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
            lang="en" 
            dir="ltr"
          />
          {/* Changed type to 'text' and added inputMode='decimal' to override browser localization and eliminate native number arrows, ensuring Latin numerals (1, 2, 3...) are used. */}
          <input
            type="text"
            inputMode="decimal"
            placeholder="RED (Red Light)"
            value={red}
            onChange={(e) => setRed(e.target.value)}
            onBlur={calculateIndices}
            className="flex-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-150"
            lang="en"
            dir="ltr"
          />
        </div>
        <p className="text-sm text-gray-600 italic">
          Calculated from: $NDVI = (NIR - RED) / (NIR + RED)$
        </p>
      </div>

      {/* PRI input section */}
      <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
        <h4
          className="text-xl font-semibold mb-3 flex items-center"
          style={{ color: AccentYellow }}
        >
          <Sun size={24} className="mr-2" />
          Calculate PRI Index (Photosynthetic Efficiency)
        </h4>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          {/* Changed type to 'text' and added inputMode='decimal' to override browser localization and eliminate native number arrows, ensuring Latin numerals (1, 2, 3...) are used. */}
          <input
            type="text"
            inputMode="decimal"
            placeholder="R_531 (531 nm Reflectance)"
            value={r531}
            onChange={(e) => setR531(e.target.value)}
            onBlur={calculateIndices}
            className="flex-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
            lang="en"
            dir="ltr"
          />
          {/* Changed type to 'text' and added inputMode='decimal' to override browser localization and eliminate native number arrows, ensuring Latin numerals (1, 2, 3...) are used. */}
          <input
            type="text"
            inputMode="decimal"
            placeholder="R_570 (570 nm Reflectance)"
            value={r570}
            onChange={(e) => setR570(e.target.value)}
            onBlur={calculateIndices}
            className="flex-1 p-3 border-2 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-150"
            lang="en"
            dir="ltr"
          />
        </div>
        <p className="text-sm text-gray-600 italic">
          Calculated from: $PRI = (R_{531} - R_{570}) / (R_{531} + R_{570})$
        </p>
      </div>

      {/* Calculation button and results */}
      <button
        onClick={calculateIndices}
        className="w-full py-3 mb-6 font-bold text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.01] focus:outline-none focus:ring-4"
        style={{
          backgroundColor: IndexAccentColor,
          borderColor: IndexAccentColor,
        }}
      >
        <TrendingUp size={20} className="inline mr-2" />
        Calculate Plant Health Indices
      </button>

      {/* Error area */}
      {error && (
        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg mb-4 flex items-center">
          <MinusCircle size={20} className="mr-2 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Results display area */}
      {(results.ndvi !== null || results.pri !== null) && (
        <div
          className="p-5 border-4 rounded-xl shadow-inner mt-4"
          style={{ borderColor: PrimaryGreen }}
        >
          <h4
            className="text-2xl font-extrabold mb-4"
            style={{ color: PrimaryGreen }}
          >
            Results and Analysis
          </h4>

          {results.ndvi !== null && (
            <div
              className="mb-4 p-3 border-l-4 rounded-md"
              style={{ borderColor: PrimaryGreen, backgroundColor: "#f7fff7" }}
            >
              <p className="text-lg font-semibold flex justify-between items-center mb-1">
                <span className="flex items-center">
                  <Leaf size={20} className="mr-2" style={{ color: PrimaryGreen }} />
                  NDVI Index:
                </span>
                {/* Enforcing Latin numerals for results display */}
                <span 
                  className="font-mono text-xl" 
                  style={{ color: PrimaryGreen }}
                  lang="en"
                  dir="ltr"
                >
                  {results.ndvi}
                </span>
              </p>
              <div
                className="text-base flex items-start"
                style={{ color: getNdviStatus(results.ndvi).color }}
              >
                <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                {getNdviStatus(results.ndvi).text}
              </div>
            </div>
          )}

          {results.pri !== null && (
            <div
              className="mb-2 p-3 border-l-4 rounded-md"
              style={{ borderColor: AccentYellow, backgroundColor: "#fffbe6" }}
            >
              <p className="text-lg font-semibold flex justify-between items-center mb-1">
                <span className="flex items-center">
                  <Sun size={20} className="mr-2" style={{ color: AccentYellow }} />
                  PRI Index:
                </span>
                {/* Enforcing Latin numerals for results display */}
                <span 
                  className="font-mono text-xl" 
                  style={{ color: AccentYellow }}
                  lang="en"
                  dir="ltr"
                >
                  {results.pri}
                </span>
              </p>
              <div
                className="text-base flex items-start"
                style={{ color: getPriStatus(results.pri).color }}
              >
                <CheckCircle size={18} className="mr-2 mt-1 flex-shrink-0" />
                {getPriStatus(results.pri).text}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndexCalculator;
