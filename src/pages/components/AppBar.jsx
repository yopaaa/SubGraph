import React, { useState, useEffect, useCallback } from 'react';
import styles from './AppBar.module.css'

const OGG_SOUND_URL = '/sounds/close-20.oga';

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
    audio.play().catch(() => { });
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
    <div className={styles.menubar}>
      <div className={styles.windowControls}>
        <span className={styles.closeBtn} onClick={handleClose}></span>
        <span className={styles.maximizeBtn} onClick={handleMaximize}></span>
        <span className={styles.minimizeBtn} onClick={handleMinimize}></span>
      </div>
      <div className={styles.appTitle} {...d}>{title}</div>
    </div>
  );
}

export default AppBar
