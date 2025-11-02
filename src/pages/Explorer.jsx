import React, { useState } from "react";
import "./Explorer.css";

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
    <div className="mac-explorer">
      <aside className="sidebar">
        <div className="section">
          <h4>iCloud</h4>
          <ul>
            <li className="active">iCloud Drive</li>
            <li>Shared</li>
          </ul>
        </div>
        <div className="section">
          <h4>Favorites</h4>
          <ul>
            <li>AirDrop</li>
            <li>Recents</li>
            <li>Applications</li>
            <li>Desktop</li>
            <li>Documents</li>
            <li>Downloads</li>
          </ul>
        </div>
      </aside>

      <main className="content">
        <div className="breadcrumb">
          <span className="crumb" onClick={goHome}>Home</span>
          {path.slice(1).map((p, i) => (
            <span key={i} className="crumb"> / {p}</span>
          ))}
        </div>

        <div className="grid">
          {initialData.map((item) => (
            <div
              key={item.id}
              className="file-item"
              onClick={() => item.type === "folder" && openFolder(item.name)}
            >
              {item.thumb ? (
                <img src={item.thumb} alt={item.name} className="thumb" />
              ) : (
                <div className="folder-icon">📁</div>
              )}
              <div className="file-name">{item.name}</div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

/* MacFileExplorer.css */

