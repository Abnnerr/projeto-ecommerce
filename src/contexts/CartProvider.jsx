import { createContext, useContext, useEffect, useState } from "react";
import { AXIOS } from "../services";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    const [loading, setLoading] = useState(true);

    // 🔹 Buscar carrinho do banco ao iniciar (se existir)
    useEffect(() => {
        const fetchCartFromBackend = async () => {
            try {
                const { data } = await AXIOS.get("/api/cart");

                if (data && Array.isArray(data)) {
                    setCart(data);
                    localStorage.setItem("cart", JSON.stringify(data));
                }
            } catch (error) {
                console.warn("Backend offline. Usando carrinho local.");
                return error
            } finally {
                setLoading(false);
            }
        };

        fetchCartFromBackend();
    }, []);

    // 🔹 Sempre salvar no localStorage quando mudar
    useEffect(() => {
        if (!loading) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, loading]);

    // 🔹 Função para sincronizar com backend
    const syncWithBackend = async (updatedCart) => {
        try {
            await AXIOS.post("/api/cart/sync", updatedCart);
        } catch (error) {
        
            console.warn("Não foi possível sincronizar com o backend.");
            return error
        }
    };

    // 🔹 Adicionar produto
    const addToCart = (produto, quantidade = 1) => {
        let updatedCart;

        const existing = cart.find(item => item.id === produto.id);

        if (existing) {
            updatedCart = cart.map(item =>
                item.id === produto.id
                    ? { ...item, quantidade: item.quantidade + quantidade }
                    : item
            );
        } else {
            updatedCart = [...cart, { ...produto, quantidade }];
        }

        setCart(updatedCart);
        syncWithBackend(updatedCart);
    };

    // 🔹 Remover produto
    const removeFromCart = (produtoId) => {
        const updatedCart = cart.filter(item => item.id !== produtoId);
        setCart(updatedCart);
        syncWithBackend(updatedCart);
    };

    // 🔹 Atualizar quantidade
    const updateQuantity = (produtoId, novaQuantidade) => {
        const updatedCart = cart.map(item =>
            item.id === produtoId
                ? { ...item, quantidade: novaQuantidade }
                : item
        );

        setCart(updatedCart);
        syncWithBackend(updatedCart);
    };

    // 🔹 Limpar carrinho
    const clearCart = () => {
        setCart([]);
        syncWithBackend([]);
    };

    // 🔹 Calcular total
    const total = cart.reduce((acc, item) => {
        const valor = Number(item.valor || 0);
        const desconto = Number(item.desconto || 0);
        const final = valor - (valor * desconto) / 100;
        return acc + final * item.quantidade;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                total,
                loading
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);