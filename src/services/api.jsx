  import axios from "axios";

  const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3000/AdopcionDeAnimales/v1",
    timeout: 5000,
    httpsAgent: false,
  });

  // Interceptor para agregar el token JWT a las solicitudes
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

  // Registro de usuario
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

  // Login de usuario
  export const login = async (data) => {
    try {
      return await apiClient.post("/auth/login", data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Restablecer contraseña
  export const forgottenPassword = async (data) => {
    try {
      return await apiClient.post("/user/restablecer-password", data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Actualizar contraseña
  export const updatePassword = async (data) => {
    try {
      return await apiClient.post("/user/update-password", data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Peticiones de mascotas

  // Obtener todas las mascotas
  export const getAllPets = async () => {
    try {
      const res = await apiClient.get('/pet/getPets');
      return res.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Filtrar mascotas
  export const getFilteredPets = async (filters) => {
    try {
      const res = await apiClient.get('/pet/filterPets', { params: filters });
      return res.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Registrar nueva mascota
  export const addPet = async (data) => {
    try {
      return await apiClient.post("/pet/addPet", data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Formularios relacionados con mascotas

  // Crear un nuevo formulario para una mascota
  export const createForm = async (petId, data) => {
    try {
      return await apiClient.post(`/form/${petId}`, data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Revisar un formulario existente
  export const reviewForm = async (formId, data) => {
    try {
      return await apiClient.patch(`/form/${formId}`, data);
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Funcionalidad de autenticación con Google

  // Iniciar sesión con Google
  export const googleLogin = async () => {
    window.location.href = "http://127.0.0.1:3000/AdopcionDeAnimales/v1/auth/google";
  };

  // Solicitar el perfil del usuario autenticado
  export const getAuthenticatedUser = async () => {
    try {
      const res = await apiClient.get("/auth/success");
      return res.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  // Cerrar sesión
  export const logout = async () => {
    try {
      await apiClient.get("/auth/logout");
      localStorage.removeItem("token");  // Elimina el token del almacenamiento local
      window.location.href = "/";  // Redirige al inicio o a la página de login
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

  export default {
    register,
    login,
    forgottenPassword,
    updatePassword,
    getAllPets,
    getFilteredPets,
    addPet,
    createForm,
    reviewForm,
    googleLogin,
    getAuthenticatedUser,
    logout,
  };
