import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import { useState, useMemo, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { API_ENDPOINTS } from "@/lib/api-config";

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
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.TESTIMONIALS);
        const result = await res.json();
        if (result.success && result.data && result.data.length > 0) {
          setVideos(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch videos:", err);
      }
    };
    fetchVideos();
  }, []);

  const dynamicJW = useMemo(() => {
    const categories = [
      {
        id: "kashi",
        title: "Kashi Knowledge Portal",
        desc: "Deep insights into the spiritual significance and mysticism of Kashi",
        videos: [] as { id: string; url: string }[]
      },
      {
        id: "quick-bits",
        title: "Kashi Knowledge Portal • Quick Bits",
        desc: "Short, snackable highlights from seeker testimonials and retreat diaries.",
        videos: [] as { id: string; url: string }[]
      },
      {
        id: "testimonials",
        title: "Testimonials",
        desc: "Video essays from seekers coming soon.",
        videos: [] as { id: string; url: string }[]
      }
    ];

    if (videos.length === 0) {
      return JW;
    }

    videos.forEach((v, idx) => {
      let catId = "";
      if (v.category === "Kashi Knowledge Portal") catId = "kashi";
      if (v.category === "Kashi Knowledge Portal • Quick Bits") catId = "quick-bits";
      if (v.category === "Testimonials (Coming Soon)") catId = "testimonials";

      const cat = categories.find(c => c.id === catId);
      if (cat) {
        cat.videos.push({
          id: v._id || `vid-${idx}`,
          url: v.youtubeLink
        });
      }
    });

    return categories;
  }, [videos]);

  const currentCategory = useMemo(() => {
    return dynamicJW.find((cat) => cat.id === activeTab) || dynamicJW[0];
  }, [activeTab, dynamicJW]);

  const [featuredVideo, ...otherVideos] = currentCategory.videos || [];

  const isKashi = activeTab === "kashi";

  return (
    <div
      className="relative min-h-screen overflow-x-hidden transition-colors duration-500 bg-background text-foreground flex flex-col justify-between"
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
            className="absolute inset-0 bg-gradient-to-b from-[#1c081e]/40 via-[#1c081e]/60 to-[#1c081e] transition-colors duration-500"
          ></div>
        </div>

        <FlowerField count={18} />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6 pt-24">
          <ScrollReveal variant="fade-in" delay={100}>
            <p className="font-display italic text-accent text-lg md:text-xl tracking-wider">
              ॥ ज्ञानं परमं बलम् ॥
            </p>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={250}>
            <h1
              className="text-5xl md:text-8xl font-display font-semibold text-white tracking-tight leading-none"
              style={{
                textShadow:
                  "0 6px 40px rgba(0,0,0,0.8), 0 0 60px rgba(174,49,100,0.3)",
              }}
            >
              Knowledge Portal
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={400}>
            <p className="text-white/80 text-sm md:text-lg max-w-2xl mx-auto font-body leading-relaxed">
              Explore spiritual wisdom through curated videos and insights. Prepare your mind and
              heart before embarking on your sacred pilgrimage.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* STICKY TAB SELECTOR */}
      <section
        data-nav-theme="light"
        className="sticky top-[76px] md:top-[80px] z-40 border-y transition-all duration-500 backdrop-blur-md border-border bg-background/85 text-foreground"
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
                      ? "border-amber-600 text-amber-600 bg-muted/50 md:bg-transparent"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted md:hover:bg-transparent"
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
        data-nav-theme="light"
        className="flex-1 py-12 md:py-20 max-w-7xl mx-auto px-4 md:px-8 w-full relative z-10 text-foreground"
      >
        {/* Tab Intro Header */}
        <ScrollReveal variant="fade-up">
          <div className="text-center mb-10 md:mb-16 space-y-4">
            <h2
              className="text-3xl md:text-5xl font-display font-semibold text-foreground"
            >
              {currentCategory.title}
            </h2>
            <p
              className="text-sm md:text-lg max-w-2xl mx-auto font-body text-muted-foreground"
            >
              {currentCategory.desc}
            </p>
          </div>
        </ScrollReveal>

        {/* Featured Video + Sidebar layout */}
        <div className="grid lg:grid-cols-[1.5fr_0.7fr] gap-6 md:gap-10 items-start mb-16">
          {/* Featured Video Frame */}
          {featuredVideo ? (
            <ScrollReveal variant="fade-up" className="h-full">
              <div
                className="group rounded-3xl overflow-hidden shadow-glow flex flex-col border bg-white border-black/[0.06] transition-all duration-300 h-full"
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
                <div className="p-6 md:p-8 text-left space-y-2 flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest font-body">
                    Featured Capsule
                  </span>
                  <p
                    className="text-sm leading-relaxed font-body text-muted-foreground transition-colors duration-500"
                  >
                    Use this video to prime your seekers and align your group's consciousness before
                    stepping onto the sacred kshetra.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ) : (
            <div className="rounded-3xl border border-dashed border-border p-12 text-center text-muted-foreground">
              No videos available in this category.
            </div>
          )}

          {/* Sidebar Orientation Guidelines */}
          <div className="space-y-4 md:space-y-6 text-left w-full">
            <ScrollReveal variant="fade-up">
              <h3
                className="text-xs font-bold uppercase tracking-widest font-body text-muted-foreground"
              >
                How to use these resources
              </h3>
            </ScrollReveal>
            {sidebarGuidelines.map((guide, idx) => (
              <ScrollReveal
                key={idx}
                variant="fade-up"
                delay={idx * 150}
              >
                <div
                  className="p-6 rounded-2xl border transition-all duration-300 space-y-2 bg-white border-black/[0.06] shadow-soft hover:border-amber-600/30 hover:bg-muted"
                >
                  <h4 className="text-lg font-display font-semibold text-amber-600">{guide.title}</h4>
                  <p
                    className="text-sm font-body leading-relaxed text-muted-foreground"
                  >
                    {guide.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Other Videos Grid */}
        {otherVideos.length > 0 && (
          <div className="space-y-8 text-left">
            <ScrollReveal variant="fade-up">
              <h3
                className="text-xl md:text-3xl font-display font-semibold border-b pb-4 text-foreground border-border"
              >
                More Insights
              </h3>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherVideos.map((video, idx) => (
                <ScrollReveal
                  key={video.id}
                  variant="fade-up"
                  delay={(idx % 3) * 150}
                >
                  <div
                    className="group rounded-2xl overflow-hidden shadow-soft hover:shadow-glow hover:-translate-y-1 transition-all duration-300 flex flex-col border bg-white border-black/[0.06] hover:border-amber-600/30 hover:bg-muted"
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
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}

        {/* Footer capsule submission card */}
        <ScrollReveal variant="scale-up">
          <div className="mt-16 md:mt-24 p-8 rounded-3xl bg-gradient-cta text-center space-y-4 shadow-glow max-w-3xl mx-auto">
            <span className="text-3xl">ॐ</span>
            <h3 className="text-2xl font-display font-semibold text-white">
              Share Your Experience
            </h3>
            <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed font-body">
              Have a profound spiritual testimony, chanting recording, or knowledge capsule you'd like
              us to feature in our library? Connect with our team.
            </p>
            <div className="pt-2 font-body">
              <a
                href="mailto:samyamspirituals@gmail.com"
                className="inline-block px-8 py-3 bg-white text-[#1c081e] hover:bg-white/90 font-bold rounded-full shadow-soft hover:scale-105 transition-all text-sm tracking-wide"
              >
                samyamspirituals@gmail.com
              </a>
            </div>
          </div>
        </ScrollReveal>
      </main>

      <Footer />
    </div>
  );
}
