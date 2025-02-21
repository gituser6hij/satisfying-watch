"use client";

import { useEffect, useState, useCallback } from "react";
import "./styles.css";

const fonts = [
  'Arial',
  'Verdana',
  'Impact',
  '"Roboto"',
  '"Montserrat"',
  '"Poppins"',         // Modern sans-serif
  '"Playfair Display"',// Elegant serif
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
];
const shapes = ['square', 'circle'];
const colorPalette = ['#e8c547ff', '#30323dff', '#4d5061ff', '#fe5f55ff', '#fceff9ff', '#f6ca83ff', '#f5d6baff', '#fff', '#000'];
const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove'];



export default function Home() {
  const [time, setTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [clockFont, setClockFont] = useState('Press Start 2P');
  const [clockShape, setClockShape] = useState('square');
  const [primaryColor, setPrimaryColor] = useState('#e8c547ff');
  const [borderColor, setBorderColor] = useState('#f5d6baff');
  const [borderWidth, setBorderWidth] = useState(4);
  const [visualEffect, setVisualEffect] = useState('default');
  const [showSettings, setShowSettings] = useState(false);

  const [fontSize, setFontSize] = useState(2); // in rem



  const backgrounds = ["--primary-color",
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
    "--lavender-blush", // Pale pink
    "black",
    "white"];
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
    "--lavender-blush", // Pale pink
    "black",
    "white"
  ];
  const [clockFontColor, setClockFontColor] = useState(fontColors[7]);

  const generateRandomDesign = useCallback(() => {
    // Random font
    const newFont = fonts[Math.floor(Math.random() * fonts.length)];
    // Random shape
    const newShape = shapes[Math.floor(Math.random() * shapes.length)];
    // Random colors
    const newPrimaryColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const newBorderColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    // Random border width (1-12)
    const newBorderWidth = Math.floor(Math.random() * 12) + 1;
    // Random visual effect
    const effects = ['shadow', 'glow', 'neon', 'vintage'];
    const newVisualEffect = effects[Math.floor(Math.random() * effects.length)];
    // Random font size (1-6 in 0.2 steps)
    const newFontSize = Math.floor(Math.random() * 26) * 0.2 + 1;
    // Random background and text color
    const newClockBackground = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    const newClockFontColor = fontColors[Math.floor(Math.random() * fontColors.length)];

    // Update all states
    setClockFont(newFont);
    setClockShape(newShape);
    setPrimaryColor(newPrimaryColor);
    setBorderColor(newBorderColor);
    setBorderWidth(newBorderWidth);
    setVisualEffect(newVisualEffect);
    setFontSize(newFontSize);
    setClockBackground(newClockBackground);
    setClockFontColor(newClockFontColor);
  }, []);

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
    let touchStartX = 0;
    let touchEndX = 0;
  
    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
    };
  
    const handleTouchMove = (e) => {
      touchEndX = e.touches[0].clientX;
    };
  
    const handleTouchEnd = () => {
      const swipeDistance = touchEndX - touchStartX;
      if (swipeDistance > 50 || swipeDistance < -50) {
        generateRandomDesign();
      }
    };
  
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);
  
    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [generateRandomDesign]);
  


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
        setFontSize(parsedPreferences.fontSize ?? 3.2);
        setClockBackground(parsedPreferences.clockBackground ?? backgrounds[2]); // Add this
        setClockFontColor(parsedPreferences.clockFontColor ?? fontColors[7]);    // Add this
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
    setClockFont('Press Start 2P');
    setClockShape('square');
    setPrimaryColor('--primary-color');
    setBorderColor('#3a3f4b');
    setBorderWidth(4);
    setVisualEffect('default');
    setFontSize(5);
    setClockBackground(backgrounds[2]);
    setClockFontColor(fontColors[7]);

    if (isMounted) {
      localStorage.setItem('clockPreferences', JSON.stringify({
        clockFont: 'Press Start 2P',
        clockShape: 'square',
        primaryColor: '--primary-color',
        borderColor: '#3a3f4b',
        borderWidth: 3,
        visualEffect: 'default',
        fontSize: 5,
        backgrounds: backgrounds[2],
        fontColors: fontColors[7],
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
              style={{ color: `var(${clockFontColor})` }} // Apply dynamic font color
            >
              {settingImage}
            </button>

            <button
              className="fullscreen-button"
              onClick={toggleFullScreen}
              aria-label="Toggle fullscreen"
              style={{ color: `var(${clockFontColor})` }} // Apply dynamic font color
            >
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
            <button onClick={() => setClockFont(prev => {
              const nextIndex = (fonts.indexOf(prev) + 1) % fonts.length;
              return fonts[nextIndex];
            })} aria-label="Change font">𝖠b</button>

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

            <button
              onClick={generateRandomDesign}
              aria-label="Random design"
              title="Randomize all settings"
            >
              🔀
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
                max="6"
                step="0.2"
                value={fontSize}
                onChange={handleFontSizeChange}
              />
            </div>



          </div>


        </div>
      )}
      <button className="randomize-button"
        onClick={generateRandomDesign}
        aria-label="Random design"
        title="Randomize all settings"
      >
        🔀
      </button>
    </main>
  );
}
