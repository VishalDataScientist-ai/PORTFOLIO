import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import LogoLoop from './ui/LogoLoop';
import WindowsXP from './ui/WindowsXP';

gsap.registerPlugin(ScrollTrigger);

const InteractiveOS = () => {
  const containerRef = useRef(null);
  const windowRef = useRef(null);
  const [isXPOpen, setIsXPOpen] = useState(false);

  useGSAP(() => {
    // Scroll animation to scale up the OS window as we scroll down
    gsap.fromTo(windowRef.current, 
      {
        scale: 0.8,
        y: 150,
        opacity: 0,
      },
      {
        scale: 1,
        y: 0,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 20%",
          scrub: 1.5,
        }
      }
    );

    // Parallax effect for floating icons
    gsap.utils.toArray('.floating-app-icon').forEach((icon, i) => {
      const speed = i % 2 === 0 ? 1 : -1.5;
      const yOffset = i % 3 === 0 ? 200 : 100;
      
      gsap.fromTo(icon, 
        { y: yOffset * speed },
        {
          y: -yOffset * speed,
          rotation: (i % 2 === 0 ? 45 : -45),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
    });

  }, { scope: containerRef });

  // Generic app icon shapes for the background
  const appIcons = [
    { bg: "bg-blue-500", top: "15%", left: "10%", delay: 0 },
    { bg: "bg-red-500", top: "25%", left: "25%", delay: 1 },
    { bg: "bg-green-500", top: "10%", left: "75%", delay: 2 },
    { bg: "bg-orange-500", top: "35%", left: "85%", delay: 3 },
    { bg: "bg-cyan-500", top: "50%", left: "5%", delay: 0 },
    { bg: "bg-yellow-500", top: "70%", left: "15%", delay: 1 },
    { bg: "bg-purple-600", top: "60%", left: "85%", delay: 2 },
    { bg: "bg-fuchsia-500", top: "85%", left: "75%", delay: 3 },
  ];

  const techStackClasses = "font-extrabold text-white text-3xl tracking-tighter mix-blend-overlay opacity-40";
  const techLogos = [
    { node: <span className={techStackClasses}>Power BI</span> },
    { node: <span className={techStackClasses}>Python</span> },
    { node: <span className={techStackClasses}>SQL</span> },
    { node: <span className={techStackClasses}>Excel</span> },
    { node: <span className={techStackClasses}>Tableau</span> },
  ];

  return (
    <section ref={containerRef} className="relative bg-[#050505] min-h-[120vh] flex flex-col items-center pt-32 overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Title */}
      <div className="absolute top-24 left-0 right-0 z-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-[12rem] md:text-[20rem] font-black text-slate-900/40 leading-none tracking-tighter mix-blend-screen">01</span>
        <h2 className="text-4xl md:text-6xl font-medium text-white -mt-16 md:-mt-28 drop-shadow-2xl">The Architect</h2>
      </div>

      {/* Floating App Icons Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        {appIcons.map((app, i) => (
          <div 
            key={i} 
            className={`floating-app-icon absolute w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] ${app.bg} flex items-center justify-center shadow-2xl backdrop-blur-md opacity-80`} 
            style={{ top: app.top, left: app.left, transform: `rotate(${i * 15}deg)` }}
          >
             <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 rounded-full blur-[2px]"></div>
          </div>
        ))}
      </div>

      {/* Sticky OS Window */}
      <div className="sticky top-24 w-full max-w-5xl px-4 md:px-8 z-10 h-[70vh] flex items-center justify-center">
        <div 
          ref={windowRef}
          className="w-full h-full bg-[#0a0a0a] rounded-3xl sm:rounded-[2.5rem] border border-slate-800 shadow-[0_0_100px_rgba(0,0,0,0.9)] flex items-center justify-center relative overflow-hidden group"
        >
          {/* Inner Glare / Bezel reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-30"></div>
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none mix-blend-overlay z-30"></div>

          {/* ----- DEFAULT STATE (Initial View) ----- */}
          <div className="absolute inset-0 z-20 flex flex-col md:flex-row transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0 group-hover:pointer-events-none">
            
            {/* Left Side: Globe & Global Reach */}
            <div className="relative w-full md:w-1/2 h-full flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-800/50 p-8">
              {/* CSS Globe Mockup */}
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[radial-gradient(circle_at_30%_30%,#1e3a8a_0%,#000000_80%)] shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.8),0_0_30px_rgba(30,58,138,0.3)] relative overflow-hidden border border-slate-800 hover:scale-105 transition-transform duration-700">
                 {/* Pseudo landmass textures */}
                 <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-blue-400/20 blur-xl rounded-full mix-blend-screen"></div>
                 <div className="absolute bottom-1/4 right-1/4 w-24 h-16 bg-blue-300/10 blur-xl rounded-full mix-blend-screen"></div>
              </div>

              {/* Global Reach Label */}
              <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex flex-col items-start">
                <div className="w-8 h-1 bg-white mb-3 shadow-[0_0_10px_white]"></div>
                <span className="text-white text-[10px] tracking-[0.25em] font-extrabold uppercase drop-shadow-md">GLOBAL REACH</span>
              </div>
            </div>

            {/* Right Side: Text & Data */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center p-8 md:p-16">
              
              {/* Hiring Badge */}
              <div className="flex items-center text-[#00ff88] tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-8 drop-shadow-[0_0_8px_rgba(0,255,136,0.5)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] mr-3 animate-pulse"></span>
                AVAILABLE FOR HIRE
              </div>
              
              {/* Headlines */}
              <div className="mb-8">
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-medium text-white tracking-tight leading-none mb-2">
                  code that
                </h3>
                <h3 className="text-4xl md:text-5xl lg:text-6xl font-serif italic text-slate-400 tracking-tight leading-none">
                  hits different.
                </h3>
              </div>

              {/* Description */}
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md">
                I'm Vishal. A business analyst blending hard-core logic with strategic aesthetics. I build analytical solutions that are scalable, insightful, and stupidly good-looking.
              </p>

              {/* Tech Stack Marquee at bottom */}
              <div className="absolute bottom-6 md:bottom-10 right-0 md:right-8 lg:right-12 w-full md:w-[45%] pointer-events-none fade-edges">
                <LogoLoop 
                  logos={techLogos} 
                  speed={30} 
                  direction="left" 
                  gap={40} 
                  logoHeight={40} 
                  fadeOut={true}
                  fadeOutColor="#0a0a0a"
                />
              </div>

            </div>
          </div>
          

          {/* ----- HOVER STATE (Launcher View) ----- */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto bg-[#0a0a0a]">
            
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-4 tracking-tight drop-shadow-xl">
              enter the <span className="text-cyan-400 font-serif italic pr-2">experience.</span>
            </h3>
            
            <p className="text-slate-500 tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase mb-12">
              Interactive OS Portfolio
            </p>
            
            <button 
              onClick={() => setIsXPOpen(true)}
              className="group/btn relative flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-bold text-sm overflow-hidden transition-transform hover:scale-105 active:scale-95 cursor-none"
            >
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              <Play size={16} className="fill-current relative z-10" />
              <span className="relative z-10">LAUNCH SYSTEM</span>
            </button>
            
            {/* Minimalist Loading Ring */}
            <div className="mt-12 w-8 h-8 rounded-full border-2 border-slate-800 border-t-slate-300 animate-spin"></div>
          </div>

          {/* Fake OS Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center pointer-events-none opacity-30 z-30">
            <div className="w-16 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

      {isXPOpen && <WindowsXP onClose={() => setIsXPOpen(false)} />}
    </section>
  );
};

export default InteractiveOS;
