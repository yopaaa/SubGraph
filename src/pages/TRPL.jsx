import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function HorizontalScroll() {
  const controls = useAnimation();
  const indexRef = useRef(0);
  const [scrolling, setScrolling] = useState(false);

  const data = [
    {
      banner: "/bg/5.jpg",
      title: "Judul 1",
      desc: "Deskripsi singkat container pertama.",
      group: [
        "https://i.pravatar.cc/100?img=1",
        "https://i.pravatar.cc/100?img=2",
        "https://i.pravatar.cc/100?img=3"
      ]
    },
    {
      banner: "/bg/6.jpg",
      title: "Judul 2",
      desc: "Konten kedua dengan sedikit variasi.",
      group: [
        "https://i.pravatar.cc/100?img=4",
        "https://i.pravatar.cc/100?img=5",
        "https://i.pravatar.cc/100?img=6"
      ]
    },
    {
      banner: "/bg/7.jpg",
      title: "Judul 3",
      desc: "Deskripsi container ketiga.",
      group: [
        "https://i.pravatar.cc/100?img=7",
        "https://i.pravatar.cc/100?img=8",
        "https://i.pravatar.cc/100?img=9"
      ]
    },
    {
      banner: "/bg/8.jpg",
      title: "Judul 4",
      desc: "Konten keempat.",
      group: [
        "https://i.pravatar.cc/100?img=10",
        "https://i.pravatar.cc/100?img=11",
        "https://i.pravatar.cc/100?img=12"
      ]
    },
    {
      banner: "/bg/3.jpg",
      title: "Judul 5",
      desc: "Container terakhir.",
      group: [
        "https://i.pravatar.cc/100?img=13",
        "https://i.pravatar.cc/100?img=14",
        "https://i.pravatar.cc/100?img=15"
      ]
    }
  ];

  useEffect(() => {
    const handleWheel = async (e) => {
      if (scrolling) return;
      setScrolling(true);

      if (e.deltaY > 0 && indexRef.current < data.length - 1) {
        indexRef.current++;
      } else if (e.deltaY < 0 && indexRef.current > 0) {
        indexRef.current--;
      }

      await controls.start({
        x: -indexRef.current * window.innerWidth,
        transition: { type: "spring", stiffness: 90, damping: 18 }
      });

      setTimeout(() => setScrolling(false), 800);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [controls, scrolling, data.length]);

  return (
    <motion.div
      animate={controls}
      style={{
        display: "flex",
        width: `${data.length * 100}vw`,
        height: "100vh",
        overflow: "hidden",
        position: "relative"
      }}
    >
      {data.map((item, i) => (
        <section
          key={i}
          style={{
            flex: "0 0 100vw",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f5f5f5"
          }}
        >
          <motion.img
            src={item.banner}
            alt="banner"
            style={{ width: "100%", height: "60%", objectFit: "cover" }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
          <motion.h1
            style={{ margin: "20px 0 10px 0" }}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {item.title}
          </motion.h1>
          <motion.p
            style={{ maxWidth: "600px", textAlign: "center" }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {item.desc}
          </motion.p>
          <motion.div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "20px"
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {item.group.map((g, j) => (
              <motion.img
                key={j}
                src={g}
                alt="person"
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </motion.div>
        </section>
      ))}
    </motion.div>
  );
}
