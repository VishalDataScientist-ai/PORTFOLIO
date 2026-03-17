import React from 'react';
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

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 cursor-none relative overflow-x-hidden">
        <CustomCursor />
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
