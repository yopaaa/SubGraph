import { useState } from 'react'
import './AppBar.css'

function AppBar({ onClose, onMinimize, onMaximize, draggableProps: d, title = "My App" }) {
  return (
    <div className="macos-menubar" >
      <div className="window-controls">
        <span className="close-btn" onClick={onClose}></span>
        <span className="maximize-btn" onClick={onMaximize}></span>
        <span className="minimize-btn" onClick={onMinimize}></span>
      </div>

      <div className="app-title" {...d}>{title}</div>
    </div>
  );
}

export default AppBar
