import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import { useState, useEffect } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { API_ENDPOINTS } from "@/lib/api-config";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  head: () => ({
    title: "Glimpses of Grace | Samyam Spiritual Tourism",
    meta: [
      {
        name: "description",
        content: "Visual stories and sacred memories from our spiritual journeys across Bharat.",
      },
    ],
  }),
});

const categories = [
  { id: "all", label: "All" },
  { id: "places-visited", label: "Places Visited" },
  { id: "activities-or-ritual", label: "Activities or Ritual" },
  { id: "landscapes-and-streets", label: "Landscapes and Streets" },
  { id: "people-and-emotions", label: "People and Emotions" },
];

function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="w-full h-full relative bg-black/10 overflow-hidden flex items-center justify-center">
      {!loaded && (
        <div className="absolute inset-0 bg-white/[0.03] animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
          loaded ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-md scale-105"
        }`}
        loading="lazy"
      />
    </div>
  );
}

function GalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);

  useEffect(() => {
    setLightboxLoaded(false);
  }, [lightboxIndex]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.GALLERY);
        const result = await res.json();
        if (result.success && result.data) {
          setImages(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch gallery images:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  const filteredImages = activeCategory === "all"
    ? images
    : images.filter((img) => img.category === activeCategory);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground flex flex-col justify-between">
      <Nav />

      {/* HERO SECTION */}
      <section
        data-nav-theme="dark"
        className="relative min-h-[50vh] md:min-h-[80vh] flex items-center justify-center pt-32 md:pt-40 pb-20 overflow-hidden text-center"
      >
        <FlowerField count={10} />
        
        {/* Background Image from samyam.co */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: "url(https://samyam.co/images/gallery.jpg)",
            backgroundPosition: "center center",
          }}
        />
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/75 z-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3d0068]/20 via-transparent to-transparent z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 w-full text-center flex flex-col items-center justify-center">
          <ScrollReveal variant="fade-up" delay={100}>
            <h1
              className="text-5xl md:text-8xl font-black mb-4 md:mb-6 leading-[0.95] text-white tracking-tight"
              style={{
                textShadow: "0 7px 50px rgba(0,0,0,0.9), 0 0 90px rgba(130,56,131,0.3)",
              }}
            >
              Glimpses of
              <br />
              <span className="text-amber-500">Grace</span>
            </h1>
          </ScrollReveal>
          
          <ScrollReveal variant="fade-up" delay={300}>
            <p
              className="text-base md:text-2xl opacity-90 max-w-2xl mx-auto leading-relaxed font-light text-white font-body"
              style={{
                textShadow: "0 3px 20px rgba(0,0,0,0.7)",
              }}
            >
              Visual stories from our sacred journeys across Bharat
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* STICKY CATEGORIES BAR */}
      <section
        data-nav-theme="light"
        className="py-4 md:py-6 sticky top-20 z-40 backdrop-blur-md border-b border-border"
        style={{ background: "rgba(255, 255, 255, 0.9)" }}
      >
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto no-scrollbar justify-start md:justify-center py-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIndex(null);
                }}
                className={`px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 shrink-0 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-amber-500 text-white shadow-soft"
                    : "bg-white/10 text-muted-foreground hover:bg-black/5 hover:text-foreground border border-border"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY GRID */}
      <section
        data-nav-theme="light"
        className="relative py-12 md:py-20 overflow-hidden bg-background text-foreground"
      >
        <FlowerField count={8} />
        
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          {loading ? (
            <div className="text-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500 mx-auto"></div>
              <p className="mt-4 text-muted-foreground text-sm font-body">Loading visual stories...</p>
            </div>
          ) : filteredImages.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 border border-border rounded-3xl">
              <p className="text-lg opacity-70">No images in this category yet.</p>
              <p className="text-xs text-muted-foreground mt-1">Please populate the gallery from the Admin Panel.</p>
            </div>
          ) : (
            <div
              className="grid gap-4 md:gap-6"
              style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
            >
              {filteredImages.map((item, idx) => (
                <ScrollReveal
                  key={item._id || idx}
                  variant="zoom-in"
                  delay={(idx % 4) * 100}
                >
                  <div
                    className="relative overflow-hidden rounded-[2rem] cursor-pointer group aspect-[4/5] md:aspect-square border border-border shadow-soft hover:shadow-glow hover:border-[#823883]/30 transition-all duration-500"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <GalleryImage src={item.img} alt={item.title || ""} />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                      <h4 className="text-white font-display text-xl md:text-2xl font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {item.title}
                      </h4>
                      <p className="text-amber-400 text-[10px] uppercase tracking-widest font-semibold mt-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {categories.find((c) => c.id === item.category)?.label || "Gallery"}
                      </p>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-xl">
                        🔍
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      {lightboxIndex !== null && filteredImages[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 transition-opacity duration-300"
          onClick={() => setLightboxIndex(null)}
        >
          <div className="relative max-w-5xl max-h-[80vh] w-full h-full flex flex-col items-center justify-center">
            {!lightboxLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full border-2 border-amber-500/20 border-t-amber-500 animate-spin" />
                <p className="text-white/40 text-xs font-body tracking-wider uppercase">Loading Image...</p>
              </div>
            )}
            <img
              src={filteredImages[lightboxIndex].img}
              alt={filteredImages[lightboxIndex].title || ""}
              onLoad={() => setLightboxLoaded(true)}
              className={`max-w-full max-h-full object-contain rounded-xl select-none transition-all duration-300 ${
                lightboxLoaded ? "opacity-100 scale-100 animate-fade-in" : "opacity-0 scale-95"
              }`}
              onClick={(e) => e.stopPropagation()}
            />
            {filteredImages[lightboxIndex].title && (
              <div
                className="absolute bottom-[-60px] text-white text-center font-display text-xl tracking-wide bg-black/60 px-6 py-2 rounded-full border border-white/10"
                onClick={(e) => e.stopPropagation()}
              >
                {filteredImages[lightboxIndex].title}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            className="absolute top-6 right-6 text-white hover:text-amber-400 transition-colors text-3xl font-light cursor-pointer select-none p-2"
            onClick={() => setLightboxIndex(null)}
          >
            ✕
          </button>

          {/* Left Arrow */}
          {lightboxIndex > 0 && (
            <button
              className="absolute left-6 text-white hover:text-amber-400 transition-colors text-6xl font-light cursor-pointer select-none p-4"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex - 1);
              }}
            >
              ‹
            </button>
          )}

          {/* Right Arrow */}
          {lightboxIndex < filteredImages.length - 1 && (
            <button
              className="absolute right-6 text-white hover:text-amber-400 transition-colors text-6xl font-light cursor-pointer select-none p-4"
              onClick={(e) => {
                e.stopPropagation();
                setLightboxIndex(lightboxIndex + 1);
              }}
            >
              ›
            </button>
          )}
        </div>
      )}

      {/* CTA SECTION */}
      <section
        data-nav-theme="dark"
        className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-[#823883] to-[#3D0068] text-white border-t border-white/5"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#3D0068]/20 to-[#FF7722]/20 z-0" />
        <div className="relative mx-auto max-w-4xl px-4 md:px-6 text-center z-10">
          <ScrollReveal variant="fade-up">
            <h2 className="text-3xl md:text-5xl font-semibold mb-4 text-white font-display">
              Experience It Yourself
            </h2>
            <p className="text-base md:text-lg opacity-90 mb-8 max-w-xl mx-auto leading-relaxed">
              These moments are just a glimpse. Join us on a journey of transformation and discover the mysticism of Bharat.
            </p>
            <Link
              to="/custom-yatra"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-lg bg-amber-500 hover:bg-amber-600 text-white transition-all hover:scale-105 shadow-glow"
            >
              Plan Your Journey
              <span>→</span>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
