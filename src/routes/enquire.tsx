import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { FlowerField } from "@/components/FlowerField";
import React, { useState } from "react";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/enquire")({
  component: EnquirePage,
  head: () => ({
    title: "Enquire Now — Samyam Sacred Journeys",
    meta: [
      {
        name: "description",
        content:
          "Begin your spiritual transformation. Enquire now to plan your sacred Yatra with Samyam.",
      },
    ],
  }),
});

function EnquirePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Nav />

      {/* CTA */}
      <section
        id="plan"
        data-nav-theme="accent"
        className="relative py-32 px-4 bg-gradient-nav overflow-hidden min-h-screen flex items-center justify-center"
      >
        <FlowerField count={14} />
        <div className="relative max-w-3xl mx-auto text-center text-primary-foreground w-full">
          <h2 className="text-4xl md:text-6xl font-display mt-8">Begin Your Transformation</h2>
          <p className="mt-6 text-lg opacity-90">
            Your sacred journey awaits. Let us craft an experience that awakens your soul.
          </p>

          <div className="mt-10 max-w-lg mx-auto bg-card text-foreground p-8 rounded-3xl shadow-glow border border-border">
            {submitted ? (
              <div className="py-8 text-center">
                <span className="text-5xl">ॐ</span>
                <h3 className="text-2xl text-primary mt-4 font-semibold">Pranaam & Thank You</h3>
                <p className="text-muted-foreground mt-2">
                  We have received your request. Our spiritual journey curator will connect with you
                  shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:border-accent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:border-accent"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Preferred Yatra
                  </label>
                  <select className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:border-accent">
                    <option>General Enquiry</option>
                    <option>Kashi Yatra</option>
                    <option>Himachal Retreat</option>
                    <option>Vrindavan Parikrama</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-1">
                    Message / Spiritual Intent
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-4 py-3 rounded-2xl bg-muted/40 border border-border focus:outline-none focus:border-accent"
                    placeholder="Share any specific spiritual intent or requests..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-cta text-accent-foreground font-medium shadow-glow hover:scale-[1.02] transition duration-300 cursor-pointer"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="tel:+919035225375"
              className="px-6 py-3 rounded-full bg-white/15 backdrop-blur border border-white/30 hover:bg-white/25 transition text-white"
            >
              📞 Call Us Now
            </a>
            <a
              href="#"
              className="px-6 py-3 rounded-full bg-white/15 backdrop-blur border border-white/30 hover:bg-white/25 transition text-white"
            >
              💬 WhatsApp
            </a>
          </div>
          <p className="mt-12 text-sm opacity-80 text-white">
            Join 500+ seekers who have transformed through SAMYAM
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
