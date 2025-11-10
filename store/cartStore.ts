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
    product_id: Product; // El producto populado
    quantity: number;
    expires_at: string;
}

type CartState = {
    items: CartItem[];
    isInitialized: boolean; // Para saber si ya sincronizamos con la API

    // --- Acciones del Store ---

    // Sincroniza el store local con el backend (al iniciar sesión o recargar)
    syncCartWithApi: () => Promise<void>;

    // Añade un item (llama a la API y luego actualiza el estado)
    addItemToApi: (product: Product, quantity?: number) => Promise<void>;

    // Elimina un item (llama a la API y luego actualiza el estado)
    removeItemFromApi: (productId: string) => Promise<void>;

    // Limpia el carrito (solo localmente, para logout)
    clearCart: () => void;
};

// --- Implementación del Store ---

export const useCartStore = create<CartState>((set) => {
    // Esta función vive DENTRO del callback de 'create', pero
    // FUERA del objeto de estado que se retorna.
    const _apiItemToCartItem = (apiItem: ApiCartItem): CartItem => {
        return {
            ...apiItem.product_id, // Expande los datos del producto
            quantity: apiItem.quantity, // Usa la cantidad del carrito
        };
    };
    return {
        items: [],
        isInitialized: false,

        syncCartWithApi: async () => {
            try {
                const { data } = await api.get<ApiCartItem[]>('/cart');
                // --- CORRECCIÓN 4: 'map' ahora usa la función interna ---
                const cartItems = data.map(_apiItemToCartItem);
                // --- CORRECCIÓN 4: 'set' actualiza el estado ---
                set({ items: cartItems, isInitialized: true });
            } catch (error) {
                console.error('Error al sincronizar el carrito:', error);
                set({ isInitialized: true });
            }
        },

        addItemToApi: async (product: Product, quantity: number = 1) => {
            const { data } = await api.post<ApiCartItem>('/cart', {
                productId: product._id,
                quantity: quantity,
            });

            set((state) => {
                // --- CORRECCIÓN 4: Usamos la función interna ---
                const newItem = _apiItemToCartItem(data);
                const existingItemIndex = state.items.findIndex((i) => i._id === newItem._id);

                if (existingItemIndex > -1) {
                    const updatedItems = [...state.items];
                    updatedItems[existingItemIndex] = newItem;
                    return { items: updatedItems };
                } else {
                    return { items: [...state.items, newItem] };
                }
            });
        },

        removeItemFromApi: async (productId: string) => {
            await api.delete(`/cart/${productId}`);
            set((state) => ({
                items: state.items.filter((item) => item._id !== productId),
            }));
        },

        clearCart: () => {
            set({ items: [], isInitialized: false });
        },
    };
});