import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const links = [
  { label: "Home", to: "/" },
  { label: "Yatras", to: "/yatras" },
  { label: "Teerthas", to: "/teerthas" },
  { label: "Difference", to: "/difference" },
  { label: "Methodology", to: "/methodology" },
  { label: "Knowledge Portal", to: "/enquire" },
  { label: "About us", to: "/about" },
] as const;

export function Nav() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(1200px,95%)]">
      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="h-12 w-12 shrink-0 rounded-full bg-white shadow-soft flex items-center justify-center p-1.5 hover:scale-105 transition"
        >
          <img src={logo} alt="Samyam Logo" className="w-full h-full object-contain" />
        </Link>
        <nav className="flex-1 rounded-full bg-gradient-nav backdrop-blur-md shadow-glow px-3 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              activeProps={{ className: "bg-white/20 text-white font-medium" }}
              className="shrink-0 px-4 py-1.5 text-xs md:text-sm rounded-full text-primary-foreground/90 hover:bg-white/15 transition whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
          <div className="hidden md:flex items-center gap-2 ml-auto pr-2">
            <button className="px-4 py-1.5 text-xs rounded-full bg-white/15 text-primary-foreground hover:bg-white/25 transition cursor-pointer">
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
