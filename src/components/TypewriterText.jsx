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
        // Message fully deleted, wait a bit then pick a RANDOM next one
        timeout = setTimeout(() => {
          setIsDeleting(false);
          setMessageIndex((prev) => {
            let nextIndex = Math.floor(Math.random() * messages.length);
            if (nextIndex === prev && messages.length > 1) {
              nextIndex = (nextIndex + 1) % messages.length;
            }
            return nextIndex;
          });
        }, 400); // Shorter pause between messages
      } else {
        // Backspacing
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
        }, 20); // Faster deleting
      }
    } else {
      if (currentText === currentFullText) {
        // Message fully typed, wait then start deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500); // Pause on full text
      } else {
        // Typing
        const typingSpeed = currentText === "" ? (delay || 500) : 50; 
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
