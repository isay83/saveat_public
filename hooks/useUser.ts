"use client";

import { useState, useEffect } from 'react';

// Define la interfaz del usuario que guardas en localStorage
interface User {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    postal_code: string;
}

/**
 * Hook simple para leer el usuario y el estado de autenticación
 * desde localStorage en el lado del cliente.
 */
export function useUser() {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Inicia cargando

    useEffect(() => {
        // Solo se ejecuta en el cliente
        try {
            const token = localStorage.getItem('saveat_token');
            const userString = localStorage.getItem('saveat_user');

            if (token && userString) {
                setUser(JSON.parse(userString));
                setIsAuthenticated(true);
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            // Si JSON.parse falla o algo sale mal
            console.error("Error al leer datos de usuario:", error);
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false); // Terminó de cargar
        }
    }, []);

    return { user, isAuthenticated, isLoading };
}