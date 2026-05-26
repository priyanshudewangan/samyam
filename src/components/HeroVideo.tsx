import React from "react";

export function HeroVideo() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {/* The YouTube background video iframe */}
      <iframe
        className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-full min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 opacity-100 transition-opacity duration-1000"
        src="https://www.youtube.com/embed/8KLVqSlHOog?autoplay=1&mute=1&loop=1&playlist=8KLVqSlHOog&controls=0&showinfo=0&rel=0&enablejsapi=1&modestbranding=1&iv_load_policy=3&playsinline=1"
        title="Samyam Background Video"
        allow="autoplay; encrypted-media"
        frameBorder="0"
      />
    </div>
  );
}
