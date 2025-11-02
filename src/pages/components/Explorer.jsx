import React, { useState } from "react";
import styles from "./Explorer.module.css";

const initialData = [
  { id: 1, name: "Documents", type: "folder" },
  { id: 2, name: "Pictures", type: "folder" },
  { id: 3, name: "Music", type: "folder" },
  { id: 4, name: "Leaf Detail.jpg", type: "file", thumb: "https://via.placeholder.com/100x100?text=Leaf" },
  { id: 5, name: "Yellow Flower.jpg", type: "file", thumb: "https://via.placeholder.com/100x100?text=Flower" },
  { id: 6, name: "Rooftop Shoot.jpg", type: "file", thumb: "https://via.placeholder.com/100x100?text=Shoot" }
];

export default function Explorer() {
  const [path, setPath] = useState(["Home"]);

  function openFolder(name) {
    setPath(prev => [...prev, name]);
  }

  function goHome() {
    setPath(["Home"]);
  }

  return (
    <div className={styles.explorer}>

      <main className={styles.content}>
        <div className={styles.breadcrumb}>
          <span className={styles.crumb} onClick={goHome}>Home</span>
          {path.slice(1).map((p, i) => (
            <span key={i} className={styles.crumb}> / {p}</span>
          ))}
        </div>

        <div className={styles.grid}>
          {initialData.map((item) => (
            <div
              key={item.id}
              className={styles.fileItem}
              onClick={() => item.type === "folder" && openFolder(item.name)}
            >
              {item.thumb ? (
                <img src={item.thumb} alt={item.name} className={styles.thumb} />
              ) : (
                <div className={styles.folderIcon}>📁</div>
              )}
              <div className={styles.fileName}>{item.name}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
