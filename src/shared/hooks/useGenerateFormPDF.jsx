import { useState } from "react";
import { generateFormPDF } from "../../services/api";

export const useGenerateFormPDF = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGeneratePDF = async (formId) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateFormPDF(formId);
      if (!result.success) {
        setError(result.error || "No se pudo generar el PDF");
      }
    } catch (err) {
      setError(err.message || "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  return {
    generatePDF: handleGeneratePDF,
    loading,
    error,
  };
};