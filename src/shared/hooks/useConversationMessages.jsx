import { useEffect, useState } from "react";
import axios from "axios";

export function useConversationMessages(conversationId) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!conversationId) return;
    setLoading(true);
    axios
      .get(`http://localhost:3000/AdopcionDeAnimales/v1/chat/conversation/${conversationId}`)
      .then(res => setMessages(res.data.mensajes))
      .finally(() => setLoading(false));
  }, [conversationId]);

  return { messages, setMessages, loading };
}