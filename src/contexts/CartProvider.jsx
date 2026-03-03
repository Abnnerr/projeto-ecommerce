import { createContext, useContext, useEffect, useState } from "react";
import { AXIOS } from "../services";

const CartContext = createContext({});

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // 🔥 NOVO ESTADO DO SIDEBAR
    const [isCartOpen, setIsCartOpen] = useState(false);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    // =============================
    // RESTO DO SEU CÓDIGO NORMAL
    // =============================

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const { data } = await AXIOS.get("/api/cart");
                if (Array.isArray(data)) {
                    setCart(data);
                    localStorage.setItem("cart", JSON.stringify(data));
                }
            } catch {
                console.warn("Backend offline.");
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, []);

    useEffect(() => {
        if (!loading) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, loading]);

    const syncWithBackend = async (updatedCart) => {
        if (loading) return;
        try {
            await AXIOS.post("/api/cart/sync", updatedCart);
        } catch {
            console.warn("Erro ao sincronizar.");
        }
    };

    const addToCart = (produto, quantidade = 1) => {
        setCart(prev => {
            const existing = prev.find(p => p.id === produto.id);

            let updated;
            if (existing) {
                updated = prev.map(p =>
                    p.id === produto.id
                        ? { ...p, quantidade: p.quantidade + quantidade }
                        : p
                );
            } else {
                updated = [...prev, { ...produto, quantidade }];
            }

            syncWithBackend(updated);
            return updated;
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => {
            const updated = prev.filter(p => p.id !== id);
            syncWithBackend(updated);
            return updated;
        });
    };

    const updateQuantity = (id, quantidade) => {
        if (quantidade < 1) return;

        setCart(prev => {
            const updated = prev.map(p =>
                p.id === id ? { ...p, quantidade } : p
            );
            syncWithBackend(updated);
            return updated;
        });
    };

    const clearCart = () => {
        setCart([]);
        syncWithBackend([]);
    };

    const total = cart.reduce((acc, item) => {
        const valor = Number(item.valor || 0);
        return acc + valor * item.quantidade;
    }, 0);

    const totalItems = cart.reduce(
        (acc, item) => acc + item.quantidade,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                total,
                totalItems,
                loading,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,

                // 🔥 exportando controle do sidebar
                isCartOpen,
                openCart,
                closeCart,
                toggleCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);