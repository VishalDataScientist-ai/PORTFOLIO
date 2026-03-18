import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import WinBox from 'winbox/src/js/winbox.js';
import 'winbox/dist/css/winbox.min.css';
import 'winbox/dist/css/themes/modern.min.css';
import './WindowsXP.css';

const WindowsXP = ({ onClose }) => {
  const winboxRef = useRef(null);
  const containerRef = useRef(null);
  const [mountNode, setMountNode] = useState(null);
  
  // Interactive OS State
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    // Clock setup
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize main OS window
    if (typeof window !== 'undefined' && !winboxRef.current && containerRef.current) {
      const node = document.createElement('div');
      node.style.height = '100%';
      node.style.width = '100%';
      
      winboxRef.current = new WinBox({
        title: "Vishal's Portfolio Windows XP",
        width: '85%',
        height: '85%',
        x: 'center',
        y: 'center',
        class: ['modern', 'xp-theme'],
        root: containerRef.current,
        mount: node,
        onclose: () => {
          if (onClose) onClose();
          winboxRef.current = null;
        }
      });
      setMountNode(node);
    }

    return () => {
      if (winboxRef.current && typeof winboxRef.current.close === 'function') {
        winboxRef.current.close();
        winboxRef.current = null;
      }
    };
  }, []);

  // Utility to open sub-windows 
  const openApp = (title, contentHTML) => {
    if (!mountNode) return;
    
    // Slight randomization of window position
    const offsetX = Math.floor(Math.random() * 50);
    const offsetY = Math.floor(Math.random() * 50);

    new WinBox({
       title: title,
       width: Math.min(600, window.innerWidth * 0.6),
       height: Math.min(400, window.innerHeight * 0.5),
       x: 50 + offsetX,
       y: 50 + offsetY,
       root: mountNode,
       class: ['modern', 'xp-theme', 'xp-app-window'],
       html: `<div class="xp-app-content">${contentHTML}</div>`
    });
  };

  const desktopContent = (
    <div className="xp-desktop" onClick={() => setStartOpen(false)}>
      
      {/* Desktop Icons */}
      <div className="xp-icon-grid">
        <div className="xp-icon" onDoubleClick={() => openApp("My Computer", `
          <div class="xp-folder">
            <h3>System Drives</h3>
            <ul>
              <li><img src="https://win98icons.alexmeub.com/icons/png/hard_disk_drive-5.png" width="32" /> Local Disk (C:)</li>
              <li><img src="https://win98icons.alexmeub.com/icons/png/cd_drive-4.png" width="32" /> DVD Drive (D:)</li>
            </ul>
          </div>
        `)}>
          <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-5.png" alt="My Computer" />
          <span>My Computer</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("My Documents", `
          <div class="xp-folder">
            <h3>Documents</h3>
            <ul>
              <li><img src="https://win98icons.alexmeub.com/icons/png/document_wordpad-4.png" width="32" /> Resume.pdf</li>
              <li><img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" width="32" /> Projects</li>
              <li><img src="https://win98icons.alexmeub.com/icons/png/image_gif-2.png" width="32" /> Data_Viz.png</li>
            </ul>
          </div>
        `)}>
          <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-5.png" alt="My Documents" />
          <span>My Documents</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("Recycle Bin", `
          <div style="display:flex; height:100%; align-items:center; justify-content:center; color: #777;">
            Recycle Bin is empty.
          </div>
        `)}>
          <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" alt="Recycle Bin" />
          <span>Recycle Bin</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("Internet Explorer", `
          <div class="xp-browser">
            <h1>Error 404</h1>
            <p>The page you are looking for might have been removed or is temporarily unavailable.</p>
            <p>Please check your internet connection.</p>
          </div>
        `)}>
          <img src="https://win98icons.alexmeub.com/icons/png/msie1-2.png" alt="Internet Explorer" />
          <span>Internet Explorer</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("Data Analysis Tool", `
          <div class="xp-folder">
             <h3>Running Analytics Scripts...</h3>
             <pre style="background: black; color: lime; padding: 10px; font-size: 12px; margin-top: 10px;">
> Loading dataset...
> Cleansing records... OK!
> Applying Random Forest Model...
> Accuracy: 98.4%
> Outputting Dashboard to UI...
             </pre>
          </div>
        `)}>
          <img src="https://win98icons.alexmeub.com/icons/png/calculator-0.png" alt="Terminal" />
          <span>Analytics.exe</span>
        </div>
      </div>
      
      {/* Start Menu */}
      {startOpen && (
        <div className="xp-start-menu" onClick={e => e.stopPropagation()}>
          <div className="xp-start-header">
            <img src="https://win98icons.alexmeub.com/icons/png/user_computer-0.png" alt="User" className="xp-user-icon"/>
            <span>Vishal Singh</span>
          </div>
          <div className="xp-start-body">
            <div className="xp-start-left">
              <div className="xp-start-item" onClick={() => {openApp("Internet", "Browser emulator running."); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/msie1-2.png" alt="Internet" />
                <div>
                  <strong>Internet</strong>
                  <span>Internet Explorer</span>
                </div>
              </div>
              <div className="xp-start-item" onClick={() => {openApp("Email", "Opening Outlook Express..."); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/message_envelope_open-0.png" alt="Email" />
                <div>
                  <strong>E-mail</strong>
                  <span>Outlook Express</span>
                </div>
              </div>
              <div className="xp-start-separator"></div>
              <div className="xp-start-item" onClick={() => {openApp("Power BI Designer", "Initializing BI Dashboard..."); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/chart1-2.png" alt="BI" />
                <div>
                  <strong>Power BI Analytics</strong>
                </div>
              </div>
              <div className="xp-start-item" onClick={() => {openApp("Notepad", "Notepad is blank."); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/notepad-1.png" alt="Notepad" />
                <div>
                  <strong>Notepad</strong>
                </div>
              </div>
            </div>
            
            <div className="xp-start-right">
              <div className="xp-start-item" onClick={() => {openApp("My Documents", "<p>Documents</p>"); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-4.png" alt="Docs" />
                <span>My Documents</span>
              </div>
              <div className="xp-start-item" onClick={() => {openApp("My Computer", "<p>Computer</p>"); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" alt="Computer" />
                <span>My Computer</span>
              </div>
              <div className="xp-start-item" onClick={() => {openApp("Control Panel", "System settings locked."); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/settings_gear-0.png" alt="Control Panel" />
                <span>Control Panel</span>
              </div>
              <div className="xp-start-separator"></div>
              <div className="xp-start-item" onClick={() => {openApp("Run", "Run command..."); setStartOpen(false);}}>
                <img src="https://win98icons.alexmeub.com/icons/png/application_hourglass_small-1.png" alt="Run" />
                <span>Run...</span>
              </div>
            </div>
          </div>
          
          <div className="xp-start-footer">
            <div className="xp-start-action" onClick={() => {
              if (winboxRef.current) winboxRef.current.close();
            }}>
              <img src="https://win98icons.alexmeub.com/icons/png/shut_down_normal-2.png" alt="Log Off" />
              <span>Turn Off Computer</span>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="xp-taskbar" onClick={e => e.stopPropagation()}>
        <button className={`xp-start-button ${startOpen ? 'active' : ''}`} onClick={() => setStartOpen(!startOpen)}>
          <img src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5f/Windows_logo_-_2001.svg/100px-Windows_logo_-_2001.svg.png" width="16" alt="Start" />
          start
        </button>
        <div className="xp-task-divider"></div>
        <div className="xp-system-tray">
          <img src="https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png" alt="Volume" className="mr-2" width="16"/>
          <span className="xp-clock">{time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8 pointer-events-auto transition-opacity duration-300">
        <div ref={containerRef} className="relative w-full h-full max-w-7xl max-h-[90vh] shadow-[0_0_100px_rgba(0,100,255,0.2)] rounded-lg"></div>
        {mountNode && createPortal(desktopContent, mountNode)}
    </div>
  );
};

export default WindowsXP;
