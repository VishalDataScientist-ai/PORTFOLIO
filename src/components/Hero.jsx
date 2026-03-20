import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Mail } from 'lucide-react';
import Hyperspeed from './ui/Hyperspeed';
import { hyperspeedPresets } from './ui/HyperSpeedPresets';
import Lanyard from './ui/Lanyard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Hero = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to('.gsap-blob-1', {
      x: 100,
      y: 50,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    
    gsap.to('.gsap-blob-2', {
      x: -100,
      y: -50,
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      
      <div className="absolute inset-0 z-0">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>

      <Lanyard />

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-500/20 blur-3xl pointer-events-none gsap-blob-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-fuchsia-500/20 blur-3xl pointer-events-none gsap-blob-2" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-end pt-20 h-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2, delayChildren: 0.5 }
            }
          }}
          className="flex flex-col items-start w-full md:w-1/2 lg:w-[45%]"
        >
          <motion.span 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="inline-block py-1 px-3 rounded-full bg-cyan-950/60 border border-cyan-500/30 backdrop-blur-sm text-cyan-400 text-sm font-semibold tracking-wider mb-6 shadow-[0_0_15px_rgba(34,211,238,0.2)]"
          >
            BCA Student & Aspiring Professional
          </motion.span>
          
          <motion.h2 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-300 mb-6 drop-shadow-lg leading-tight"
          >
            Business Analyst | Data & Sales Strategy Enthusiast
          </motion.h2>
          
          <motion.p 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="text-lg text-slate-400 mb-10 leading-relaxed font-light"
          >
            Helping businesses make smarter decisions using data, analytics, and strategic thinking. I bridge the gap between complex datasets and actionable business insights.
          </motion.p>

          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="flex flex-col sm:flex-row items-start justify-start gap-4 w-full"
          >
            <a 
              href="#projects" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3.5 rounded-lg transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] font-semibold"
            >
              <span>View My Work</span>
              <ArrowRight size={18} />
            </a>
            
            <a 
              href="#contact" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-transparent border-2 border-fuchsia-500 text-fuchsia-400 hover:bg-fuchsia-500/10 px-8 py-3.5 rounded-lg transition-all shadow-[0_0_15px_rgba(217,70,239,0.3)_inset] font-semibold"
            >
              <span>Connect With Me</span>
              <Mail size={18} />
            </a>
          </motion.div>

          <div className="mt-16 flex items-center justify-start gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors hidden tracking-widest uppercase text-sm font-bold">
               <Linkedin size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-cyan-500/50 flex justify-center p-1 shadow-[0_0_10px_rgba(34,211,238,0.3)]">
          <motion.div 
            className="w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
