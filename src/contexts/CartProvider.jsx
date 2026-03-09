import { createContext, useContext, useEffect, useState } from "react";
import { AXIOS } from "../services";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [id, setId] = useState()
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    const [opcaofrete, setOpcaoFrete] = useState([])
    const [dadosLocalizacao, setDadosLocalizacao] = useState({})
    const [frete, setFrete] = useState(0)
    const [cupomAplicado, setCupomAplicado] = useState(null);

    // 🔥 SIDEBARS
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOpenProduct, setIsOpenProduct] = useState(false);
    const [isOpenEdit, setIsOpenEdit] = useState(false);
    const [isOpenCatego, setIsOpenCatego] = useState(false);
    const [isOpenEditCatego, setIsOpenEditCatego] = useState(false);
    const [isOpenCoupon, setIsOpenCoupon] = useState(false);

    console.log(cart);

    // =============================
    // CARREGAR DO LOCALSTORAGE
    // =============================
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }

        setLoading(false);
    }, []);

    // =============================
    // SALVAR NO LOCALSTORAGE
    // =============================
    useEffect(() => {
        if (!loading) {
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, loading]);

    // =============================
    // FUNÇÕES DO CARRINHO
    // =============================

    const addToCart = (produto, quantidade = 1) => {
        setCart(prev => {
            const existing = prev.find(
                p =>
                    p.id === produto.id &&
                    p.tamanhoSelecionado === produto.tamanhoSelecionado &&
                    p.corSelecionada === produto.corSelecionada
            );

            if (existing) {
                return prev.map(p =>
                    p.id === produto.id &&
                        p.tamanhoSelecionado === produto.tamanhoSelecionado &&
                        p.corSelecionada === produto.corSelecionada
                        ? { ...p, quantidade: p.quantidade + quantidade } // aqui
                        : p
                );
            }

            // Se não existe, adiciona o produto com a quantidade exata
            return [...prev, { ...produto, quantidade }];
        });
    };

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(p => p.id !== id));
    };

    const updateQuantity = (id, quantidade) => {
        if (quantidade < 1) return;

        setCart(prev =>
            prev.map(p =>
                p.id === id ? { ...p, quantidade } : p
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    // =============================
    // TOTAIS
    // =============================

    const total = cart.reduce((acc, item) => {
        const valor = Number(item.valor || 0);
        return acc + valor * item.quantidade;
    }, 0);

    const totalItems = cart.reduce(
        (acc, item) => acc + item.quantidade,
        0
    );
    console.log(totalItems);


    // =============================
    // CONTROLE SIDEBAR
    // =============================

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen(prev => !prev);

    const openProduct = () => setIsOpenProduct(true);
    const closeProduct = () => setIsOpenProduct(false);

    const openEdit = () => setIsOpenEdit(true);
    const closeEdit = () => setIsOpenEdit(false);

    const openCatego = () => setIsOpenCatego(true);
    const closeCatego = () => setIsOpenCatego(false);

    const openEditCatego = () => setIsOpenEditCatego(true);
    const closeEditCatego = () => setIsOpenEditCatego(false);

    const openCoupon = () => setIsOpenCoupon(true);
    const closeCoupon = () => setIsOpenCoupon(false);

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

                isCartOpen,
                openCart,
                closeCart,
                toggleCart,

                isOpenProduct,
                openProduct,
                closeProduct,

                isOpenEdit,
                openEdit,
                closeEdit,

                isOpenCatego,
                openCatego,
                closeCatego,

                isOpenEditCatego,
                setIsOpenEditCatego,
                openEditCatego,
                closeEditCatego,

                isOpenCoupon,
                openCoupon,
                closeCoupon,

                id,
                setId,


                setFrete,
                frete,
                opcaofrete,
                setOpcaoFrete,
                dadosLocalizacao,
                setDadosLocalizacao,
                cupomAplicado,
                setCupomAplicado

            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);