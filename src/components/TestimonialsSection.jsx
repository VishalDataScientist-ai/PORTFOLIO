import React from 'react';
import { StaggerTestimonials } from './ui/stagger-testimonials';

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24 mb-10 overflow-hidden bg-transparent pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 pointer-events-auto">
          <h2 className="text-sm font-bold tracking-widest text-cyan-400 uppercase mb-3">Client Feedback</h2>
          <h3 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tighter">What People Say</h3>
        </div>
      </div>
      
      <div className="w-full pointer-events-auto">
         <StaggerTestimonials />
      </div>
    </section>
  );
};

export default TestimonialsSection;
