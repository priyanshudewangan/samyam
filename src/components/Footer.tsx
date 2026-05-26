import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#e35928] via-[#ae3164] to-[#4e2055] text-white py-4 px-4 md:px-8 relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-1 text-left">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-0.5 shadow-soft">
                <img src={logo} alt="Samyam Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-display font-bold text-sm tracking-wider">SAMYAM™</span>
            </div>
            <div className="text-[10px] text-white/95 space-y-0.5 max-w-sm leading-relaxed">
              <p className="font-semibold text-[9.5px]">Samyam Spiritual Tourism Private Limited</p>
              <p className="italic text-white/90 text-[9px]">Travel Beyond. Discover Within.</p>
              <p className="text-white/80 text-[9px]">
                We craft spiritually-rooted pilgrimages across Bharat's sacred teerthas for seekers
                who want awakening, not sightseeing.
              </p>
            </div>
            {/* Social Icons */}
            <div className="flex gap-1.5 pt-0.5">
              <a
                href="#"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/25 transition text-[9px]"
              >
                📸
              </a>
              <a
                href="#"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/25 transition text-[9px]"
              >
                🎥
              </a>
              <a
                href="#"
                className="w-5 h-5 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center border border-white/25 transition text-[9px]"
              >
                💬
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="md:col-span-3 text-left">
            <h4 className="font-semibold text-[10px] tracking-wider uppercase opacity-85 mb-1">
              Explore
            </h4>
            <ul className="space-y-0.5 text-[9.5px] text-white/80">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link to="/methodology" className="hover:text-white transition">
                  Methodology
                </Link>
              </li>
              <li>
                <Link to="/yatras" className="hover:text-white transition">
                  Teerthas
                </Link>
              </li>
              <li>
                <Link to="/yatras" className="hover:text-white transition">
                  Yatra and Retreats
                </Link>
              </li>
              <li>
                <Link to="/yatras" className="hover:text-white transition">
                  Schools
                </Link>
              </li>
            </ul>
          </div>

          {/* Journeys Links */}
          <div className="md:col-span-4 text-left">
            <h4 className="font-semibold text-[10px] tracking-wider uppercase opacity-85 mb-1">
              Journeys
            </h4>
            <ul className="space-y-0.5 text-[9.5px] text-white/80">
              <li>
                <a href="#" className="hover:text-white transition">
                  Knowledge Portal
                </a>
              </li>
              <li>
                <Link to="/enquire" className="hover:text-white transition">
                  Customize your yatra
                </Link>
              </li>
              <li>
                <Link to="/yatras" className="hover:text-white transition">
                  Corporate
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Gallery
                </a>
              </li>
              <li>
                <Link to="/enquire" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 border-t border-white/10 items-start">
          {/* Contact Details */}
          <div className="md:col-span-5 space-y-0.5 text-left text-[9.5px] text-white/90">
            <h4 className="font-semibold text-[10px] tracking-wider uppercase opacity-85">Contact</h4>
            <p>samyamspirituals@gmail.com</p>
            <p>+91-9035225375 • WhatsApp</p>
            <p className="pt-0.5 text-white/80 leading-relaxed">
              Electronic City Phase 2, Bangalore 560100, Karnataka
            </p>
          </div>

          {/* Quote Block */}
          <div className="md:col-span-7 space-y-0.5 text-left">
            <h4 className="font-semibold text-[10px] tracking-wider uppercase opacity-85">Quote</h4>
            <p className="font-display italic text-[10px] md:text-[10.5px] text-white/95 leading-relaxed max-w-xl">
              "Let the journey not be just movement of the body to a holy place, but the softening
              of the heart into devotion."
            </p>
          </div>
        </div>

        {/* Row 3 - Copyright */}
        <div className="pt-2 border-t border-white/10 text-center text-[9px] opacity-75">
          <p>© 2026 SAMYAM™ • Sacred. Respectful. Responsible.</p>
        </div>
      </div>
    </footer>
  );
}
