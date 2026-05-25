const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Methodology", href: "#methodology" },
  { label: "Yatras", href: "#yatras" },
  { label: "Difference", href: "#difference" },
  { label: "Enquire", href: "#plan" },
];

export function Nav() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(1200px,95%)]">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 shrink-0 rounded-full bg-background shadow-soft flex items-center justify-center text-primary font-display text-xl">
          ॐ
        </div>
        <nav className="flex-1 rounded-full bg-gradient-nav backdrop-blur-md shadow-glow px-3 py-2 flex items-center gap-1 overflow-x-auto no-scrollbar">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={`shrink-0 px-4 py-1.5 text-xs md:text-sm rounded-full text-primary-foreground/90 hover:bg-white/15 transition whitespace-nowrap ${i === 0 ? "bg-white/10" : ""}`}
            >
              {l.label}
            </a>
          ))}
          <div className="hidden md:flex items-center gap-2 ml-auto pr-2">
            <button className="px-4 py-1.5 text-xs rounded-full bg-white/15 text-primary-foreground hover:bg-white/25 transition">
              Login
            </button>
            <a
              href="#plan"
              className="px-4 py-1.5 text-xs rounded-full bg-gradient-cta text-accent-foreground font-medium shadow-soft hover:scale-105 transition"
            >
              Enquire Now
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
