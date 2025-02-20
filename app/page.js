"use client";

import { useEffect, useState } from "react";
import "./styles.css"; // Import the CSS file

<link rel="icon" href="/favicon.ico" sizes="any" />

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(new Date());
  const [currentDesign, setCurrentDesign] = useState(1); // Start with first design

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX - touchEndX > 50) {
      // Swipe left -> Next design
      setCurrentDesign((prev) => (prev < 3 ? prev + 1 : 1));
    } else if (touchEndX - touchStartX > 50) {
      // Swipe right -> Previous design
      setCurrentDesign((prev) => (prev > 1 ? prev - 1 : 3));
    }
  };



  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num) => {
    return num.toString().padStart(2, "0");
  };

  if (!mounted) {
    return (
      <main className="container">
        <div className="clock-container">
          <div className="clock">
            <span className="digit">00</span>:<span className="digit">00</span>:<span className="digit">00</span>
          </div>
          <div className="loading-text">Loading...</div>
        </div>
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </main>
    );
  }

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  // Function to change design
  const changeDesign = (newDesign) => {
    setCurrentDesign(newDesign);
  };

  return (
    <main className="container"


      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}

    >




    
      <div className={`clock-container design-${currentDesign}`}>

        <button className="nav-arrow left-arrow" onClick={() => changeDesign(currentDesign > 1 ? currentDesign - 1 : 3)}>
          {"\u25C0"} {/* Left arrow */}
        </button>

        <button className="nav-arrow right-arrow" onClick={() => changeDesign(currentDesign < 3 ? currentDesign + 1 : 1)}>
          {"\u25B6"} {/* Right arrow */}
        </button>

        <div className="clock">
          <span className="digit">{formatNumber(time.getHours())}</span>
          <span className="blink">:</span>
          <span className="digit">{formatNumber(time.getMinutes())}</span>
          <span className="blink">:</span>
          <span className="digit">{formatNumber(time.getSeconds())}</span>
        </div>





        <div className="date">
          {time.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>



        {currentDesign === 1 && (
          <>
            <div className="dots">
              <div className="dot" onClick={() => changeDesign(1)}></div>
              <div className="dot-dark" onClick={() => changeDesign(2)}></div>
              <div className="dot-dark" onClick={() => changeDesign(3)}></div>
            </div>

          </>
        )}

        {currentDesign === 2 && (
          <>
            <div className="dots">
              <div className="dot-dark" onClick={() => changeDesign(1)}></div>
              <div className="dot" onClick={() => changeDesign(2)}></div>
              <div className="dot-dark" onClick={() => changeDesign(3)}></div>
            </div>


          </>
        )}

        {currentDesign === 3 && (
          <>

            <div className="dots">
              <div className="dot-dark" onClick={() => changeDesign(1)}></div>
              <div className="dot-dark" onClick={() => changeDesign(2)}></div>
              <div className="dot" onClick={() => changeDesign(3)}></div>
            </div>
          </>
        )}

        <button className="fullscreen-button" onClick={toggleFullScreen}>
          {"\u26F6"}
        </button>

      </div>

    </main>
  );
}