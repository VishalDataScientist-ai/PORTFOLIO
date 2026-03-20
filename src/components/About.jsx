import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, GraduationCap, Briefcase, Focus } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image/Visual Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square max-w-md mx-auto relative rounded-3xl overflow-hidden shadow-2xl bg-white/10 border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 flex items-center justify-center">
                 {/* Replace with actual image later */}
                 <span className="text-slate-400 font-medium text-lg tracking-widest uppercase">Profile Photo</span>
              </div>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-indigo-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000"></div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              Transforming complex data into strategic business advantage.
            </h3>
            
            <p className="text-lg text-slate-300 mb-6 leading-relaxed">
              Vishal Singh is a BCA student passionate about business analytics, data-driven decision making, and strategic problem solving. He enjoys analyzing patterns in data, understanding market behavior, and helping organizations improve their performance through insights and structured thinking.
            </p>
            
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              With a solid foundation in computer applications and a sharp focus on real-world business challenges, I aim to excel in consulting, analytics, and management roles where analytical thinking drives growth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="bg-white/5 backdrop-blur-md p-2 rounded-lg shadow-sm text-blue-600">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Education</h4>
                  <p className="text-sm text-slate-300">Bachelor of Computer Applications</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-white/5 backdrop-blur-md p-2 rounded-lg shadow-sm text-blue-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <p className="text-sm text-slate-300">India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 sm:col-span-2">
                <div className="bg-white/5 backdrop-blur-md p-2 rounded-lg shadow-sm text-blue-600">
                  <Focus size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Core Interests</h4>
                  <p className="text-sm text-slate-300">Business Analytics, Sales Strategy, Data Analysis, Consulting, Market Research</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
