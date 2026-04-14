import React, { useState, useEffect, useRef } from 'react';

export const FPSCounter = () => {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let animationFrameId;

    const updateFps = () => {
      frameCount.current++;
      const now = performance.now();
      const elapsed = now - lastTime.current;

      if (elapsed >= 1000) {
        setFps(Math.round((frameCount.current * 1000) / elapsed));
        frameCount.current = 0;
        lastTime.current = now;
      }

      animationFrameId = requestAnimationFrame(updateFps);
    };

    animationFrameId = requestAnimationFrame(updateFps);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-2xl">
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${fps >= 55 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : fps >= 30 ? 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]'}`} />
      <div className="flex items-baseline gap-1">
        <span className="text-[10px] font-black text-white tabular-nums tracking-tighter">{fps}</span>
        <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">FPS</span>
      </div>
    </div>
  );
};
