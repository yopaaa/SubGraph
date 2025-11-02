import { useState, useEffect, useCallback } from 'react';
import styles from "./Dock.module.css"

const OGG_SOUND_URL = '/sounds/map-20.oga';

const Dock = ({ dock, showDiv }) => {
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

  return (
    <div className={styles.apps}>
      <div className={styles.appContainer}>
        {dock.map(app => (
          <span key={app.id} onClick={() => {
            app.function()
            playClickSound()
          }} className={`${styles.appItems} ${styles.magicLamp}`}>
            <img src={app.icon} alt="" width="50" height="50" />
            {(showDiv[app.id]) ? <img src="/icon/circle.png" alt="" width="5" height="5" style={{ position: "absolute" }} /> : null}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Dock;
