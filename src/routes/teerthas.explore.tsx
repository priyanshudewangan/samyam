import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import { teerthaDetailsDb, TeerthaDetail } from "@/constants/teertha-details";

// Define search query schema for TanStack Router
const exploreSearchSchema = z.object({
  teertha: z.string().optional(),
});

export const Route = createFileRoute("/teerthas/explore")({
  validateSearch: exploreSearchSchema,
  component: ExploreTeerthasPage,
  head: () => ({
    title: "Explore Teertha — Samyam Spiritual Tourism",
    meta: [
      {
        name: "description",
        content: "Explore the deep spiritual itinerary, inclusions, and sacred darshans for Samyam's curated teertha journeys.",
      },
    ],
  }),
});

type TeerthaSlug = keyof typeof teerthaDetailsDb;

function ExploreTeerthasPage() {
  const search = Route.useSearch();
  const initialSlug = (search.teertha as TeerthaSlug) || "kashi";

  const [selectedTeertha, setSelectedTeertha] = useState<TeerthaSlug>(initialSlug);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "itinerary" | "prep">("overview");

  // Keep slug synced with search parameters if they change
  useEffect(() => {
    if (search.teertha && teerthaDetailsDb[search.teertha as TeerthaSlug]) {
      setSelectedTeertha(search.teertha as TeerthaSlug);
    }
  }, [search.teertha]);

  const activeTeertha = teerthaDetailsDb[selectedTeertha] || teerthaDetailsDb["kashi"];

  // Get all teertha slugs for the selector
  const allTeerthas = Object.values(teerthaDetailsDb);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* HERO SECTION */}
      <section data-nav-theme="dark" className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeTeertha.img}
            alt={activeTeertha.name}
            className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a1e] via-[#1a0a1e]/40 to-[#1a0a1e]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <span className="inline-block px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-4">
            {activeTeertha.tagline}
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-semibold text-white tracking-wide leading-tight">
            {activeTeertha.name}
          </h1>
          <p className="text-white/80 text-xs md:text-sm tracking-[0.1em] font-medium uppercase font-body mt-2">
            {activeTeertha.duration} &nbsp;•&nbsp; {activeTeertha.region}
          </p>
        </div>
      </section>

      {/* BRAND SLOGAN BANNER */}
      <div className="text-center py-4 border-b border-white/10 bg-[#1c081e]/60 select-none">
        <p className="text-[10px] md:text-xs tracking-[0.45em] font-semibold text-amber-400 uppercase animate-pulse">
          {activeTeertha.slogan}
        </p>
      </div>

      {/* SELECTOR TAB BAR */}
      <div className="bg-background/90 border-b border-border sticky top-16 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {allTeerthas.map((item) => (
            <button
              key={item.slug}
              onClick={() => {
                setSelectedTeertha(item.slug as TeerthaSlug);
                setActiveSubTab("overview");
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[10px] md:text-xs font-medium transition cursor-pointer ${
                selectedTeertha === item.slug
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
              }`}
            >
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* DETAILED CONTENT SECTION */}
      <section data-nav-theme="light" className="relative py-12 px-4 md:px-8 bg-background text-foreground min-h-[60vh]">
        <FlowerField count={8} />
        <div className="max-w-6xl mx-auto relative z-10">

          {/* Sub Navigation Bar */}
          <div className="flex justify-center border-b border-border mb-8 max-w-md mx-auto">
            {[
              { id: "overview", label: "Overview" },
              { id: "itinerary", label: "Day-wise Itinerary" },
              { id: "prep", label: "Preparation Guide" },
            ].map((subTab) => (
              <button
                key={subTab.id}
                onClick={() => setActiveSubTab(subTab.id as any)}
                className={`flex-1 pb-3 text-sm font-medium tracking-wide border-b-2 transition cursor-pointer text-center ${
                  activeSubTab === subTab.id
                    ? "border-amber-600 text-foreground font-semibold"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {subTab.label}
              </button>
            ))}
          </div>

          {/* TAB PANELS */}
          <div className="transition-all duration-300">
            {activeSubTab === "overview" && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left side: Overview text & pricing */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <div className="space-y-3">
                      <span className="text-amber-600 font-bold text-xs uppercase tracking-wider block">
                        Spiritual Calling
                      </span>
                      <h3 className="text-3xl font-display font-semibold text-foreground">
                        {activeTeertha.name} — Overview
                      </h3>
                      <p className="text-xs md:text-sm font-medium text-muted-foreground">
                        📅 {activeTeertha.date} &nbsp;•&nbsp; ⏱️ {activeTeertha.duration}
                      </p>
                    </div>

                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                      {activeTeertha.desc}
                    </p>

                    {/* Highlights */}
                    <div className="flex flex-wrap gap-2">
                      {activeTeertha.highlights.map((highlight, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 text-[10px] font-semibold font-body"
                        >
                          ✦ {highlight}
                        </span>
                      ))}
                    </div>

                    {/* Pricing Badges */}
                    <div className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-3 shadow-soft">
                      <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase font-body">
                        Investment & Occupancy Details
                      </h4>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1 p-3.5 rounded-2xl bg-muted border border-border flex flex-col justify-center items-center shadow-soft hover:border-amber-600/30 transition duration-300">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">Triple Occupancy</span>
                          <span className="text-sm md:text-base font-semibold text-amber-600 mt-1">{activeTeertha.triplePrice}</span>
                        </div>
                        <div className="flex-1 p-3.5 rounded-2xl bg-muted border border-border flex flex-col justify-center items-center shadow-soft hover:border-amber-600/30 transition duration-300">
                          <span className="text-[10px] text-muted-foreground uppercase font-bold">Double Occupancy</span>
                          <span className="text-sm md:text-base font-semibold text-amber-600 mt-1">{activeTeertha.doublePrice}</span>
                        </div>
                      </div>
                    </div>

                    {/* Call to Action */}
                    <div className="pt-2 flex flex-wrap gap-4">
                      <Link
                        to="/enquire"
                        className="px-8 py-3 bg-gradient-cta text-accent-foreground font-semibold rounded-full text-sm shadow-soft hover:scale-[1.03] transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Book This Package ➔
                      </Link>
                      <Link
                        to="/custom-yatra"
                        className="px-8 py-3 bg-muted border border-border text-foreground font-semibold rounded-full text-sm shadow-soft hover:scale-[1.03] hover:border-amber-600/40 transition flex items-center justify-center gap-2 cursor-pointer"
                      >
                        Customize This Journey
                      </Link>
                    </div>
                  </div>

                  {/* Right side: Inclusions List */}
                  <div className="lg:col-span-5 p-8 rounded-3xl bg-white border border-black/[0.06] text-foreground space-y-6 shadow-glow relative overflow-hidden text-left hover:border-amber-600/30 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                    <h3 className="text-xl font-display font-semibold border-b border-border pb-3 flex items-center gap-2 text-foreground">
                      <span>✨</span> All Inclusions
                    </h3>
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      Everything you need for a transformative journey
                    </p>
                    <ul className="space-y-4 text-xs md:text-sm text-muted-foreground">
                      {activeTeertha.inclusions.map((item, idx) => (
                        <li key={idx} className="flex gap-3 items-start leading-relaxed">
                          <span className="text-amber-600 text-base mt-0.5">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stays Section */}
                <div className="p-8 md:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:border-amber-600/30 transition-all duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8 space-y-3 text-left">
                      <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider inline-block">
                        Accommodations
                      </span>
                      <h3 className="text-2xl font-display font-semibold text-foreground">
                        {activeTeertha.staysHeading}
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-body">
                        {activeTeertha.staysDesc}
                      </p>
                    </div>
                    <div className="md:col-span-4 flex justify-center">
                      <div className="w-20 h-20 rounded-3xl bg-muted border border-border flex items-center justify-center text-4xl shadow-soft">
                        🏨
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sacred Darshans Circuit */}
                <div className="border-t border-border pt-12">
                  <div className="text-center mb-10">
                    <h3 className="text-3xl font-display font-semibold text-foreground">
                      Sacred Darshans
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground mt-2">
                      Experience the divine presence at sacred sites
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {activeTeertha.darshans.map((category, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-6 md:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:shadow-glow hover:border-amber-600/30 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-600 mb-2 block">
                            Sacred Circuit
                          </span>
                          <h4 className="text-lg font-display font-semibold text-foreground mb-4 border-b border-border pb-2">
                            {category.title}
                          </h4>
                          <ul className="space-y-3.5 text-xs md:text-sm text-muted-foreground">
                            {category.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex gap-3 items-center">
                                <span className="text-amber-600 font-bold text-sm">✓</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === "itinerary" && (
              <div className="max-w-4xl mx-auto text-left">
                <div className="text-center mb-10">
                  <h3 className="text-3xl font-display font-semibold text-foreground">
                    Day-wise Itinerary
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground mt-2 italic">
                    Schedule subject to shift in timings based on local conditions
                  </p>
                </div>

                {/* Timeline */}
                <div className="relative border-l border-border ml-4 md:ml-8 pl-8 md:pl-10 space-y-8 py-4">
                  {activeTeertha.itinerary.map((dayItem, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline dot */}
                      <span className="absolute -left-[45px] md:-left-[53px] top-2.5 w-6 h-6 rounded-full bg-background border-2 border-amber-600 flex items-center justify-center text-[10px] font-bold text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition duration-300">
                        {dayItem.day}
                      </span>

                      {/* Content Card */}
                      <div className="p-6 md:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:shadow-glow hover:border-amber-600/20 transition duration-300">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/25">
                          Day {dayItem.day}
                        </span>

                        <ul className="mt-4 space-y-3.5 text-xs md:text-sm text-muted-foreground list-none font-body">
                          {dayItem.points.map((pointText, pIdx) => (
                            <li key={pIdx} className="flex gap-3 items-start leading-relaxed">
                              <span className="text-amber-600 text-base leading-none select-none mt-0.5">•</span>
                              <span>{pointText}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Book callout */}
                <div className="mt-12 text-center">
                  <Link
                    to="/enquire"
                    className="px-8 py-3 bg-gradient-cta text-accent-foreground font-semibold rounded-full text-sm shadow-soft hover:scale-[1.03] transition inline-flex items-center gap-2 cursor-pointer"
                  >
                    Book This Package ➔
                  </Link>
                </div>
              </div>
            )}

            {activeSubTab === "prep" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                {/* Spiritual Preparation Card */}
                <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:border-amber-600/30 transition duration-300 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-2xl text-amber-600 border border-amber-500/20">
                    📿
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground">
                    Spiritual Swadhyay & Prep
                  </h3>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-body">
                    Unlike ordinary tours, a Samyam yatra is an energetic experience. We request all seekers to engage in spiritual preparation before departure to make their system receptive.
                  </p>
                  <ul className="space-y-4 text-xs md:text-sm text-muted-foreground font-body">
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">•</span>
                      <span>Engage in regular mantra chanting or light dhyan practice for at least 2 weeks before the yatra.</span>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">•</span>
                      <span>Read scripture passages relating to the history and significance of {activeTeertha.name}.</span>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">•</span>
                      <span>Maintain a clean, devotional mindset leading up to departure. Reduce screen time and worldly distractions.</span>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">•</span>
                      <span>Begin a sattvik diet at least one week before the journey to prepare your body and mind.</span>
                    </li>
                  </ul>
                </div>

                {/* Practical Advice Card */}
                <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:border-amber-600/30 transition duration-300 space-y-6">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl text-purple-600 border border-purple-500/20">
                    🎒
                  </div>
                  <h3 className="text-2xl font-display font-semibold text-foreground">
                    Seeker's Conduct (Yatra Maryada)
                  </h3>
                  <ul className="space-y-4 text-xs md:text-sm text-muted-foreground font-body">
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">1.</span>
                      <span><strong>Sattvik Diet:</strong> Seekers must adhere to strictly vegetarian, eggless meals throughout the yatra duration.</span>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">2.</span>
                      <span><strong>Dress Code:</strong> Traditional Indian clothing (kurta/dhoti/saree/salwar suit) is highly encouraged inside temples.</span>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">3.</span>
                      <span><strong>Eco-Conscious Conduct:</strong> Respect the local ecology of sacred sites; strictly avoid plastic waste.</span>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">4.</span>
                      <span><strong>Group Harmony:</strong> Maintain punctuality and respect fellow seekers' space during meditation and darshan.</span>
                    </li>
                    <li className="flex gap-3 items-start leading-relaxed">
                      <span className="text-amber-600 font-bold mt-0.5">5.</span>
                      <span><strong>Digital Detox:</strong> Minimize phone usage during sacred experiences. Be present in the moment.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* OTHER TEERTHAS CTA */}
      <section className="py-16 px-6 bg-[#1c081e]/60 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h3 className="text-2xl md:text-4xl font-display font-semibold text-white">
            Explore More Sacred Destinations
          </h3>
          <p className="text-sm text-white/60 font-body max-w-lg mx-auto leading-relaxed">
            Each teertha holds a unique spiritual frequency. Discover all our curated journeys.
          </p>
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            <Link
              to="/teerthas"
              className="px-8 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full text-sm shadow-soft hover:scale-[1.03] hover:bg-white/10 transition inline-flex items-center gap-2 cursor-pointer"
            >
              ← Back to All Teerthas
            </Link>
            <Link
              to="/enquire"
              className="px-8 py-3 bg-gradient-cta text-accent-foreground font-semibold rounded-full text-sm shadow-soft hover:scale-[1.03] transition inline-flex items-center gap-2 cursor-pointer"
            >
              Plan My Yatra ➔
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
