import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'HOME', href: '#hero', num: '01' },
    { name: 'ABOUT', href: '#about', num: '02' },
    { name: 'PROJECTS', href: '#projects', num: '03' },
    { name: 'EXPERIENCE', href: '#experience', num: '04' },
    { name: 'CONTACT', href: '#contact', num: '05' },
  ];

  // Menu overlay Framer Motion variants
  const menuVariants = {
    initial: { x: '100%' },
    animate: { x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    exit: { x: '100%', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const linkVariants = {
    initial: { y: 40, opacity: 0 },
    animate: (i) => ({ 
      y: 0, 
      opacity: 1, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 + (i * 0.1) }
    })
  };

  return (
    <>
      {/* Standard Navbar */}
      <nav className={`fixed w-full z-[80] transition-colors duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center w-full">
            <div className="flex-shrink-0 relative">
              {/* Invisible spacer for the animated logo to land on */}
              <div id="nav-logo-spacer" className="text-2xl font-bold opacity-0 whitespace-nowrap">
                VISHAL.
              </div>
            </div>
            
            <button 
              onClick={() => setIsMenuOpen(true)} 
              className={`flex items-center space-x-2 font-black uppercase tracking-widest text-sm hover:opacity-70 transition-opacity ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            >
              <span>Menu</span>
              <Plus size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Animated Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#0f0f11] z-[110] flex flex-col justify-center pl-10 md:pl-24 lg:pl-32 xl:pl-48"
          >
            {/* Close Button */}
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 md:right-12 lg:right-16 flex items-center space-x-2 text-white font-bold uppercase tracking-widest text-sm hover:text-cyan-400 transition-colors"
            >
              <span>Close</span>
              <X size={24} strokeWidth={3} />
            </button>

            {/* Links List */}
            <div className="flex flex-col space-y-4 md:space-y-6">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  custom={i}
                  variants={linkVariants}
                  initial="initial"
                  animate="animate"
                  onClick={() => setIsMenuOpen(false)}
                  className="group flex flex-row items-start text-5xl md:text-7xl lg:text-8xl font-black text-white hover:text-cyan-400 transition-colors w-max tracking-tighter"
                >
                  {link.name}
                  <span className="text-sm md:text-xl font-normal ml-4 mt-2 md:mt-4 text-slate-500 group-hover:text-cyan-400 transition-colors">
                    {link.num}
                  </span>
                </motion.a>
              ))}
            </div>

            {/* Socials & Resume */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.9, duration: 1 } }}
              className="absolute bottom-12 left-10 md:left-24 lg:left-32 xl:left-48 text-slate-400 text-sm flex flex-col md:flex-row md:items-center gap-8 md:gap-16"
            >
              <div>
                <p className="mb-4 text-slate-600 uppercase tracking-widest text-xs font-bold">Socials</p>
                <div className="flex space-x-6 uppercase tracking-widest text-xs font-medium">
                  <a href="#" className="hover:text-cyan-400 transition-colors">LinkedIn</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
                  <a href="#" className="hover:text-cyan-400 transition-colors">Twitter</a>
                </div>
              </div>
              
              <div>
                <p className="mb-4 text-slate-600 uppercase tracking-widest text-xs font-bold">Download</p>
                <a 
                  href="/resume.pdf" target="_blank" rel="noreferrer"
                  className="flex items-center space-x-2 text-white bg-slate-800/50 hover:bg-cyan-500/20 hover:text-cyan-400 px-4 py-2 rounded-lg transition-all border border-slate-700 hover:border-cyan-500 inline-flex uppercase tracking-widest text-xs font-medium"
                >
                  <Download size={14} />
                  <span>Resume PDF</span>
                </a>
              </div>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
