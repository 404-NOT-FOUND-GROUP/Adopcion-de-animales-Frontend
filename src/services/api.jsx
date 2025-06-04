import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:3000/AdopcionDeAnimales/v1",
  timeout: 5000,
  httpsAgent: false,

  
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const register = async (data) => {
  try {
    return await apiClient.post("/auth/register", data); // Axios detecta FormData y pone el header correcto
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};

export const login = (data) => {
    return apiClient.post("/auth/login", data);
};


  export const registerClients = async (data) => {
    try {
      const res = await apiClient.post(`/clients/addClient`, data);
      return {data: res.data};
    } catch (e) {
      return { error: true, message: e.response?.data?.message || "Error desconocido" };
    }
  };

  export const getAllClients = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { error: true };
  
      const res = await apiClient.get('/clients', {
        headers: { "x-token": token }
      });
      console.log("Respuesta del backend:", res.data);
      return { data: res.data };
    } catch (err) {
      return { error: true };
    }
  };
  