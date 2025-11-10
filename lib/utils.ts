import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número como moneda (USD por defecto, adaptable a MXN)
 * @param amount - El monto en número (ej. 10.5)
 * @returns - El monto formateado (ej. "$10.50")
 */
export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount);
  // Nota: Tu API guarda 'price' como 10.50. Si lo guardaras
  // en centavos (1050), tendrías que dividirlo por 100 aquí.
}
