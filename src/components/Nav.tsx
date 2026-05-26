import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "Yatras", to: "/yatras" },
  { label: "Teerthas", to: "/teerthas" },
  { label: "Institutions", to: "/institutions" },
  { label: "Methodology", to: "/methodology" },
  { label: "Knowledge Portal", to: "/enquire" },
  { label: "About us", to: "/about" },
] as const;

export function Nav() {
  const [theme, setTheme] = useState<"default" | "light" | "dark" | "accent">("default");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newTheme = entry.target.getAttribute("data-nav-theme") as any;
            if (newTheme) setTheme(newTheme);
          }
        });
      },
      {
        // Trigger when the section is at the top of the viewport (where the nav is)
        rootMargin: "-80px 0px -90% 0px",
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll("section[data-nav-theme]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(1200px,95%)] transition-all duration-500 ease-in-out"
      data-nav-theme={theme}
    >
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="h-12 w-12 shrink-0 rounded-full bg-white shadow-soft flex items-center justify-center p-1.5 hover:scale-105 transition"
        >
          <img src={logo} alt="Samyam Logo" className="w-full h-full object-contain" />
        </Link>
        <nav
          style={{
            background: "var(--nav-bg)",
            color: "var(--nav-text)",
          }}
          className="flex-1 rounded-full backdrop-blur-md shadow-glow px-3 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar transition-all duration-500"
        >
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeProps={{
                className: "bg-white/20 font-medium",
                style: { backgroundColor: "var(--nav-button-bg)" },
              }}
              style={{ color: "var(--nav-text)" }}
              className="shrink-0 px-4 py-1.5 text-xs md:text-sm rounded-full hover:bg-white/15 transition whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
          <div className="hidden md:flex items-center gap-2 ml-auto pr-2">
            <button
              style={{
                backgroundColor: "var(--nav-button-bg)",
                color: "var(--nav-text)",
              }}
              className="px-4 py-1.5 text-xs rounded-full hover:opacity-80 transition cursor-pointer"
            >
              Login
            </button>
            <Link
              to="/enquire"
              className="px-4 py-1.5 text-xs rounded-full bg-gradient-cta text-accent-foreground font-medium shadow-soft hover:scale-105 transition"
            >
              Enquire Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
