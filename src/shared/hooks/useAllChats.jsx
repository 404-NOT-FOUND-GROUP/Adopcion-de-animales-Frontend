import { useEffect, useState } from "react";
import axios from "axios";

export function useAllChats() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/AdopcionDeAnimales/v1/chat/conversation")
      .then(res => setChats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return { chats, loading };
}