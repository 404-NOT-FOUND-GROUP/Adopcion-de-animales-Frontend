import { useState } from "react";
import axios from "axios";

export function useCreateConversation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createConversation = async ({ participantes, mensaje }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:3000/AdopcionDeAnimales/v1/chat/conversation",
        { participantes, mensaje }
      );
      setLoading(false);
      return res.data.conversationId;
    } catch (err) {
      setError("No se pudo crear la conversación");
      setLoading(false);
      return null;
    }
  };

  return { createConversation, loading, error };
}