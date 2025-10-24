import React, { useState, useEffect } from "react";
import "./Home.css";
import AppBar from './components/AppBar'

import Dock from './components/Dock'
import Panel from './components/Panel'
import NetworkGraphChart from './NetworkGraphChart'
import BackgroundSelector from "./components/BackgroundSelector";

const App = () => {
  const [showDiv, setShowDiv] = useState([0, 0, 0, 0, 0]);
  const [topIndex, setTopIndex] = useState(1);
  const [showBgSelector, setshowBgSelector] = useState(false)
  const toggleDiv = (index) => {
    const updated = [...showDiv];
    updated[index] = topIndex;
    setTopIndex(topIndex + 1);
    setShowDiv(updated);
  };

  const hideDiv = (index) => {
    const updated = [...showDiv];
    updated[index] = 0;
    setShowDiv(updated);
  };

  const dockData = [
    {
      id: 0, icon: "/icon/browser.png", name: "Browser", function: () => {
        toggleDiv(0)
      },
      component: <NetworkGraphChart />
    },
    {
      id: 1, icon: "/icon/calculator.png", name: "Calculator", function: () => {
        toggleDiv(1)
      },
      component: <></>
    },
    {
      id: 2, icon: "/icon/folder.png", name: "Folder", function: () => toggleDiv(2),
      component: <></>
    },
    {
      id: 3, icon: "/icon/video-marketing.png", name: "Video Marketing", function: () => toggleDiv(3),
      component: <></>
    },
    {
      id: 4, icon: "/icon/terminal.png", name: "Terminal", function: () => toggleDiv(4),
      component: <></>
    },
  ]

  const panelData = {
    left: [
      { id: 0, icon: "/icon/Finder.png", name: "Finder", function: () => toggleDiv(0), href: "/example/home" },
      { id: 1, icon: "/icon/Calculator.png", name: "Calculator", function: () => toggleDiv(1), href: "/example/test" },
      { id: 2, icon: "/icon/Folder.png", name: "Folder", function: () => toggleDiv(2), href: "/example/home" },
      { id: 3, icon: "/icon/VideoMarketing.png", name: "Video Marketing", function: () => toggleDiv(3), href: "/example/home" },
      { id: 4, icon: "/icon/Terminal.png", name: "Terminal", function: () => toggleDiv(4), href: "/example/home" },
    ],
    right: [
      { id: 0, icon: "/icon/cloud-computing.png", name: "cloud", function: () => toggleDiv(0), href: "/example/home" },
      { id: 1, icon: "/icon/bluetooth.png", name: "bluetooth", function: () => toggleDiv(1), href: "/example/test" },
      { id: 2, icon: "/icon/search.png", name: "search", function: () => toggleDiv(2), href: "/example/home" },
      { id: 3, icon: "/icon/low-battery.png", name: "battery", function: () => toggleDiv(3), href: "/example/home" },
      { id: 4, icon: "/icon/wifi.png", name: "wifi", function: () => setshowBgSelector(true), href: "/example/home" },
      { id: 5, icon: "/icon/user.png", name: "user", function: () => toggleDiv(4), href: "/example/home" },
    ]
  }

  return (
    <div className="app">
      {/* Header */}
      <Panel data={panelData} />

      {showBgSelector && <BackgroundSelector onClose={() => setshowBgSelector(false)} />}

      <div className="desktop-container">
        {dockData.map((data, i) => (
          <div className={`magicDiv ${showDiv[i] ? "show" : ""}`} key={i}
            style={{ zIndex: showDiv[i], bottom: `${80 + i * 5}px`, left: `${49 + (i * 0.5)}%` }}
          >
            <AppBar
              title={data.name}
              onClose={() => {
                hideDiv(i)
              }}
              // onMinimize={handleMinimize}
              onMaximize={() => {
                const elem = document.documentElement;

                if (!document.fullscreenElement) {
                  elem.requestFullscreen().catch((err) => {
                    console.error(`Gagal masuk fullscreen: ${err.message}`);
                  });
                } else {
                  document.exitFullscreen();
                }
              }}
            />
            {data.component}
          </div>
        ))}
      </div>


      {/* Apps */}
      <Dock dock={dockData} showDiv={showDiv} />

    </div>
  );
};

export default App;
