import React from "react";
import { useAllChats } from "../../shared/hooks/useAllChats.jsx";
import { useNavigate } from "react-router-dom";
import "./allChatsInbox.css";

export function AllChatsInbox() {
  const { chats, loading } = useAllChats();
  const navigate = useNavigate();

  if (loading) return <div className="inbox-loading">Cargando chats...</div>;

  return (
    <div className="inbox-container">
      <h2 className="inbox-title">Bandeja de Mensajes</h2>
      {chats.length === 0 && <div className="inbox-empty">No hay chats activos.</div>}
      <ul className="inbox-list">
        {chats.map(chat => (
          <li
            key={chat.conversationId}
            className="inbox-item"
            onClick={() => navigate(`/chat?userId=${chat.userId}&conversationId=${chat.conversationId}`)}
          >
            <div className="inbox-user">Usuario: {chat.userId}</div>
            <div className="inbox-lastmsg">{chat.lastMessage}</div>
            <div className="inbox-date">
              {chat.lastDate && new Date(chat.lastDate).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}