import { ParallaxBanner } from 'react-scroll-parallax';

export default function Banner() {
  return (
    <ParallaxBanner
      layers={[
        { image: '/bg/1.jpg', speed: -20 },
        { image: '/icon/bluetooth.png', speed: -20 },
        { speed: -10, children: (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                textAlign: 'center',
                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
              }}
            >
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
                Judul Banner
              </h1>
              <p style={{ fontSize: '1.5rem' }}>Deskripsi singkat di sini</p>
            </div>
          )
        },
      ]}
      style={{ height: '100vh' }}
    />
  );
}
