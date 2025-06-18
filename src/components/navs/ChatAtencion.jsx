import React, { useRef, useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useChat } from "../../shared/hooks/useChat.jsx";
import { useConversationMessages } from "../../shared/hooks/useConversationMessages.jsx";
import { useCreateConversation } from "../../shared/hooks/useCreateConversation.jsx";
import { Navbar } from "./Navbar";
import "./chat.css";

export const ChatAtencion = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const userIdFromUrl = searchParams.get("userId");
  const conversationIdFromUrl = searchParams.get("conversationId");

  // Detecta el rol y el ID del usuario logueado
  const employeeId = localStorage.getItem("employeeId");
  const userId = localStorage.getItem("userId");

  // Si eres empleado, eres el remitente empleado; si eres usuario, eres el remitente usuario
  const isEmployee = !!employeeId;
  const remitente = isEmployee ? employeeId : userId;

  // Determina los participantes según el rol
  const participantes = isEmployee
    ? [userIdFromUrl, employeeId]
    : [userId, userIdFromUrl]; // userIdFromUrl puede ser el empleado si el usuario inicia el chat

  const { createConversation } = useCreateConversation();
  const [conversationId, setConversationId] = useState(conversationIdFromUrl);

  const { messages: initialMessages, loading } = useConversationMessages(conversationId);

  const { messages: liveMessages, sendMessage } = useChat({
    userId: isEmployee ? userIdFromUrl : userId,
    employeeId: isEmployee ? employeeId : userIdFromUrl,
    conversationId,
  });

  const [allMessages, setAllMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setAllMessages(initialMessages || []);
  }, [initialMessages]);

  useEffect(() => {
    if (liveMessages.length > 0) {
      setAllMessages(prev => {
        const lastLive = liveMessages[liveMessages.length - 1];
        if (!prev.some(msg => msg._id === lastLive._id && lastLive._id)) {
          return [...prev, lastLive];
        }
        return prev;
      });
    }
  }, [liveMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Si no hay conversación, créala y manda el primer mensaje
    if (!conversationId) {
      const newConversationId = await createConversation({
        participantes,
        mensaje: {
          remitente,
          mensaje: input,
        }
      });
      if (newConversationId) {
        setConversationId(newConversationId);
        navigate(`/chat?userId=${isEmployee ? userIdFromUrl : userIdFromUrl}&conversationId=${newConversationId}`, { replace: true });
      }
      setInput("");
      return;
    }

    // Si ya existe, usa el flujo normal
    sendMessage(input, remitente);
    setInput("");
  };

  return (
    <>
      <Navbar />
      <div style={{ height: "200px" }} />
      <div className="chat-container chat-container-alt">
        <div className="chat-header chat-header-alt">
          <span role="img" aria-label="soporte">💬</span> Chat de Atención al Cliente
        </div>
        <div className="chat-messages">
          {loading ? (
            <div className="inbox-loading">Cargando mensajes...</div>
          ) : allMessages.length === 0 ? (
            <div className="inbox-empty">No hay mensajes aún. ¡Escribe el primero!</div>
          ) : (
            allMessages.map((msg, idx) => (
              <div
                key={msg._id || idx}
                className={`chat-message ${String(msg.remitente) === String(remitente) ? "own" : "other"}`}
              >
                <div className="chat-bubble">
                  <span>{msg.mensaje}</span>
                  <div className="chat-date">
                    {msg.fecha ? new Date(msg.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
        <form className="chat-input-bar" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn">Enviar</button>
        </form>
      </div>
    </>
  );
};