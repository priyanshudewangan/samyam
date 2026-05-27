import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

const links = [
  { label: "Home", to: "/" },
  { label: "Yatra & retreats", to: "/yatras" },
  { label: "Teerthas", to: "/teerthas" },
  { label: "Institutions", to: "/institutions" },
  { label: "Methodology", to: "/methodology" },
  { label: "Customize Yatra", to: "/custom-yatra" },
  { label: "Knowledge Portal", to: "/knowledge-portal" },
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
        rootMargin: "-10% 0px -85% 0px",
        threshold: 0,
      }
    );

    const sections = document.querySelectorAll("section[data-nav-theme], div[data-nav-theme]");
    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full transition-all duration-500 ease-in-out border-b border-white/10"
      data-nav-theme={theme}
      style={{
        background: "var(--nav-bg)",
        color: "var(--nav-text)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center gap-6">
        <Link
          to="/"
          className="h-12 w-12 shrink-0 rounded-full bg-white flex items-center justify-center p-1.5 hover:scale-105 transition shadow-sm"
        >
          <img src={logo} alt="Samyam Logo" className="w-full h-full object-contain" />
        </Link>

        <nav className="flex-1 flex items-center justify-center gap-1 overflow-x-auto no-scrollbar">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeProps={{
                className: "font-semibold",
                style: { backgroundColor: "var(--nav-button-bg)" },
              }}
              style={{ color: "var(--nav-text)" }}
              className="shrink-0 px-4 py-2 text-xs md:text-sm rounded-full hover:bg-white/10 transition whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button
            style={{
              backgroundColor: "var(--nav-button-bg)",
              color: "var(--nav-text)",
            }}
            className="px-5 py-2 text-xs font-medium rounded-full hover:opacity-80 transition cursor-pointer border border-white/10"
          >
            Login
          </button>
          <Link
            to="/enquire"
            className="px-5 py-2 text-xs rounded-full bg-gradient-cta text-accent-foreground font-semibold shadow-soft hover:scale-105 transition"
          >
            Enquire Now
          </Link>
        </div>
      </div>
    </header>
  );
}
