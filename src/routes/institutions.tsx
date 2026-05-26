import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import studentsImg from "@/assets/students.png";

export const Route = createFileRoute("/institutions")({
  component: InstitutionsPage,
  head: () => ({
    title: "Samyam for Institutions — Sacred Learning Journeys",
    meta: [
      {
        name: "description",
        content:
          "More than study tours—immersions that blend civilizational wisdom with contemporary pedagogy, curated especially for students, faculty, and parent communities.",
      },
    ],
  }),
});

const whyChooseSchools = [
  {
    icon: "🎓",
    title: "Curriculum Aligned",
    desc: "Programs co-created with school faculty to match age, boards, and learning objectives.",
  },
  {
    icon: "🕉️",
    title: "Spiritual Authenticity",
    desc: "Scholar-led rituals, mantra sessions, and cultural immersions that honour the shastra.",
  },
  {
    icon: "🌱",
    title: "Character Building",
    desc: "Empathy, leadership, responsibility, and gratitude woven into every activity.",
  },
  {
    icon: "🛡️",
    title: "Safety & Care",
    desc: "Dedicated program managers, vetted stays, medical support, and clear communication with parents.",
  },
];

const threeStreamFramework = [
  {
    title: "Pre-Yatra Classroom",
    points: [
      "Orientation assemblies",
      "Storytelling & quizzes",
      "Reflection journals",
      "Mindfulness routines",
    ],
  },
  {
    title: "On-ground Immersion",
    points: [
      "Guided darshans & seva",
      "Workshops with artisans",
      "Cultural performances",
      "Yoga & mantra labs",
    ],
  },
  {
    title: "Post-Yatra Integration",
    points: [
      "Portfolio of learnings",
      "Service projects",
      "Parent showcase evenings",
      "Certificates & badges",
    ],
  },
];

const experienceArc = [
  {
    phase: "Orientation",
    detail: "Interactive sessions setting intent, cultural context, and safety briefings.",
  },
  {
    phase: "Immersion",
    detail: "Multi-day experiential journey with curated modules and reflective pauses.",
  },
  {
    phase: "Integration",
    detail: "Digital keepsakes, gratitude circles, and follow-up sessions with mentors.",
  },
];

const immersionLabs = [
  {
    title: "Yoga & Breathwork Labs",
    desc: "Short, age-appropriate practices to anchor energy before temple immersions.",
  },
  {
    title: "Culture Studios",
    desc: "Hands-on modules with classical artists, temple architects, and textile revivalists.",
  },
  {
    title: "Service Pods",
    desc: "Seva activities that build empathy—gaushala care, annadanam prep, or heritage clean ups.",
  },
  {
    title: "Wisdom Circles",
    desc: "Dialogue-led sessions with scholars translating scriptures into modern life lessons.",
  },
];

function InstitutionsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background text-primary">
      <Nav />

      {/* HERO SECTION */}
      <section className="relative min-h-[75vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={studentsImg}
            alt="Students Exploring Heritage"
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          <div className="absolute inset-0 bg-black/70 via-black/55 to-black/85"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-24 space-y-6">
          <span className="inline-block text-xs uppercase tracking-[0.5em] text-[#f08c3a] font-bold select-none animate-pulse">
            SAMYAM FOR SCHOOLS
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-semibold text-white leading-tight">
            Sacred Learning Journeys <br />
            <span className="text-[#f0b040] text-gradient-saffron">for Modern Classrooms</span>
          </h1>
          <p className="text-white/95 text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-body font-light">
            More than study tours—immersions that blend civilizational wisdom with contemporary pedagogy,
            curated especially for students, faculty, and parent communities.
          </p>
        </div>
      </section>

      {/* OUR INTENT SECTION */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <FlowerField count={8} />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="p-8 md:p-14 text-center rounded-[2.5rem] bg-gradient-to-br from-[#fff8f5] to-[#fbf5fa] border border-[#f5e3e6] shadow-glow space-y-6">
            <span className="text-xs uppercase tracking-[0.55em] text-accent font-bold">
              Our Intent
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-semibold text-primary max-w-3xl mx-auto leading-tight">
              Not “just” sightseeing. We help students experience living Sanatan culture with awe, sensitivity, and relevance.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Every program is co-designed with school leadership—aligning with academic goals while initiating
              young minds into gratitude, seva, and inner leadership.
            </p>
          </div>
        </div>
      </section>

      {/* WHY SCHOOLS CHOOSE SAMYAM */}
      <section className="relative py-20 px-6 bg-[#4e2055] text-white overflow-hidden">
        <FlowerField count={8} />
        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.5em] text-accent/90 font-semibold">
              Why Schools Choose SAMYAM
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">
              Learning that transforms
            </h2>
            <p className="text-white/80 text-xs md:text-sm max-w-2xl mx-auto leading-relaxed font-body">
              We combine scholar guidance, stellar logistics, and thoughtful facilitation so every student
              completes the journey with clarity and pride.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyChooseSchools.map((item, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group text-left"
              >
                <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-white font-display">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-body">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* THREE STREAM FRAMEWORK */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <FlowerField count={8} />
        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-semibold">
              Three Stream Framework
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary">
              How we co-create each journey
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {threeStreamFramework.map((stream, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#fffbfb] to-[#fcf6f8] border border-[#f5e3e6] shadow-soft hover:shadow-glow transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-display font-semibold text-primary mb-4 border-b border-[#f5e3e6] pb-2">
                  {stream.title}
                </h3>
                <ul className="space-y-3 text-xs md:text-sm text-muted-foreground list-none">
                  {stream.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex gap-2.5 items-center">
                      <span className="text-accent">✺</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE ARC SECTION */}
      <section className="relative py-20 px-6 bg-[#4e2055] text-white overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="text-center space-y-3">
            <span className="text-xs uppercase tracking-[0.55em] text-accent font-semibold">
              Experience Arc
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold">
              A guided flow from intent to impact
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {experienceArc.map((arc, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="text-[10px] uppercase tracking-wider text-accent font-bold block mb-2">
                  Phase {idx + 1}
                </span>
                <h3 className="text-xl font-display font-semibold mb-3 text-white">
                  {arc.phase}
                </h3>
                <p className="text-xs md:text-sm text-white/70 leading-relaxed font-body">
                  {arc.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMMERSION LABS */}
      <section className="relative py-20 px-6 bg-white overflow-hidden">
        <FlowerField count={8} />
        <div className="max-w-6xl mx-auto relative z-10 space-y-12">
          {/* Header */}
          <div className="text-left space-y-2">
            <span className="text-xs uppercase tracking-[0.5em] text-accent font-semibold">
              Immersion Labs
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-primary">
              Where learning becomes visceral
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {immersionLabs.map((lab, idx) => (
              <div
                key={idx}
                className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#fffbfb] to-[#fcf6f8] border border-[#f5e3e6] shadow-soft hover:shadow-glow transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-display font-semibold text-primary mb-3">
                  {lab.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                  {lab.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-[#fff8f5] to-[#fbf5fa] border-t border-[#f5e3e6] overflow-hidden">
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-primary leading-tight max-w-3xl mx-auto">
            Let’s co-create your school’s next transformative journey
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Share your preferred destination, batch size, timeline, and learning objectives. Our academic strategists
            will design an immersive program deck within 3 working days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/enquire"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-cta text-accent-foreground font-semibold rounded-full text-base shadow-soft hover:scale-[1.02] transition cursor-pointer"
            >
              <span>Speak with our Schools Team</span>
              <span>→</span>
            </Link>
            <Link
              to="/enquire"
              className="inline-flex items-center justify-center px-8 py-4 border border-accent text-accent font-semibold rounded-full text-base hover:bg-[#fff0ed] transition cursor-pointer"
            >
              Request Presentation Deck
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
