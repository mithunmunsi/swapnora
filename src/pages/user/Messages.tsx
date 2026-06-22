import { useEffect, useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import "./Messages.css";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { useCallback } from "react";
import socket from "../../socket";

interface ConversationParticipant {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface Conversation {
  _id: string;
  participants: ConversationParticipant[];
  lastMessage?: string;
  lastMessageAt?: string;
}

interface Message {
  _id: string;
  content: string;
  createdAt: string;
  isRead: boolean;
  deliveryStatus?: "sent" | "delivered" | "read";
  attachmentUrl?: string;

  attachmentName?: string;

  attachmentType?: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

const Messages = () => {
  const { user } = useAuth();
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [newMessage, setNewMessage] = useState("");

  const [typingUser, setTypingUser] = useState("");

  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();

  const conversationId = searchParams.get("conversation");

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isOnline, setIsOnline] = useState(false);

  const otherUser = selectedConversation?.participants.find(
    (participant) => participant._id !== user?._id,
  );

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const fetchConversations = useCallback(async () => {
    try {
      const response = await api.get("/messages/conversations");

      setConversations(response.data.conversations);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const openConversation = useCallback(
    async (conversation: Conversation) => {
      try {
        setSelectedConversation(conversation);

        const response = await api.get(`/messages/${conversation._id}`);

        setMessages(response.data.messages);

        await api.put(`/messages/read/${conversation._id}`);

        const otherUser = conversation.participants.find(
          (participant) => participant._id !== user?._id,
        );

        if (otherUser) {
          socket.emit("check_online_status", otherUser._id);
        }

        await fetchConversations();

        window.dispatchEvent(new CustomEvent("messages-read"));
      } catch (error) {
        console.error(error);
      }
    },
    [fetchConversations, user?._id],
  );

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", (error) => {
      console.error("Socket error:", error);
    });

    socket.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
    });

    socket.on("new_message", async (message) => {
      console.log("Realtime message:", message);

      if (
        selectedConversation &&
        message.conversation === selectedConversation._id
      ) {
        setMessages((prev) => [...prev, message]);

        await api.put(`/messages/read/${selectedConversation._id}`);

        window.dispatchEvent(new CustomEvent("messages-read"));
      }

      fetchConversations();
    });

    socket.on("message_delivered", ({ messageId }) => {
      setMessages((prev) =>
        prev.map((message) =>
          String(message._id) === String(messageId)
            ? {
                ...message,
                deliveryStatus: "delivered",
              }
            : message,
        ),
      );
    });

    socket.on("messages_read", (data) => {
      setMessages((prev) =>
        prev.map((message) =>
          message._id === data.messageId
            ? {
                ...message,
                isRead: true,
                deliveryStatus: "read",
              }
            : message,
        ),
      );
    });

    socket.on("user_typing", ({ senderName }) => {
      setTypingUser(senderName);
    });

    socket.on("user_stop_typing", () => {
      setTypingUser("");
    });

    socket.on("online_status_result", (data) => {
      if (otherUser?._id === data.userId) {
        setIsOnline(data.isOnline);
      }
    });

    socket.on("user_online", (userId) => {
      if (otherUser && otherUser._id === userId) {
        setIsOnline(true);
      }
    });

    socket.on("user_offline", (userId) => {
      if (otherUser && otherUser._id === userId) {
        setIsOnline(false);
      }
    });

    socket.on("conversation_updated", (data) => {
      setConversations((prev) => {
        const updated = prev.map((conversation) =>
          conversation._id === data.conversationId
            ? {
                ...conversation,
                lastMessage: data.lastMessage,
                lastMessageAt: data.lastMessageAt,
              }
            : conversation,
        );

        return updated.sort(
          (a, b) =>
            new Date(b.lastMessageAt || 0).getTime() -
            new Date(a.lastMessageAt || 0).getTime(),
        );
      });
    });

    return () => {
      socket.off("connect");
      socket.off("connect_error");
      socket.off("disconnect");
      socket.off("new_message");
      socket.off("message_delivered");
      socket.off("messages_read");
      socket.off("user_typing");
      socket.off("user_stop_typing");
      socket.off("user_online");
      socket.off("user_offline");
      socket.off("online_status_result");
      socket.off("conversation_updated");
    };
  }, [fetchConversations, otherUser, selectedConversation]);

  useEffect(() => {
    if (!otherUser) return;

    socket.emit("check_online_status", otherUser._id);
  }, [otherUser]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  useEffect(() => {
    if (!conversationId || conversations.length === 0 || selectedConversation) {
      return;
    }

    const conversation = conversations.find((c) => c._id === conversationId);

    if (conversation) {
      openConversation(conversation);
    }
  }, [conversationId, conversations, selectedConversation, openConversation]);

  const sendMessage = async () => {
    if (!newMessage.trim() && !selectedFile) {
      return;
    }

    if (!selectedConversation) {
      return;
    }

    try {
      const receiver = selectedConversation.participants.find(
        (participant) => participant._id !== user?._id,
      );

      const formData = new FormData();

      formData.append("conversationId", selectedConversation._id);

      formData.append("receiverId", receiver?._id || "");

      formData.append("content", newMessage);

      if (selectedFile) {
        formData.append("file", selectedFile);
      }

      const response = await api.post("/messages/send", formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );

          setUploadProgress(percent);
        },
      });

      setUploadProgress(0);

      setMessages((prev) => [...prev, response.data.message]);

      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="messages-loading">Loading conversations...</div>;
  }

  return (
    <div className="messages-page">
      {/* LEFT SIDEBAR */}

      <aside className="messages-sidebar">
        <div className="messages-sidebar-header">
          <h2>Messages</h2>
        </div>

        <div className="conversation-list">
          {conversations.length === 0 ? (
            <p className="empty-state">
              💬 No conversations yet.
              <br />
              Visit a user's profile and click Message User.
            </p>
          ) : (
            conversations.map((conversation) => {
              const otherUser = conversation.participants.find(
                (participant) => participant._id !== user?._id,
              );

              return (
                <div
                  key={conversation._id}
                  className={`conversation-item ${
                    selectedConversation?._id === conversation._id
                      ? "active"
                      : ""
                  }`}
                  onClick={() => openConversation(conversation)}
                >
                  <div className="conversation-avatar">
                    {otherUser?.avatar ? (
                      <img src={otherUser.avatar} alt={otherUser.firstName} />
                    ) : (
                      otherUser?.firstName?.charAt(0).toUpperCase()
                    )}
                  </div>

                  <div className="conversation-info">
                    <div className="conversation-header">
                      <h4>
                        {otherUser?.firstName} {otherUser?.lastName}
                      </h4>

                      {conversation.lastMessageAt && (
                        <span className="conversation-time">
                          {new Date(
                            conversation.lastMessageAt,
                          ).toLocaleTimeString([], {
                            hour: "2-digit",

                            minute: "2-digit",
                          })}
                        </span>
                      )}
                    </div>

                    <p className="conversation-preview">
                      {conversation.lastMessage || "Start chatting"}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* CHAT AREA */}

      <section className="messages-chat">
        {!selectedConversation ? (
          <div className="no-conversation">
            <h3>Select a conversation</h3>

            <p>Choose a conversation from the sidebar.</p>
          </div>
        ) : (
          <>
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-header-avatar">
                  {otherUser?.avatar ? (
                    <img src={otherUser.avatar} alt={otherUser.firstName} />
                  ) : (
                    otherUser?.firstName?.charAt(0).toUpperCase()
                  )}
                </div>

                <div>
                  <h3>
                    {otherUser?.firstName} {otherUser?.lastName}
                  </h3>

                  <p>
                    {typingUser
                      ? `${typingUser} is typing...`
                      : isOnline
                        ? "🟢 Online"
                        : "⚫ Offline"}
                  </p>
                </div>
              </div>
            </div>

            <div className="chat-messages">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`message-bubble ${
                    message.sender._id === user?._id ? "own" : ""
                  }`}
                >
                  <div className="message-sender">
                    {message.sender._id === user?._id
                      ? "You"
                      : `${message.sender.firstName}`}
                  </div>
                  <div className="message-content">{message.content}</div>
                  {message.sender._id === user?._id && (
                    <div className="read-status">
                      {message.deliveryStatus === "read"
                        ? "✓✓ Read"
                        : message.deliveryStatus === "delivered"
                          ? "✓✓ Delivered"
                          : "✓ Sent"}
                    </div>
                  )}

                  <div className="message-time">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>

                  {message.attachmentType?.startsWith("image/") && (
                    <img
                      src={`${SERVER_URL}${message.attachmentUrl}`}
                      alt={message.attachmentName}
                      className="chat-image"
                      onClick={() =>
                        setPreviewImage(`${SERVER_URL}${message.attachmentUrl}`)
                      }
                    />
                  )}
                  {message.attachmentUrl &&
                    !message.attachmentType?.startsWith("image/") && (
                      <a
                        href={`http://localhost:8000${message.attachmentUrl}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        📎 {message.attachmentName}
                      </a>
                    )}
                </div>
              ))}

              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => {
                  setNewMessage(e.target.value);

                  if (!selectedConversation) return;

                  const receiver = selectedConversation.participants.find(
                    (p) => p._id !== user?._id,
                  );

                  socket.emit("typing", {
                    receiverId: receiver?._id,
                    senderName: `${user?.firstName}`,
                  });

                  if (typingTimeoutRef.current) {
                    clearTimeout(typingTimeoutRef.current);
                  }

                  typingTimeoutRef.current = setTimeout(() => {
                    socket.emit("stop_typing", {
                      receiverId: receiver?._id,
                    });
                  }, 1000);
                }}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
              />

              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="upload-progress">{uploadProgress}%</div>
              )}

              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />

              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}
      </section>
      {previewImage && (
        <div className="image-lightbox" onClick={() => setPreviewImage(null)}>
          <img src={previewImage} alt="Preview" className="lightbox-image" />
        </div>
      )}
    </div>
  );
};

export default Messages;
