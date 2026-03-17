import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, TrendingUp, Users } from 'lucide-react';

const experiences = [
  {
    role: "Student Analyst",
    organization: "Academic Projects",
    period: "Ongoing",
    description: "Worked on various academic and personal projects involving data analysis, preparing dashboards, and extracting market insights to inform business decisions.",
    icon: <TrendingUp size={20} className="text-white" />,
    color: "bg-blue-600"
  },
  {
    role: "NCC Volunteer",
    organization: "National Cadet Corps",
    period: "Completed",
    description: "Developed strong foundations in leadership, discipline, teamwork, and organizational skills. Learned to manage responsibilities under pressure and coordinate effectively with diverse teams.",
    icon: <ShieldCheck size={20} className="text-white" />,
    color: "bg-indigo-600"
  },
  {
    role: "Campus Leadership",
    organization: "University Events",
    period: "Ongoing",
    description: "Actively participated in and organized events requiring rigorous communication, stakeholder management, and organizational skills, demonstrating an aptitude for team coordination.",
    icon: <Users size={20} className="text-white" />,
    color: "bg-sky-600"
  }
];

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-700 uppercase mb-3">Journey</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Experience & Leadership</h3>
            <p className="text-lg text-slate-600">
              A timeline of my professional growth, technical exploration, and leadership experiences.
            </p>
          </motion.div>
        </div>

        <div className="relative border-l-2 border-slate-200 ml-3 md:ml-6 mt-12 space-y-12 pb-8">
          {experiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="relative pl-8 md:pl-12"
            >
              <div className={`absolute -left-[17px] top-1 h-8 w-8 rounded-full ${exp.color} ring-4 ring-slate-50 flex items-center justify-center shadow-md`}>
                {exp.icon}
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-bold text-slate-900">{exp.role}</h4>
                    <span className="text-blue-700 font-medium">{exp.organization}</span>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-semibold">
                      {exp.period}
                    </span>
                  </div>
                </div>
                <p className="text-slate-600 leading-relaxed text-base">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Experience;
