import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import WinBox from 'winbox/src/js/winbox.js';
import 'winbox/dist/css/winbox.min.css';
import 'winbox/dist/css/themes/modern.min.css';
import './WindowsXP.css';

const WindowsXP = ({ onClose }) => {
  const containerRef = useRef(null);
  
  // Interactive OS State
  const [isPreLock, setIsPreLock] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState("");
  const [preLockDate, setPreLockDate] = useState("");

  useEffect(() => {
    // Clock setup
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }));
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      setPreLockDate(now.toLocaleDateString('en-US', options));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && isPreLock) {
        setIsPreLock(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPreLock]);

  // Removed outer WinBox initialization for true native fullscreen

  // Utility to open sub-windows 
  const openApp = (title, contentHTML) => {
    if (!containerRef.current) return;
    
    // Slight randomization of window position
    const offsetX = Math.floor(Math.random() * 50);
    const offsetY = Math.floor(Math.random() * 50);

    new WinBox({
       title: title,
       width: Math.min(600, window.innerWidth * 0.6),
       height: Math.min(400, window.innerHeight * 0.5),
       x: 50 + offsetX,
       y: 50 + offsetY,
       root: containerRef.current,
       class: ['modern', 'xp-theme', 'xp-app-window'],
       html: `<div class="xp-app-content">${contentHTML}</div>`
    });
  };

  const preLockScreenContent = (
    <div className="absolute inset-0 z-[110] flex flex-col items-center justify-between text-white overflow-hidden cursor-pointer select-none" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=2000&auto=format&fit=crop")', // desert dune image
      backgroundSize: 'cover', backgroundPosition: 'center',
      fontFamily: '"Segoe UI", sans-serif',
      boxShadow: 'inset 0 0 100px rgba(0,0,0,0.5)'
    }} onClick={() => setIsPreLock(false)}>
      <div className="pt-[15vh] flex flex-col items-center text-center transition-transform duration-500">
        <h1 className="text-8xl md:text-9xl mb-2 font-light drop-shadow-lg tracking-wider">{time}</h1>
        <p className="text-2xl md:text-3xl font-normal drop-shadow-md tracking-wide">{preLockDate}</p>
      </div>
      
      <div className="pb-16 flex flex-col items-center text-center w-full bg-gradient-to-t from-black/50 to-transparent">
        <p className="text-sm md:text-base font-medium opacity-90 mb-8 animate-pulse drop-shadow-md text-shadow-md">Press Space or Click to continue</p>
        
        {/* Bottom right icons placeholder */}
        <div className="absolute bottom-6 right-8 flex space-x-6 opacity-90 items-center">
          <span className="text-xs font-bold drop-shadow-md">ENG</span>
          <svg className="drop-shadow-md" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.55a11 11 0 0114.08 0 M1.42 9a16 16 0 0121.16 0 M8.53 16.11a6 6 0 016.95 0 M12 20h.01"></path></svg>
          <svg className="drop-shadow-md" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
        </div>
      </div>
    </div>
  );

  const lockScreenContent = (
    <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden" style={{
      backgroundImage: 'url("https://images.unsplash.com/photo-1554629947-334ff61d85dc?q=80&w=2000&auto=format&fit=crop")',
      backgroundSize: 'cover', backgroundPosition: 'center',
      fontFamily: '"Segoe UI", sans-serif',
    }}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md"></div>
      <div className="relative z-10 flex flex-col items-center">
        <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop" style={{ width: 180, height: 180, borderRadius: '50%', border: '4px solid rgba(255,255,255,0.2)', marginBottom: 20, boxShadow: '0 4px 20px rgba(0,0,0,0.5)', objectFit: 'cover' }} alt="Profile" />
        <h2 style={{ fontSize: 42, marginBottom: 30, textShadow: '0 2px 10px rgba(0,0,0,0.8)', fontWeight: 400, color: 'white' }}>Vishal Singh</h2>
        <button onClick={() => setIsLocked(false)} style={{ padding: '8px 40px', fontSize: 16, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', borderRadius: 4, cursor: 'pointer', transition: 'all 0.3s' }} onMouseOver={e=>e.target.style.background='rgba(255,255,255,0.2)'} onMouseOut={e=>e.target.style.background='rgba(255,255,255,0.1)'}>
          Sign in
        </button>
      </div>
    </div>
  );

  const desktopContent = (
    <div className="xp-desktop" onClick={() => setStartOpen(false)} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1545431780-8b1e4a5db3ad?q=80&w=2000&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', fontFamily: 'Tahoma, sans-serif' }}>
      
      {/* Desktop Icons */}
      <div className="xp-icon-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', alignItems: 'flex-start' }}>
        <div className="xp-icon" onClick={() => openApp("My Computer", `<div style="padding:20px"><h3>My Computer</h3><p>Local Disk (C:)</p></div>`)} onDoubleClick={() => openApp("My Computer", `<div style="padding:20px"><h3>My Computer</h3><p>Local Disk (C:)</p></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/computer_explorer-4.png" alt="Computer" style={{ imageRendering: 'pixelated', width: 32, height: 32 }} />
          <span style={{color: 'white', textShadow: '1px 1px 2px black, 0 0 1em black, 0 0 0.2em black'}}>My Computer</span>
        </div>
        
        <div className="xp-icon" onClick={() => openApp("Recycle Bin", `<div style="padding:20px"><h3>Recycle Bin</h3><p>Folder empty.</p></div>`)} onDoubleClick={() => openApp("Recycle Bin", `<div style="padding:20px"><h3>Recycle Bin</h3><p>Folder empty.</p></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/recycle_bin_empty-4.png" alt="Recycle Bin" style={{ imageRendering: 'pixelated', width: 32, height: 32 }} />
          <span style={{color: 'white', textShadow: '1px 1px 2px black, 0 0 1em black, 0 0 0.2em black'}}>Recycle Bin</span>
        </div>

        <div className="xp-icon" onClick={() => openApp("My Portfolio", `<div style="padding:20px"><h3>My Portfolio</h3><p>Welcome to my professional site.</p></div>`)} onDoubleClick={() => openApp("My Portfolio", `<div style="padding:20px"><h3>My Portfolio</h3><p>Welcome to my professional site.</p></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="My Portfolio" style={{ imageRendering: 'pixelated', width: 32, height: 32 }} />
          <span style={{color: 'white', textShadow: '1px 1px 2px black, 0 0 1em black, 0 0 0.2em black'}}>My Portfolio</span>
        </div>
        
        <div className="xp-icon" onClick={() => openApp("Internet", `<div style="padding:20px"><h3>Internet Explorer</h3><p>Welcome to the World Wide Web.</p></div>`)} onDoubleClick={() => openApp("Internet", `<div style="padding:20px"><h3>Internet Explorer</h3><p>Welcome to the World Wide Web.</p></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/msie1-2.png" alt="Internet" style={{ imageRendering: 'pixelated', width: 32, height: 32 }} />
          <span style={{color: 'white', textShadow: '1px 1px 2px black, 0 0 1em black, 0 0 0.2em black'}}>Internet Explorer</span>
        </div>
      </div>
      
      {/* Start Menu */}
      {!isLocked && startOpen && (
        <div className="xp-start-menu" onClick={e => e.stopPropagation()}>
          <div className="xp-start-header">
            <img src="https://win98icons.alexmeub.com/icons/png/user_computer-0.png" alt="User" className="xp-user-icon"/>
            <span>vishal'sWorkplace</span>
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
            <div className="flex gap-4">
              <div className="xp-start-action" onClick={() => { if (onClose) onClose(); }}>
                <img src="https://win98icons.alexmeub.com/icons/png/key_mouse-2.png" alt="Log Off" />
                <span>Log Off</span>
              </div>
              <div className="xp-start-action" onClick={() => { window.location.reload(); }}>
                <img src="https://win98icons.alexmeub.com/icons/png/restart_computer-0.png" alt="Restart" />
                <span>Restart</span>
              </div>
              <div className="xp-start-action" onClick={() => { if (onClose) onClose(); }}>
                <img src="https://win98icons.alexmeub.com/icons/png/shut_down_normal-2.png" alt="Turn Off" />
                <span>Turn Off Computer</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Classic Luna Taskbar */}
      <div className="xp-taskbar" onClick={e => e.stopPropagation()}>
        <button className={`xp-start-button ${startOpen ? 'active' : ''}`} onClick={() => setStartOpen(!startOpen)}>
          <svg style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.6))" }} width="18" height="18" viewBox="0 0 88 88" className="mr-1">
            <path d="M0 14L38 8V44H0V14Z" fill="#F86940" />
            <path d="M42 7.5L88 0V44H42V7.5Z" fill="#80C65A" />
            <path d="M0 46H38V82L0 76V46Z" fill="#44A3E8" />
            <path d="M42 46H88V88L42 80V46Z" fill="#FEC22A" />
          </svg>
          <span style={{ fontStyle: 'italic', fontWeight: 'bold' }}>start</span>
        </button>
        <div className="xp-task-divider"></div>
        <div className="xp-system-tray">
          <img src="https://win98icons.alexmeub.com/icons/png/loudspeaker_rays-0.png" alt="Volume" className="mr-2" style={{ width: '16px' }}/>
          <span className="xp-clock">{time}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center pointer-events-auto transition-opacity duration-300">
        {isPreLock ? (
          <div className="relative w-full h-full animate-in fade-in duration-500">
            {preLockScreenContent}
          </div>
        ) : isLocked ? (
          <div className="relative w-full h-full animate-in fade-in duration-500">
            {lockScreenContent}
          </div>
        ) : (
          <div ref={containerRef} className="relative w-full h-full bg-black/90 animate-in zoom-in-95 duration-300">
            {desktopContent}
          </div>
        )}
    </div>
  );
};

export default WindowsXP;
