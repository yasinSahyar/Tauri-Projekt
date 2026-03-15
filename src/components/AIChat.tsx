import { useState } from "react";

export default function AIChat() {

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = () => {

    setMessages([...messages, input]);
    setInput("");

  };

  return (
    <div>

      <h3>AI Assistant</h3>

      {messages.map((msg, i) => (
        <div key={i}>{msg}</div>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={sendMessage}>
        Send
      </button>

    </div>
  );
}