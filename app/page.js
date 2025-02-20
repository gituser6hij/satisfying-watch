"use client";

import { useEffect, useState, useCallback } from "react";
import "./styles.css";

const fonts = [
  '"Courier New"', 'Arial', 'Georgia', 'Verdana', 'Impact',
  'Trebuchet MS', '"Roboto"', '"Orbitron"', '"Montserrat"'
];
const shapes = ['square', 'circle'];
const colorPalette = ['#c678dd', '#61afef', '#e06c75', '#98c379', '#e5c07b', '#56b6c2', '#abb2bf'];
const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'groove'];

export default function Home() {
  const [time, setTime] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const [clockFont, setClockFont] = useState('monospace');
  const [clockShape, setClockShape] = useState('square');
  const [primaryColor, setPrimaryColor] = useState('#c678dd');
  const [borderColor, setBorderColor] = useState('#3a3f4b');
  const [borderWidth, setBorderWidth] = useState(4);
  const [visualEffect, setVisualEffect] = useState('default');
  const [showSettings, setShowSettings] = useState(false);

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
      };
      localStorage.setItem('clockPreferences', JSON.stringify(preferences));
    }
  }, [clockFont, clockShape, primaryColor, borderColor, borderWidth, visualEffect, isMounted]);

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

  return (
    <main className="container">
      {isMounted && time ? (
        <div
          className={`clock-container ${clockShape} ${visualEffect}`}
          style={{
            '--primary-color': primaryColor,
            '--border-color': borderColor,
            fontFamily: clockFont,
            border: `${borderWidth}px solid ${borderColor}`,
          }}
        >
          <div className="clock">
            {[time.getHours(), time.getMinutes(), time.getSeconds()].map((t, i) => (
              <span key={i} className="digit">
                {formatNumber(t)}
                {i < 2 && <span className="blink">:</span>}
              </span>
            ))}
          </div>
          <div className="date">
            {time.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}

      <button
        className="settings-button"
        onClick={() => setShowSettings(!showSettings)}
        aria-label="Settings"
        title="Settings"
      >
        ⚙️
      </button>

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
            <button onClick={() => setClockShape(shapes[Math.floor(Math.random() * shapes.length)])} aria-label="Change shape">◻️</button>
            <button onClick={() => setPrimaryColor(colorPalette[Math.floor(Math.random() * colorPalette.length)])} aria-label="Change color">🎨</button>
            <button onClick={() => setBorderColor(`hsl(${Math.random() * 360}, 70%, 50%)`)} aria-label="Change border">🖌</button>
            <button onClick={() => setVisualEffect(['shadow', 'glow', 'neon', 'vintage'][Math.floor(Math.random() * 4)])} aria-label="Visual effects">✨</button>
          </div>

          <button className="fullscreen-button" onClick={toggleFullScreen} aria-label="Toggle fullscreen">
            ⛶
          </button>

          <button onClick={resetSettings} aria-label="Reset settings">
            🔄 Reset
          </button>

          <div className="slider-container">
            <label htmlFor="border-width">{borderWidth}px</label>
            <input
              type="range"
              id="border-width"
              min="1"
              max="15"
              value={borderWidth}
              onChange={handleBorderWidthChange}
            />
          </div>
        </div>
      )}
    </main>
  );
}
