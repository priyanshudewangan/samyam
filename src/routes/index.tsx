import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { HeroVideo } from "@/components/HeroVideo";
import React from "react";
import { Footer } from "@/components/Footer";
import { detailedYatras } from "@/constants/yatras";

// Asset imports
import spiritualJoy from "@/assets/spiritual_joy_new.jpg";
import founderImg from "@/assets/founder.jpg";
import aartiImg from "@/assets/aarti.jpg";
import kashiImg from "@/assets/kashi.jpg";
import vrindavanImg from "@/assets/vrindavan.jpg";
import himachalImg from "@/assets/himachal.jpg";
import yatra1Img from "@/assets/Yatra-1.jpg";
import studentsImg from "@/assets/students.png";

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

import galleryData from "@/data/gallery.json";

const localImages: Record<string, string> = {
  aartiImg,
  kashiImg,
  vrindavanImg,
  spiritualJoy,
  himachalImg,
  yatra1Img,
  studentsImg,
  founderImg,
};

const resolveImage = (imgSrc: string) => {
  if (imgSrc in localImages) {
    return localImages[imgSrc];
  }
  return imgSrc;
};

function Index() {
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
              href="/custom-yatra"
              className="px-8 py-4 rounded-full bg-gradient-cta text-accent-foreground font-medium shadow-glow hover:scale-105 transition"
            >
              Plan My Journey
            </a>
            <a
              href="/teerthas"
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
            We don't just take you to sacred places—we guide you through a <span className="text-accent italic">transformation.</span>
          </h2>

          {/* THE SAMYAM WAY - PROCESS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 max-w-5xl mx-auto">
            {[
              { t: "Prepare", d: "Swadhyay & Sankalp", c: "text-[#ff8243]" },
              { t: "Immerse", d: "Rituals & Seva", c: "text-[#ff8243]" },
              { t: "Absorb", d: "Satsang & Dhyan", c: "text-[#ff8243]" },
              { t: "Integrate", d: "Daily Life Anchors", c: "text-[#ff8243]" },
            ].map((step, idx) => (
              <div key={step.t} className="relative group p-6 rounded-2xl bg-card border border-border shadow-soft hover:shadow-glow transition-all duration-300 text-center">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Step 0{idx + 1}</div>
                <h4 className={`text-lg md:text-xl font-display font-semibold ${step.c} mb-1 group-hover:scale-110 transition-transform`}>{step.t}</h4>
                <p className="text-xs text-muted-foreground">{step.d}</p>
                {idx < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 text-border text-xl">→</div>
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Image Column */}
            <div className="lg:col-span-6 relative overflow-hidden rounded-3xl shadow-soft border border-border group min-h-[350px]">
              <img
                src="https://samyam.co/images/why%20choose%20samyam.jpg"
                alt="Devotion and spiritual celebration with Samyam seekers"
                decoding="async"
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
                    decoding="async"
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
                href="/custom-yatra"
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

      {/* GLIMPSES OF GRACE — VISUAL GALLERY */}
      <section data-nav-theme="light" className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.3em] uppercase text-accent font-bold">Glimpses of Grace</p>
            <h2 className="text-4xl md:text-6xl font-display font-semibold text-primary">
              Visual stories from our sacred journeys
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[250px]">
            {galleryData.map((item, idx) => (
              <div
                key={idx}
                className={`relative group rounded-3xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 ${item.span}`}
              >
                <img
                  src={resolveImage(item.img)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <h4 className="text-white font-display text-xl md:text-2xl font-medium translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRAVEL BEYOND. DISCOVER WITHIN. — BRAND PHILOSOPHY */}
      <section data-nav-theme="light" className="relative py-28 px-4 overflow-hidden bg-muted/20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-b from-accent/5 to-transparent blur-3xl pointer-events-none" />
        <FlowerField count={8} />
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16 space-y-4">
            <p className="text-sm tracking-[0.4em] uppercase text-accent font-bold">The SAMYAM Vision</p>
            <h2 className="text-5xl md:text-7xl font-display font-semibold text-primary leading-tight">
              Travel Beyond.<br />
              <span className="italic text-accent drop-shadow-sm">Discover Within.</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Philosophy Text */}
            <div className="space-y-8 text-lg md:text-xl text-muted-foreground font-body leading-relaxed">
              <p className="text-primary font-medium">
                At SAMYAM, we redefine spiritual journeys across Bharat, where luxury meets divinity, and travel becomes transformation. We believe spirituality is not a privilege, but a birthright.
              </p>
              <p>
                Our journeys are sacred experiences—weaving together culture, heritage, and Sanatan wisdom with comfort and care. We help you not just see the sacred, but to feel it, live it, and carry it within.
              </p>
              <p>
                With SAMYAM, every yatra becomes a sacred passage—one that transforms the seeker from within, paving the way for divine spiritual awakening and eternal bliss.
              </p>
            </div>

            {/* Founder Quote Card */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-cta opacity-5 blur-2xl group-hover:opacity-10 transition duration-700 rounded-[3rem]" />
              <div className="relative p-10 md:p-14 rounded-[3rem] bg-white border border-[#f5e3e6] shadow-soft hover:shadow-glow transition-all duration-500 text-center space-y-8 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full -ml-16 -mb-16 blur-2xl" />
                
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-accent/20 mb-6 shadow-md">
                    <img 
                      src={founderImg} 
                      alt="Nileema Shenoy" 
                      className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                  <div className="text-4xl text-accent/30 mb-6 font-serif">“</div>
                  <blockquote className="text-2xl md:text-3xl font-display font-medium text-primary italic leading-snug">
                    Let's not just visit the sacred. Let's transform the way we experience the soul.
                  </blockquote>
                  <div className="mt-8 space-y-1">
                    <div className="w-12 h-px bg-accent/30 mx-auto mb-4" />
                    <cite className="not-italic block font-display text-xl text-primary font-semibold">Nileema Shenoy</cite>
                    <span className="text-xs uppercase tracking-[0.2em] text-accent font-bold">Founder</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
