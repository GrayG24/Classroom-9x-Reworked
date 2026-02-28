import React, { useState, useEffect, useRef } from 'react';
import { Activity } from 'lucide-react';

export const FPSCounter = ({ className = "" }) => {
  const [fps, setFps] = useState(0);
  const frames = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationId;
    
    const update = () => {
      frames.current++;
      const now = performance.now();
      const delta = now - lastTime.current;

      if (delta >= 1000) {
        setFps(Math.round((frames.current * 1000) / delta));
        frames.current = 0;
        lastTime.current = now;
      }
      
      animationId = requestAnimationFrame(update);
    };

    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 bg-slate-950/50 border border-white/10 rounded-lg backdrop-blur-md ${className}`}>
      <Activity size={12} className={fps > 55 ? "text-emerald-500" : fps > 30 ? "text-amber-500" : "text-rose-500"} />
      <span className="font-mono text-[10px] font-black text-white uppercase tracking-widest">{fps} FPS</span>
    </div>
  );
};
