import { useRef } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { useSpring, animated } from '@react-spring/web'
import styles from "./TRPL.module.css"

const data = [
  {
    groupName: "Kelompok 1: Logika Matematika",
    title: "Website Logika Matematika",
    description: "Website interaktif yang membahas dasar logika, tabel kebenaran, dan silogisme dalam kehidupan sehari-hari.",
    video: "https://www.youtube.com/embed/tgbNymZ7vqY",
    team: [
      { name: "Gabriel Jonathan", img: "/team1.jpg" },
      { name: "Adelia Syawali", img: "/team2.jpg" },
      { name: "Nadia Selma", img: "/team3.jpg" }
    ],
    slogan: "Logic builds clarity, clarity builds understanding."
  },
  {
    groupName: "Kelompok 2: Sistem Persamaan Linear",
    title: "Solver Persamaan Linear",
    description: "Aplikasi untuk menyelesaikan sistem persamaan linear dengan metode eliminasi, substitusi, dan matriks.",
    video: "https://www.youtube.com/embed/5MgBikgcWnY",
    team: [
      { name: "Farhan Rahman", img: "/team4.jpg" },
      { name: "Dina Laras", img: "/team5.jpg" },
      { name: "Bima Pratama", img: "/team6.jpg" }
    ],
    slogan: "Setiap solusi dimulai dari satu persamaan."
  },
  {
    groupName: "Kelompok 3: Statistika Dasar",
    title: "Visualisasi Data Interaktif",
    description: "Website yang menampilkan analisis data dan visualisasi grafik untuk memahami distribusi dan peluang.",
    video: "https://www.youtube.com/embed/qv6UVOQ0F44",
    team: [
      { name: "Rafi Dwi", img: "/team7.jpg" },
      { name: "Selvi Ananda", img: "/team8.jpg" },
      { name: "Hendra Kusuma", img: "/team9.jpg" }
    ],
    slogan: "Numbers tell stories, if you know how to listen."
  },
  {
    groupName: "Kelompok 4: Kalkulus Diferensial",
    title: "Simulasi Turunan dan Grafik",
    description: "Platform pembelajaran untuk memahami konsep turunan dengan grafik interaktif dan animasi fungsi.",
    video: "https://www.youtube.com/embed/Sv0z7bkYqU8",
    team: [
      { name: "Rania Putri", img: "/team10.jpg" },
      { name: "Andre Setiawan", img: "/team11.jpg" },
      { name: "Nico Pradipta", img: "/team12.jpg" }
    ],
    slogan: "Change is constant, calculus proves it."
  },
  {
    groupName: "Kelompok 5: Teori Bilangan",
    title: "Eksplorasi Bilangan Prima",
    description: "Website yang menjelaskan pola bilangan prima dan algoritma untuk menemukan bilangan prima besar.",
    video: "https://www.youtube.com/embed/0Oazb7IWzbA",
    team: [
      { name: "Vina Amalia", img: "/team13.jpg" },
      { name: "Rizky Maulana", img: "/team14.jpg" },
      { name: "Tasya Nur", img: "/team15.jpg" }
    ],
    slogan: "Prime numbers: simple, yet mysteriously infinite."
  },
  {
    groupName: "Kelompok 6: Geometri",
    title: "Dunia Bentuk dan Ruang",
    description: "Website pembelajaran tentang bangun datar dan ruang, lengkap dengan simulasi 3D dan kalkulator luas-volume.",
    video: "https://www.youtube.com/embed/z8v0tGIXz7Y",
    team: [
      { name: "Rangga Adi", img: "/team16.jpg" },
      { name: "Melisa Lestari", img: "/team17.jpg" },
      { name: "Jodi Setia", img: "/team18.jpg" }
    ],
    slogan: "Geometry is the poetry of logical shapes."
  },
  {
    groupName: "Kelompok 7: Trigonometri",
    title: "Eksplorasi Sudut dan Gelombang",
    description: "Website interaktif untuk belajar fungsi sinus, cosinus, dan tangen dalam konteks nyata seperti musik dan navigasi.",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    team: [
      { name: "Arif Nugraha", img: "/team19.jpg" },
      { name: "Laila Putri", img: "/team20.jpg" },
      { name: "Dewi Ramadhani", img: "/team21.jpg" }
    ],
    slogan: "Every angle has a story, every curve a rhythm."
  },
  {
    groupName: "Kelompok 8: Aljabar",
    title: "Mesin Penyederhana Persamaan",
    description: "Website yang bisa menyederhanakan ekspresi aljabar dan menampilkan langkah-langkah solusinya.",
    video: "https://www.youtube.com/embed/Ml3KDlt-F0M",
    team: [
      { name: "Fajar Naufal", img: "/team22.jpg" },
      { name: "Nadia Amelia", img: "/team23.jpg" },
      { name: "Toni Wirawan", img: "/team24.jpg" }
    ],
    slogan: "Balance both sides, find the truth in between."
  },
  {
    groupName: "Kelompok 9: Kombinatorika",
    title: "Hitung Peluang dengan Kombinasi",
    description: "Website yang menjelaskan prinsip permutasi dan kombinasi dengan contoh dari permainan kartu.",
    video: "https://www.youtube.com/embed/WUvTyaaNkzM",
    team: [
      { name: "Siska Febri", img: "/team25.jpg" },
      { name: "Rifki Anwar", img: "/team26.jpg" },
      { name: "Ayu Laras", img: "/team27.jpg" }
    ],
    slogan: "Possibilities are endless, math just counts them."
  },
  {
    groupName: "Kelompok 10: Matriks dan Transformasi",
    title: "Simulasi Transformasi Linear",
    description: "Website untuk memvisualisasikan transformasi linear seperti rotasi dan skala menggunakan matriks.",
    video: "https://www.youtube.com/embed/kYB8IZa5AuE",
    team: [
      { name: "Reza Akbar", img: "/team28.jpg" },
      { name: "Putri Salsabila", img: "/team29.jpg" },
      { name: "Eko Firmansyah", img: "/team30.jpg" }
    ],
    slogan: "Matrices turn motion into meaning."
  }
];


const url = (name, wrap = false) =>
  `${wrap ? 'url(' : ''}/bg/${name}.svg${wrap ? ')' : ''}`

export default function App() {
  const parallax = useRef(null)
  const zoom = useSpring({
    from: { transform: 'scale(0.5) rotate(1deg)' },
    to: { transform: 'scale(1) rotate(360deg)' },
    // to: async (next) => {
    //   while (1) {
    //     await next({ transform: 'scale(1.5)' })
    //     await next({ transform: 'scale(1)' })
    //   }
    // },
    config: { duration: 2000 },
    // loop: true
  })

  const handleScroll = (e) => {
    const current = e.target.scrollTop
    const height = window.innerHeight
    const target = Math.round(current / height)
    ref.current.scrollTo(target)
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      backgroundColor: 'black',
      scrollSnapType: "y mandatory",
    }}>
      <Parallax ref={parallax} pages={data.length}
        onScroll={handleScroll}
      >
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

           <ParallaxLayer offset={0.3} speed={-0.5} style={{ pointerEvents: 'none' }}>
          <img src={url('satellite4')} style={{ width: '15%', marginLeft: '10%' }} alt="satellite" />
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

     

        <ParallaxLayer offset={3} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={3.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt="cloud" />
        </ParallaxLayer>


         <ParallaxLayer offset={4} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={4.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={4} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt="cloud" />
        </ParallaxLayer>

         <ParallaxLayer offset={7} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={7.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={7} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt="cloud" />
        </ParallaxLayer>

         <ParallaxLayer offset={8.5} speed={0.8} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '55%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '15%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={8.75} speed={0.5} style={{ opacity: 0.1 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '70%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '40%' }} alt="cloud" />
        </ParallaxLayer>

        <ParallaxLayer offset={8.3} speed={0.2} style={{ opacity: 0.2 }}>
          <img src={url('cloud')} style={{ display: 'block', width: '10%', marginLeft: '10%' }} alt="cloud" />
          <img src={url('cloud')} style={{ display: 'block', width: '20%', marginLeft: '75%' }} alt="cloud" />
        </ParallaxLayer>



        <ParallaxLayer
          offset={0}
          speed={-0.2}
          factor={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <animated.img
            src={"/bg/moon.png"}
            style={{ width: '50%', marginLeft: '25%', ...zoom }}
          />

        </ParallaxLayer>

        <ParallaxLayer
          offset={3}
          speed={-0.4}
          factor={2}
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

        </ParallaxLayer>

 <ParallaxLayer
          offset={6}
          speed={0.5}
          factor={2}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <animated.img
                        src={"/bg/rocket.png"}

            style={{ width: '20%', marginLeft: "-50%", transform: "rotate(45deg)"}}
          />

        </ParallaxLayer>

        <ParallaxLayer
          offset={6}
          speed={-0.5}
          factor={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
          <animated.img
                        src={"/bg/city.png"}

            style={{ width: '100%'}}
          />

        </ParallaxLayer>

        {/* <ParallaxLayer
          offset={2}
          speed={-0.3}
          style={{
            backgroundSize: '80%',
            backgroundPosition: 'center',
            backgroundImage: url('clients', true),
          }}
        > */}

        {/* {
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
  }, */}
        {data.map((val, i) => {
          return (
            <ParallaxLayer
              offset={i}
              speed={0.1}
              // onClick={() => parallax.current.scrollTo(i - 1)}
              style={{
                height: "100vh",
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div>
              <h1>{val.title}</h1>
              <pre>{JSON.stringify(val, null, 2)}</pre>

                </div>
              {/* <img src={url('server')} style={{ width: '20%' }} alt="server" /> */}
            </ParallaxLayer>
          )
        })}
      </Parallax>
    </div>
  )
}
