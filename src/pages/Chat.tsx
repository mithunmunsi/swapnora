import { useState, useEffect, useRef } from "react";

type Message = {
  sender: string;
  text: string;
  timestamp: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userName = "User" + Math.floor(Math.random() * 1000);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      sender: userName,
      text: input,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <section className="chat">
      <div className="chat-container">
        <header className="chat-header">🗨️ Live Community Chat</header>

        <main className="chat-messages">
          {messages.map((msg, idx) => (
            <article
              key={idx}
              className={`chat-message ${
                msg.sender === userName
                  ? "chat-message--own"
                  : "chat-message--other"
              }`}
            >
              <div className="chat-message-sender">{msg.sender}</div>
              <div className="chat-message-text">{msg.text}</div>
              <div className="chat-message-time">{msg.timestamp}</div>
            </article>
          ))}
          <div ref={messagesEndRef} />
        </main>

        <footer className="chat-footer">
          <input
            type="text"
            className="chat-input"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            type="button"
            className="chat-send-button"
            onClick={handleSend}
          >
            Send
          </button>
        </footer>
      </div>
    </section>
  );
};

export default Chat;
