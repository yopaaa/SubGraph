import React from "react";
import styles from "./VideoGrid.module.css";

const videos = [
  {
    title: "Belajar React Dasar",
    description: "Panduan singkat untuk pemula React.",
    banner: "https://i.ytimg.com/vi/Ke90Tje7VS0/maxresdefault.jpg",
    video: "https://www.youtube.com/embed/Ke90Tje7VS0"
  },
  {
    title: "Konsep useState",
    description: "Cara menggunakan state di React.",
    banner: "https://i.ytimg.com/vi/O6P86uwfdR0/maxresdefault.jpg",
    video: "https://www.youtube.com/embed/O6P86uwfdR0"
  },
  {
    title: "Belajar Props dan Component",
    description: "Memahami konsep props antar komponen.",
    banner: "https://i.ytimg.com/vi/MhkGQAoc7bc/maxresdefault.jpg",
    video: "https://www.youtube.com/embed/MhkGQAoc7bc"
  },
  {
    title: "React useEffect",
    description: "Gunakan efek samping di komponen React.",
    banner: "https://i.ytimg.com/vi/0ZJgIjIuY7U/maxresdefault.jpg",
    video: "https://www.youtube.com/embed/0ZJgIjIuY7U"
  }
];

export default function VideoGrid() {
  return (
    <div className={styles.container}>
      <div className={styles.videoGrid}>
        {videos.map((v, i) => (
          <div key={i} className={styles.videoCard}>
            <iframe
              src={v.video}
              title={v.title}
              frameBorder="0"
              allowFullScreen
              className={styles.videoIframe}
            ></iframe>

            <h3 className={styles.videoTitle}>{v.title}</h3>
            <p className={styles.videoDesc}>{v.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
