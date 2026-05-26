import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import { Footer } from "@/components/Footer";
import yatra1 from "@/assets/Yatra-1.jpg";
import { detailedYatras } from "@/constants/yatras";

export const Route = createFileRoute("/yatras/")({
  component: YatrasPage,
  head: () => ({
    title: "Samyam Yatras — Transformational Journeys",
    meta: [
      {
        name: "description",
        content:
          "Experience the kshetras of Bharat through our unique Yatra & Retreat programs, infused with divine spiritual practice.",
      },
    ],
  }),
});

function YatrasPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />

      {/* HERO SECTION */}
      <section className="relative min-h-[50vh] sm:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={yatra1}
            alt="Transformational Journeys"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl w-full mx-auto px-4 sm:px-6 text-left pt-20">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-semibold text-white tracking-wide leading-tight">
            Transformational <br />
            <span className="text-[#f0b040] text-gradient-saffron">Journeys</span>
          </h1>
          <p className="text-white/90 text-xs sm:text-sm md:text-lg tracking-wide font-body max-w-md mt-3 sm:mt-4">
            Immersive programs designed to awaken your inner consciousness
          </p>
        </div>
      </section>

      {/* YATRAS LIST SECTION */}
      <section className="relative py-12 sm:py-20 px-4 sm:px-6 bg-white overflow-hidden">
        <FlowerField count={12} />
        <div className="max-w-6xl mx-auto relative z-10 space-y-8 sm:space-y-12">
          {detailedYatras.map((yatra, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div
                key={yatra.slug}
                className="p-5 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#fffbfb] to-[#fcf5f7] border border-[#f5e3e6] shadow-soft hover:shadow-glow transition-all duration-500"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                  {/* Content Column (order-2 on mobile so text is below the image) */}
                  <div className={`space-y-4 sm:space-y-6 text-left lg:col-span-7 order-2 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-display font-semibold text-primary">
                        {yatra.name}
                      </h2>
                      <div className="flex items-center gap-3 mt-1.5 text-xs sm:text-sm font-medium">
                        <span className="text-[#f06e3a] font-semibold">{yatra.date}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{yatra.duration}</span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                      {yatra.desc}
                    </p>

                    {/* Occupancy Badges */}
                    <div className="flex flex-col gap-1.5 sm:gap-2 items-start">
                      <span className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white bg-[#e35928] shadow-sm select-none">
                        {yatra.triplePrice}
                      </span>
                      <span className="px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold text-white bg-[#822d56] shadow-sm select-none">
                        {yatra.doublePrice}
                      </span>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-2">
                      <Link
                        to="/yatras/explore"
                        search={{ yatra: yatra.slug }}
                        className="px-5 py-2 sm:px-6 sm:py-2.5 bg-gradient-cta text-accent-foreground font-semibold rounded-full text-xs sm:text-sm shadow-soft hover:scale-[1.03] transition flex items-center justify-center gap-2 w-fit cursor-pointer"
                      >
                        Explore ➔
                      </Link>
                    </div>
                  </div>

                  {/* Image Column (order-1 on mobile so image is on top) */}
                  <div className={`lg:col-span-5 order-1 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#f5e3e6]/85 shadow-soft">
                      <img
                        src={yatra.img}
                        alt={yatra.name}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* YOUR JOURNEY, YOUR WAY */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 bg-[#faf6f8] text-primary overflow-hidden border-t border-[#f5e3e6]/50">
        <FlowerField count={6} />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-semibold text-primary">Your Journey, Your Way</h2>
          <p className="text-muted-foreground mt-3 sm:mt-4 text-[11px] sm:text-xs md:text-sm">
            Choose the experience that resonates with your spiritual intent.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-10 sm:mt-12 text-left">
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
              <Link
                key={c.t}
                to="/enquire"
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#f5e3e6] shadow-soft hover:shadow-glow hover:border-accent/40 transition-all duration-300 block"
              >
                <div className="text-3xl sm:text-4xl">{c.i}</div>
                <h3 className="text-xl sm:text-2xl text-primary mt-4 font-display font-semibold">{c.t}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{c.d}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
