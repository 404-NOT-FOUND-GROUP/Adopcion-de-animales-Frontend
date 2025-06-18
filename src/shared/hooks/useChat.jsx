import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000/chat";

export const useChat = ({ userId, employeeId }) => {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(SOCKET_URL, { withCredentials: true });

    socketRef.current.emit("joinRoom", { userId, employeeId });

    socketRef.current.on("chat:mensaje", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [userId, employeeId]);

  const sendMessage = (mensaje, remitente) => {
    socketRef.current.emit("chat:mensaje", {
      userId,
      employeeId,
      remitente,
      mensaje,
    });
  };

  return { messages, sendMessage };
};