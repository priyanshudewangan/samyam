import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import aarti from "@/assets/aarti.jpg";
import { yatras, pillars, differences } from "@/constants/landing-page";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    title: "SAMYAM — Awaken to the Mysticism of Bharat",
    meta: [
      {
        name: "description",
        content:
          "Premium spiritual journeys across Bharat, guided by Sanatan Dharma. Travel beyond. Discover within.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 bg-gradient-soft">
        <FlowerField count={22} />
        <div className="relative z-10 max-w-5xl text-center fade-up">
          <p className="font-display italic text-primary/70 text-lg md:text-xl mb-4">
            ॥ श्री गुरुभ्यो नमः ॥
          </p>
          <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-gradient-hero drop-shadow-sm">
            Awaken to the
            <br />
            Mysticism of Bharat
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Premium spiritual journeys guided by Sanatan Dharma.
            <br />
            <span className="italic">Travel Beyond. Discover Within.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#plan"
              className="px-8 py-4 rounded-full bg-gradient-cta text-accent-foreground font-medium shadow-glow hover:scale-105 transition"
            >
              Plan My Journey
            </a>
            <a
              href="#yatras"
              className="px-8 py-4 rounded-full border-2 border-accent text-accent font-medium hover:bg-accent hover:text-accent-foreground transition"
            >
              Explore Teerthas
            </a>
          </div>
          <p className="mt-16 text-xs tracking-[0.4em] uppercase text-muted-foreground">Scroll</p>
        </div>
      </section>

      {/* WHY */}
      <section id="about" className="relative py-24 px-4">
        <FlowerField count={8} />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent text-center mb-3">
            Why Choose Samyam
          </p>
          <h2 className="text-4xl md:text-5xl text-center text-primary max-w-3xl mx-auto">
            We don't just take you to sacred places — we guide you through a transformation.
          </h2>
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <div className="p-10 rounded-3xl bg-card shadow-soft border border-border">
              <h3 className="text-2xl text-primary mb-3">Sacred. Respectful. Responsible.</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every journey is designed with deep reverence for sacred sites, respect for local
                traditions, and responsibility toward preserving these holy places for future
                generations.
              </p>
            </div>
            <div className="p-10 rounded-3xl bg-card shadow-soft border border-border">
              <h3 className="text-2xl text-primary mb-3">Intelligent Sacred Geography</h3>
              <p className="text-muted-foreground leading-relaxed">
                The sacred geography of Bharat is intelligent and alive. Each kshetra awakens
                something precise in you — we understand this and craft journeys accordingly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YATRAS */}
      <section id="yatras" className="relative py-24 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent text-center mb-3">
            Sacred Offerings
          </p>
          <h2 className="text-4xl md:text-5xl text-center text-primary">Samyam's Curated Yatras</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Don't just visit the kshetras — experience them through our unique Yatra & Retreat
            programs, infused with divine spiritual practice.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {yatras.map((y) => (
              <article
                key={y.name}
                className="group rounded-3xl overflow-hidden bg-card shadow-soft border border-border hover:shadow-glow transition"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={y.img}
                    alt={y.name}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs tracking-widest uppercase text-accent">{y.date}</p>
                  <h3 className="text-2xl text-primary mt-2">{y.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{y.dur}</p>
                  <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{y.desc}</p>
                  <div className="mt-5 pt-5 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">On Request</span>
                    <a href="#" className="text-sm font-medium text-accent hover:underline">
                      Explore →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section id="difference" className="relative py-24 px-4">
        <FlowerField count={6} />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent text-center mb-3">
            The Samyam Difference
          </p>
          <h2 className="text-4xl md:text-5xl text-center text-primary">
            What sets us apart in spiritual travel
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {differences.map((d) => (
              <div
                key={d.t}
                className="p-8 rounded-3xl bg-card shadow-soft border border-border text-center hover:-translate-y-1 transition"
              >
                <div className="text-5xl mb-4">{d.icon}</div>
                <h3 className="text-xl text-primary mb-2">{d.t}</h3>
                <p className="text-sm text-muted-foreground">{d.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY YOUR WAY */}
      <section className="relative py-24 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-primary">Your Journey, Your Way</h2>
          <p className="text-muted-foreground mt-4">
            Choose the experience that resonates with your spiritual intent.
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-14 text-left">
            {[
              {
                i: "🧘",
                t: "Individual Yatra",
                d: "A personal journey of transformation, crafted for your unique spiritual path.",
              },
              {
                i: "👨‍👩‍👧‍👦",
                t: "Family Yatra",
                d: "Create sacred memories together with a journey designed for families.",
              },
              {
                i: "🏢",
                t: "Corporate Immersion",
                d: "Team retreats that combine spiritual awakening with team building.",
              },
            ].map((c) => (
              <a
                key={c.t}
                href="#"
                className="p-8 rounded-3xl bg-card shadow-soft border border-border hover:shadow-glow hover:border-accent/40 transition block"
              >
                <div className="text-4xl">{c.i}</div>
                <h3 className="text-2xl text-primary mt-4">{c.t}</h3>
                <p className="text-sm text-muted-foreground mt-2">{c.d}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE / SANATAN */}
      <section className="relative py-28 px-4 overflow-hidden">
        <img
          src={aarti}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="text-6xl text-accent mb-6">ॐ</div>
          <p className="font-display italic text-3xl md:text-4xl text-primary leading-snug">
            "Let the journey not be just movement of the body to a holy place, but the softening of
            the heart into devotion."
          </p>
          <div className="mt-12 grid md:grid-cols-2 gap-8 text-left">
            <div className="p-8 rounded-3xl bg-card/80 backdrop-blur border border-border">
              <h3 className="text-xl text-primary">Sacred Wisdom</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Our journeys are guided by timeless wisdom from the Vedas, Upanishads, and Puranas.
                Each destination is chosen for its specific spiritual significance.
              </p>
            </div>
            <div className="p-8 rounded-3xl bg-card/80 backdrop-blur border border-border">
              <h3 className="text-xl text-primary">Respectful Practice</h3>
              <p className="text-sm text-muted-foreground mt-2">
                We honor the traditions, rituals, and local customs of each sacred site. Our guides
                help you participate authentically and respectfully.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* METHODOLOGY */}
      <section id="methodology" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent text-center mb-3">
            Dridh Bhakti
          </p>
          <h2 className="text-4xl md:text-5xl text-center text-primary">Our Methodology</h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Six integrated pillars working synergistically to open your Anahata Chakra and deepen
            your devotion.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
            {pillars.map((p) => (
              <div
                key={p.t}
                className="p-8 rounded-3xl border border-border bg-card hover:bg-gradient-soft transition shadow-soft"
              >
                <div className="text-4xl">{p.icon}</div>
                <h3 className="text-xl text-primary mt-4">{p.t}</h3>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-block px-8 py-3 rounded-full border-2 border-primary text-primary font-medium hover:bg-primary hover:text-primary-foreground transition"
            >
              Explore Our Methodology →
            </a>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="relative py-24 px-4 bg-muted/40">
        <FlowerField count={6} />
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-primary">Travel Beyond. Discover Within.</h2>
          <div className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
            <p>
              At SAMYAM, we redefine spiritual journeys across Bharat, where luxury meets divinity,
              and travel becomes transformation. We believe spirituality is not a privilege, but a
              birthright.
            </p>
            <p>
              Our journeys are sacred experiences — weaving culture, heritage, and Sanatan wisdom
              with comfort and care. We help you not just see the sacred, but feel it, live it, and
              carry it within.
            </p>
          </div>
          <p className="font-display italic text-2xl text-primary mt-10">
            "Let's not just visit the sacred. Let's transform the way we experience the soul."
          </p>
          <p className="mt-4 text-sm tracking-widest uppercase text-accent">
            — Nileema Shenoy, Founder
          </p>
        </div>
      </section>

      {/* CTA */}
      <section id="plan" className="relative py-28 px-4 bg-gradient-nav overflow-hidden">
        <FlowerField count={14} />
        <div className="relative max-w-3xl mx-auto text-center text-primary-foreground">
          <h2 className="text-4xl md:text-6xl font-display">Begin Your Transformation</h2>
          <p className="mt-6 text-lg opacity-90">
            Your sacred journey awaits. Let us craft an experience that awakens your soul.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919035225375"
              className="px-6 py-3 rounded-full bg-white/15 backdrop-blur border border-white/30 hover:bg-white/25 transition"
            >
              📞 Call Us Now
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-full bg-white/15 backdrop-blur border border-white/30 hover:bg-white/25 transition"
            >
              💬 WhatsApp
            </a>
            <a
              href="#"
              className="px-8 py-3 rounded-full bg-gradient-cta text-accent-foreground font-medium shadow-glow"
            >
              Plan My Journey
            </a>
          </div>
          <p className="mt-12 text-sm opacity-80">
            Join 500+ seekers who have transformed through SAMYAM
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 text-center text-sm text-muted-foreground bg-background">
        <div className="text-2xl text-accent mb-2">ॐ</div>
        <p>© {new Date().getFullYear()} SAMYAM — Sacred. Respectful. Responsible.</p>
      </footer>
    </div>
  );
}
