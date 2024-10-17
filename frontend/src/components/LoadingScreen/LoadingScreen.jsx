// src/components/LoadingScreen.js
import React from "react";
import "../../index.css";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div class="loader">
        <div class="loading-text">
          Loading<span class="dot">.</span>
          <span class="dot">.</span>
          <span class="dot">.</span>
        </div>
        <div class="loading-bar-background">
          <div class="loading-bar">
            <div class="white-bars-container">
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
              <div class="white-bar"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
