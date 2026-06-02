import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import { yatraDetailsDb, YatraDetail } from "@/constants/yatra-details";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { API_ENDPOINTS } from "@/lib/api-config";
import { formatNormalDash } from "@/lib/utils";

// Define search query schema for TanStack Router
const exploreSearchSchema = z.object({
  yatra: z.string().optional(),
});

export const Route = createFileRoute("/yatras/explore")({
  validateSearch: exploreSearchSchema,
  component: ExploreYatrasPage,
  head: () => ({
    title: "Explore Journeys | Samyam",
    meta: [
      {
        name: "description",
        content:
          "Explore the deep spiritual itinerary, inclusions, and scriptural preparations for Samyam Spiritual Tourism journeys.",
      },
    ],
  }),
});

function ExploreYatrasPage() {
  const search = Route.useSearch();
  const initialSlug = search.yatra || "ayodhya-kashi";

  const [yatras, setYatras] = useState<any[]>([]);
  const [selectedYatra, setSelectedYatra] = useState<string>(initialSlug);
  const [activeSubTab, setActiveSubTab] = useState<"overview" | "itinerary" | "prep">("overview");

  useEffect(() => {
    const fetchYatras = async () => {
      try {
        const res = await fetch(API_ENDPOINTS.YATRAS);
        const result = await res.json();
        if (result.success && result.data && result.data.length > 0) {
          setYatras(result.data.filter((y: any) => y.isPublished));
        } else {
          setYatras(Object.values(yatraDetailsDb));
        }
      } catch (err) {
        console.error("Failed to fetch yatras:", err);
        setYatras(Object.values(yatraDetailsDb));
      }
    };
    fetchYatras();
  }, []);

  // Keep slug synced with search parameters if they change
  useEffect(() => {
    if (search.yatra) {
      setSelectedYatra(search.yatra);
    }
  }, [search.yatra]);

  const activeYatra =
    yatras.find((y) => y.slug === selectedYatra) || yatras[0] || Object.values(yatraDetailsDb)[0];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-foreground">
      <Nav />

      {/* HERO SECTION */}
      <section
        data-nav-theme="dark"
        className="relative min-h-[50vh] flex items-center justify-center overflow-hidden"
      >
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeYatra.img}
            alt={activeYatra.name}
            className="w-full h-full object-cover object-center transition-all duration-700 filter brightness-75"
          />
          <div className="absolute inset-0 bg-[#1a0a1e]/80 backdrop-blur-[1px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <ScrollReveal variant="fade-in" delay={100}>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-200 text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] mb-4">
              Transformational Itinerary
            </span>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={250}>
            <h1 className="text-4xl md:text-6xl font-display font-semibold text-white tracking-wide leading-tight">
              {formatNormalDash(activeYatra.name, "text-white/50")}
            </h1>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={400}>
            <p className="text-white/80 text-xs md:text-sm tracking-[0.1em] font-medium uppercase font-body mt-2">
              {activeYatra.duration}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* BRAND SLOGAN BANNER */}
      <div className="text-center py-4 border-b border-white/10 bg-[#1c081e]/60 select-none">
        <p className="text-[10px] md:text-xs tracking-[0.45em] font-semibold text-amber-400 uppercase animate-pulse">
          {activeYatra.slogan}
        </p>
      </div>

      {/* SELECTOR TAB BAR */}
      <div className="bg-background/90 border-b border-border sticky top-16 z-30 shadow-sm backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-2 md:gap-4">
          {yatras.map((item) => {
            let icon = "🕉️";
            if (item.slug.includes("badrinath") || item.slug.includes("rishikesh")) icon = "🏔️";
            if (item.slug.includes("himachal") || item.slug.includes("shakti")) icon = "🌺";
            return (
              <button
                key={item.slug}
                onClick={() => {
                  setSelectedYatra(item.slug);
                  setActiveSubTab("overview");
                }}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition cursor-pointer ${
                  selectedYatra === item.slug
                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
                }`}
              >
                <span>{icon}</span>
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILED CONTENT SECTION */}
      <section
        data-nav-theme="light"
        className="relative py-12 px-4 md:px-8 bg-background text-foreground min-h-[60vh]"
      >
        <FlowerField count={8} />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Sub Navigation Bar inside Content */}
          <div className="flex justify-center border-b border-border mb-8 max-w-md mx-auto">
            {[
              { id: "overview", label: "Overview" },
              { id: "itinerary", label: "Day wise Itinerary" },
              { id: "prep", label: "Preparation Guide" },
            ].map((subTab) => (
              <button
                key={subTab.id}
                onClick={() => {
                  setActiveSubTab(subTab.id as any);
                  if (subTab.id === "itinerary") {
                    setTimeout(() => {
                      document.getElementById("itinerary-section")?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }
                }}
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

          {/* TAB PANELS CONTAINER */}
          <div className="transition-all duration-300">
            {(activeSubTab === "overview" || activeSubTab === "itinerary") && (
              <div className="space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  {/* Left side: Overview text & pricing */}
                  <div className="lg:col-span-7 space-y-6 text-left">
                    <ScrollReveal variant="fade-up">
                      <div className="space-y-3">
                        <span className="text-amber-600 font-bold text-xs uppercase tracking-wider block">
                          Spiritual Calling
                        </span>
                        <h3 className="text-3xl font-display font-semibold text-foreground flex items-center gap-1.5 flex-wrap">
                          {formatNormalDash(activeYatra.name)}
                          <span className="font-sans font-normal text-muted-foreground/60 select-none">
                            |
                          </span>
                          <span>Overview</span>
                        </h3>
                        <p className="text-xs md:text-sm font-body font-medium text-muted-foreground">
                          📅 {activeYatra.date} &nbsp;•&nbsp; ⏱️ {activeYatra.duration}
                        </p>
                      </div>
                    </ScrollReveal>

                    <ScrollReveal variant="fade-up" delay={100}>
                      <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body">
                        {activeYatra.desc}
                      </p>
                    </ScrollReveal>

                    {/* Pricing Badges inside Overview */}
                    <ScrollReveal variant="fade-up" delay={200}>
                      <div className="p-6 rounded-3xl bg-white border border-black/[0.06] space-y-3 shadow-soft">
                        <h4 className="text-xs font-semibold tracking-wider text-foreground uppercase font-body">
                          Investment & Occupancy Details
                        </h4>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <div className="flex-1 p-3.5 rounded-2xl bg-muted border border-border flex flex-col justify-center items-center shadow-soft hover:border-amber-600/30 transition duration-300">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                              Triple Occupancy
                            </span>
                            <span className="text-sm md:text-base font-semibold text-amber-600 mt-1">
                              {activeYatra.triplePrice}
                            </span>
                          </div>
                          <div className="flex-1 p-3.5 rounded-2xl bg-muted border border-border flex flex-col justify-center items-center shadow-soft hover:border-amber-600/30 transition duration-300">
                            <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                              Double Occupancy
                            </span>
                            <span className="text-sm md:text-base font-semibold text-amber-600 mt-1">
                              {activeYatra.doublePrice}
                            </span>
                          </div>
                        </div>{" "}
                      </div>
                    </ScrollReveal>

                    {/* Call to Action */}
                    <ScrollReveal variant="fade-up" delay={300}>
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
                    </ScrollReveal>
                  </div>

                  {/* Right side: Inclusions List */}
                  <ScrollReveal variant="fade-left" delay={200} className="lg:col-span-5">
                    <div className="p-8 rounded-3xl bg-white border border-black/[0.06] text-foreground space-y-6 shadow-glow relative overflow-hidden text-left hover:border-amber-600/30 transition-all duration-300">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl pointer-events-none" />
                      <h3 className="text-xl font-display font-semibold border-b border-border pb-3 flex items-center gap-2 text-foreground">
                        <span>✨</span> All Inclusions
                      </h3>
                      <p className="text-xs text-muted-foreground italic leading-relaxed">
                        Everything you need for a transformative journey
                      </p>
                      <ul className="space-y-4 text-xs md:text-sm text-muted-foreground">
                        {activeYatra.inclusions.map((item: string, idx: number) => (
                          <li key={idx} className="flex gap-3 items-start leading-relaxed">
                            <span className="text-amber-600 text-base mt-0.5">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Day-wise Itinerary (Full Width Grid) */}
                {activeSubTab === "itinerary" && (
                  <div id="itinerary-section" className="animate-fade-in scroll-mt-20">
                    <div className="p-8 md:p-10 rounded-[2.5rem] bg-gradient-to-br from-[#802c84] via-[#460b4c] to-[#1d0121] border border-white/10 text-white shadow-glow relative overflow-hidden">
                      <div className="absolute bottom-4 right-4 text-5xl opacity-15 pointer-events-none select-none">
                        🪷
                      </div>

                      <div className="text-center mb-8 space-y-2">
                        <h4 className="text-2xl md:text-3xl font-display font-semibold text-white">
                          Day-wise Itinerary
                        </h4>
                        <p className="text-xs md:text-sm text-white/60 italic font-body">
                          Schedule subject to shift in timings
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
                        {activeYatra.itinerary.map((dayItem: any, idx: number) => {
                          const firstPoint = dayItem.points[0] || "";
                          const isCulmination =
                            firstPoint &&
                            (firstPoint.toLowerCase().includes("participate in") ||
                              firstPoint.toLowerCase().includes("special puja") ||
                              firstPoint.toLowerCase().includes("havan for") ||
                              firstPoint.toLowerCase().includes("culmination"));

                          const displayPoints = isCulmination
                            ? dayItem.points.slice(1)
                            : dayItem.points;

                          return (
                            <ScrollReveal key={idx} variant="fade-up" delay={idx * 100}>
                              <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-amber-400/30 transition-all duration-300 flex flex-col h-full">
                                {isCulmination ? (
                                  <div className="mb-4 space-y-2">
                                    <div className="inline-flex w-8 h-8 rounded-full bg-[#ff5a00] flex items-center justify-center text-sm font-bold text-white shadow-sm">
                                      {dayItem.day}
                                    </div>
                                    <h5 className="text-sm font-semibold text-white leading-snug font-display">
                                      {firstPoint}
                                    </h5>
                                  </div>
                                ) : (
                                  <div className="mb-4">
                                    <div className="inline-flex w-8 h-8 rounded-full bg-[#ff5a00] flex items-center justify-center text-sm font-bold text-white shadow-sm">
                                      {dayItem.day}
                                    </div>
                                  </div>
                                )}

                                <ul className="space-y-3 text-xs text-white/80 list-none font-body mt-auto">
                                  {displayPoints.map((pointText: string, pIdx: number) => (
                                    <li
                                      key={pIdx}
                                      className="flex gap-2 items-start leading-relaxed text-left"
                                    >
                                      <span className="text-amber-400 text-sm leading-none select-none mt-0.5">
                                        •
                                      </span>
                                      <span>{pointText}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </ScrollReveal>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Stays Section */}
                <ScrollReveal variant="fade-up">
                  <div className="p-8 md:p-10 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:border-amber-600/30 transition-all duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-8 space-y-3 text-left">
                        <span className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 text-[10px] font-bold uppercase tracking-wider inline-block">
                          Accommodations
                        </span>
                        <h3 className="text-2xl font-display font-semibold text-foreground">
                          {activeYatra.staysHeading}
                        </h3>
                        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-body">
                          {activeYatra.staysDesc}
                        </p>
                      </div>
                      <div className="md:col-span-4 flex justify-center">
                        <div className="w-20 h-20 rounded-3xl bg-muted border border-border flex items-center justify-center text-4xl shadow-soft">
                          🏨
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>

                {/* Sacred Darshans Circuit Cards Grid */}
                <div className="border-t border-border pt-12">
                  <ScrollReveal variant="fade-up">
                    <div className="text-center mb-10">
                      <h3 className="text-3xl font-display font-semibold text-foreground">
                        Sacred Darshans
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground mt-2">
                        Experience the divine presence at sacred sites
                      </p>
                    </div>
                  </ScrollReveal>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {activeYatra.darshans.map((category: any, cIdx: number) => (
                      <ScrollReveal
                        key={cIdx}
                        variant="fade-up"
                        delay={cIdx * 150}
                        className="h-full"
                      >
                        <div className="p-6 md:p-8 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:shadow-glow hover:border-amber-600/30 transition-all duration-300 flex flex-col justify-between h-full">
                          <div>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-amber-600 mb-2 block">
                              Sacred Circuit
                            </span>
                            <h4 className="text-lg font-display font-semibold text-foreground mb-4 border-b border-border pb-2">
                              {category.title}
                            </h4>
                            <ul className="space-y-3.5 text-xs md:text-sm text-muted-foreground">
                              {category.items.map((item: string, itemIdx: number) => (
                                <li key={itemIdx} className="flex gap-3 items-center">
                                  <span className="text-amber-600 font-bold text-sm">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </ScrollReveal>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSubTab === "prep" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
                {/* Spiritual Preparation Card */}
                <ScrollReveal variant="fade-right" className="h-full">
                  <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:border-amber-600/30 transition duration-300 space-y-6 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-2xl text-amber-600 border border-amber-500/20">
                      📿
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      Spiritual Swadhyay & Prep
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-body">
                      Unlike ordinary tours, a Samyam yatra is an energetic experience. We request
                      all seekers to engage in spiritual preparation before departure to make their
                      system receptive.
                    </p>
                    <ul className="space-y-4 text-xs md:text-sm text-muted-foreground font-body">
                      <li className="flex gap-3 items-start leading-relaxed">
                        <span className="text-amber-600 font-bold mt-0.5">•</span>
                        <span>Engage in regular mantra chanting or light dhyan practice.</span>
                      </li>
                      <li className="flex gap-3 items-start leading-relaxed">
                        <span className="text-amber-600 font-bold mt-0.5">•</span>
                        <span>
                          Read scripture passages relating to the history of the teerthas.
                        </span>
                      </li>
                      <li className="flex gap-3 items-start leading-relaxed">
                        <span className="text-amber-600 font-bold mt-0.5">•</span>
                        <span>
                          Maintaining a clean, devotional mindset leading up to departure.
                        </span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>

                {/* Practical Advice Card */}
                <ScrollReveal variant="fade-left" delay={150} className="h-full">
                  <div className="p-8 rounded-3xl bg-white border border-black/[0.06] shadow-soft hover:border-amber-600/30 transition duration-300 space-y-6 h-full">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-2xl text-purple-600 border border-purple-500/20">
                      🎒
                    </div>
                    <h3 className="text-2xl font-display font-semibold text-foreground">
                      Seeker's Conduct (Yatra Maryada)
                    </h3>
                    <ul className="space-y-4 text-xs md:text-sm text-muted-foreground font-body">
                      <li className="flex gap-3 items-start leading-relaxed">
                        <span className="text-amber-600 font-bold mt-0.5">1.</span>
                        <span>
                          <strong>Sattvik Diet:</strong> Seekers must adhere to strictly vegetarian,
                          eggless meals throughout the yatra duration.
                        </span>
                      </li>
                      <li className="flex gap-3 items-start leading-relaxed">
                        <span className="text-amber-600 font-bold mt-0.5">2.</span>
                        <span>
                          <strong>Dress Code:</strong> Traditional Indian clothing
                          (kurta/dhoti/saree/salwar suit) is highly encouraged inside temples.
                        </span>
                      </li>
                      <li className="flex gap-3 items-start leading-relaxed">
                        <span className="text-amber-600 font-bold mt-0.5">3.</span>
                        <span>
                          <strong>Eco Conscious Conduct:</strong> Respect the local ecology of
                          sacred sites; strictly avoid plastic waste.
                        </span>
                      </li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
