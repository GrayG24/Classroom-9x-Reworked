import React, { useState, useEffect } from 'react';

export const TypewriterText = ({ messages, delay = 0 }) => {
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  
  useEffect(() => {
    if (!messages || messages.length === 0) return;

    let timeout;
    const currentFullText = messages[messageIndex];
    
    if (isDeleting) {
      if (currentText === "") {
        // Message fully deleted, wait a bit then move to next
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setMessageIndex((prev) => (prev + 1) % messages.length);
        }, 500);
      } else {
        // Backspacing
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
        }, 30);
      }
    } else {
      if (currentText === currentFullText) {
        // Message fully typed, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      } else {
        // Typing
        const typingSpeed = currentText === "" ? delay : 60;
        timeout = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, messageIndex, messages, delay]);
  
  return (
    <span className="relative">
      {currentText}
      <span className="inline-block w-1 h-3.5 bg-current ml-1 animate-pulse align-middle" />
    </span>
  );
};
