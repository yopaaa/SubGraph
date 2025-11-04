import { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useSpring, animated } from '@react-spring/web'
import styles from "./TRPL.module.css"
import data from './group.json'

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}/bg/${name}.svg${wrap ? ')' : ''}`

export default function App() {
  const parallax = useRef(null)
  const zoom = useSpring({
    from: { transform: 'scale(0.5) rotate(1deg)' },
    to: { transform: 'scale(1) rotate(360deg)' },
    config: { duration: 2000 },
  })

  const handleScroll = (e) => {
    const current = e.target.scrollTop
    const height = window.innerHeight
    const target = Math.round(current / height)
    parallax.current.scrollTo(target)
  }

  return (
    <div className={styles.container}>
      <Parallax ref={parallax} pages={data.length} onScroll={handleScroll}>
        <ParallaxLayer offset={0} style={{ backgroundColor: '#1B262C' }} />
        <ParallaxLayer offset={1} style={{ backgroundColor: '#2C3639' }} />
        <ParallaxLayer offset={2} style={{ backgroundColor: '#3E4E50' }} />
        <ParallaxLayer offset={3} style={{ backgroundColor: '#2E2E38' }} />
        <ParallaxLayer offset={4} style={{ backgroundColor: '#3C2A4D' }} />
        <ParallaxLayer offset={5} style={{ backgroundColor: '#4E3B31' }} />
        <ParallaxLayer offset={6} style={{ backgroundColor: '#22333B' }} />
        <ParallaxLayer offset={7} style={{ backgroundColor: '#373F47' }} />
        <ParallaxLayer offset={8} style={{ backgroundColor: '#2B2D42' }} />
        <ParallaxLayer offset={9} style={{ backgroundColor: '#3A3A3A' }} />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={10}
          style={{
            backgroundImage: url('stars', true),
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer offset={2.5} speed={1} style={{ pointerEvents: 'none' }}>
          <img src={"/bg/rocket.png"} style={{ width: '15%', marginLeft: '90%' }} alt="rocket" />
        </ParallaxLayer>

        <ParallaxLayer offset={0.3} speed={-0.5} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '15%', marginLeft: '10%' }} alt="satellite" />
        </ParallaxLayer>

        {/* CLOUD LAYERS */}
        {[1.6, 2.6, 3, 3.75, 4, 4.75, 7, 7.75, 8.5, 8.75, 8.3].map((offset, idx) => (
          <ParallaxLayer key={idx} offset={offset} speed={Math.random()} style={{ opacity: 0.2 }}>
            <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="cloud" />
          </ParallaxLayer>
        ))}

        {/* MOON */}
        <ParallaxLayer offset={0} speed={-0.2} factor={2} className={styles.planetLayer}>
          <animated.img src={"/bg/moon.png"} style={{ width: '50%', marginLeft: '25%', ...zoom }} />
        </ParallaxLayer>

        {/* EARTH */}
        <ParallaxLayer offset={3} speed={-0.4} factor={2} className={styles.planetLayer}>
          <animated.img src={url('earth')} style={{ width: '50%', marginLeft: '25%', ...zoom }} />
        </ParallaxLayer>

        {/* ROCKET */}
        <ParallaxLayer offset={6} speed={0.5} factor={2} className={styles.planetLayer}>
          <animated.img
            src={"/bg/rocket.png"}
            style={{ width: '20%', marginLeft: "-50%", transform: "rotate(45deg)" }}
          />
        </ParallaxLayer>

        {/* CITY */}
        <ParallaxLayer offset={6} speed={-0.5} factor={4} className={styles.planetLayer}>
          <animated.img src={url('city1')} style={{ width: '100%' }} />
        </ParallaxLayer>

        {/* DATA CONTENT */}
        {data.map((val, i) => {
          const showData = {
            groupName: val.groupName,
            description: val.description,
            video: val.video,
            website: val.website,
            slogan: val.slogan,
          }
          const jsonString = JSON.stringify(showData, null, 2)
          const withLink = jsonString.replace(
            /(https?:\/\/[^\s",]+)/g,
            '<a href="$1" target="_blank" style="color:#4ea1ff;">$1</a>'
          )

          return (
            <ParallaxLayer key={i} offset={i} speed={0.1} className={styles.page}>
              <div className={styles.pageContent}>
                <a href={val.website} className={styles.pageTitle}>
                  <h1>{val.title}</h1>
                </a>

                <pre
                  className={styles.jsonBlock}
                  dangerouslySetInnerHTML={{ __html: withLink }}
                />

                <div className={styles.teamContainer}>
                  {val.team.map((member, e) => (
                    <div key={e} className={styles.teamCard}>
                      <span
                        className={styles.teamPhoto}
                        style={{ backgroundImage: `url(${member.img || "/bg/1.jpg"})` }}
                      />
                      <pre className={styles.jsonBlock}>
                        {JSON.stringify({ name: member.name, NIM: member.NIM }, null, 3)}
                      </pre>

                      <div className={styles.social}>
                        {member.links.map((link, i) => {
                          return <>
                            <a href={link.target}>
                              <img src={`/icon/${link.name || "cube"}.png`}
                                alt=""
                                width={25}
                                height={25} />
                            </a>
                          </>
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ParallaxLayer>
          )
        })}
      </Parallax>
    </div>
  )
}
