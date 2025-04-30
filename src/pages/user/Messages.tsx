import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessagesSidebar from "./MessagesSidebar";
import ChatWindow from "./ChatWindow";

const socket = io("http://localhost:5000"); // ✅ Or your server's deployed URL
socket.on("connect", () => {
  console.log("Connected to socket:", socket.id);
});

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Messages = ({ user }: { user: any }) => {
  const [selectedConversation, setSelectedConversation] = useState<User | null>(
    null
  );
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("join", user?.id);

    socket.on("receiveMessage", (data) => {
      if (data.senderId === selectedConversation?.id) {
        setMessages((prev) => [...prev, data]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [selectedConversation, user?.id]);

  const handleSend = (msg: string) => {
    if (selectedConversation) {
      socket.emit("sendMessage", {
        senderId: user.id,
        receiverId: selectedConversation.id,
        message: msg,
      });

      setMessages((prev) => [
        ...prev,
        { senderId: user.id, message: msg, timestamp: new Date() },
      ]);
    }
  };

  return (
    <div className="message-windows">
      <MessagesSidebar
        user={user}
        selectedConversation={selectedConversation}
        setSelectedConversation={setSelectedConversation}
      />
      <ChatWindow
        messages={messages}
        onSend={handleSend}
        selectedConversation={selectedConversation}
      />
    </div>
  );
};

export default Messages;
