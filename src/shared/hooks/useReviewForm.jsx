import { useState } from "react";
import { reviewForm as reviewFormRequest } from "../../services/api";
import toast from "react-hot-toast";

export const useReviewForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const reviewForm = async (formId, data) => {
    setIsLoading(true);
    try {
      const result = await reviewFormRequest(formId, data);

      if (result.error) {
        toast.error("Error al revisar el formulario");
        return null;
      }

      toast.success("Formulario revisado con éxito");
      return result.data;
    } catch (err) {
      console.error("Review Form error:", err);
      toast.error("Error de red");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    reviewForm,
    isLoading,
  };
};
