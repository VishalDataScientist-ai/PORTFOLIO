import React from 'react';
import clsx from 'clsx';

const variantClasses = {
  default: `
    border-white/10 hover:border-white/30 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-white/10 hover:to-black/40 
    hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]`,
  green: `
    border-emerald-500/20 hover:border-emerald-500/50 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-emerald-500/10 hover:to-black/40 
    hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]`,
  indigo: `
    border-indigo-500/20 hover:border-indigo-500/50 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-indigo-500/10 hover:to-black/40 
    hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]`,
  red: `
    border-red-500/20 hover:border-red-500/50 
    bg-gradient-to-tr from-black/60 to-black/40 
    hover:bg-gradient-to-tr hover:from-red-500/10 hover:to-black/40 
    hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]`,
};

const glowGradientClasses = {
  default: 'via-white/10',
  green: 'via-emerald-400/20',
  indigo: 'via-indigo-400/20',
  red: 'via-red-400/20',
};

const FancyButton = ({
  icon,
  variant = 'default',
  className = '',
  ariaLabel = 'Interactive Button',
}) => {
  return (
    <div
      aria-label={ariaLabel}
      className={clsx(
        'p-5 rounded-3xl backdrop-blur-lg shadow-lg transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer group-hover:scale-[1.15] group-active:scale-95 group-hover:rotate-6 group-active:rotate-0 border-2 overflow-hidden relative',
        variantClasses[variant],
        className
      )}
    >
      <div
        className={clsx(
          'absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out z-0',
          glowGradientClasses[variant]
        )}
      />
      <div className="relative z-10 flex items-center justify-center pointer-events-none">
        {icon}
      </div>
    </div>
  );
};

export default FancyButton;
