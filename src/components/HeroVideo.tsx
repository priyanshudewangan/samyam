import React from "react";

export function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-100 transition-opacity duration-1000"
      >
        <source src="https://samyam.co/videos/first%20page.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
