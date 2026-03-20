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
    <div className="xp-desktop" onClick={() => setStartOpen(false)} style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1545431780-8b1e4a5db3ad?q=80&w=2000&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' }}>
      
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
        <div className="xp-start-menu" style={{ bottom: '74px', left: 'calc(50% - 380px)' }} onClick={e => e.stopPropagation()}>
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
            <div className="xp-start-action" onClick={() => {
              if (onClose) onClose();
            }}>
              <img src="https://win98icons.alexmeub.com/icons/png/shut_down_normal-2.png" alt="Log Off" />
              <span>Turn Off Computer</span>
            </div>
          </div>
        </div>
      )}

      {/* Redesigned Floating Retro Modern Dock */}
      <div className="absolute bottom-3 w-full flex justify-center items-center pointer-events-none z-[2000] font-sans">
        
        {/* The interactive floating container */}
        <div className="flex gap-4 h-14 pointer-events-auto drop-shadow-2xl" onClick={e => e.stopPropagation()}>
          
          {/* Left Block: Start, Weather, Search, SysTray */}
          <div className="flex items-center bg-gradient-to-b from-[#1b62dd] to-[#1253c4] rounded-xl overflow-visible border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]">
            
            {/* Start Button */}
            <button className={`h-full bg-gradient-to-b from-[#3ca14a] to-[#2b8332] text-white font-medium text-xl px-5 flex items-center gap-3 rounded-l-xl border-r border-[#00000040] shadow-[inset_1px_1px_2px_rgba(255,255,255,0.4),2px_0_4px_rgba(0,0,0,0.3)] hover:brightness-110 transition-all ${startOpen ? 'brightness-110' : ''}`} onClick={() => setStartOpen(!startOpen)}>
              <svg style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.6))" }} width="24" height="24" viewBox="0 0 88 88">
                <path d="M0 14L38 8V44H0V14Z" fill="#F86940" />
                <path d="M42 7.5L88 0V44H42V7.5Z" fill="#80C65A" />
                <path d="M0 46H38V82L0 76V46Z" fill="#44A3E8" />
                <path d="M42 46H88V88L42 80V46Z" fill="#FEC22A" />
              </svg>
              Start
            </button>

            {/* Weather Widget */}
            <div className="flex items-center gap-2 px-4 text-white text-sm select-none cursor-pointer hover:bg-white/10 h-full transition-colors border-r border-[#ffffff20]">
              <div className="relative">
                <div className="w-6 h-6 bg-orange-400 rounded-full shadow-[0_0_8px_rgba(255,165,0,0.8)]"></div>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] flex justify-center items-center font-bold">4</div>
              </div>
              <div className="flex flex-col leading-tight pb-0">
                <span className="font-semibold" style={{textShadow: "1px 1px 2px rgba(0,0,0,0.5)"}}>86°F</span>
                <span className="opacity-80 text-xs">Sunny</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="h-full flex items-center px-3 border-r border-[#ffffff20]">
              <div className="bg-[#dbe4f1] w-64 h-9 rounded-full flex items-center px-4 gap-2 shadow-inner cursor-text hover:bg-white transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span className="text-gray-500 text-base">Search</span>
              </div>
            </div>

            {/* Task View */}
            <div className="flex items-center px-4 h-full cursor-pointer hover:bg-white/10 transition-colors border-r border-[#ffffff20]">
               <svg style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><rect x="8" y="3" width="8" height="18"></rect></svg>
            </div>

            {/* System Tray Icons */}
            <div className="flex items-center gap-2 px-4 h-full cursor-pointer hover:bg-white/10 transition-colors border-r border-[#ffffff20]">
              <svg style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
              <svg style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>
              <svg style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
              <svg style={{ filter: "drop-shadow(1px 1px 1px rgba(0,0,0,0.5))" }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect><line x1="23" y1="13" x2="23" y2="11"></line></svg>
            </div>

            {/* Clock */}
            <div className="flex flex-col justify-center items-end px-5 text-white text-xs leading-tight cursor-pointer hover:bg-white/10 h-full rounded-r-xl transition-colors">
              <span className="font-semibold" style={{textShadow: "1px 1px 2px rgba(0,0,0,0.5)"}}>{time}</span>
              <span className="opacity-90">{new Date().toLocaleDateString('en-US')}</span>
            </div>

          </div>

          {/* Right Block: App Dock */}
          <div className="flex items-center gap-1 px-5 bg-gradient-to-b from-[#1b62dd] to-[#1253c4] rounded-xl border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.3)]">
            
            {/* App Dock Item (Folder) */}
            <div className="relative group p-2.5 rounded-lg hover:bg-white/20 cursor-pointer flex flex-col items-center justify-center transition-all bg-white/10 shadow-inner my-1" onClick={() => openApp("My Documents", "<div style='padding:20px'><h3>My Documents</h3><p>Empty folder.</p></div>")}>
              <img src="https://win98icons.alexmeub.com/icons/png/directory_open_file_mydocs-4.png" alt="Docs" className="w-[28px] h-[28px] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              <div className="absolute -bottom-[2px] w-1.5 h-1.5 bg-white rounded-full opacity-100 shadow-[0_0_3px_white]"></div>
            </div>
            
            {/* Edge / Browser */}
            <div className="relative group p-2.5 rounded-lg hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center transition-all my-1" onClick={() => openApp("Browser", "<div style='padding:20px'><h3>Internet Browser</h3><p>Ready to surf the web.</p></div>")}>
              <img src="https://win98icons.alexmeub.com/icons/png/msie1-2.png" alt="Edge" className="w-[28px] h-[28px] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              <div className="absolute -bottom-[2px] w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-opacity"></div>
            </div>
            
            {/* Chrome */}
            <div className="relative group p-2.5 rounded-lg hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center transition-all my-1" onClick={() => openApp("Chrome", "<div style='padding:20px'><h3>Google Chrome</h3><p>New Tab</p></div>")}>
               <img src="https://upload.wikimedia.org/wikipedia/commons/8/87/Google_Chrome_icon_%282011%29.png" alt="Chrome" className="w-[28px] h-[28px] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              <div className="absolute -bottom-[2px] w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-opacity"></div>
            </div>
            
            {/* Terminal */}
            <div className="relative group p-2.5 rounded-lg hover:bg-white/10 cursor-pointer flex flex-col items-center justify-center transition-all my-1" onClick={() => openApp("Terminal", `<div style="padding:20px; background:black; color:lime; height:100%; border-radius:4px;"><pre>> Initiating terminal connection...<br/>> OK</pre></div>`)}>
               <img src="https://win98icons.alexmeub.com/icons/png/console_prompt-0.png" alt="Terminal" className="w-[28px] h-[28px] filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
              <div className="absolute -bottom-[2px] w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-60 transition-opacity"></div>
            </div>

          </div>
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
