import { Phone, MessageCircle, Instagram } from "lucide-react";

export function FloatingContact() {
  const socialLinks = [
    {
      icon: <Instagram size={20} />,
      href: "https://www.instagram.com/samyamspirituals/",
      label: "Instagram",
      color: "hover:text-pink-500",
    },
    {
      icon: <MessageCircle size={20} />,
      href: "https://wa.me/919035225375",
      label: "WhatsApp",
      color: "hover:text-green-500",
    },
    {
      icon: <Phone size={20} />,
      href: "tel:+919035225375",
      label: "Phone",
      color: "hover:text-amber-500",
    },
  ];

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3">
      <div className="flex flex-col gap-2 p-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-glow animate-hero-reveal">
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white/80 transition-all duration-300 hover:bg-white/10 hover:scale-110 ${link.color}`}
          >
            {link.icon}
          </a>
        ))}
      </div>

      {/* Decorative vertical line */}
      <div className="w-px h-12 bg-gradient-to-b from-amber-400/50 to-transparent mx-auto opacity-50" />
    </div>
  );
}
