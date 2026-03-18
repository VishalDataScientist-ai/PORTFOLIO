import React, { useRef } from 'react';
import { Play } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const InteractiveOS = () => {
  const containerRef = useRef(null);
  const windowRef = useRef(null);

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

  return (
    <section ref={containerRef} className="relative bg-[#050505] min-h-[120vh] flex flex-col items-center pt-32 overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Title */}
      <div className="absolute top-24 left-0 right-0 z-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
        <span className="text-[12rem] md:text-[20rem] font-black text-slate-900/40 leading-none tracking-tighter mix-blend-screen">01</span>
        <h2 className="text-4xl md:text-6xl font-medium text-white -mt-16 md:-mt-28 drop-shadow-2xl">The Strategist</h2>
      </div>

      {/* Floating App Icons Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40">
        {appIcons.map((app, i) => (
          <div 
            key={i} 
            className={`floating-app-icon absolute w-16 h-16 md:w-20 md:h-20 rounded-[1.2rem] ${app.bg} flex items-center justify-center shadow-2xl backdrop-blur-md opacity-80`} 
            style={{ top: app.top, left: app.left, transform: `rotate(${i * 15}deg)` }}
          >
             {/* Fake icon graphic inside */}
             <div className="w-8 h-8 md:w-10 md:h-10 bg-white/30 rounded-full blur-[2px]"></div>
          </div>
        ))}
      </div>

      {/* Sticky OS Window */}
      <div className="sticky top-24 w-full max-w-5xl px-4 md:px-8 z-10 h-[70vh] flex items-center justify-center">
        <div 
          ref={windowRef}
          className="w-full h-full bg-[#0a0a0a] rounded-3xl sm:rounded-[2.5rem] border border-slate-800 shadow-[0_0_100px_rgba(0,0,0,0.9)] flex items-center justify-center relative overflow-hidden"
        >
          {/* Inner Glare / Bezel reflection */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 rounded-[2.5rem] border border-white/10 pointer-events-none mix-blend-overlay"></div>
          
          <div className="flex flex-col items-center text-center z-20">
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-white mb-4 tracking-tight">
              enter the <span className="text-cyan-400 font-serif italic pr-2">experience.</span>
            </h3>
            <p className="text-slate-500 tracking-[0.3em] text-[10px] md:text-xs font-bold uppercase mb-12">
              Interactive OS Portfolio
            </p>
            
            <button className="group relative flex items-center space-x-3 bg-white text-black px-8 py-4 rounded-full font-bold text-sm overflow-hidden transition-transform hover:scale-105 active:scale-95 cursor-none">
              <div className="absolute inset-0 bg-cyan-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
              <Play size={16} className="fill-current relative z-10" />
              <span className="relative z-10">LAUNCH SYSTEM</span>
            </button>
            
            {/* Minimalist Loading Ring */}
            <div className="mt-12 w-8 h-8 rounded-full border-2 border-slate-800 border-t-slate-300 animate-spin"></div>
          </div>

          {/* Fake OS Status Bar */}
          <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center pointer-events-none opacity-30">
            <div className="w-16 h-1 bg-white rounded-full"></div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default InteractiveOS;
