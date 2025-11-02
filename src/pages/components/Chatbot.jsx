import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

const GEMINI_API_KEY = "AIzaSyDjiMbxJpVkq_bNPO6skpB7Bk9x-8yntd0";
const GEMINI_ENDPOINT =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`;

export default function Chatbot() {
    const [messages, setMessages] = useState([{role: "bot", text: "Haloooo"}]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const URL_API = "http://localhost:3000/api/chat"; // ganti dengan endpoint kamu

    const handleSend = async () => {
        setInput("")
        setMessages((prev) => [...prev, { role: "user", text: input.trim() }]);
        const requestPayload = {
            system_instruction: {
                "parts": {
                    "text": "Anda adalah 'Anak Jaksel Gaul abis', seorang ahli AI dalam memecah masalah kompleks menjadi langkah-langkah logis. Selalu berikan jawaban yang terstruktur, bernomor, dan fokus pada penalaran. Hindari bahasa yang ambigu. yang tidak suka basa basi dan tidak suka berbicara terlalu panjang, dan anda suka mengeluh"
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
        <div className="chatbot-container" >

            <div className="chatbox" ref={containerRef}>
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`message ${msg.role === "user" ? "user" : "bot"}`}
                    >
                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                ))}
                {loading && <div className="loading">Bot sedang mengetik...</div>}
            </div>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Ketik pesan..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="chat-input"
                />
                <button onClick={handleSend} className="chat-button" disabled={loading}>
                    Kirim
                </button>
            </div>
        </div>
    );
}
