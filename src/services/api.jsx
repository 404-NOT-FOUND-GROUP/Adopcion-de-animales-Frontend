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
      return await apiClient.post("/auth/register", data); 
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
  // Obtener mascota por ID
  export const getPetById = async (petId) => {
    try {
      const res = await apiClient.get(`/pet/findById/${petId}`);
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
    const userDetails = JSON.parse(localStorage.getItem("userDetails")); 
    if (!userDetails || !userDetails.token) {
      throw new Error("No hay token válido en localStorage");
    }

    const token = userDetails.token;

    const response = await axios.post(
      "http://127.0.0.1:3000/AdopcionDeAnimales/v1/pet/addPet",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error en addPet:", error);
    return {
      error: true,
      message: error.message,
    };
  }
};


export const deletePetById = async (petId) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (!userDetails || !userDetails.token) {
      throw new Error("No hay token válido en localStorage");
    }
    const token = userDetails.token;

    const response = await axios.delete(
      `http://127.0.0.1:3000/AdopcionDeAnimales/v1/pet/deletePet/${petId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error en deletePetById:", error.response?.data || error.message);
    return {
      error: true,
      message: error.message,
    };
  }
};


  export const adoptPetById = async (petId, data) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      if (!userDetails || !userDetails.token) {
        throw new Error("No hay token válido en localStorage");
      }
      const token = userDetails.token;

      const response = await axios.post(`/form/${petId}`,data,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  }

  // Revisar un formulario existente
  export const reviewForm = async (formId, data) => {
    try {
      const userDetails = JSON.parse(localStorage.getItem("userDetails"));
      const token = userDetails?.token;

      const res = await apiClient.patch(`/form/${formId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        data: res.data,
        error: false,
      };
    } catch (e) {
      return {
        error: true,
        e,
      };
    }
  };

export const getOngoingAdoptions = async () => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const token = userDetails?.token;

    const res = await apiClient.get('/report/ongoing', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      success: res.data.success,
      ongoingAdoptions: res.data.ongoingAdoptions || [],
    };
  } catch (e) {
    return {
      success: false,
      error: e,
      ongoingAdoptions: [],
    };
  }
};

export const getCompletedAdoptions = async () => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const token = userDetails?.token;

    const res = await apiClient.get('/report/concluded', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      success: res.data.success,
      completedAdoptions: res.data.completedAdoptions || [],
    };
  } catch (e) {
    return {
      success: false,
      error: e,
      completedAdoptions: [],
    };
  }
};

export const reviewFormById = async (formId) => {
  try {
    const res = await apiClient.get(`/form/${formId}`);
    return res.data;
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};


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
    localStorage.removeItem("token");
    window.location.href = "/";
  } catch (e) {
    return {
      error: true,
      e,
    };
  }
};
export const generateFormPDF = async (formId) => {
  try {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    const token = userDetails?.token;

    const res = await apiClient.get(`/form/pdf/${formId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob", 
    });

    const url = window.URL.createObjectURL(new Blob([res.data], { type: "application/pdf" }));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Formulario_${formId}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();

    return { success: true };
  } catch (e) {
    return {
      success: false,
      error: e,
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
  adoptPetById,
  reviewForm,
  getOngoingAdoptions,
  googleLogin,
  getAuthenticatedUser,
  logout,
};
