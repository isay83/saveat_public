import { create } from 'zustand';
import api from '@/lib/api'; // Importamos el cliente de API

// Define los tipos de tu producto y el item del carrito
type Product = {
    _id: string;
    name: string;
    price: number;
    image_url?: string;
    unit: string;
};

// Tipo para un item en el carrito (Producto + cantidad)
export interface CartItem extends Product {
    quantity: number;
}

// Tipo para el item que viene de la API (Backend)
// Nota: Tu API populate 'product_id'
interface ApiCartItem {
    _id: string; // ID del *item del carrito*
    user_id: string;
    product_id: Product | null; // El producto populado
    quantity: number;
    expires_at: string;
}

// --- NUEVO: Tipo para el estado de uso ---
export interface DailyUsage {
    limit: number;
    used: number;
    remaining: number;
}
// --- FIN ---

type CartState = {
    items: CartItem[];
    isInitialized: boolean; // Para saber si ya sincronizamos con la API
    // --- NUEVO: Añadir 'usage' al estado ---
    usage: DailyUsage;

    // --- Acciones del Store ---
    // Sincroniza el store local con el backend (al iniciar sesión o recargar)
    syncCartWithApi: () => Promise<void>;
    // Añade un item (llama a la API y luego actualiza el estado)
    addItemToApi: (product: Product, quantity: number) => Promise<void>;
    // Elimina un item (llama a la API y luego actualiza el estado)
    removeItemFromApi: (productId: string) => Promise<void>;
    // Limpia el carrito (solo localmente, para logout)
    clearCart: () => void;
    // --- NUEVO: Acción para actualizar 'usage' ---
    fetchUsage: () => Promise<void>;
};

const _apiItemToCartItem = (apiItem: ApiCartItem): CartItem | null => {
    if (!apiItem.product_id) {
        return null; // Maneja el caso donde el producto es null
    }
    return {
        ...apiItem.product_id, // Expande los datos del producto
        quantity: apiItem.quantity, // Usa la cantidad del carrito
    };
};
// --- Implementación del Store ---

export const useCartStore = create<CartState>((set, get) => ({

    items: [],
    isInitialized: false,
    usage: { limit: 0, used: 0, remaining: 0 }, // Estado inicial

    syncCartWithApi: async () => {
        try {
            const { data } = await api.get<ApiCartItem[]>('/cart');
            // --- CORRECCIÓN 4: 'map' ahora usa la función interna ---
            const cartItems = data
                .map(_apiItemToCartItem) // Convierte cada item de la API
                .filter((item): item is CartItem => item !== null); // Filtra nulos
            // --- CORRECCIÓN 4: 'set' actualiza el estado ---
            set({ items: cartItems, isInitialized: true });
            // --- NUEVO: Llama a 'fetchUsage' después de sincronizar el carrito ---
            get().fetchUsage();
        } catch (error) {
            console.error('Error al sincronizar el carrito:', error);
            set({ isInitialized: true });
        }
    },

    addItemToApi: async (product: Product, quantity: number) => {
        const { data } = await api.post<ApiCartItem>('/cart', {
            productId: product._id,
            quantity: quantity,
        });

        set((state) => {
            // --- CORRECCIÓN 4: Usamos la función interna ---
            const newItem = _apiItemToCartItem(data);
            if (!newItem) return state; // Si es nulo, no hacemos nada

            const existingItemIndex = state.items.findIndex((i) => i._id === newItem._id);
            let updatedItems

            if (existingItemIndex > -1) {
                updatedItems = [...state.items];
                updatedItems[existingItemIndex] = newItem;
            } else {
                updatedItems = [...state.items, newItem];
            }
            return { items: updatedItems };
        });
        get().fetchUsage(); // --- NUEVO: Actualiza 'usage' ---
    },

    removeItemFromApi: async (productId: string) => {
        await api.delete(`/cart/${productId}`);
        set((state) => ({
            items: state.items.filter((item) => item._id !== productId),
        }));
        get().fetchUsage(); // --- NUEVO: Actualiza 'usage' ---
    },

    clearCart: () => {
        set({
            items: [],
            isInitialized: false,
            usage: { limit: 0, used: 0, remaining: 0 }, // --- NUEVO: Resetea 'usage' ---
        });
    },

    // --- NUEVA FUNCIÓN: Para ser llamada por el Navbar ---
    fetchUsage: async () => {
        try {
            const { data } = await api.get<DailyUsage>('/users/usage');
            set({ usage: data });
        } catch (error) {
            console.error('Error al cargar el límite de usuario:', error);
            set({ usage: { limit: 0, used: 0, remaining: 0 } });
        }
    }
}));