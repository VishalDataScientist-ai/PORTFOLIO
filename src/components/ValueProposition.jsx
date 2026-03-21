import React from 'react';
import { ContainerScroll } from './ui/container-scroll-animation';

const ValueProposition = () => {
  return (
    <section id="values" className="relative bg-transparent pointer-events-auto">
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
          <div className="flex flex-col md:flex-row h-full w-full relative">
            {/* Left side -> Unsplash Globe Asset */}
            <div className="w-full md:w-1/2 h-full relative">
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
        </ContainerScroll>
      </div>
    </section>
  );
};

export default ValueProposition;
