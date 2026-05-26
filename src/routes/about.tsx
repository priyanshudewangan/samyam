import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import spiritualJoy from "@/assets/spiritual_joy_new.jpg";
import aarti from "@/assets/aarti.jpg";
import founder from "@/assets/founder.jpg";
import bgAbout from "@/assets/bg-about.png";
import logo from "@/assets/logo.png";
import { Footer } from "@/components/Footer";


export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    title: "About Samyam — Philosophy & Purpose",
    meta: [
      {
        name: "description",
        content:
          "Welcome to Samyam Spiritual Tourism—where spiritual travel is not just a journey, but an exquisite transcendental experience.",
      },
    ],
  }),
});

function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />

      {/* PHILOSOPHY & PURPOSE HERO */}
      <section data-nav-theme="dark" className="relative pt-36 pb-24 px-4 text-center overflow-hidden min-h-[60vh] md:min-h-[70vh] flex items-center justify-center">
        <img
          src={bgAbout}
          alt="Samyam Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {/* Soft overlay to ensure readability */}
        <div className="absolute inset-0 bg-black/40 z-0" />

        <FlowerField count={10} />

        <div className="relative z-10 max-w-4xl mx-auto mt-8">
          <p className="text-sm tracking-[0.3em] uppercase text-white/90 mb-3 drop-shadow-md">
            Philosophy & Purpose
          </p>
          <h1 className="font-display font-semibold text-4xl md:text-6xl text-white leading-tight drop-shadow-lg">
            Rooted in ancient wisdom,
            <br />
            guided by modern compassion
          </h1>
          <p className="mt-6 text-xs tracking-[0.3em] uppercase text-white/70 drop-shadow-sm">
            About Samyam
          </p>
          <h2 className="mt-2 text-2xl md:text-3xl text-white/90 font-display font-medium italic drop-shadow-md">
            Travel Beyond. Discover Within.
          </h2>
        </div>
      </section>

      {/* INTRO GRID */}
      <section data-nav-theme="light" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column - Content Card */}
          <div className="lg:col-span-7 bg-card border border-border rounded-3xl p-8 md:p-12 shadow-soft flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  About Samyam
                </span>
                <div className="h-[1px] w-12 bg-accent/30" />
              </div>
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-primary leading-tight mb-6">
                Travel Beyond.
                <br />
                Discover Within.
              </h2>

              <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                <p>
                  Welcome to Samyam Spiritual Tourism—where spiritual travel is not just a journey,
                  but an exquisite transcendental experience. Founded by Nileema Shenoy and a team
                  of Sanatani scholars, Samyam redefines the very essence of teerth yatra by
                  seamlessly blending tools to invoke divine energies, inner tranquility, and
                  luxurious comfort.
                </p>
                <p>
                  We cater to seekers who aspire to elevate their spiritual consciousness while
                  indulging in the powerful aura of Bharat's most sacred destinations through
                  meticulously programmed premium pilgrimages.
                </p>
                <p>
                  At Samyam, we believe that a pilgrimage is not merely an itinerary, but an
                  intimate dialogue with the divine—an opportunity to spiritually advance.
                </p>
                <p>
                  By imbibing our spiritual and cultural exuberance, we ensure that each traveller
                  experiences an awakening that aligns their soul with the supreme, unlocking the
                  highest potential of bhakti, jnana, and vairagya using the traditional methods and
                  tools prescribed in our ancient texts.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  "Scholar-led rituals",
                  "Guided yoga & dhyan",
                  "Satsang immersion",
                  "Boutique curation",
                  "Bespoke seva tracks",
                ].map((badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 rounded-full text-xs font-medium bg-muted text-primary border border-border"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Sub-Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
              <div className="p-4 rounded-2xl bg-muted/30">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Founded By
                </p>
                <p className="text-sm font-semibold text-primary mt-1">Nileema Shenoy</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Guided By
                </p>
                <p className="text-sm font-semibold text-primary mt-1">Sanatani Scholars</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Signature
                </p>
                <p className="text-sm font-semibold text-primary mt-1">Premium Ritual Immersions</p>
              </div>
              <div className="p-4 rounded-2xl bg-muted/30">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Focus</p>
                <p className="text-sm font-semibold text-primary mt-1">Inner & Outer Exploration</p>
              </div>
            </div>
          </div>

          {/* Right Column - Media Portrait Card */}
          <div className="lg:col-span-5 relative overflow-hidden rounded-3xl shadow-glow border border-border group min-h-[500px]">
            <img
              src={spiritualJoy}
              alt="Seekers celebrating with joy"
              className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
            />
            {/* Dark overlay at the bottom */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/45 to-transparent pointer-events-none" />

            <div className="absolute bottom-8 left-8 right-8 text-white z-10">
              <p className="text-[10px] uppercase tracking-[0.25em] text-accent/90 font-medium mb-1">
                Sacred Symmetry
              </p>
              <h3 className="font-display font-semibold text-xl md:text-2xl mb-2 text-white">
                Sanatan Wisdom × Contemporary Care
              </h3>
              <p className="text-xs text-white/80 leading-relaxed font-light">
                Scholar-led rituals · Guided yoga & dhyan · Curated satsangs · Bespoke stays
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SACRED DESIGN HOUSE */}
      <section data-nav-theme="accent" className="relative py-24 px-4 overflow-hidden bg-gradient-to-br from-[#9b83a8] via-[#e2aa95] to-[#f4b69d] text-white">
        {/* Subtle decorative flower images or overlays if needed */}
        <FlowerField count={8} />

        <div className="relative max-w-6xl mx-auto text-center z-10">
          <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-3">We Are</p>
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-white leading-tight mb-8">
            A Sacred Design House
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-sm md:text-base text-white/90 leading-relaxed mb-16">
            <p>
              We are committed to <span className="text-white font-semibold">reviving the true essence of teerth yatra</span>, ensuring that every
              seeker embarks on a spiritually enriching journey. Our exquisitely curated programs
              are designed to align with the <span className="text-white font-semibold">sacred teachings of ancient scriptures</span>, offering not
              just a visit to holy sites but a profound inner transformation.
            </p>
            <p>
              With <span className="text-white font-semibold">scholar-led guidance</span>, immersive rituals, and curated comforts, we create journeys
              that honour tradition while welcoming modern seekers into a space of <span className="text-white font-semibold">reverence,
              reflection, and renewal</span>.
            </p>
          </div>

          {/* 4 Feature cards grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-left">
            {[
              {
                label: "Spirit of Service",
                desc: "Seva-driven hospitality with warmth",
              },
              {
                label: "Curatorial Edge",
                desc: "Each yatra is choreographed with rasa & rhythm",
              },
              {
                label: "Modern Sensibility",
                desc: "Luxury that bows to sacredness",
              },
              {
                label: "Ancestral Lineage",
                desc: "Practices blessed by parampara",
              },
            ].map((f) => (
              <div
                key={f.label}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl hover:bg-white/20 hover:scale-[1.02] transition-all duration-300 group"
              >
                <p className="text-[10px] uppercase tracking-wider text-white/70 mb-2 font-medium group-hover:text-white transition-colors">
                  {f.label}
                </p>
                <p className="text-sm md:text-base font-semibold text-white leading-snug">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Prepare - Immerse - Absorb - Integrate horizontal block */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-6 p-8 text-center mb-16 shadow-lg shadow-black/5">
            {[
              {
                t: "Prepare",
                d: "Pre-yatra swadhyay & sankalp design",
              },
              {
                t: "Immerse",
                d: "On-ground rituals, seva & dhyan",
              },
              {
                t: "Absorb",
                d: "Reflection circles & satsang dialogues",
              },
              {
                t: "Integrate",
                d: "Post-yatra anchors for daily life",
              },
            ].map((step, idx, arr) => (
              <div
                key={step.t}
                className={`relative flex flex-col items-center justify-center px-4 group hover:scale-105 transition-transform duration-300 ${idx < arr.length - 1 ? "md:border-r md:border-white/20" : ""
                  }`}
              >
                <p className="text-xs uppercase tracking-[0.2em] text-[#ff8243] font-bold mb-2 group-hover:text-white transition-colors">
                  {step.t}
                </p>
                <p className="text-xs text-white/90 leading-relaxed max-w-[200px]">{step.d}</p>
              </div>
            ))}
          </div>

          {/* 4 Numbered cards grid */}
          <div className="grid md:grid-cols-2 gap-8 text-left mb-16">
            {[
              {
                num: "1",
                t: "Authentic Spiritual Experience",
                d: "We guide seekers in undertaking teerth yatras in their <span class='text-[#ff8243] font-medium'>truest spirit</span>, fostering a deep connection with divine energies.",
              },
              {
                num: "2",
                t: "Maximizing Spiritual Benefits",
                d: "Our yatras are structured to help travellers receive the <span class='text-[#ff8243] font-medium'>complete phal</span> (spiritual incentives) as described in sacred phala shruthis.",
              },
              {
                num: "3",
                t: "Divine Immersion",
                d: "Seekers absorb the <span class='text-[#ff8243] font-medium'>divine vibrations</span> of these destinations through sacred rituals, guided yoga and meditations, and time with revered saints.",
              },
              {
                num: "4",
                t: "Heart-Centred Awakening",
                d: "Our journeys focus on <span class='text-[#ff8243] font-medium'>opening the anahata chakra</span>, deepening one's bhakti (devotion), and leading towards true jnana (wisdom) and vairagya.",
              },
            ].map((card) => (
              <div
                key={card.num}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl flex flex-col gap-3 relative hover:bg-white/15 hover:scale-[1.01] transition-all duration-300 group shadow-lg shadow-black/5"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold text-white shadow-soft group-hover:bg-white/30 transition-colors">
                    {card.num}
                  </div>
                  <h3 className="font-semibold text-lg md:text-xl text-white group-hover:text-[#ff8243] transition-colors">{card.t}</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed pl-14" dangerouslySetInnerHTML={{ __html: card.d }} />
              </div>
            ))}
          </div>

          {/* Closing italic quote */}
          <p className="font-display italic text-lg md:text-xl text-[#ffebe3] leading-relaxed max-w-4xl mx-auto drop-shadow-sm">
            "With Samyam, every yatra becomes a sacred passage—one that transforms the seeker from
            within, paving the way for divine spiritual awakening and eternal bliss."
          </p>
        </div>
      </section>

      {/* TRAVEL BEYOND SECTION */}
      <section data-nav-theme="light" className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-[#fcf3f6] border border-accent/15 rounded-[2rem] p-8 md:p-12 shadow-soft">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left bio content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <h2 className="font-display font-semibold text-3xl md:text-5xl text-primary leading-tight">
                Travel Beyond.
                <br />
                Discover Within.
              </h2>
              <div className="space-y-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                <p>
                  SAMYAM offers premium pilgrimages that are more than journeys—they are sacred
                  experiences designed to align the soul with divine vibrations. We blend Sanatan
                  wisdom with contemporary comfort, guiding both inner exploration and immersive
                  darshans across Bharat.
                </p>
                <p>
                  Spirituality is not a privilege but a birthright. Our journeys are crafted to be
                  profound yet welcoming for young seekers, modern explorers, and families alike.
                  Every itinerary is a living dialogue between tradition and the present moment.
                </p>
                <p>
                  We challenge the notion that spirituality belongs only to the past or to
                  isolation. Spirituality is alive, relevant, and deeply personal. Journeys should
                  be immersive, enriching, and timeless.
                </p>
              </div>
            </div>

            {/* Right grid */}
            <div className="lg:col-span-6 grid sm:grid-cols-2 gap-4 text-left">
              <div className="p-6 rounded-2xl bg-white border border-border/60 shadow-soft">
                <h4 className="font-semibold text-primary mb-2 text-base">Devotional Luxury</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Handpicked stays, curated culinary experiences, and bespoke care that honour the
                  sanctity of the journey.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border/60 shadow-soft">
                <h4 className="font-semibold text-primary mb-2 text-base">
                  Scripture-Aligned Design
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Each day’s rhythm references shastra, ensuring seekers receive the spiritual phal
                  promised in phala shruthis.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border/60 shadow-soft">
                <h4 className="font-semibold text-primary mb-2 text-base">
                  Inner & Outer Exploration
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Morning sadhanas, riverside meditations, temple darshans, and evening satsangs
                  harmonise inner stillness with outer awe.
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white border border-border/60 shadow-soft">
                <h4 className="font-semibold text-primary mb-2 text-base">Living Spirituality</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  We make Sanatan wisdom contemporary—relevant for families, leaders, young seekers,
                  and those in golden years.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-accent/15 text-center">
            <p className="font-display italic text-lg text-primary leading-relaxed">
              "Let’s not just visit the sacred. Let’s transform the way we experience the soul."
            </p>
            <p className="text-xs uppercase tracking-widest text-accent mt-2">
              — Nileema Shenoy, Founder
            </p>
          </div>
        </div>
      </section>

      {/* VISION & MISSION & GOALS (DARK MODE) */}
      <section data-nav-theme="dark" className="py-20 px-4 bg-[#4e2d5c] text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-display font-semibold text-center mb-16">
            Vision | Mission | Goals
          </h2>

          <div className="grid lg:grid-cols-3 gap-8 items-stretch">
            {/* Vision */}
            <div className="p-8 rounded-3xl bg-[#5d386c] border border-white/10 shadow-soft flex flex-col justify-between hover:border-white/20 transition">
              <div>
                <span className="text-3xl">🌟</span>
                <h3 className="text-xl font-display font-semibold text-white mt-4 mb-4">Vision</h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  To be the global pioneer in spiritual travel, seamlessly blending luxury, culture,
                  authentic roots, and divinity. To raise benchmarks in spiritual tourism and
                  position Bharat as the world’s foremost destination for seekers, facilitating
                  inner awakening and meaningful exploration.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="p-8 rounded-3xl bg-[#5d386c] border border-white/10 shadow-soft flex flex-col justify-between hover:border-white/20 transition">
              <div>
                <span className="text-3xl">🎯</span>
                <h3 className="text-xl font-display font-semibold text-white mt-4 mb-4 font-display">
                  Mission
                </h3>
                <p className="text-sm text-white/80 leading-relaxed">
                  To redefine spiritual tourism through premium, transformative journeys across
                  Bharat’s sacred sites. Every experience converges divinity and luxury, enabling
                  seekers to embrace Sanatan Dharma’s timeless wisdom with unmatched care.
                </p>
              </div>
            </div>

            {/* Goals */}
            <div className="p-8 rounded-3xl bg-[#5d386c] border border-white/10 shadow-soft flex flex-col justify-between hover:border-white/20 transition">
              <div>
                <span className="text-3xl">💫</span>
                <h3 className="text-xl font-display font-semibold text-white mt-4 mb-4">Goals</h3>
                <ul className="space-y-4 text-sm text-white/80 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong>Inspire Awakening:</strong> Spark consciousness through curated
                      sadhanas, rituals, and divine encounters.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong>Uphold Dharma:</strong> Share Bharat’s heritage and values with
                      authenticity and reverence.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>
                      <strong>Craft Experiences:</strong> Offer soulful journeys for young seekers
                      and retired explorers, uniting comfort with depth.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUR DIVINE EMBLEM */}
      <section data-nav-theme="light" className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-primary">
              Our Divine Emblem
            </h2>
            <p className="text-sm text-muted-foreground tracking-wider uppercase mt-2">
              Every element of our logo carries profound spiritual significance
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Emblem Circle on Left */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white shadow-soft border-4 border-accent flex items-center justify-center p-8 group hover:scale-[1.02] transition duration-500">
                <img
                  src={logo}
                  alt="Samyam Logo Emblem"
                  className="w-40 h-40 md:w-52 md:h-52 object-contain"
                />
              </div>
              <p className="mt-6 text-sm tracking-widest uppercase text-muted-foreground italic">
                Our Divine Emblem
              </p>
            </div>

            {/* List on Right */}
            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  t: "Mandala Aakar (Circular Shape)",
                  d: "Invoking divine energies of the universe",
                },
                {
                  t: "Patra Aakar (Petals)",
                  d: "Denotes Sharanagati: an act of surrender",
                },
                {
                  t: "'S' for Samyam",
                  d: "Represents Samyam and also Kundalini, the divine energy",
                },
                {
                  t: "Anahata Chakra",
                  d: "The heart chakra with 12 petals. Our objective is to activate this chakra, opening the doorways of bhakti.",
                },
                {
                  t: "Ardha Chandra Aakar (Crescent Moon)",
                  d: "Top arc: Teerthas (Tourism). Bottom arc: An ecstatic feeling",
                },
              ].map((item) => (
                <div
                  key={item.t}
                  className="p-5 rounded-2xl bg-card border border-border shadow-soft hover:border-accent/30 transition text-left"
                >
                  <h4 className="font-semibold text-primary text-sm md:text-base">{item.t}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground mt-1 leading-relaxed">
                    {item.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OUR VALUES */}
      <section data-nav-theme="dark" className="py-20 px-4 bg-[#4e2d5c] text-white border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-14">Our Values</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                icon: "🙏",
                t: "Reverence",
                d: "Deep respect for sacred sites, traditions, and the wisdom they hold.",
              },
              {
                icon: "🌍",
                t: "Responsibility",
                d: "Protecting and preserving these holy places for future generations.",
              },
              {
                icon: "💎",
                t: "Authenticity",
                d: "Genuine experiences rooted in Sanatan Dharma, not commercial tourism.",
              },
              {
                icon: "🧘",
                t: "Transformation",
                d: "Every journey is designed for spiritual awakening and personal growth.",
              },
            ].map((f) => (
              <div
                key={f.t}
                className="p-6 rounded-3xl bg-[#5d386c] border border-white/10 hover:border-white/20 transition flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl">{f.icon}</span>
                  <h3 className="text-lg font-semibold text-white mt-3 mb-2">{f.t}</h3>
                  <p className="text-xs text-white/80 leading-relaxed">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR JOURNEY */}
      <section data-nav-theme="dark" className="py-20 px-4 bg-[#4e2d5c] text-white border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-3">Our Journey</h2>
          <p className="text-sm text-white/70 uppercase tracking-widest mb-16">
            Milestones on the path of serving spiritual seekers
          </p>

          <div className="relative border-l border-white/20 ml-4 md:ml-32 text-left space-y-12">
            {[
              {
                year: "2024",
                t: "SAMYAM Founded",
                d: "Established to craft authentic, scripture-aligned spiritual journeys.",
              },
              {
                year: "Apr 2025",
                t: "First Yatra & Retreat",
                d: "Launched our inaugural experiential retreat in April 2025, bringing seekers to Kashi with curated rituals.",
              },
              {
                year: "2025",
                t: "7 Journeys Completed",
                d: "Successfully hosted seven yatras and retreats across sacred circuits within our first year of operations.",
              },
            ].map((m) => (
              <div key={m.year} className="relative pl-8 md:pl-12">
                {/* Timeline Dot */}
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#e2aa95] border-2 border-[#4e2d5c] shadow-soft" />

                {/* Timeline content card */}
                <div className="bg-[#5d386c] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent-foreground px-3 py-1 rounded-full bg-white/10">
                    {m.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-3 mb-2">{m.t}</h3>
                  <p className="text-sm text-white/80 leading-relaxed">{m.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEET THE FOUNDER */}
      <section data-nav-theme="light" className="py-20 px-4 max-w-5xl mx-auto border-t border-border">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Founder Image Column */}
          <div className="md:col-span-5 relative overflow-hidden rounded-3xl shadow-soft border border-border group aspect-[3/4] max-w-sm mx-auto w-full">
            <img
              src={founder}
              alt="Nileema Shenoy, Founder of Samyam"
              className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
            />
          </div>

          {/* Founder Bio Column */}
          <div className="md:col-span-7">
            <p className="text-sm tracking-[0.3em] uppercase text-accent mb-2">Meet the Founder</p>
            <h2 className="text-4xl md:text-5xl font-display font-semibold text-primary">
              Nileema Shenoy
            </h2>
            <p className="text-muted-foreground tracking-wider uppercase text-xs mt-2 border-b border-border pb-4">
              Chartered Accountant & Spiritual Architect
            </p>

            <div className="mt-6 space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Nileema Shenoy is a young, qualified Chartered Accountant from the sacred town of
                Karkala in Udupi. An academic achiever, she pursued graduation and Chartered
                Accountancy simultaneously—clearing every level in her first attempt.
              </p>
              <p>
                Growing up amidst Karkala’s scriptural heritage immersed her in ancient Indian
                wisdom from childhood. Guided by her spiritual masters, she continues to study the
                shastras with devotion.
              </p>
              <p>
                A passionate traveller, Nileema has explored spiritual geographies across Bharat and
                the world, especially the Himalayas and other sacred teerthas, seeking deeper
                communion with divinity.
              </p>
              <p>
                Observing how others experienced yatras differently inspired her to design journeys
                that follow a structured, scripture-aligned approach—ensuring seekers receive the
                full spiritual potency of each pilgrimage.
              </p>
            </div>
          </div>
        </div>

        <blockquote className="mt-16 p-8 rounded-3xl bg-accent/5 border border-accent/25 text-center max-w-4xl mx-auto">
          <p className="font-display italic text-xl md:text-2xl text-primary leading-relaxed">
            “Every yatra must be a living scripture—designed with devotion, discipline, and divine
            grace so that each seeker truly feels the awakening they came for.”
          </p>
          <cite className="block mt-4 text-xs font-semibold text-accent uppercase tracking-wider">
            — Nileema Shenoy, Founder
          </cite>
        </blockquote>
      </section>

      <Footer />
    </div>
  );
}
