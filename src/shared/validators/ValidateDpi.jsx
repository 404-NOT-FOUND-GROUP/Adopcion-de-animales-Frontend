// src/shared/validators.js

/**
 * Valida que el dpi tenga exactamente 13 dígitos numéricos.
 * @param {string} val
 * @returns {boolean}
 */
export const validateDpi = (val) => /^\d{13}$/.test(val);

/** Mensaje de validación para teléfono */
export const validateDpiMessage = 'El numero de Dpi debe tener 13 dígitos numéricos.';