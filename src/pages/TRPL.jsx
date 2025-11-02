"use client";

import React from "react";
import { Parallax, ParallaxProvider } from "react-scroll-parallax";
import "./TRPL.css"
const data = [
  {
    groupName: "Kelompok 1: Logika Matematika",
    title: "Website Logika Matematika",
    description:
      "Website tentang dasar-dasar logika matematika yang mencakup implikasi, ekuivalensi, dan lainnya.",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    team: [
      { name: "Gabriel Jonathan", img: "/team1.jpg" },
      { name: "Adelia Syawali", img: "/team2.jpg" },
      { name: "Nadia Selma", img: "/team3.jpg" }
    ],
    slogan:
      "Logic is the foundation of wisdom, where truth meets reason in perfect harmony."
  },
  {
    groupName: "Kelompok 1: Logika Matematika",
    title: "Website Logika Matematika",
    description:
      "Website tentang dasar-dasar logika matematika yang mencakup implikasi, ekuivalensi, dan lainnya.",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    team: [
      { name: "Gabriel Jonathan", img: "/team1.jpg" },
      { name: "Adelia Syawali", img: "/team2.jpg" },
      { name: "Nadia Selma", img: "/team3.jpg" }
    ],
    slogan:
      "Logic is the foundation of wisdom, where truth meets reason in perfect harmony."
  }
  , {
    groupName: "Kelompok 1: Logika Matematika",
    title: "Website Logika Matematika",
    description:
      "Website tentang dasar-dasar logika matematika yang mencakup implikasi, ekuivalensi, dan lainnya.",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    team: [
      { name: "Gabriel Jonathan", img: "/team1.jpg" },
      { name: "Adelia Syawali", img: "/team2.jpg" },
      { name: "Nadia Selma", img: "/team3.jpg" }
    ],
    slogan:
      "Logic is the foundation of wisdom, where truth meets reason in perfect harmony."
  }, {
    groupName: "Kelompok 1: Logika Matematika",
    title: "Website Logika Matematika",
    description:
      "Website tentang dasar-dasar logika matematika yang mencakup implikasi, ekuivalensi, dan lainnya.",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    team: [
      { name: "Gabriel Jonathan", img: "/team1.jpg" },
      { name: "Adelia Syawali", img: "/team2.jpg" },
      { name: "Nadia Selma", img: "/team3.jpg" }
    ],
    slogan:
      "Logic is the foundation of wisdom, where truth meets reason in perfect harmony."
  }, {
    groupName: "Kelompok 1: Logika Matematika",
    title: "Website Logika Matematika",
    description:
      "Website tentang dasar-dasar logika matematika yang mencakup implikasi, ekuivalensi, dan lainnya.",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    team: [
      { name: "Gabriel Jonathan", img: "/team1.jpg" },
      { name: "Adelia Syawali", img: "/team2.jpg" },
      { name: "Nadia Selma", img: "/team3.jpg" }
    ],
    slogan:
      "Logic is the foundation of wisdom, where truth meets reason in perfect harmony."
  }
];

export default function HalamanGroupMedia() {
  return (
    <ParallaxProvider>
      <main className="container">



        {data.map((item, idx) => (
          <section key={idx} className="section" style={{ height: "200vh" }}>
            <Parallax speed={-10}>
              <h2>{item.groupName}</h2>
              <p className="description">{item.description}</p>
            </Parallax>


            <div className="content">
              <Parallax speed={-5}>
                <div className="video-wrapper">
                  <iframe
                    src={item.video}
                    title="Video Presentasi"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </Parallax>


            </div>


            <Parallax speed={-8}>
              <p className="slogan">“{item.slogan}”</p>
            </Parallax>

            <Parallax speed={5}
              style={{ marginTop: 400 }}
              translateX={['-400px', '0px']}
              scale={[0.75, 3]}
              // rotate={[-180, 0]}
              easing="easeInQuad">
              <div className="team">
                {item.team.map((member, i) => (
                  <div key={i} className="member">
                    <img src={member.img} alt={member.name} />
                    <p>{member.name}</p>
                  </div>
                ))}
              </div>
            </Parallax>
          </section>
        ))}
      </main>
    </ParallaxProvider>
  );
}
