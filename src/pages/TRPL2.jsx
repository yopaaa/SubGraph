import React, { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

import { useSpring, animated } from '@react-spring/web'

const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}/bg/${name}.svg${wrap ? ')' : ''}`

export default function App() {
  const parallax = useRef(null)
   const zoom = useSpring({
    from: { transform: 'scale(0.5)' },
    to: { transform: 'scale(2)' },
    // to: async (next) => {
    //   while (1) {
    //     await next({ transform: 'scale(1.5)' })
    //     await next({ transform: 'scale(1)' })
    //   }
    // },
    config: { duration: 3000 },
    // loop: true
  })

  return (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'black' }}>
      <Parallax ref={parallax} pages={3}>
        <ParallaxLayer offset={1} speed={1} style={{ backgroundColor: '#805E73' }} />
        <ParallaxLayer offset={2} speed={1} style={{ backgroundColor: '#87BCDE' }} />

        <ParallaxLayer
          offset={0}
          speed={0}
          factor={3}
          style={{
            backgroundImage: url('stars', true),
            backgroundSize: 'cover',
          }}
        />

        <ParallaxLayer offset={1.3} speed={-0.3} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '15%', marginLeft: '70%' }} alt="satellite" />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={1.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={1.6} speed={-0.1} style={{ opacity: 0.4 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '60%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '25%', marginLeft: '30%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '80%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={2.6} speed={0.4} style={{ opacity: 0.6 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '5%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '15%', marginLeft: '75%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={-0.4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <animated.img
          src={url('earth')} 
            style={{ width: '50%', marginLeft: '25%', ...zoom }}
          />
          {/* <img 
          src={url('earth')} 
          style={{ width: '60%' }}
           alt="earth" /> */}
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true),
          }}
        />

        <ParallaxLayer
          offset={0}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img src={url('server')} style={{ width: '20%' }} alt="server" />
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={0.1}
          onClick={() => parallax.current.scrollTo(2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <img src={url('bash')} style={{ width: '40%' }} alt="bash" />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={0}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => parallax.current.scrollTo(0)}>
          <img src={url('clients-main')} style={{ width: '40%' }} alt="clients" />
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}
