import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Linkedin, Send } from 'lucide-react';
import Lightning from './ui/Lightning';

const Contact = () => {
  return (
    <section id="contact" className="relative bg-[#050510] overflow-hidden border-t border-white/10">
      <div className="absolute inset-0 pointer-events-none z-0 opacity-70">
        <Lightning hue={260} xOffset={0} speed={1} intensity={1} size={1} />
      </div>
      <div className="relative z-10 py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">Get in Touch</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Let's build something together.</h3>
            <p className="text-lg text-slate-300 mb-10 leading-relaxed">
              Whether you have an interesting project, a potential career opportunity, or just want to connect over business analytics and strategy, my inbox is always open.
            </p>

            <div className="space-y-6 mb-12">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email Me</h4>
                  <a href="mailto:contact@vishalsingh.com" className="text-slate-300 hover:text-blue-600 transition-colors">
                    contact@vishalsingh.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <Linkedin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Connect</h4>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-blue-600 transition-colors">
                    LinkedIn Profile
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Location</h4>
                  <span className="text-slate-300">
                    India
                  </span>
                </div>
              </div>
            </div>
            
            <a 
              href="/resume.pdf" 
              className="inline-flex items-center justify-center space-x-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-3.5 rounded-lg transition-colors shadow-md font-medium"
              target="_blank" rel="noreferrer"
            >
              <span>Download My Resume</span>
            </a>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="bg-white/5 backdrop-blur-md p-8 md:p-10 rounded-3xl border border-white/10 shadow-xl shadow-slate-200/50"
          >
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white/5 backdrop-blur-md"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white/5 backdrop-blur-md"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">Message</label>
                <textarea 
                  id="message" 
                  rows="4" 
                  className="w-full px-4 py-3 rounded-lg border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all bg-white/5 backdrop-blur-md resize-none"
                  placeholder="How can we collaborate?"
                ></textarea>
              </div>
              
              <button 
                type="button" 
                className="w-full flex items-center justify-center space-x-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-4 rounded-lg transition-all shadow-md hover:shadow-lg font-medium"
              >
                <span>Send Message</span>
                <Send size={18} />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-white/10 py-8 bg-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-400 font-medium text-sm">
            © {new Date().getFullYear()} Vishal Singh. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
