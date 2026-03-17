import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Linkedin, Mail } from 'lucide-react';
import { DottedSurface } from './ui/dotted-surface';
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
    <section id="hero" ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">
      
      <DottedSurface className="opacity-50" />

      {/* Background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-3xl pointer-events-none gsap-blob-1" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/10 blur-3xl pointer-events-none gsap-blob-2" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100/80 backdrop-blur-sm text-blue-800 text-sm font-semibold tracking-wider mb-6">
            BCA Student & Aspiring Professional
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
            Vishal <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-700">Singh</span>
          </h1>
          
          <h2 className="text-xl md:text-3xl font-medium text-slate-600 mb-8 max-w-3xl mx-auto">
            Business Analyst | Data & Sales Strategy Enthusiast
          </h2>
          
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Helping businesses make smarter decisions using data, analytics, and strategic thinking. I bridge the gap between complex datasets and actionable business insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#projects" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-8 py-3.5 rounded-lg transition-all shadow-lg hover:shadow-xl font-medium"
            >
              <span>View My Work</span>
              <ArrowRight size={18} />
            </a>
            
            <a 
              href="#contact" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-700 px-8 py-3.5 rounded-lg transition-all font-medium"
            >
              <span>Connect With Me</span>
              <Mail size={18} />
            </a>
          </div>

          <div className="mt-16 flex items-center justify-center gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-700 transition-colors hidden">
               <Linkedin size={24} />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-slate-300 flex justify-center p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-slate-500 rounded-full"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
