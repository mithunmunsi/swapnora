import React from "react";

interface User {
  id: string;
  name: string;
  profilePic: string;
}

interface Props {
  user: User;
  selectedConversation: User | null;
  setSelectedConversation: (user: User) => void;
}

const mockConversations: User[] = [
  {
    id: "u1",
    name: "Alice",
    profilePic: "/avatars/alice.png",
  },
  {
    id: "u2",
    name: "Bob",
    profilePic: "/avatars/alice.png",
  },
  {
    id: "u3",
    name: "Charlie",
    profilePic: "/avatars/alice.png",
  },
];

const MessagesSidebar: React.FC<Props> = ({
  selectedConversation,
  setSelectedConversation,
}) => {
  return (
    <aside className="messages-sidebar">
      <header className="sidebar-header">
        <h2 className="sidebar-title">Messages</h2>
      </header>
      <nav className="conversation-list">
        <ul>
          {mockConversations.map((conv) => (
            <li
              key={conv.id}
              onClick={() => setSelectedConversation(conv)}
              className={`conversation-item ${
                selectedConversation?.id === conv.id ? "active" : ""
              }`}
            >
              <img
                src={conv.profilePic}
                alt={conv.name}
                className="conversation-avatar"
              />
              <span className="conversation-name">{conv.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default MessagesSidebar;
