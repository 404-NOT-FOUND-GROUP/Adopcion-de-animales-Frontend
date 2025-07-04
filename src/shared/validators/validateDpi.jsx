// src/shared/validators.js

/**
 * Valida que el DPI tenga exactamente 13 dígitos numéricos.
 * @param {string} val
 * @returns {boolean}
 */
export const validateDpi = (val) => /^\d{13}$/.test(val);

/** Mensaje de validación para DPI */
export const validateDpiMessage = 'El DPI debe tener 13 dígitos numéricos.';
