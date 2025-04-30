import React, { useState, useRef, useEffect } from "react";
import socket from "../../../src/socket";
import "./ChatWindow.css";
interface Message {
  senderId: string;
  message: string;
  timestamp: Date;
}

interface User {
  id: string;
  name: string;
  profilePic: string;
}

interface Props {
  messages: Message[];
  onSend: (message: string) => void;
  selectedConversation: User | null;
}

const ChatWindow: React.FC<Props> = ({
  messages,
  onSend,
  selectedConversation,
}) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    socket.on("message", (msg: Message) => {
      setChatMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off("message");
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleSend = () => {
    if (newMessage.trim() && selectedConversation) {
      const msg: Message = {
        senderId: selectedConversation.id,
        message: newMessage.trim(),
        timestamp: new Date(),
      };
      socket.emit("message", msg);
      setChatMessages((prev) => [...prev, msg]);
      onSend(newMessage.trim());
      setNewMessage("");
    }
  };

  if (!selectedConversation) {
    return (
      <section className="chat-window empty">
        <p>Select a conversation to start chatting</p>
      </section>
    );
  }

  return (
    <section className="chat-window">
      <header className="chat-window__header">
        <img
          src={selectedConversation.profilePic}
          alt={selectedConversation.name}
          className="chat-window__avatar"
        />
        <h2 className="chat-window__name">{selectedConversation.name}</h2>
      </header>

      <main className="chat-window__messages">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`chat-window__message ${
              msg.senderId === selectedConversation.id
                ? "chat-window__message--incoming"
                : "chat-window__message--outgoing"
            }`}
          >
            <span className="chat-window__bubble">{msg.message}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="chat-window__input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="chat-window__input"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="chat-window__send-btn">
          Send
        </button>
      </footer>
    </section>
  );
};

export default ChatWindow;
