"use client";

import { useEffect, useState, useCallback } from "react";
import "./styles.css";

const fonts = [
  '"Courier New"',
  'Arial',
  'Georgia',
  'Verdana',
  'Impact',
  'Trebuchet MS',
  '"Roboto"',
  '"Orbitron"',
  '"Montserrat"',
  '"Fira Code"',       // Monospace with coding ligatures
  '"Poppins"',         // Modern sans-serif
  '"Playfair Display"',// Elegant serif
  '"Space Mono"',      // Technical monospace
  '"Pacifico"',        // Handwritten style
  '"Bebas Neue"',      // Bold condensed sans
  '"Lobster"',         // Playful script
  '"Raleway"',         // Clean sans-serif
  '"Cinzel"',          // Decorative serif
  '"Press Start 2P"',  // Retro pixel font
  '"Major Mono Display"', // Minimalist monospace
  '"Rubik"',           // Geometric sans
  '"Abril Fatface"',   // Bold serif
  '"Quicksand"',       // Rounded sans
  '"Righteous"',       // Compact sans
  '"Monoton"',         // Display font
  '"VT323"',           // Terminal style
  '"Share Tech Mono"'  // Techy monospace
];
const shapes = ['square', 'circle'];
const colorPalette = ['#e8c547ff', '#30323dff', '#4d5061ff', '#fe5f55ff', '#fceff9ff', '#f6ca83ff', '#f5d6baff'];
const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove'];



export default function Home() {
  const [time, setTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [clockFont, setClockFont] = useState('monospace');
  const [clockShape, setClockShape] = useState('square');
  const [primaryColor, setPrimaryColor] = useState('#e8c547ff');
  const [borderColor, setBorderColor] = useState('#f5d6baff');
  const [borderWidth, setBorderWidth] = useState(4);
  const [visualEffect, setVisualEffect] = useState('default');
  const [showSettings, setShowSettings] = useState(false);

  const [fontSize, setFontSize] = useState(2); // in rem



  const backgrounds = ["--secondary-color", "--saffron", "--black-bean", "--bittersweet"];
  const [clockBackground, setClockBackground] = useState(backgrounds[0]);

  const fontColors = [
    "--primary-color",
    "--saffron",
    "--bittersweet",
    "--lavender-blush",
    "--jet",           // Dark gray
    "--black-bean",    // Very dark blue/black
    "--indigo-dye",    // Dark blue
    "--davys-gray",    // Medium dark gray
    "--light-orange",  // Light cream
    "--sunset",        // Warm light yellow
    "--blue-munsell",  // Medium blue
    "--bittersweet",   // Coral red
    "--lavender-blush" // Pale pink
  ];
  const [clockFontColor, setClockFontColor] = useState(fontColors[0]);

  const getBoxShadow = useCallback(() => {
    switch (visualEffect) {
      case 'glow':
        return `0 0 30px var(--primary-color)`;
      case 'neon':
        return `0 0 15px var(--primary-color), inset 0 0 10px var(--primary-color)`;
      case 'shadow':
      case 'default':
        return `0 10px 30px rgba(0,0,0,0.3)`; // Fixed shadow size
      default:
        return `0 10px 30px rgba(0,0,0,0.3)`;
    }
  }, [visualEffect]);

  useEffect(() => {
    console.log("Show Settings:", showSettings);
  }, [showSettings]);

  useEffect(() => {
    setIsMounted(true);
    setTime(new Date());

    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const savedPreferences = localStorage.getItem('clockPreferences');
      if (savedPreferences) {
        const parsedPreferences = JSON.parse(savedPreferences);
        setClockFont(parsedPreferences.clockFont);
        setClockShape(parsedPreferences.clockShape);
        setPrimaryColor(parsedPreferences.primaryColor);
        setBorderColor(parsedPreferences.borderColor);
        setBorderWidth(parsedPreferences.borderWidth);
        setVisualEffect(parsedPreferences.visualEffect);
        setFontSize(parsedPreferences.fontSize ?? 3);
        setClockBackground(parsedPreferences.clockBackground ?? backgrounds[0]); // Add this
        setClockFontColor(parsedPreferences.clockFontColor ?? fontColors[0]);    // Add this
      }
    }
  }, [isMounted]);

  useEffect(() => {
    if (isMounted) {
      const preferences = {
        clockFont,
        clockShape,
        primaryColor,
        borderColor,
        borderWidth,
        visualEffect,
        fontSize,
        clockBackground, // Add this
        clockFontColor,  // Add this
      };
      localStorage.setItem('clockPreferences', JSON.stringify(preferences));
    }
  }, [clockFont, clockShape, primaryColor, borderColor, borderWidth, visualEffect, fontSize, clockBackground, clockFontColor, isMounted]);

  const handleFontSizeChange = (e) => {
    setFontSize(parseFloat(e.target.value));
  };

  const handleContainerSizeChange = (e) => {
    setContainerSize(parseInt(e.target.value, 10));
  };

  const handleShadowSizeChange = (e) => {
    setShadowSize(parseInt(e.target.value, 10));
  };

  const handleBorderWidthChange = (e) => {
    setBorderWidth(parseInt(e.target.value, 10));
  };

  const formatNumber = (num) => num.toString().padStart(2, "0");

  const toggleFullScreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const resetSettings = useCallback(() => {
    setClockFont('monospace');
    setClockShape('square');
    setPrimaryColor('#c678dd');
    setBorderColor('#3a3f4b');
    setBorderWidth(4);
    setVisualEffect('default');

    if (isMounted) {
      localStorage.setItem('clockPreferences', JSON.stringify({
        clockFont: 'monospace',
        clockShape: 'square',
        primaryColor: '#c678dd',
        borderColor: '#3a3f4b',
        borderWidth: 4,
        visualEffect: 'default',
      }));
    }
  }, [isMounted]);

  const settingImage = (
    <svg width="10" height="10" viewBox="0 0 100 80" fill="currentColor">
      <rect width="100" height="20"></rect>
      <rect y="30" width="100" height="20"></rect>
      <rect y="60" width="100" height="20"></rect>
    </svg>);




  return (
    <main className="container">

      {isMounted && time ? (
        <div
          className={`clock-container ${clockShape} ${visualEffect === 'vintage' ? 'vintage' : ''
            } ${showSettings ? 'top' : ''}`} // Add the 'top' class conditionally
          style={{
            background: `var(${clockBackground})`,
            '--primary-color': primaryColor,
            '--border-color': borderColor,
            fontFamily: clockFont,
            border: `${borderWidth}px solid ${borderColor}`,
            boxShadow: getBoxShadow(),
          }}
        >
          <div
            className="clock"
            style={{
              color: `var(${clockFontColor})`,
              fontSize: `${fontSize}rem`,
            }}
          >
            {[time.getHours(), time.getMinutes(), time.getSeconds()].map((t, i) => (
              <span key={i} className="digit">
                {formatNumber(t)}
                {i < 2 && <span className="blink">:</span>}
              </span>
            ))}
          </div>

          <div
            className="date"
            style={{ color: `var(${clockFontColor})` }} // Apply dynamic font color
          >
            {time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="special-buttons">
            <button
              className="settings-button"
              onClick={() => setShowSettings(!showSettings)}
              aria-label="Settings"
              title="Settings"
            >
              {settingImage}
            </button>
            <button className="fullscreen-button" onClick={toggleFullScreen} aria-label="Toggle fullscreen">
              ⛶
            </button>
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}



      {showSettings && (


        <div className="settings-panel">
          <button
            className="close-button"
            onClick={() => setShowSettings(false)}
            aria-label="Close settings"
          >
            ×
          </button>

          <div className="customization-buttons">
            <button onClick={() => setClockFont(fonts[Math.floor(Math.random() * fonts.length)])} aria-label="Change font">𝖠b</button>
            <button
              onClick={() => setClockShape(prev => prev === 'square' ? 'circle' : 'square')}
              aria-label="Change shape"
            >
              ◻️
            </button>
            <button
              onClick={() => setClockBackground(prev => {
                const nextIndex = (backgrounds.indexOf(prev) + 1) % backgrounds.length;
                return backgrounds[nextIndex];
              })}
              aria-label="Change background"
            >
              🎨
            </button>
            <button
              onClick={() => setClockFontColor(prev => {
                const nextIndex = (fontColors.indexOf(prev) + 1) % fontColors.length;
                return fontColors[nextIndex];
              })}
              aria-label="Change font color"
            >
              🎨🖊️
            </button>
            <button
              onClick={() => setPrimaryColor(prev => {
                const index = colorPalette.indexOf(prev);
                const nextIndex = (index + 1) % colorPalette.length;
                return colorPalette[nextIndex];
              })}
              aria-label="Change color"
            >
              🎨
            </button>
            <button
              onClick={() => setBorderColor(prev => {
                const index = colorPalette.indexOf(prev);
                const nextIndex = (index + 1) % colorPalette.length;
                return colorPalette[nextIndex];
              })}
              aria-label="Change border"
            >
              🖌
            </button>

            <button
              onClick={() => setVisualEffect(prev => {
                const effects = ['shadow', 'glow', 'neon', 'vintage'];
                const index = effects.indexOf(prev);
                const nextIndex = (index + 1) % effects.length;
                return effects[nextIndex];
              })}
              aria-label="Visual effects"
            >
              ✨
            </button>

            <button onClick={resetSettings} aria-label="Reset settings">
              {"\u21BA"}
            </button>


          </div>




          <div className="customization-buttons">
            <div className="slider-container">
              <label htmlFor="border-width">{borderWidth}px</label>
              <input
                type="range"
                id="border-width"
                min="1"
                max="12"
                value={borderWidth}
                onChange={handleBorderWidthChange}
              />
            </div>

            <div className="slider-container">
              <label htmlFor="font-size">{fontSize}rem</label>
              <input
                type="range"
                id="font-size"
                min="1"
                max="4"
                step="0.2"
                value={fontSize}
                onChange={handleFontSizeChange}
              />
            </div>



          </div>


        </div>
      )}
    </main>
  );
}
