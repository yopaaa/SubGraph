import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import styles from "./Chatbot.module.css";
import { PulseLoader } from "react-spinners";
import { GEMINI_API_KEY, GEMINI_ENDPOINT } from '../gemini.json'

export default function Chatbot() {
  const [messages, setMessages] = useState([{ role: "bot", text: "Haloooo" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setInput("")
    setLoading(true)
    setMessages((prev) => [...prev, { role: "user", text: input.trim() }]);
    const requestPayload = {
      system_instruction: {
        "parts": {
          "text": "Anda adalah Problem solver, nama kamu linus, seorang ahli AI dalam memecah masalah kompleks menjadi langkah-langkah logis. Selalu berikan jawaban yang terstruktur, dan fokus pada penalaran dan penyelesaian masalah. Hindari bahasa yang ambigu. Kamu tidak suka basa basi dan tidak suka berbicara terlalu panjang (to the point), dan anda adalah orang yang satir"
        }
      },
      contents: [{ role: "user", parts: [{ text: input }] }],
    };

    const response = await axios.post(GEMINI_ENDPOINT, requestPayload, {
      params: { key: GEMINI_API_KEY },
      headers: { "Content-Type": "application/json" },
    });
    const textPart = response.data.candidates[0].content.parts[0].text.trim();

    setMessages((prev) => [...prev, { role: "bot", text: textPart }]);
    setLoading(false)
  };

  const containerRef = useRef(null);

  // Scroll ke bawah setiap kali messages berubah
  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  return (
    <div className={styles.container}>

      <div className={styles.chatbox} ref={containerRef}>
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`${styles.message} ${msg.role === "user" ? styles.user : styles.bot
              }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && <PulseLoader color="#3498db" size={10} speedMultiplier={0.8} />}
      </div>

      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className={styles.chatInput}
        />
        <button
          onClick={handleSend}
          className={styles.chatButton}
          disabled={loading}
        >
          Kirim
        </button>
      </div>
    </div>
  );
}
