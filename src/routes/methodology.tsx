import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import aarti from "@/assets/aarti.jpg";

export const Route = createFileRoute("/methodology")({
  component: MethodologyPage,
  head: () => ({
    title: "Samyam Methodology — Dridh Bhakti",
    meta: [
      {
        name: "description",
        content:
          "Six integrated pillars working synergistically to open your Anahata Chakra and deepen your devotion.",
      },
    ],
  }),
});

function AnahataChakraSVG() {
  return (
    <svg viewBox="0 0 200 200" className="w-24 h-24 text-accent mx-auto" fill="none" stroke="currentColor">
      {/* 12 Petals */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30;
        return (
          <path
            key={i}
            d="M 100 60 C 112 40, 125 50, 100 20 C 75 50, 88 40, 100 60 Z"
            transform={`rotate(${angle} 100 100)`}
            className="fill-accent/5 stroke-accent"
            strokeWidth="1.5"
          />
        );
      })}
      {/* Inner Circle */}
      <circle cx="100" cy="100" r="40" className="stroke-accent fill-accent/5" strokeWidth="1.5" />
      {/* Intersecting Triangles (Shatkona) */}
      <polygon
        points="100,65 130,118 70,118"
        className="stroke-accent fill-none"
        strokeWidth="1.5"
      />
      <polygon
        points="100,135 130,82 70,82"
        className="stroke-accent fill-none"
        strokeWidth="1.5"
      />
      {/* Center Bindu */}
      <circle cx="100" cy="100" r="3.5" className="fill-accent stroke-none" />
    </svg>
  );
}

const detailedPillars = [
  {
    icon: "🕉️",
    title: "Teertha Yatra",
    desc1: "Sacred Teerthas in Bharat are charged with divine energies. Our meticulously planned pilgrimages, often with revered saints, are transformative paths to inner awakening.",
    desc2: "A Yatra to these sites is a profound spiritual journey that cleanses and elevates the soul. We prepare travelers' bodies and minds to be receptive to these energies, leading to deep cleansing and reception of divine vibrations.",
  },
  {
    icon: "🧘",
    title: "Yoga | Dhyan | Pranayama",
    desc1: "Integrating traditional asanas, meditation, and breathwork to align body, mind, and spirit with sacred energies.",
    desc2: "Yoga enhances flexibility and strength. Dhyan cultivates stillness and awareness. Pranayama unlocks vitality, regulates energy, and fosters lasting inner peace.",
  },
  {
    icon: "📿",
    title: "Mantra | Stotra Pathana",
    desc1: "Experience the vibrational energy of divine sounds. Chanting powerful mantras and devotional hymns enhances focus, purifies the mind, and deepens spiritual connection.",
    desc2: "Our sessions provide guidance to chant mantras daily, enabling seekers to immerse in an ancient yet timeless path to transcendence.",
  },
  {
    icon: "📖",
    title: "Swadhyay",
    desc1: "Self-study of ancient scriptures with the blessings of learned masters. Scriptures play the role of a guiding light in leading a fulfilling life.",
    desc2: "Our sessions give insights about various scriptures, relevant to one's journey, and the right methods to pursue studying them daily. Delving into timeless wisdom from the Upanishads, Bhagavad Gita, and Puranas helps seekers be in the company of saints, invoking their blessings.",
  },
  {
    icon: "🙏",
    title: "Satsang | Guru Ashray",
    desc1: "Be in the presence of enlightened masters through sacred satsangs and guru ashray. Immerse in divine wisdom, devotional chants, and enriching discourses.",
    desc2: "The blessings and guidance of revered saints help seekers internalize teachings, refine their path, and experience deeper connections with the divine. These experiences create a sanctuary for transformation, elevating the soul towards enlightenment.",
  },
  {
    icon: "🎭",
    title: "Culture",
    desc1: "Immerse in the rich cultural heritage of Bharat through traditional arts, music, dance, and customs that have been preserved for millennia.",
    desc2: "Culture is the living expression of Sanatan Dharma. Through exposure to classical arts, traditional music, dance forms, and cultural practices, seekers connect with the timeless wisdom embedded in our heritage. This pillar helps integrate spiritual understanding with cultural appreciation, making the journey holistic and deeply enriching.",
  },
];

const scripturesData = [
  {
    title: "Bhagavad Gita",
    type: "Text",
    desc: "The Song of the Divine - Core teachings on duty, devotion, and liberation",
  },
  {
    title: "Upanishads",
    type: "Text",
    desc: "Ancient wisdom texts exploring the nature of reality and consciousness",
  },
  {
    title: "Bhagavatha Mahapuran",
    type: "Text",
    desc: "Stories of divine incarnations and devotion-inspiring narratives",
  },
  {
    title: "Puranas",
    type: "Text",
    desc: "Mythological texts explaining the significance of sacred places and deities",
  },
];

function MethodologyPage() {
  const [activeTab, setActiveTab] = useState<"scriptures" | "mantras" | "videos" | "quizzes">("scriptures");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />

      {/* HERO SECTION */}
      <section data-nav-theme="dark" className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={aarti}
            alt="Ganga Aarti Ceremony"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[1px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center pt-20">
          <div className="text-accent text-5xl md:text-6xl font-display mb-2 select-none animate-pulse">
            ॐ
          </div>
          <h1 className="text-5xl md:text-7xl font-display font-semibold text-white tracking-wide">
            Dridh Bhakti
          </h1>
          <div className="w-28 h-[2px] bg-gradient-to-r from-accent via-[#ae3164] to-[#4e2055] mx-auto my-5 rounded-full" />
          <p className="text-white/90 text-sm md:text-base tracking-[0.25em] font-medium uppercase font-body">
            Our Methodology: Six Integrated Pillars
          </p>
        </div>
      </section>

      {/* INTRO & THE PATH TO FIRM DEVOTION */}
      <section data-nav-theme="light" className="relative py-20 px-6 bg-white overflow-hidden">
        <FlowerField count={10} />
        <div className="max-w-4xl mx-auto text-center space-y-16 relative z-10">
          {/* Paragraph quote */}
          <p className="text-base md:text-xl text-primary/95 font-body leading-relaxed max-w-3xl mx-auto italic font-light">
            We don't just take you on journeys—we guide you through a complete spiritual transformation
            by integrating pilgrimage, practice, and wisdom into one harmonious path.
          </p>

          {/* Heading and details */}
          <div className="space-y-6 pt-4 border-t border-[#f5e3e6]/50">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary">
              The Path to Firm Devotion
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Dridh Bhakti (Firm Devotion) is the central outcome of our integrated approach. Each of the
              six pillars works synergistically to open your Anahata Chakra (heart chakra), deepening your
              bhakti (devotion), leading you towards true jnana (wisdom) and vairagya (mindful detachment).
            </p>
          </div>

          {/* Anahata Chakra Card */}
          <div className="max-w-xl mx-auto p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#fff6f4] to-[#fbf2fa] border border-[#f5e3e6] shadow-soft hover:shadow-glow transition-all duration-500 group">
            <div className="mb-6 transform group-hover:scale-105 transition-transform duration-500">
              <AnahataChakraSVG />
            </div>
            <h3 className="font-display font-semibold text-xl md:text-2xl text-primary mb-4">
              Activating the Anahata Chakra
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground/90 leading-relaxed max-w-md mx-auto">
              Our primary objective is to activate your heart chakra—the 12-petalled lotus of love and devotion.
              Through our integrated methodology, we help you open the doorways of bhakti in your Anahata Chakra,
              transforming your journey from a physical visit to a profound inner awakening.
            </p>
          </div>
        </div>
      </section>

      {/* SIX INTEGRATED PILLARS */}
      <section data-nav-theme="dark" className="relative py-20 px-6 bg-[#4e2055] text-white overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-[120px] pointer-events-none" />
        <FlowerField count={8} />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold">
              Six Integrated Pillars
            </h2>
            <p className="text-white/80 text-xs md:text-sm tracking-wider uppercase">
              Each pillar is essential. Together, all six create a complete spiritual transformation.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {detailedPillars.map((p, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-left flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-white/15 transition-all duration-300">
                    {p.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-white font-display">
                    {p.title}
                  </h3>
                  <div className="space-y-4 text-xs md:text-sm text-white/80 leading-relaxed font-body">
                    <p>{p.desc1}</p>
                    <p className="border-t border-white/10 pt-3 text-white/70 italic">
                      {p.desc2}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPIRITUAL RESOURCES LIBRARY */}
      <section data-nav-theme="light" className="relative py-20 px-6 bg-[#faf6f8] text-primary overflow-hidden">
        <FlowerField count={8} />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-primary">
              Spiritual Resources Library
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Access timeless wisdom and continue your spiritual journey
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-3xl mx-auto">
            {[
              { id: "scriptures", label: "Scriptures (Swadhyay)", icon: "📖" },
              { id: "mantras", label: "Mantras & Stotras", icon: "📿" },
              { id: "videos", label: "Video Sessions", icon: "🎥" },
              { id: "quizzes", label: "Interactive Quizzes", icon: "🧩" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs md:text-sm font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#4e2055] text-white shadow-soft"
                    : "bg-white border border-[#f5e3e6] text-muted-foreground hover:bg-[#fff6f4] hover:text-primary"
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Panels */}
          <div className="min-h-[250px] transition-all duration-300">
            {activeTab === "scriptures" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {scripturesData.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-6 md:p-8 rounded-3xl bg-white border border-[#f5e3e6] shadow-soft hover:shadow-glow transition-all duration-300 text-left relative overflow-hidden group"
                  >
                    <div className="absolute top-0 right-0 bg-accent/10 text-accent text-[9px] font-bold tracking-wider px-3.5 py-1 rounded-bl-xl uppercase">
                      {item.type}
                    </div>
                    <div className="text-xl mb-3 text-accent group-hover:scale-110 transition-transform">
                      📖
                    </div>
                    <h4 className="text-lg font-semibold text-primary mb-2 font-display">
                      {item.title}
                    </h4>
                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {activeTab !== "scriptures" && (
              <div className="max-w-2xl mx-auto p-10 rounded-3xl bg-white border border-[#f5e3e6] text-center shadow-soft">
                <span className="text-4xl mb-4 block">✨</span>
                <h4 className="text-xl font-display font-semibold text-primary mb-2">
                  Preparing Authentic Materials
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                  Our scholars are currently indexing ancient audio tracks, mantra chants, visual guides, and quizzes aligned with classical scriptures.
                </p>
              </div>
            )}
          </div>

          {/* Coming Soon & Call To Action */}
          <div className="mt-16 max-w-3xl mx-auto p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#4e2055] to-[#34133b] text-white text-center relative overflow-hidden shadow-glow">
            {/* Background elements */}
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-accent/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2 animate-bounce">
                🚀
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-semibold">
                Resource Library Coming Soon
              </h3>
              <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-xl mx-auto font-body">
                We're building a comprehensive library of scriptures, mantras, videos, and interactive quizzes to support your spiritual journey. Join our community to be notified when resources become available.
              </p>

              {/* Sub Form */}
              <div className="max-w-md mx-auto pt-2">
                {subscribed ? (
                  <div className="p-4 rounded-full bg-white/10 border border-white/20 text-accent font-medium text-sm animate-pulse">
                    ✨ Thank you! We will notify you when the library opens.
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 bg-white/5 p-1.5 rounded-full border border-white/15">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-1 bg-transparent px-4 py-2 text-xs md:text-sm text-white placeholder-white/60 focus:outline-none w-full"
                    />
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-gradient-cta text-accent-foreground font-semibold rounded-full text-xs md:text-sm shadow-soft hover:scale-[1.02] transition cursor-pointer whitespace-nowrap"
                    >
                      Get Notified
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THEY WORK TOGETHER & THE RESULT */}
      <section data-nav-theme="dark" className="relative py-20 px-6 bg-gradient-to-b from-[#34133b] to-[#1a0520] text-white overflow-hidden border-t border-white/10">
        <FlowerField count={6} />
        <div className="max-w-5xl mx-auto relative z-10 space-y-16">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-display font-semibold">
              How They Work Together
            </h2>
            <p className="text-white/70 text-xs md:text-sm tracking-wider uppercase">
              A Complete Spiritual Loop
            </p>
          </div>

          {/* Cards Loop */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                t: "Complete Immersion",
                d: "Teertha Yatra + Mantra chanting at sacred sites creates a powerful resonance with divine energies.",
                icon: "⚡",
              },
              {
                t: "Physical & Mental Alignment",
                d: "Yoga and Pranayama prepare your body and mind to fully receive the vibrations of sacred places.",
                icon: "🌀",
              },
              {
                t: "Wisdom & Understanding",
                d: "Swadhyay and Satsang provide the knowledge and guidance to understand and integrate your experiences.",
                icon: "💡",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl mb-4 text-accent">{step.icon}</div>
                  <h4 className="text-lg font-semibold font-display mb-3 text-white">
                    {step.t}
                  </h4>
                  <p className="text-xs md:text-sm text-white/70 leading-relaxed">
                    {step.d}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* The Result: 100% Phal Card */}
          <div className="max-w-3xl mx-auto mt-12 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-[#531e5b] to-[#34133b] border-2 border-accent/40 shadow-glow text-center relative overflow-hidden group">
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <div className="inline-block px-4 py-1 rounded-full bg-accent/20 border border-accent text-accent text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 select-none animate-pulse">
                🏆 The Result: 100% Phal (Complete Benefit)
              </div>
              <p className="text-base md:text-lg text-white/95 font-body leading-relaxed max-w-2xl mx-auto">
                When all five pillars are integrated, you receive the complete spiritual benefit as described in sacred phala shrutis. Your journey becomes a true transformation—not just visiting holy sites, but awakening your true nature of ever-existent bliss through knowledge, devotion, and experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
