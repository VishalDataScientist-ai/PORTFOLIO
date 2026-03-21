import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import ValueProposition from './components/ValueProposition';
import Contact from './components/Contact';
import TestimonialsSection from './components/TestimonialsSection';
import CustomCursor from './components/CustomCursor';
import InteractiveOS from './components/InteractiveOS';
import Footer from './components/Footer';
import Galaxy from './components/ui/Galaxy';
import { ThemeProvider } from 'next-themes';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const AnimatedLogo = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div id="main-animated-logo" className="fixed top-0 left-0 z-[90] pointer-events-none origin-top-left">
       <a 
         href="#" 
         className="flex items-center text-2xl font-black pointer-events-auto whitespace-nowrap origin-top-left transition-all duration-300 bg-clip-text text-transparent bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600" 
         style={{ filter: isScrolled ? 'drop-shadow(0 0 8px rgba(250,204,21,0.4))' : 'drop-shadow(0 0 20px rgba(250,204,21,0.9))' }}
       >
         VISHAL.
       </a>
    </div>
  );
};

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
    
    // We animate from huge left-aligned text down to the navbar slot
    gsap.fromTo(logo, 
    {
      x: "2vw",
      y: "80vh",
      xPercent: 0,
      yPercent: -100,
      scale: window.innerWidth < 768 ? 3 : 6,
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
      <div className="min-h-screen bg-transparent text-slate-900 font-sans selection:bg-blue-200 cursor-none relative overflow-x-hidden">
        <CustomCursor />
        
        <AnimatedLogo />

        <Navbar />
        <main>
          <Hero />
          
          <div className="galaxy-layer relative z-10">
            <div className="fixed inset-0 pointer-events-none z-[-1]">
              <Galaxy 
                transparent={false}
                mouseRepulsion={true}
                mouseInteraction={true}
                density={1}
                glowIntensity={0.3}
                saturation={0}
                hueShift={140}
                twinkleIntensity={0.3}
                rotationSpeed={0.1}
                repulsionStrength={2}
                autoCenterRepulsion={0}
                starSpeed={0.5}
                speed={1}
              />
            </div>
            <About />
            <ValueProposition />
            <Skills />
            <Projects />
            <Experience />
            <TestimonialsSection />
            <Contact />
          </div>
        </main>
        
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
