import React, { useState, useRef, useEffect } from "react";

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
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSend(newMessage.trim());
      setNewMessage("");
    }
  };

  if (!selectedConversation) {
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-500 text-lg">
        Select a conversation to start chatting
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b flex items-center space-x-4">
        <img
          src={selectedConversation.profilePic}
          alt={selectedConversation.name}
          className="w-10 h-10 rounded-full"
        />
        <h3 className="font-semibold text-lg">{selectedConversation.name}</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.senderId === selectedConversation.id
                ? "justify-start"
                : "justify-end"
            }`}
          >
            <div
              className={`rounded-lg px-4 py-2 max-w-xs ${
                msg.senderId === selectedConversation.id
                  ? "bg-white text-gray-800"
                  : "bg-blue-500 text-white"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t flex space-x-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded px-3 py-2 focus:outline-none"
          placeholder="Type your message..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
