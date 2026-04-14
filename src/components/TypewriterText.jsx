import React, { useState, useEffect } from 'react';

export const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;
    
    const type = () => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
        timeoutId = setTimeout(type, 30);
      }
    };
    
    const startTimeoutId = setTimeout(type, delay);
    
    return () => {
      clearTimeout(startTimeoutId);
      clearTimeout(timeoutId);
    };
  }, [text, delay]);
  
  return <span>{displayedText}</span>;
};
