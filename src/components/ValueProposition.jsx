import React, { useState } from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';
import { Play } from 'lucide-react';
import WindowsXP from './ui/WindowsXP';

const ValueProposition = () => {
  const [isXPOpen, setIsXPOpen] = useState(false);

  return (
    <section id="values" className="relative bg-transparent pointer-events-auto max-w-[100vw] overflow-hidden">
      <div className="max-w-7xl mx-auto overflow-hidden">
        <ContainerScroll
          titleComponent={
            <div className="mb-10 lg:mb-20">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-300">
                Uncompromising logic driving <br />
                <span className="text-5xl md:text-[6rem] lg:text-[7rem] font-bold mt-2 leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-fuchsia-500 drop-shadow-2xl inline-block pb-4">
                  Strategic Systems
                </span>
              </h1>
            </div>
          }
        >
          <div className="w-full h-full relative overflow-hidden group bg-[#09090b]">
            
            {/* ----- DEFAULT STATE: "Code that hits different" ----- */}
            <div className="absolute inset-0 z-20 flex flex-col md:flex-row transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0 group-hover:pointer-events-none">
              
              {/* Left side -> Unsplash Globe Asset */}
              <div className="relative w-full md:w-1/2 h-full">
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                  alt="Global Reach"
                  className="w-full h-full object-cover opacity-50 contrast-125 saturate-150"
                  draggable={false}
                />
                <div className="absolute inset-x-0 bottom-12 flex flex-col items-start pl-8 md:pl-12">
                  <div className="w-8 border-t-[3px] border-white mb-2 shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                  <p className="text-white text-xs tracking-[0.3em] font-bold drop-shadow-md">GLOBAL REACH</p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-[#09090b]"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>

              {/* Right side -> Text block mimicking screenshot */}
              <div className="w-full md:w-1/2 h-full bg-[#09090b] flex flex-col justify-center p-8 md:p-12 relative -ml-1">
                
                <div className="flex items-center space-x-2 mb-10 mt-[-2rem]">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse"></div>
                   <span className="text-emerald-500 text-[0.65rem] font-bold tracking-widest uppercase">Available for hire</span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-bold text-white leading-[0.9] mb-1 tracking-tighter cursor-default selection:bg-cyan-500/30">
                  code that
                </h2>
                <h2 className="text-5xl md:text-6xl lg:text-[4.5rem] font-serif italic text-gray-400 leading-[0.9] mb-8 tracking-tighter opacity-80 cursor-default selection:bg-fuchsia-500/30">
                  hits different.
                </h2>
                
                <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-sm font-light mt-4">
                  I'm Vishal. A business analyst blending hard-core logic with strategic aesthetics. I build analytical solutions that are scalable, insightful, and stupidly good-looking.
                </p>

                <div className="absolute bottom-12 left-12 right-12 flex gap-6 md:gap-8 overflow-hidden text-gray-500 font-extrabold text-base md:text-lg lg:text-xl tracking-tighter uppercase whitespace-nowrap">
                  <span className="hover:text-cyan-400 transition-colors cursor-pointer">Python</span>
                  <span className="hover:text-fuchsia-400 transition-colors cursor-pointer">SQL</span>
                  <span className="hover:text-emerald-400 transition-colors cursor-pointer">Excel</span>
                  <span className="hover:text-amber-400 transition-colors cursor-pointer">Tableau</span>
                </div>
              </div>
            </div>

            {/* ----- HOVER STATE: Windows XP Boot Launcher ----- */}
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 pointer-events-none group-hover:pointer-events-auto bg-[#0a0a0a]/90 backdrop-blur-md">
              {/* Windows XP Branding */}
              <div className="flex flex-col items-center mb-8 drop-shadow-2xl">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Windows_logo_-_2001.svg/512px-Windows_logo_-_2001.svg.png" 
                  alt="Windows XP" 
                  className="w-24 md:w-32 mb-6 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  draggable={false}
                />
                <div className="flex flex-row items-baseline space-x-3 md:space-x-4">
                  <h3 className="text-4xl md:text-6xl text-white font-medium tracking-tighter cursor-default">
                    Windows
                  </h3>
                  <span className="text-4xl md:text-6xl text-orange-500 font-medium italic cursor-default">
                    xp
                  </span>
                </div>
              </div>
              
              <p className="text-slate-400 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-12 cursor-default">
                System standing by. Click to boot OS.
              </p>
              
              <button 
                onClick={() => setIsXPOpen(true)}
                className="group/btn relative flex items-center space-x-3 bg-blue-600 border border-blue-400 text-white px-8 py-4 rounded-xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(37,99,235,0.4)] cursor-pointer z-50 pointer-events-auto"
              >
                <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out z-0"></div>
                <Play size={20} className="fill-current relative z-10" />
                <span className="relative z-10 tracking-wide font-sans">BOOT SYSTEM</span>
              </button>
              
              {/* Minimalist Loading Ring */}
              <div className="mt-12 w-8 h-8 rounded-full border-2 border-slate-800 border-t-blue-500 animate-spin"></div>
            </div>

            {/* Faint Grid/Background Decor for Hover Layer */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10"></div>
          </div>
        </ContainerScroll>
      </div>

      {isXPOpen && <WindowsXP onClose={() => setIsXPOpen(false)} />}
    </section>
  );
};

export default ValueProposition;
