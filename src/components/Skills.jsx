import React from 'react';
import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Business & Analytical Skills",
    skills: [
      { name: "Business Analytics", level: 90 },
      { name: "Data Interpretation", level: 85 },
      { name: "Market Research", level: 80 },
      { name: "Strategic Thinking", level: 88 },
      { name: "Problem Solving", level: 92 },
    ]
  },
  {
    title: "Tools & Technology",
    skills: [
      { name: "Power BI", level: 85 },
      { name: "Advanced Excel", level: 90 },
      { name: "SQL", level: 75 },
      { name: "Data Visualization", level: 85 },
    ]
  },
  {
    title: "Business & Management",
    skills: [
      { name: "Sales Strategy", level: 82 },
      { name: "Customer Understanding", level: 88 },
      { name: "Communication", level: 95 },
      { name: "Leadership", level: 85 },
      { name: "Negotiation", level: 80 },
    ]
  },
  {
    title: "Technical Foundations",
    skills: [
      { name: "Programming Basics", level: 75 },
      { name: "Database Concepts", level: 80 },
      { name: "Analytical Thinking", level: 90 },
    ]
  }
];

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white/5 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Core Competencies</h3>
            <p className="max-w-2xl mx-auto text-lg text-slate-300">
              A balanced technical and strategic skill set designed to interpret data and influence business outcomes.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
            >
              <h4 className="text-2xl font-bold text-slate-100 mb-8 border-b border-white/10 pb-4">{category.title}</h4>
              <div className="space-y-6">
                {category.skills.map((skill, sIdx) => (
                  <div key={sIdx}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-slate-400 text-sm">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                      <motion.div 
                        className="bg-gradient-to-r from-blue-600 to-indigo-500 h-2.5 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
