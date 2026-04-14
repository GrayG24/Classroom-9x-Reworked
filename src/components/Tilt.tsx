import React, { useRef, useEffect } from 'react';

export const Tilt = ({ children, options = {}, className = '' }) => {
  const tilt = useRef(null);

  const defaultOptions = {
    max: 15,
    perspective: 1000,
    scale: 1.02,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
    ...options
  };

  useEffect(() => {
    const el = tilt.current;
    if (!el) return;

    let transitionTimeout;

    const handleMouseEnter = () => {
      if (defaultOptions.transition) {
        el.style.transition = `transform ${defaultOptions.speed}ms ${defaultOptions.easing}`;
        clearTimeout(transitionTimeout);
        transitionTimeout = setTimeout(() => {
          el.style.transition = '';
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
    };

    const handleMouseLeave = () => {
      if (defaultOptions.reset) {
        el.style.transform = `perspective(${defaultOptions.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      }
      if (defaultOptions.transition) {
        el.style.transition = `transform ${defaultOptions.speed}ms ${defaultOptions.easing}`;
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
    <div ref={tilt} className={className}>
      {children}
    </div>
  );
};
