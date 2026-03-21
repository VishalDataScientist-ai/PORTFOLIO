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
          <div className="flex flex-col items-center justify-center w-full h-full bg-[#0a0a0a] relative overflow-hidden">
            
            {/* Windows XP Branding */}
            <div className="flex flex-col items-center mb-8 drop-shadow-2xl z-20">
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
            
            <p className="text-slate-400 tracking-[0.2em] text-[10px] md:text-xs font-bold uppercase mb-12 z-20 cursor-default">
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
            <div className="mt-12 w-8 h-8 rounded-full border-2 border-slate-800 border-t-blue-500 animate-spin z-20"></div>

            {/* Faint Grid/Background Decor */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-10"></div>
          </div>
        </ContainerScroll>
      </div>

      {isXPOpen && <WindowsXP onClose={() => setIsXPOpen(false)} />}
    </section>
  );
};

export default ValueProposition;
