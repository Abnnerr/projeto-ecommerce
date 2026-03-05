
import { FaTrash } from "react-icons/fa";
import { useCart } from "../contexts/CartProvider";
import { useNavigate } from "react-router";

export default function CartSidebar() {
    const {
        cart,
        total,
        isCartOpen,
        closeCart,
        updateQuantity,
        removeFromCart
    } = useCart();
    const navigate = useNavigate()

    return (
        <>
            {/* Overlay */}
            {isCartOpen && (
                <div
                    onClick={closeCart}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col
                ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
            >
                {/* Header */}
                <div className="p-4 border-b flex justify-between items-center">
                    <h2 className="font-bold text-lg">Carrinho</h2>
                    <button onClick={closeCart} className="text-gray-500 hover:text-black">
                        X
                    </button>
                </div>

                {/* Lista de Produtos */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">

                    {cart.length === 0 && (
                        <div className="text-center text-gray-500 mt-20">
                            Seu carrinho está vazio
                        </div>
                    )}

                    {cart.map((item, index) => {

                        const valor = Number(item.valor);
                        const desconto = Number(item.desconto || 0);
                        const precoFinal = valor - (valor * desconto) / 100;

                        return (
                            <div key={index} className="flex gap-4 border-b pb-4">

                                {/* Imagem */}
                                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center text-xs text-gray-400">
                                    {item.produto_imagens?.length > 0 ? (
                                        <img
                                            src={item.produto_imagens[0].url}
                                            alt={item.nome}
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        "Sem imagem"
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 space-y-1">
                                    <h3 className="font-medium text-sm">
                                        {item.nome}
                                    </h3>

                                    {/* Tamanho e Cor */}
                                    <div className="text-xs text-gray-500">
                                        {item.tamanhoSelecionado && (
                                            <div>Tamanho: {item.tamanhoSelecionado}</div>
                                        )}
                                        {item.corSelecionada && (
                                            <div>Cor: {item.corSelecionada}</div>
                                        )}
                                    </div>

                                    {/* Preço */}
                                    <div className="text-sm font-semibold">
                                        R$ {precoFinal.toFixed(2)}
                                    </div>

                                    {/* Quantidade */}
                                    <div className="flex items-center gap-2 mt-2">
                                        <button
                                            onClick={() =>
                                                item.quantidade > 1 &&
                                                updateQuantity(item.id, item.quantidade - 1)
                                            }
                                            className="px-2 border rounded"
                                        >
                                            -
                                        </button>

                                        <span>{item.quantidade}</span>

                                        <button
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantidade + 1)
                                            }
                                            className="px-2 border rounded"
                                        >
                                            +
                                        </button>

                                        {/* Remover */}
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="ml-auto text-red-500 hover:text-red-700"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="border-t p-4 space-y-4">

                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>R$ {total.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={() => {navigate(cart.length > 0 ? '/checkout' : '/'), closeCart()}}
                        className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                    >
                        Finalizar Compra
                    </button>

                </div>
            </div>
        </>
    );
}