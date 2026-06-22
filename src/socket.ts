import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8000", {
  autoConnect: false,
});

export const connectSocket = (token: string) => {
  socket.auth = {
    token,
  };

  if (!socket.connected) {
    socket.connect();
  }
};

export default socket;
