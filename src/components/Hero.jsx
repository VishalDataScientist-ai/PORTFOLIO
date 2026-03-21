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

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 w-full flex items-center justify-start h-full pb-32">
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
          className="flex flex-col items-start w-full md:w-2/3 lg:w-[60%]"
        >
          {/* Small header / branding mimicking the screenshot */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="flex items-center space-x-4 mb-16 md:mb-24"
          >
            <div className="w-12 h-12 rounded-full border border-gray-500/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-200 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
            </div>
            <div className="flex flex-col text-[0.65rem] font-bold tracking-[0.2em] text-slate-200">
              <span className="tracking-[0.3em]">VISHAL</span>
              <span className="text-gray-500/80 font-medium">BUSINESS ANALYST</span>
            </div>
          </motion.div>
          
          {/* Main Typography Lockup */}
          <motion.div 
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
            className="flex flex-col pl-2 md:pl-4"
          >
            <div className="text-6xl sm:text-7xl md:text-[5.5rem] lg:text-[7.5rem] leading-[0.85] text-white tracking-tighter mb-10 cursor-default">
              <div className="font-medium drop-shadow-2xl">strategic</div>
              <div className="font-serif italic text-gray-300 drop-shadow-2xl">analyst.</div>
            </div>

            {/* Paragraph with vertical line */}
            <div className="pl-6 border-l-2 border-gray-500/30 text-[0.65rem] md:text-[0.7rem] font-bold tracking-[0.2em] text-gray-400 leading-loose max-w-md">
              FORGING DATA-DRIVEN INSIGHTS<br className="hidden sm:block" />
              WITH RAW LOGIC AND UNCOMPROMISING<br className="hidden sm:block" />
              BUSINESS STRATEGY.
            </div>
          </motion.div>
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
