import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Leaf, Search, ArrowUpRight } from 'lucide-react';
import MagicBento from './ui/MagicBento';

const projects = [
  {
    title: "Sales Performance Dashboard",
    description: "Built a comprehensive Power BI dashboard to analyze sales trends, customer behavior, and revenue performance over time.",
    tools: ["Power BI", "Data Modeling", "Excel"],
    outcome: "Identified key revenue drivers and underperforming regions to optimize sales focus.",
    icon: <LineChart size={24} className="text-blue-600" />
  },
  {
    title: "E-Waste Awareness Data Project",
    description: "Analyzed environmental data and conceptualized an awareness project explaining causes, impacts, and solutions of electronic waste.",
    tools: ["Data Analysis", "Research", "Presentation"],
    outcome: "Created a structured educational module highlighting sustainability and environmental impact.",
    icon: <Leaf size={24} className="text-emerald-600" />
  },
  {
    title: "Market Insight Analysis",
    description: "Studied consumer patterns and market trends to identify key factors influencing competitive buying decisions.",
    tools: ["Market Research", "SQL", "Excel"],
    outcome: "Mapped out customer decision-making frameworks to support targeted sales strategies.",
    icon: <Search size={24} className="text-indigo-600" />
  }
];

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Featured Work</h3>
            <p className="text-lg text-slate-400">
              Showcasing practical applications of data interpretation, market research, and strategic problem solving.
            </p>
          </motion.div>
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.5 }}
          >
            <a href="#" className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 font-medium transition-colors">
              <span>View full case studies</span>
              <ArrowUpRight size={18} />
            </a>
          </motion.div>
        </div>

        <MagicBento 
          items={projects}
          textAutoHide={false}
          enableStars={true}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={false}
          enableMagnetism={false}
          clickEffect={true}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          renderItem={(project, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="p-8 group flex flex-col h-full z-10 relative"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-700/50 flex flex-shrink-0 items-center justify-center mb-6 z-10 relative">
                {project.icon}
              </div>
              <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors z-10 relative">{project.title}</h4>
              <p className="text-slate-400 mb-6 flex-grow leading-relaxed z-10 relative">
                {project.description}
              </p>
              
              <div className="mb-6 z-10 relative">
                <h5 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-3">Tools Used</h5>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 text-sm rounded-full pointer-events-none">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700/50 z-10 relative">
                <h5 className="text-xs font-bold text-slate-400 tracking-wider uppercase mb-2">Outcome</h5>
                <p className="text-slate-300 text-sm italic">
                  "{project.outcome}"
                </p>
              </div>
            </motion.div>
          )}
        />
      </div>
    </section>
  );
};

export default Projects;
