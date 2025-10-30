import React, { useState, useEffect, useCallback } from 'react';
import './AppBar.css'

const OGG_SOUND_URL =  '/sounds/close-20.oga';

function AppBar({ onClose, onMinimize, onMaximize, draggableProps: d, title = "My App" }) {
  const [audio, setAudio] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audioInstance = new Audio(OGG_SOUND_URL);
    audioInstance.preload = 'auto';
    audioInstance.oncanplaythrough = () => setIsReady(true);
    audioInstance.onerror = () => setIsReady(false);
    setAudio(audioInstance);
    return () => {
      audioInstance.oncanplaythrough = null;
      audioInstance.onerror = null;
    };
  }, []);

  const playClickSound = useCallback(() => {
    if (!isReady || !audio) return;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, [isReady, audio]);

  // Handler untuk setiap tombol
  const handleClose = () => {
    playClickSound();
    onClose && onClose();
  };
  const handleMaximize = () => {
    playClickSound();
    onMaximize && onMaximize();
  };
  const handleMinimize = () => {
    playClickSound();
    onMinimize && onMinimize();
  };

  return (
    <div className="macos-menubar" >
      <div className="window-controls">
        <span className="close-btn" onClick={handleClose}></span>
        <span className="maximize-btn" onClick={handleMaximize}></span>
        <span className="minimize-btn" onClick={handleMinimize}></span>
      </div>
      <div className="app-title" {...d}>{title}</div>
    </div>
  );
}

export default AppBar
