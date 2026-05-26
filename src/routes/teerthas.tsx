import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import { useState } from "react";
import teerthas1 from "@/assets/teerthas1.jpg";

export const Route = createFileRoute("/teerthas")({
  component: TeerthasPage,
  head: () => ({
    title: "Sacred Teerthas — Samyam Spiritual Tourism",
    meta: [
      {
        name: "description",
        content:
          "The sacred geography of Bharat is intelligent and alive. Each kshetra awakens something precise in you.",
      },
    ],
  }),
});

const teerthasData = [
  {
    name: "Kashi (Varanasi)",
    desc: "City of Liberation. A living field of divine charge along the Ganga.",
    region: "North",
    duration: "3-7 days",
    img: "https://samyam.co/images/kashi.jpg",
  },
  {
    name: "Rameshwaram",
    desc: "One of the Char Dhams, known for sacred rituals and ocean purity.",
    region: "South",
    duration: "2-4 days",
    img: "https://samyam.co/images/rameshwaram.jpg",
  },
  {
    name: "Dwarka",
    desc: "Krishna's realm by the sea, steeped in devotion and wisdom.",
    region: "West",
    duration: "3-5 days",
    img: "https://samyam.co/images/dwarka.jpg",
  },
  {
    name: "Badrinath",
    desc: "The abode of Lord Vishnu, nestled in the Himalayas.",
    region: "North",
    duration: "4-6 days",
    img: "https://samyam.co/images/badrinath.jpg",
  },
  {
    name: "Jagannath Puri",
    desc: "The coastal shrine of Lord Jagannath, one of the Char Dhams.",
    region: "East",
    duration: "3-5 days",
    img: "https://samyam.co/images/puri.jpg",
  },
  {
    name: "Haridwar",
    desc: "Gateway to the Gods, where the Ganga enters the plains.",
    region: "North",
    duration: "2-4 days",
    img: "https://samyam.co/images/haridwar.jpg",
  },
  {
    name: "Ayodhya",
    desc: "The birthplace of Lord Rama, the city of righteousness.",
    region: "North",
    duration: "2-3 days",
    img: "https://samyam.co/images/ayodhya.jpg",
  },
  {
    name: "Mathura-Vrindavan",
    desc: "The land where Krishna performed his divine leelas.",
    region: "North",
    duration: "3-5 days",
    img: "https://samyam.co/images/mathura-vrindavan.jpg",
  },
  {
    name: "Shaktipeethas of Himachal",
    desc: "Sacred abodes of the Divine Mother, where the power of Shakti manifests in the pristine Himalayas.",
    region: "North",
    duration: "5-7 days",
    img: "https://samyam.co/images/himachal.jpg",
  },
];

const exploreOtherTeerthas = [
  { name: "Mathura Vrindavan", img: "https://samyam.co/images/mathura-vrindavan.jpg" },
  { name: "Dwarka Somnath", img: "https://samyam.co/images/dwarka.jpg" },
  { name: "Char Dham circuit", img: "https://samyam.co/images/chardham.jpg" },
  { name: "Uttarakhand chardham", img: "https://samyam.co/images/himachal.jpg" },
  { name: "Ayodhya", img: "https://samyam.co/images/ayodhya.jpg" },
  { name: "Haridwar Rishikesh", img: "https://samyam.co/images/haridwar.jpg" },
  { name: "Kancheepuram", img: "https://samyam.co/images/kancheepuram.jpg" },
  { name: "Puri Odissa", img: "https://samyam.co/images/puri.jpg" },
  { name: "Rameshwaram", img: "https://samyam.co/images/rameshwaram.jpg" },
  { name: "Tiruvannamalai", img: "https://samyam.co/images/tiruvannamalai.jpg" },
  { name: "Udaipur yatra circuit", img: "https://samyam.co/images/udaipur.jpg" },
];

function TeerthasPage() {
  const [activeRegion, setActiveRegion] = useState("All");
  const [activeSignificance, setActiveSignificance] = useState("All");

  const filteredTeerthas = teerthasData.filter(
    (t) => activeRegion === "All" || t.region === activeRegion
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#5c245e] text-white">
      <Nav />

      {/* HERO SECTION */}
      <section data-nav-theme="dark" className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={teerthas1}
            alt="Sacred Teerthas"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-[#5c245e]/75 backdrop-blur-[1px]"></div>
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-6 pt-20">
          <h1 className="text-5xl md:text-7xl font-display font-semibold text-white tracking-tight leading-tight">
            Sacred Teerthas
          </h1>
          <p className="text-white/90 text-sm md:text-lg max-w-2xl mx-auto font-body leading-relaxed">
            The sacred geography of Bharat is intelligent and alive. Each kshetra awakens something precise in you.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto relative mt-10">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/50">
              <span className="text-xl">⌕</span>
            </div>
            <input
              type="text"
              placeholder="Type a region, deity, or sacred story..."
              className="w-full pl-12 pr-6 py-4 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white placeholder:text-white/60 shadow-soft focus:outline-none focus:ring-2 focus:ring-accent/25 transition-all text-sm md:text-base font-body"
            />
          </div>
        </div>
      </section>

      {/* FILTERS SECTION */}
      <section data-nav-theme="dark" className="px-6 pb-12 max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row gap-10 md:items-center">
          {/* Regions */}
          <div className="space-y-4 flex-1">
            <h3 className="text-sm font-semibold text-white/65 uppercase tracking-widest font-body text-left">Regions</h3>
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {["All", "North", "South", "West", "East"].map((region) => (
                <button
                  key={region}
                  onClick={() => setActiveRegion(region)}
                  className={`shrink-0 px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeRegion === region
                      ? "bg-accent text-white shadow-md border border-accent"
                      : "bg-white/10 text-white/80 border border-white/10 hover:bg-white/20"
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          {/* Significance */}
          <div className="space-y-4 flex-1">
            <h3 className="text-sm font-semibold text-white/65 uppercase tracking-widest font-body text-left">Significance</h3>
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
              {["All", "Moksha", "Char Dham", "Kumbh Mela", "Ramayana", "Krishna", "Shaktipeethas"].map(
                (sig) => (
                  <button
                    key={sig}
                    onClick={() => setActiveSignificance(sig)}
                    className={`shrink-0 px-6 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      activeSignificance === sig
                        ? "bg-accent text-white shadow-md border border-accent"
                        : "bg-white/10 text-white/80 border border-white/10 hover:bg-white/20"
                    }`}
                  >
                    {sig}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* TEERTHAS GRID */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeerthas.map((teertha, idx) => (
            <div
              key={teertha.name + idx}
              className="group relative rounded-[2.5rem] bg-white/5 border border-white/10 overflow-hidden shadow-soft hover:shadow-glow hover:bg-white/10 hover:border-white/20 transition-all duration-500 flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img
                  src={teertha.img}
                  alt={teertha.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-2 text-white text-[10px] font-semibold uppercase tracking-widest">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg">{teertha.region}</span>
                  <span className="w-1 h-1 rounded-full bg-white/50" />
                  <span>{teertha.duration}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-1 text-left">
                <h3 className="text-2xl font-display font-semibold text-white mb-3">
                  {teertha.name}
                </h3>
                <p className="text-sm text-white/70 font-body leading-relaxed mb-8 flex-1">
                  {teertha.desc}
                </p>
                <Link
                  to="/enquire"
                  className="inline-flex items-center gap-2 text-xs font-bold text-accent hover:text-white transition-colors group/link w-fit"
                >
                  EXPLORE
                  <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center text-white/60 text-xs font-body tracking-wider">
          Showing {filteredTeerthas.length} of {teerthasData.length} teerthas
        </div>
      </section>

      {/* EXPLORE OTHER TEERTHAS SECTION */}
      <section data-nav-theme="light" className="relative py-24 px-6 bg-white border-y border-[#f5e3e6]/50 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
           <FlowerField count={4} />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-semibold text-primary">Explore Other Teerthas</h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto font-body">
              Discover more sacred destinations across Bharat. Click on any teertha to express your interest.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {exploreOtherTeerthas.map((item) => (
              <Link
                key={item.name}
                to="/enquire"
                className="group p-0 rounded-2xl bg-[#fffbfb] border border-[#f5e3e6] shadow-soft hover:shadow-glow hover:bg-[#fff6f4] hover:border-accent/40 transition-all duration-300 flex flex-col overflow-hidden"
              >
                <div className="aspect-video relative overflow-hidden">
                   <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6 text-left">
                  <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 block opacity-60 group-hover:opacity-100 transition-opacity">Click to explore</span>
                  <h4 className="text-lg font-display font-medium text-primary leading-tight">{item.name}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section data-nav-theme="dark" className="relative py-24 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-display font-semibold text-white leading-tight">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-white/80 text-base md:text-xl font-body max-w-2xl mx-auto">
            Let us help you choose the perfect teertha for your spiritual intent
          </p>
          <div className="pt-6">
            <Link
              to="/enquire"
              className="inline-flex items-center gap-4 px-10 py-5 bg-gradient-cta text-accent-foreground font-bold rounded-full shadow-glow hover:scale-[1.03] transition-all text-lg tracking-wide cursor-pointer"
            >
              Plan My Yatra
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
