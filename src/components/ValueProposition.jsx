import React from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Briefcase, Users } from 'lucide-react';

const values = [
  {
    icon: <BrainCircuit size={32} className="text-blue-600" />,
    title: "Analytical Thinking",
    description: "Ability to deeply understand complex patterns, interpret diverse datasets, and derive clear, actionable insights."
  },
  {
    icon: <Briefcase size={32} className="text-indigo-600" />,
    title: "Business Perspective",
    description: "Focus on solving real-world business problems and driving measurable value rather than just executing technical tasks."
  },
  {
    icon: <Users size={32} className="text-sky-600" />,
    title: "Communication & Leadership",
    description: "Strong experience collaborating with cross-functional teams, managing initiatives, and presenting ideas clearly to stakeholders."
  }
];

const ValueProposition = () => {
  return (
    <section id="values" className="py-24 bg-white/5 backdrop-blur-md border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">Value Proposition</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">What I Bring to the Table</h3>
            <p className="max-w-2xl mx-auto text-lg text-slate-300">
              A unique blend of analytical rigor and business acumen, designed to help organizations optimize their strategy and growth.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all border border-white/10 group"
            >
              <div className="w-16 h-16 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {val.icon}
              </div>
              <h4 className="text-xl font-bold text-white mb-4">{val.title}</h4>
              <p className="text-slate-300 leading-relaxed">
                {val.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
