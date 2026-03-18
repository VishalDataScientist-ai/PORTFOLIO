import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';

const RealisticGlobe = () => {
  const globeRef = useRef();

  useEffect(() => {
    // Basic setup for auto-rotation and disabling zoom since it's an aesthetic piece
    if (globeRef.current) {
        const controls = globeRef.current.controls();
        if (controls) {
            controls.autoRotate = true;
            controls.autoRotateSpeed = 2.0;
            controls.enableZoom = false; 
        }
    }
  }, []);

  return (
    <div className="w-48 h-48 md:w-64 md:h-64 mx-auto overflow-hidden flex items-center justify-center rounded-full hover:scale-105 transition-transform duration-700 shadow-[0_0_40px_rgba(30,58,138,0.4)] relative cursor-move">
      <div className="scale-[1.3] pointer-events-none md:pointer-events-auto">
          <Globe
            ref={globeRef}
            width={300}
            height={300}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundColor="rgba(0,0,0,0)" // Keep it fully transparent to blend into BG
            showAtmosphere={true}
            atmosphereColor="#4b8ce6"
            atmosphereAltitude={0.2}
          />
      </div>
    </div>
  );
};

export default RealisticGlobe;
