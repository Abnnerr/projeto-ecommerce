import { useCart } from "../contexts/CartProvider";

export default function CartSidebar() {
    const {
        cart,
        total,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart
    } = useCart();

    return (
        <>
            {isCartOpen && (
                <div
                    onClick={closeCart}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}

            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isCartOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                    }`}
            >
                <div className="p-4 border-b flex justify-between">
                    <h2 className="font-bold">Carrinho</h2>
                    <button onClick={closeCart}>X</button>
                </div>
            </div>
        </>
    );
}