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
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl flex flex-col h-[80vh]">
        <header className="bg-indigo-600 text-white p-4 rounded-t-lg text-xl font-semibold">
          🗨️ Live Community Chat
        </header>

        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded ${
                msg.sender === userName
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-200 self-start"
              }`}
            >
              <div className="text-sm text-gray-700 font-medium">
                {msg.sender}
              </div>
              <div>{msg.text}</div>
              <div className="text-xs text-gray-500">{msg.timestamp}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <footer className="p-4 border-t flex gap-2">
          <input
            type="text"
            className="flex-1 px-4 py-2 border rounded"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Send
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Chat;
