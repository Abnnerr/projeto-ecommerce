import { FaSearch, FaUser, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { useCart } from "../contexts/CartProvider";
import { useMemo } from "react";

export default function Header() {
    const { cart} = useCart();

    // 🔹 Total de itens (soma das quantidades)
    const totalItems = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.quantidade, 0);
    }, [cart]);

    return (
        <header className="
        bg-[#0D0D0D]
        border-b border-[#2A2A2A]
        text-[#EAEAEA]
        ">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* LEFT - Search */}
                <div className="flex-1">

                    <div className="
                    flex items-center
                    bg-[#1E1E1E]
                    border border-[#2A2A2A]
                    rounded-lg
                    overflow-hidden
                    w-[350px]
                    ">

                        <input
                            type="text"
                            placeholder="Buscar produtos..."
                            className="
                            flex-1
                            px-4 py-2
                            text-sm
                            bg-transparent
                            text-[#EAEAEA]
                            placeholder-[#808080]
                            outline-none
                            "
                        />

                        <button className="
                        px-4
                        text-[#808080]
                        hover:text-[#3B82F6]
                        transition
                        ">
                            <FaSearch />
                        </button>

                    </div>

                </div>

                {/* CENTER - Logo */}
                <div className="flex-1 flex justify-center">

                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="h-10 object-contain opacity-90"
                    />

                </div>

                {/* RIGHT - Actions */}
                <div className="flex-1 flex items-center justify-end gap-6">

                    {/* Login */}
                    <div className="
                    flex items-center gap-2
                    cursor-pointer
                    hover:text-white
                    transition
                    ">

                        <FaUser className="text-[#B3B3B3]" />

                        <div className="text-xs leading-tight">

                            <span className="block text-[#808080]">
                                Conta
                            </span>

                            <a href="/login" className="text-sm font-medium text-[#EAEAEA]">
                                Entrar
                            </a>

                        </div>

                    </div>

                    {/* WhatsApp */}
                    <FaWhatsapp className="
                    text-lg
                    text-[#B3B3B3]
                    cursor-pointer
                    hover:text-[#3B82F6]
                    transition
                    " />

                    {/* Cart */}
                    <div className="relative cursor-pointer">

                        <FaShoppingCart className="
                        text-lg
                        text-[#B3B3B3]
                        hover:text-[#3B82F6]
                        transition
                        " />

                        <span className="
                        absolute -top-2 -right-3
                        bg-[#3B82F6]
                        text-white
                        text-[10px]
                        px-1.5 py-[2px]
                        rounded-full
                        ">
                            {totalItems}
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}