import { useState } from "react";

export default function AIChat() {

  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  async function sendMessage() {

    if (!input) return;

    const userMessage = {
      role: "user",
      content: input
    };

    setMessages((prev) => [...prev, userMessage]);

    try {

      const response = await fetch("http://localhost:11434/api/generate", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          model: "llama3",

          prompt: `
You are an assistant describing a developer portfolio.

Skills:
React
TypeScript
Node.js
MediaPipe
AI
Tauri

Projects:
Gesture Controlled Portfolio
AI CV Assistant
Computer Vision Applications

Question:
${input}
`,

          stream: false

        })

      });

      const data = await response.json();

      const aiMessage = {

        role: "assistant",
        content: data.response || "No response"

      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch (error) {

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "AI connection failed." }
      ]);

      console.error(error);

    }

    setInput("");

  }

  return (

    <div style={{ marginTop: "40px" }}>

      <h2>AI CV Assistant</h2>

      <div
        style={{
          border: "1px solid gray",
          height: "200px",
          overflow: "auto",
          padding: "10px"
        }}
      >

        {messages.map((m, i) => (

          <p key={i}>
            <b>{m.role}:</b> {m.content}
          </p>

        ))}

      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask about my skills..."
      />

      <button onClick={sendMessage}>
        Ask AI
      </button>

    </div>

  );

}