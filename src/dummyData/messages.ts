// dummyData/messages.ts
import { Message } from "../types/Message";

export const messages: Message[] = [
  {
    id: "1",
    senderId: "user1",
    receiverId: "user2",
    content: "Hello!",
    timestamp: new Date().toISOString(),
  },
  {
    id: "2",
    senderId: "user2",
    receiverId: "user1",
    content: "Hi there!",
    timestamp: new Date().toISOString(),
  },
];
