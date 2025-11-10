import axios from 'axios';

// La URL base de tu API (desde las variables de entorno)
const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1',
});

/**
 * Interceptor de Axios para añadir el token (JWT) a todas las peticiones
 * que requieran autenticación.
 */
api.interceptors.request.use(
    (config) => {
        // Solo intentamos obtener el token en el lado del cliente
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('saveat_token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Interceptor de respuesta para manejar errores globales,
 * especialmente el 401 (No autorizado).
 */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (typeof window !== 'undefined' && error.response && error.response.status === 401) {
            // Si el error es 401, el token es inválido o ha expirado.
            // Borramos los datos de sesión y recargamos la página
            // para forzar al usuario a la página de login.
            localStorage.removeItem('saveat_token');
            localStorage.removeItem('saveat_user');
            // Redirigimos al login
            window.location.href = '/login';
            // No mostramos el toast de "Inicia sesión" porque ya lo estamos redirigiendo.
        }

        // Rechazamos el error para que el 'catch' local (ej. en el formulario)
        // pueda manejarlo (ej. mostrar un toast "Contraseña incorrecta").
        return Promise.reject(error);
    }
);

export default api;