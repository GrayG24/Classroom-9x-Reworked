import React, { useRef, useEffect, useMemo } from 'react';

export const Tilt = ({ children, options = {}, className = '', disabled = false }) => {
  const parentRef = useRef(null);
  const tiltRef = useRef(null);

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
    const parentEl = parentRef.current;
    const el = tiltRef.current;
    if (!parentEl || !el || disabled) return;

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
        inset: 0;
        border-radius: inherit;
        pointer-events: none;
        z-index: 1000;
        opacity: 0;
        transition: opacity ${defaultOptions.speed}ms ${defaultOptions.easing};
        will-change: background, opacity;
      `;
      
      // Glare Setup
      el.style.position = 'relative';
      el.appendChild(glareEl);
    }

    let transitionTimeout;
    let rect = null;

    const handleMouseEnter = () => {
      // Capture the stable bounding box of the completely static parent container
      rect = parentEl.getBoundingClientRect();

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
      if (!rect) {
        rect = parentEl.getBoundingClientRect();
      }
      const width = rect.width;
      const height = rect.height;
      const left = rect.left;
      const top = rect.top;
      
      // Compute raw relative coordinates based on the stable un-rotated bounds
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      // Tilt towards behavior:
      const tiltX = (defaultOptions.max / 2 - x * defaultOptions.max).toFixed(2);
      const tiltY = (y * defaultOptions.max - defaultOptions.max / 2).toFixed(2);

      el.style.transform = `perspective(${defaultOptions.perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${defaultOptions.scale}, ${defaultOptions.scale}, ${defaultOptions.scale})`;
      
      if (glareEl) {
        // Percentages scale perfectly with the 3D-scaled element to match cursor visually!
        const pctX = (x * 100).toFixed(3);
        const pctY = (y * 100).toFixed(3);
        glareEl.style.opacity = (defaultOptions['max-glare'] || 0.4).toString();
        glareEl.style.background = `radial-gradient(circle 180px at ${pctX}% ${pctY}%, rgba(255, 255, 255, 0.45) 0%, transparent 100%)`;
      }
    };

    const handleMouseLeave = () => {
      rect = null; // Reset cached rect on leave
      if (defaultOptions.transition) {
        el.style.transition = `transform ${defaultOptions.speed}ms ${defaultOptions.easing}`;
        if (glareEl) {
          glareEl.style.transition = `opacity ${defaultOptions.speed}ms ${defaultOptions.easing}`;
          glareEl.style.opacity = '0';
        }
      }
      if (defaultOptions.reset) {
        el.style.transform = `perspective(${defaultOptions.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      }
    };

    parentEl.addEventListener('mouseenter', handleMouseEnter);
    parentEl.addEventListener('mousemove', handleMouseMove);
    parentEl.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      parentEl.removeEventListener('mouseenter', handleMouseEnter);
      parentEl.removeEventListener('mousemove', handleMouseMove);
      parentEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [defaultOptions, disabled]);

  return (
    <div ref={parentRef} className={`relative block ${className}`}>
      <div ref={tiltRef} className="w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
        {children}
      </div>
    </div>
  );
};
