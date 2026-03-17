import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ValueProposition from './components/ValueProposition';
import Contact from './components/Contact';
import CustomCursor from './components/CustomCursor';
import { ThemeProvider } from 'next-themes';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });
    
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useGSAP(() => {
    const logo = document.getElementById("main-animated-logo");
    if (!logo) return;
    
    // We animate from huge centered text down to the navbar slot
    gsap.fromTo(logo, 
    {
      x: "50vw",
      y: "50vh",
      xPercent: -50,
      yPercent: -50,
      scale: window.innerWidth < 768 ? 4 : 8,
    },
    {
      x: () => {
        const spacer = document.getElementById("nav-logo-spacer");
        return spacer ? spacer.getBoundingClientRect().left : 20;
      },
      y: () => {
        const spacer = document.getElementById("nav-logo-spacer");
        return spacer ? spacer.getBoundingClientRect().top : 20;
      },
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: () => "+=" + window.innerHeight * 0.8,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 cursor-none relative overflow-x-hidden">
        <CustomCursor />
        
        {/* Animated Fixed Logo */}
        <div id="main-animated-logo" className="fixed top-0 left-0 z-[70] pointer-events-none origin-top-left">
           <a href="#" className="flex items-center text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-slate-800 pointer-events-auto whitespace-nowrap origin-top-left">
             VISHAL.
           </a>
        </div>

        <Navbar />
        <main>
          <Hero />
          <About />
          <ValueProposition />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
