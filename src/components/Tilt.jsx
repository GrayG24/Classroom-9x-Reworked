import React, { useRef, useEffect, useMemo } from 'react';

export const Tilt = ({ children, options = {}, className = '', disabled = false }) => {
  const tilt = useRef(null);

  const defaultOptions = useMemo(() => ({
    max: 15,
    perspective: 1000,
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

    el.style.transformStyle = 'preserve-3d';
    el.style.willChange = 'transform';
    el.parentElement.style.perspective = `${defaultOptions.perspective}px`;
    el.parentElement.style.transformStyle = 'preserve-3d';

    // Create glare elements if requested
    let glareEl;
    if (defaultOptions.glare) {
      glareEl = document.createElement('div');
      glareEl.className = 'proto-glare';
      glareEl.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 150%;
        height: 150%;
        background: radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 10;
        opacity: 0;
        transition: opacity ${defaultOptions.speed}ms ${defaultOptions.easing};
      `;
      el.style.position = el.style.position || 'relative';
      el.style.overflow = el.style.overflow || 'hidden';
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

      const tiltX = (x * defaultOptions.max - defaultOptions.max / 2).toFixed(2);
      const tiltY = (defaultOptions.max / 2 - y * defaultOptions.max).toFixed(2);

      el.style.transform = `perspective(${defaultOptions.perspective}px) rotateX(${tiltY}deg) rotateY(${tiltX}deg) scale3d(${defaultOptions.scale}, ${defaultOptions.scale}, ${defaultOptions.scale})`;
      
      if (glareEl) {
        const glareOpacity = ((x + y) / 2 * (defaultOptions['max-glare'] || 0.4)).toFixed(2);
        glareEl.style.opacity = glareOpacity;
        glareEl.style.transform = `translate(-50%, -50%) translate(${(x - 0.5) * 20}%, ${(y - 0.5) * 20}%)`;
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
    <div ref={tilt} className={`relative block w-fit h-fit ${className}`}>
      {children}
    </div>
  );
};
