import React, { useEffect, useRef } from 'react';
import WinBox from 'winbox/src/js/winbox.js';
import 'winbox/dist/css/winbox.min.css';
import 'winbox/dist/css/themes/modern.min.css'; // Optional theme
import './WindowsXP.css'; // We'll add custom XP styles here

const WindowsXP = ({ onClose }) => {
  const winboxRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Only mount winbox once on client side
    if (typeof window !== 'undefined' && !winboxRef.current && containerRef.current) {
      winboxRef.current = new WinBox({
        title: 'Portfolio OS - Windows XP',
        width: '80%',
        height: '80%',
        x: 'center',
        y: 'center',
        class: ['modern', 'xp-theme'],
        root: containerRef.current, // Mount inside the container instead of document.body
        onclose: () => {
          if (onClose) onClose();
          winboxRef.current = null;
        },
        html: `
          <div class="xp-desktop">
             <div class="xp-icon-grid">
               <div class="xp-icon">
                 <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-5.png" alt="My Documents" />
                 <span>My Documents</span>
               </div>
               <div class="xp-icon">
                 <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" alt="Recycle Bin" />
                 <span>Recycle Bin</span>
               </div>
               <div class="xp-icon" ondblclick="alert('Hello from Vishal OS')">
                 <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-5.png" alt="My Computer" />
                 <span>My Computer</span>
               </div>
             </div>
             
             <div class="xp-taskbar">
               <button class="xp-start-button">
                 <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Windows_logo_-_2001.svg/100px-Windows_logo_-_2001.svg.png" width="16" alt="Start" />
                 Start
               </button>
               <div class="xp-task-divider"></div>
               <div class="xp-system-tray">
                 <span class="xp-clock">10:42 AM</span>
               </div>
             </div>
          </div>
        `
      });
    }

    return () => {
      if (winboxRef.current && typeof winboxRef.current.close === 'function') {
        winboxRef.current.close();
        winboxRef.current = null;
      }
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 pointer-events-auto"
    >
        {/* We mount the WinBox instance inside this relatively-positioned container */}
        <div ref={containerRef} className="relative w-full h-full max-w-7xl max-h-[90vh]"></div>
    </div>
  );
};

export default WindowsXP;
