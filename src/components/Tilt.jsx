import React, { useRef, useEffect, useMemo } from 'react';

export const Tilt = ({ children, options = {}, className = '', disabled = false }) => {
  const tilt = useRef(null);

  const defaultOptions = useMemo(() => ({
    max: 20,
    perspective: 1200,
    scale: 1.02,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    ...options
  }), [options]);

  useEffect(() => {
    const el = tilt.current;
    if (!el || disabled) return;

    // Use the main container for everything to ensure consistency
    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';
    
    // Create glare elements if requested
    let glareEl;
    if (defaultOptions.glare) {
      glareEl = document.createElement('div');
      glareEl.className = 'proto-tilt-shine';
      glareEl.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 200%;
        height: 200%;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, transparent 70%);
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity ${defaultOptions.speed}ms ${defaultOptions.easing};
        transform: translate(-50%, -50%);
        will-change: transform, opacity;
      `;
      
      // Glare Setup
      el.style.position = 'relative';
      el.appendChild(glareEl);
    }

    let transitionTimeout;

    const handleMouseEnter = () => {
      if (defaultOptions.transition) {
        el.style.transition = `transform ${defaultOptions.speed}ms ${defaultOptions.easing}`;
        if (glareEl) glareEl.style.transition = `opacity ${defaultOptions.speed}ms ${defaultOptions.easing}`;
        clearTimeout(transitionTimeout);
        transitionTimeout = setTimeout(() => {
          el.style.transition = '';
          if (glareEl) glareEl.style.transition = '';
        }, defaultOptions.speed);
      }
    };

    const handleMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const left = rect.left;
      const top = rect.top;
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      // Tilt towards behavior:
      // High X (right) -> rotateY should be negative to move right side towards viewer
      // High Y (bottom) -> rotateX should be negative to move bottom side towards viewer
      const tiltX = (defaultOptions.max / 2 - x * defaultOptions.max).toFixed(2);
      const tiltY = (defaultOptions.max / 2 - y * defaultOptions.max).toFixed(2);

      el.style.transform = `perspective(${defaultOptions.perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${defaultOptions.scale}, ${defaultOptions.scale}, ${defaultOptions.scale})`;
      
      if (glareEl) {
        // Glare follows mouse
        glareEl.style.opacity = (defaultOptions['max-glare'] || 0.4).toString();
        glareEl.style.transform = `translate(-50%, -50%) translate(${x * 100}%, ${y * 100}%)`;
      }
    };

    const handleMouseLeave = () => {
      if (defaultOptions.transition) {
        el.style.transition = `transform ${defaultOptions.speed}ms ${defaultOptions.easing}`;
        if (glareEl) {
          glareEl.style.transition = `opacity ${defaultOptions.speed}ms ${defaultOptions.easing}, transform ${defaultOptions.speed}ms ${defaultOptions.easing}`;
          glareEl.style.opacity = '0';
        }
      }
      if (defaultOptions.reset) {
        el.style.transform = `perspective(${defaultOptions.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      }
    };

    el.addEventListener('mouseenter', handleMouseEnter);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mouseenter', handleMouseEnter);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [defaultOptions]);

  return (
    <div ref={tilt} className={`relative block ${className}`} style={{ transformStyle: 'preserve-3d' }}>
      {children}
    </div>
  );
};
