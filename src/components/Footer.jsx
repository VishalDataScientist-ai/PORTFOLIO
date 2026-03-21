import React from 'react';
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 w-full overflow-hidden border-t border-white/5 bg-slate-950/50 backdrop-blur-xl pointer-events-auto">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-16 text-slate-300">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 justify-between">
          <div className="flex flex-col gap-6 max-w-xs">
            <h3 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 tracking-tight cursor-default">
               VISHAL.
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed font-light cursor-default">
               Crafting intelligent, data-driven solutions and interactive digital experiences. Let's build something extraordinary together.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <SocialLink href="https://github.com/vishal" icon={<Github size={20} />} label="GitHub" />
              <SocialLink href="https://linkedin.com/in/vishal" icon={<Linkedin size={20} />} label="LinkedIn" />
              <SocialLink href="https://twitter.com/vishal" icon={<Twitter size={20} />} label="Twitter" />
              <SocialLink href="mailto:vishal@example.com" icon={<Mail size={20} />} label="Email" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold flex items-center gap-2 mb-2 cursor-default">
              <span className="w-8 h-[2px] bg-amber-500/50 block"></span> Quick Links
            </h4>
            <div className="flex flex-col gap-3">
              <FooterLink href="#about">About Me</FooterLink>
              <FooterLink href="#projects">Projects</FooterLink>
              <FooterLink href="#experience">Experience</FooterLink>
              <FooterLink href="#contact">Contact</FooterLink>
            </div>
          </div>

          <div className="flex flex-col gap-4">
             <h4 className="text-white font-semibold flex items-center gap-2 mb-2 cursor-default">
              <span className="w-8 h-[2px] bg-amber-500/50 block"></span> Location
            </h4>
            <p className="text-slate-400 text-sm font-light cursor-default">
              Available for remote opportunities worldwide.
              <br /><br />
              Based in<br />
              <b className="text-amber-200/80 font-medium">India</b>
            </p>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-slate-500 font-light cursor-default">
            © {currentYear} Vishal Singh. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-2 text-slate-500 hover:text-amber-400 transition-colors duration-300 pointer-events-auto"
            aria-label="Scroll to top"
          >
            <div className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center bg-white/5 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-all duration-300">
              <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="w-10 h-10 rounded-full flex items-center justify-center border border-white/10 bg-white/5 hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400 transition-all duration-300 pointer-events-auto"
  >
    {icon}
  </a>
);

const FooterLink = ({ href, children }) => (
  <a 
    href={href} 
    className="text-sm text-slate-400 hover:text-amber-400 hover:translate-x-1 transition-all duration-300 pointer-events-auto w-fit"
  >
    {children}
  </a>
);

export default Footer;
