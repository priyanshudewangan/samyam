import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { HeroVideo } from "@/components/HeroVideo";
import React, { useState } from "react";
import { Footer } from "@/components/Footer";
import { detailedYatras } from "@/constants/yatras";

// Asset imports
import spiritualJoy from "@/assets/spiritual_joy.jpg";

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

const differencesList = [
  {
    icon: "🕉️",
    t: "Authentic Experiences",
    d: "All the journeys are crafted, the sites are covered based on the instructions given in the scriptures of Bharat, deeply rooted in Sanatan.",
  },
  {
    icon: "👥",
    t: "Expert Guidance",
    d: "The travels are guided by learned scholars and not tour guides.",
  },
  {
    icon: "🌿",
    t: "Eco-Conscious Travel",
    d: "Respecting both the sacred sites and Mother Earth in our journeys.",
  },
  {
    icon: "🎯",
    t: "Personalized Journeys",
    d: "Each yatra is crafted to match your spiritual intent and readiness.",
  },
];

const waysList = [
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
];

const testimonials = [
  {
    q: "I returned from Kashi not just with memories, but with a deeper sense of clarity and devotion. The ritual details, scholar guidance, and local warmth made this unlike any travel I've done.",
    a: "Rajesh K., Bangalore",
    y: "Kashi Sojourn",
  },
  {
    q: "Bringing my parents and children to Vrindavan was a soul-stirring experience. Samyam took care of all the premium comforts, allowing us to completely absorb the divine leelas without any worry.",
    a: "Priya M., Mumbai",
    y: "Vrindavan Mathura",
  },
  {
    q: "The Shakti Peethas yatra was deeply empowering. Practicing morning sadhanas amidst the Himalayas under spiritual guidance was a transcendental milestone for me.",
    a: "Ananya S., Delhi",
    y: "Himachal Retreat",
  },
];

function Index() {
  const [activeIdx, setActiveIdx] = useState(0);

  const nextSlide = () => setActiveIdx((prev) => (prev + 1) % testimonials.length);
  const prevSlide = () =>
    setActiveIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background flex flex-col justify-between">
      <Nav />

      {/* HERO */}
      <section data-nav-theme="accent" className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20 overflow-hidden bg-gradient-soft">
        <HeroVideo />
        <FlowerField count={22} />
        <div className="relative z-10 max-w-5xl text-center fade-up">
          <p className="font-display italic text-white/90 text-lg md:text-xl mb-4 drop-shadow-md">
            ॥ श्री गुरुभ्यो नमः ॥
          </p>
          <h1 className="font-display font-semibold text-5xl md:text-7xl lg:text-8xl leading-[1.05] text-white drop-shadow-lg">
            Awaken to the
            <br />
            Mysticism of Bharat
          </h1>
          <p className="mt-8 text-lg md:text-xl text-white/95 max-w-2xl mx-auto drop-shadow-md">
            Premium spiritual journeys guided by Sanatan Dharma.
            <br />
            <span className="italic">Travel Beyond. Discover Within.</span>
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/enquire"
              className="px-8 py-4 rounded-full bg-gradient-cta text-accent-foreground font-medium shadow-glow hover:scale-105 transition"
            >
              Plan My Journey
            </a>
            <a
              href="/yatras"
              className="px-8 py-4 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-primary transition"
            >
              Explore Teerthas
            </a>
          </div>
          <p className="mt-16 text-xs tracking-[0.4em] uppercase text-white/80">Scroll</p>
        </div>
      </section>

      {/* WHY */}
      <section id="about" data-nav-theme="light" className="relative py-24 px-4">
        <FlowerField count={8} />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent text-center mb-3">
            Why Choose SAMYAM
          </p>
          <h2 className="text-4xl md:text-5xl text-center text-primary max-w-3xl mx-auto mb-16">
            We don't just take you to sacred places—we guide you through a transformation.
          </h2>
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Image Column */}
            <div className="lg:col-span-6 relative overflow-hidden rounded-3xl shadow-soft border border-border group min-h-[350px]">
              <img
                src={spiritualJoy}
                alt="Devotion and spiritual celebration with Samyam seekers"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white z-10">
                <p className="font-display italic text-lg opacity-90">
                  "Devotion is not an emotion, it is a state of being."
                </p>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
              <div className="p-10 rounded-3xl bg-card shadow-soft border border-border flex-1 flex flex-col justify-center">
                <h3 className="text-2xl text-primary mb-3">Sacred. Respectful. Responsible.</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every journey with SAMYAM is designed with deep reverence for the sacred sites,
                  respect for local traditions, and responsibility toward preserving these holy
                  places for future generations.
                </p>
              </div>
              <div className="p-10 rounded-3xl bg-card shadow-soft border border-border flex-1 flex flex-col justify-center">
                <h3 className="text-2xl text-primary mb-3">Intelligent Sacred Geography</h3>
                <p className="text-muted-foreground leading-relaxed">
                  The sacred geography of Bharat is intelligent and alive. Each kshetra awakens
                  something precise in you—we understand this and craft journeys accordingly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* YATRAS */}
      <section id="yatras" data-nav-theme="light" className="relative py-24 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent text-center mb-3">
            Samyam's sacred offerings
          </p>
          <h2 className="text-4xl md:text-5xl text-center text-primary font-display font-semibold">
            Curated Yatras & Retreats
          </h2>
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Specially curated yatras infused with divine spiritual retreats; Don't just visit the
            kshetras- Experience them with our unique one of its kind Yatra and Retreat programs
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {detailedYatras.map((y) => (
              <article
                key={y.name}
                className="group rounded-3xl overflow-hidden bg-card shadow-soft border border-border hover:shadow-glow transition flex flex-col h-full"
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
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-xs tracking-widest uppercase text-accent">{y.date}</p>
                    <h3 className="text-2xl text-primary mt-2">{y.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{y.duration}</p>
                    <p className="text-sm text-muted-foreground mt-4 leading-relaxed">{y.desc}</p>
                  </div>
                  <div className="mt-6 pt-5 border-t border-border">
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>✨ {y.triplePrice}</p>
                      <p>✨ {y.doublePrice}</p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href="/yatras"
                        className="text-sm font-medium text-accent hover:underline flex items-center gap-1"
                      >
                        Explore <span className="group-hover:translate-x-1 transition">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DIFFERENCE */}
      <section id="difference" data-nav-theme="light" className="relative py-24 px-4">
        <FlowerField count={6} />
        <div className="relative max-w-6xl mx-auto">
          <p className="text-sm tracking-[0.3em] uppercase text-accent text-center mb-3">
            The SAMYAM Difference
          </p>
          <h2 className="text-4xl md:text-5xl text-center text-primary">
            What sets us apart in spiritual travel
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {differencesList.map((d) => (
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
      <section data-nav-theme="light" className="relative py-24 px-4 bg-muted/40">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl text-primary">Your Journey, Your Way</h2>
          <p className="text-muted-foreground mt-4">
            Choose the experience that resonates with your spiritual intent
          </p>
          <div className="grid md:grid-cols-3 gap-6 mt-14 text-left">
            {waysList.map((c) => (
              <a
                key={c.t}
                href="/enquire"
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

      {/* TESTIMONIALS (TRANSFORMATIONS & STORIES) */}
      <section data-nav-theme="light" className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm tracking-[0.3em] uppercase text-accent mb-3">
            Transformations & Stories
          </p>
          <h2 className="text-4xl md:text-5xl text-primary font-display font-semibold">
            Hear from seekers who felt seen, guided, and held
          </h2>
          <p className="text-muted-foreground mt-4">
            Swipe to read how different yatras shifted hearts across Bharat.
          </p>

          <div className="relative max-w-3xl mx-auto mt-12 bg-card p-10 md:p-12 rounded-3xl border border-border shadow-soft text-center overflow-hidden">
            <div className="text-5xl text-accent mb-6">ॐ</div>
            <div className="min-h-[160px] flex items-center justify-center">
              <p className="font-display italic text-xl md:text-2xl text-primary leading-relaxed">
                "{testimonials[activeIdx].q}"
              </p>
            </div>
            <div className="mt-8 border-t border-border pt-6 flex flex-col items-center">
              <p className="font-semibold text-primary">{testimonials[activeIdx].a}</p>
              <p className="text-xs uppercase tracking-widest text-accent mt-1">
                {testimonials[activeIdx].y}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={prevSlide}
                className="p-3 rounded-full border border-border bg-background hover:bg-muted text-primary transition cursor-pointer"
                aria-label="Previous story"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="p-3 rounded-full border border-border bg-background hover:bg-muted text-primary transition cursor-pointer"
                aria-label="Next story"
              >
                →
              </button>
            </div>

            {/* Dot Indicators */}
            <div className="mt-4 flex justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition ${i === activeIdx ? "bg-accent scale-125" : "bg-muted-foreground/35"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
