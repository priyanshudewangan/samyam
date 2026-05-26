import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import { useState, useMemo } from "react";

export const Route = createFileRoute("/knowledge-portal")({
  component: KnowledgePortalPage,
  head: () => ({
    title: "Knowledge Portal — Samyam Spiritual Tourism",
    meta: [
      {
        name: "description",
        content:
          "Explore spiritual wisdom through curated videos and insights. Deep insights into the spiritual significance and mysticism of Kashi.",
      },
    ],
  }),
});

const JW = [
  {
    id: "kashi",
    title: "Kashi Knowledge Portal",
    desc: "Deep insights into the spiritual significance and mysticism of Kashi",
    videos: [
      { id: "kashi-1", url: "https://www.youtube.com/embed/LOqXUmuFGI4" },
      { id: "kashi-2", url: "https://www.youtube.com/embed/9ZgL-awjksM" },
      { id: "kashi-3", url: "https://www.youtube.com/embed/XBtWwbbTKtQ" },
      { id: "kashi-4", url: "https://www.youtube.com/embed/DPSJ8UE4fdE" },
      { id: "kashi-5", url: "https://www.youtube.com/embed/8KLVqSlHOog" },
    ],
  },
  {
    id: "quick-bits",
    title: "Kashi Knowledge Portal • Quick Bits",
    desc: "Short, snackable highlights from seeker testimonials and retreat diaries.",
    videos: [
      { id: "quick-1", url: "https://www.youtube.com/embed/dgPaPKni-Zs" },
      { id: "quick-2", url: "https://www.youtube.com/embed/TvDvO4pWxKw" },
      { id: "quick-3", url: "https://www.youtube.com/embed/_OrVLF9TOg4" },
      { id: "quick-4", url: "https://www.youtube.com/embed/7gFN5p76hzA" },
      { id: "quick-5", url: "https://www.youtube.com/embed/Bm8hXHnrHEY" },
      { id: "quick-6", url: "https://www.youtube.com/embed/-w46gutmf_k" },
      { id: "quick-7", url: "https://www.youtube.com/embed/3Wa0GT_wD3Y" },
      { id: "quick-8", url: "https://www.youtube.com/embed/wNXPNGwyrO8" },
      { id: "quick-9", url: "https://www.youtube.com/embed/bY3xrION1ao" },
      { id: "quick-10", url: "https://www.youtube.com/embed/HpZ-YHKZ7zo" },
      { id: "quick-11", url: "https://www.youtube.com/embed/rfi4DxmRlYs" },
      { id: "quick-12", url: "https://www.youtube.com/embed/PyEI36AxnVI" },
      { id: "quick-13", url: "https://www.youtube.com/embed/fAw1mg9h9hI" },
      { id: "quick-14", url: "https://www.youtube.com/embed/lzpfxgtlg8c" },
      { id: "quick-15", url: "https://www.youtube.com/embed/b5P501_bCQY" },
      { id: "quick-16", url: "https://www.youtube.com/embed/MIqGJ47e9SU" },
      { id: "quick-17", url: "https://www.youtube.com/embed/B_KBEGRkeis" },
      { id: "quick-18", url: "https://www.youtube.com/embed/ikDvCQNE4W8" },
    ],
  },
  {
    id: "testimonials",
    title: "Testimonials",
    desc: "Video essays from seekers coming soon.",
    videos: [
      { id: "testimonial-1", url: "https://www.youtube.com/embed/ZRXdapTdvCI" },
    ],
  },
];

const sidebarGuidelines = [
  {
    title: "Pre-yatra orientation",
    desc: "Assign these videos as homework so seekers arrive prepared for ritual flow and cultural nuances.",
  },
  {
    title: "Testimonials as learning tools",
    desc: "Play seeker stories in assemblies or circles to build anticipation and collective intent.",
  },
  {
    title: "Retreat highlights recap",
    desc: "Use the highlight reels as post-journey keepsakes for students, parents, or corporate teams.",
  },
];

function KnowledgePortalPage() {
  const [activeTab, setActiveTab] = useState("kashi");

  const currentCategory = useMemo(() => {
    return JW.find((cat) => cat.id === activeTab) || JW[0];
  }, [activeTab]);

  const [featuredVideo, ...otherVideos] = currentCategory.videos;

  const isKashi = activeTab === "kashi";

  return (
    <div
      className={`relative min-h-screen overflow-x-hidden transition-colors duration-500 flex flex-col justify-between ${
        isKashi ? "bg-[#fdfafb] text-primary" : "bg-[#1c081e] text-white"
      }`}
    >
      <Nav />

      {/* HERO SECTION */}
      <section
        data-nav-theme="dark"
        className="relative min-h-[50vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image & Mystical Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://samyam.co/images/knowledge.jpeg"
            alt="Sacred Wisdom"
            className="w-full h-full object-cover object-center filter brightness-50"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-b from-[#1c081e]/40 via-[#1c081e]/60 transition-colors duration-500 ${
              isKashi ? "to-[#fdfafb]" : "to-[#1c081e]"
            }`}
          ></div>
        </div>

        <FlowerField count={18} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6 pt-24 fade-up">
          <p className="font-display italic text-accent text-lg md:text-xl tracking-wider">
            ॥ ज्ञानं परमं बलम् ॥
          </p>
          <h1
            className="text-5xl md:text-8xl font-display font-semibold text-white tracking-tight leading-none"
            style={{
              textShadow:
                "0 6px 40px rgba(0,0,0,0.8), 0 0 60px rgba(174,49,100,0.3)",
            }}
          >
            Knowledge Portal
          </h1>
          <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto font-body leading-relaxed">
            Explore spiritual wisdom through curated videos and insights. Prepare your mind and
            heart before embarking on your sacred pilgrimage.
          </p>
        </div>
      </section>

      {/* STICKY TAB SELECTOR */}
      <section
        data-nav-theme={isKashi ? "light" : "dark"}
        className={`sticky top-[76px] md:top-[80px] z-40 border-y transition-all duration-500 backdrop-blur-md ${
          isKashi
            ? "border-black/10 bg-[#fdfafb]/90 text-primary"
            : "border-white/10 bg-[#1c081e]/85 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex md:justify-center overflow-x-auto no-scrollbar py-2 md:py-0">
            <div className="flex gap-2 md:gap-8 w-full md:w-auto">
              {JW.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`px-5 py-3 md:py-5 font-display text-sm md:text-base font-semibold border-b-2 transition-all duration-300 text-left md:text-center shrink-0 cursor-pointer ${
                    activeTab === cat.id
                      ? "border-saffron text-saffron bg-white/5 md:bg-transparent"
                      : isKashi
                        ? "border-transparent text-primary/60 hover:text-primary hover:bg-black/5 md:hover:bg-transparent"
                        : "border-transparent text-white/60 hover:text-white hover:bg-white/5 md:hover:bg-transparent"
                  }`}
                >
                  {cat.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEOS SECTION */}
      <main
        data-nav-theme={isKashi ? "light" : "dark"}
        className="flex-1 py-12 md:py-20 max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10"
      >
        {/* Tab Intro Header */}
        <div className="text-center mb-10 md:mb-16 space-y-4 fade-up">
          <h2
            className={`text-3xl md:text-5xl font-display font-semibold transition-colors duration-500 ${
              isKashi ? "text-primary" : "text-white"
            }`}
          >
            {currentCategory.title}
          </h2>
          <p
            className={`text-sm md:text-lg max-w-2xl mx-auto font-body transition-colors duration-500 ${
              isKashi ? "text-muted-foreground" : "text-white/70"
            }`}
          >
            {currentCategory.desc}
          </p>
        </div>

        {/* Featured Video + Sidebar layout */}
        <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-6 md:gap-10 items-start mb-16">
          {/* Featured Video Frame */}
          {featuredVideo ? (
            <div
              className={`group rounded-3xl overflow-hidden shadow-glow flex flex-col fade-up border transition-all duration-500 ${
                isKashi ? "bg-white border-[#f5e3e6]" : "bg-white/5 border-white/10"
              }`}
            >
              <div className="aspect-video bg-black/40 relative">
                <iframe
                  src={featuredVideo.url}
                  title="Featured Spiritual Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
              <div className="p-6 md:p-8 text-left space-y-2">
                <span className="text-[10px] font-bold text-saffron uppercase tracking-widest">
                  Featured Capsule
                </span>
                <p
                  className={`text-sm leading-relaxed font-body transition-colors duration-500 ${
                    isKashi ? "text-muted-foreground" : "text-white/80"
                  }`}
                >
                  Use this video to prime your seekers and align your group's consciousness before
                  stepping onto the sacred kshetra.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-white/20 p-12 text-center text-white/50">
              No videos available in this category.
            </div>
          )}

          {/* Sidebar Orientation Guidelines */}
          <div className="space-y-4 md:space-y-6 text-left w-full fade-up">
            <h3
              className={`text-xs font-bold uppercase tracking-widest font-body transition-colors duration-500 ${
                isKashi ? "text-primary/50" : "text-white/50"
              }`}
            >
              How to use these resources
            </h3>
            {sidebarGuidelines.map((guide, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border transition-all duration-500 space-y-2 ${
                  isKashi
                    ? "bg-white border-[#f5e3e6] shadow-soft hover:border-accent/40"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                }`}
              >
                <h4 className="text-lg font-display font-semibold text-saffron">{guide.title}</h4>
                <p
                  className={`text-sm font-body leading-relaxed transition-colors duration-500 ${
                    isKashi ? "text-muted-foreground" : "text-white/75"
                  }`}
                >
                  {guide.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Other Videos Grid */}
        {otherVideos.length > 0 && (
          <div className="space-y-8 text-left">
            <h3
              className={`text-xl md:text-3xl font-display font-semibold border-b pb-4 transition-colors duration-500 ${
                isKashi
                  ? "text-primary border-black/10"
                  : "text-white/90 border-white/10"
              }`}
            >
              More Insights
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherVideos.map((video) => (
                <div
                  key={video.id}
                  className={`group rounded-2xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col border ${
                    isKashi
                      ? "bg-white border-[#f5e3e6] hover:border-accent/40"
                      : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="aspect-video relative bg-black/30">
                    <iframe
                      src={video.url}
                      title="Spiritual Insight Video"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer capsule submission card */}
        <div className="mt-16 md:mt-24 p-8 rounded-3xl bg-gradient-cta text-center space-y-4 shadow-glow max-w-3xl mx-auto">
          <span className="text-3xl">ॐ</span>
          <h3 className="text-2xl font-display font-semibold text-accent-foreground">
            Share Your Experience
          </h3>
          <p className="text-accent-foreground/90 max-w-xl mx-auto text-sm leading-relaxed">
            Have a profound spiritual testimony, chanting recording, or knowledge capsule you'd like
            us to feature in our library? Connect with our team.
          </p>
          <div className="pt-2">
            <a
              href="mailto:samyamspirituals@gmail.com"
              className="inline-block px-8 py-3 bg-white text-primary font-bold rounded-full shadow-soft hover:scale-105 transition-all text-sm tracking-wide"
            >
              samyamspirituals@gmail.com
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
