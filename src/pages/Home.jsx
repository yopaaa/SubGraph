import React, { useState, useEffect } from "react";
import "./Home.css";
import AppBar from './components/AppBar'

import Dock from './components/Dock'
import Panel from './components/Panel'
import BackgroundSelector from "./components/BackgroundSelector";
import VideoGrid from "./components/VideoGrid";
import Explorer from "./components/Explorer";
import Graph from './components/Graph'
import Chatbot from "./components/Chatbot";

const App = () => {
  const [showDiv, setShowDiv] = useState([0, 0, 0, 0, 0]);
  const [topIndex, setTopIndex] = useState(1);
  const [showBgSelector, setshowBgSelector] = useState(false)
  const [maxWindow, setmaxWindow] = useState(null)

  const dockData = [
    {
      id: 0, icon: "/icon/browser.png", name: "Browser", function: () => {
        toggleDiv(0)
      },
      component: <><h1>Materi</h1></>
    },
    {
      id: 1, icon: "/icon/calculator.png", name: "Calculator", function: () => {
        toggleDiv(1)
      },
      component: <Graph />
    },
    {
      id: 2, icon: "/icon/folder.png", name: "Folder", function: () => toggleDiv(2),
      component: <Explorer />
    },
    {
      id: 3, icon: "/icon/video-marketing.png", name: "Video", function: () => toggleDiv(3),
      component: <VideoGrid />
    },
    {
      id: 4, icon: "/icon/chat.png", name: "Chat Bot", function: () => toggleDiv(4),
      component: <Chatbot />
    },
  ]

  const panelData = {
    left: [
      { id: 0, icon: "/icon/Finder.png", name: "Profile", function: () => toggleDiv(0), href: "/example/home" },
      { id: 1, icon: "/icon/Calculator.png", name: "Kalkulator", function: () => toggleDiv(1), href: "/example/test" },
      { id: 2, icon: "/icon/Folder.png", name: "File", function: () => toggleDiv(2), href: "/example/home" },
      { id: 3, icon: "/icon/VideoMarketing.png", name: "Video", function: () => toggleDiv(3), href: "/example/home" },
      { id: 4, icon: "/icon/Terminal.png", name: "Materi Lain", function: () => toggleDiv(4), href: "/example/home" },
    ],
    right: [
      {
        id: 0, icon: "/icon/scalability.png", name: "cloud", function: () => {
          const elem = document.documentElement;

          if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
              console.error(`Gagal masuk fullscreen: ${err.message}`);
            });
          } else {
            document.exitFullscreen();
          }
        }, href: "/example/home"
      },
      { id: 4, icon: "/icon/background.png", name: "wifi", function: () => setshowBgSelector(true), href: "/example/home" },
      { id: 0, icon: "/icon/cloud-computing.png", name: "cloud", function: () => console.log(0), href: "/example/home" },
      { id: 1, icon: "/icon/bluetooth.png", name: "bluetooth", function: () => console.log(1), href: "/example/test" },
      { id: 2, icon: "/icon/search.png", name: "search", function: () => console.log(2), href: "/example/home" },
      { id: 3, icon: "/icon/low-battery.png", name: "battery", function: () => console.log(3), href: "/example/home" },
      { id: 4, icon: "/icon/wifi.png", name: "wifi", function: () => setshowBgSelector(true), href: "/example/home" },
      { id: 5, icon: "/icon/user.png", name: "user", function: () => console.log(4), href: "/example/home" },
    ]
  }

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

  return (
    <div className="app">
      <Panel data={panelData} />

      {showBgSelector && <BackgroundSelector onClose={() => setshowBgSelector(false)} />}

      <div className="desktop-container">
        {dockData.map((data, i) => {
          let style = {
            zIndex: showDiv[i],
            bottom: `${80 + i * 5}px`,
            left: `${49 + (i * 0.5)}%`
          }

          maxWindow == i ? delete style.left : null
          maxWindow == i ? style.width = "100vw" : null
          return (
            <div className={`magicDiv ${showDiv[i] ? "show" : ""}`} key={i}
              style={style}
            >
              <AppBar
                title={data.name}
                onClose={() => {
                  hideDiv(i)
                }}
                onMinimize={() => setmaxWindow(null)}
                onMaximize={() => setmaxWindow(i)}
              />
              {data.component}
            </div>
          )
        })}
      </div>


      <Dock dock={dockData} showDiv={showDiv} />
    </div>
  );
};

export default App;
