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
  const [isPreLock, setIsPreLock] = useState(true);
  const [isLocked, setIsLocked] = useState(true);
  const [startOpen, setStartOpen] = useState(false);
  const [time, setTime] = useState("");
  const [preLockDate, setPreLockDate] = useState("");

  useEffect(() => {
    // Clock setup
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
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

  useEffect(() => {
    // Initialize main OS window ONLY when unlocked
    if (!isLocked && typeof window !== 'undefined' && !winboxRef.current && containerRef.current) {
      const node = document.createElement('div');
      node.style.height = '100%';
      node.style.width = '100%';
      
      winboxRef.current = new WinBox({
        title: "Vishal's Portfolio Windows XP",
        width: '100%',
        height: '100%',
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
      // Cleanup when unmounting
      if (winboxRef.current && typeof winboxRef.current.close === 'function') {
        winboxRef.current.close();
        winboxRef.current = null;
      }
    };
  }, [isLocked, onClose]);

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
    <div className="xp-desktop" onClick={() => setStartOpen(false)} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1545431780-8b1e4a5db3ad?q=80&w=2000&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Desktop Icons */}
      <div className="xp-icon-grid" style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', alignItems: 'flex-start' }}>
        <div className="xp-icon" onDoubleClick={() => openApp("About Me", `<div style="padding:20px"><h3>About Me</h3><p>I blend critical analysis with aesthetic execution.</p></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="About Me" />
          <span style={{color: 'white', textShadow: '1px 1px 2px black'}}>About Me</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("My Projects", `<div style="padding:20px"><h3>My Projects</h3><ul><li>Analytics Tool</li><li>React Web Apps</li></ul></div>`)}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" alt="My Projects" style={{width: 32, height: 32}} />
          <span style={{color: 'white', textShadow: '1px 1px 2px black'}}>My Projects</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("Experience", `<div style="padding:20px"><h3>Experience</h3><p>Building scalable insights.</p></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/directory_explorer-5.png" alt="Experience" />
          <span style={{color: 'white', textShadow: '1px 1px 2px black'}}>Experience</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("Contact", `<div style="padding:20px"><h3>Contact</h3><p>Shoot me an email.</p></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/message_envelope_open-0.png" alt="Contact" />
          <span style={{color: 'white', textShadow: '1px 1px 2px black'}}>Contact</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => window.open('https://github.com/vishal', '_blank')}>
          <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub" style={{width: 32, height: 32, borderRadius: 8, background: 'white', padding: 2}}/>
          <span style={{color: 'white', textShadow: '1px 1px 2px black'}}>GitHub</span>
        </div>
        
        <div className="xp-icon" onDoubleClick={() => openApp("Terminal", `<div style="padding:20px; background:black; color:lime; height:100%; border-radius:4px;"><pre>> Initiating terminal connection...<br/>> OK</pre></div>`)}>
          <img src="https://win98icons.alexmeub.com/icons/png/console_prompt-0.png" alt="Terminal" />
          <span style={{color: 'white', textShadow: '1px 1px 2px black'}}>Terminal</span>
        </div>
      </div>
      
      {/* Start Menu */}
      {!isLocked && startOpen && (
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
          <>
            <div ref={containerRef} className="relative w-full h-full bg-black/90"></div>
            {mountNode && createPortal(desktopContent, mountNode)}
          </>
        )}
    </div>
  );
};

export default WindowsXP;
