import { FaSearch, FaUser, FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { useCart } from "../contexts/CartProvider";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "../contexts/UsuarioProvider";
import { AXIOS } from "../services";

export default function Header() {
    const { cart, toggleCart } = useCart();
    const { user, logout } = useUser()
    const [produtos, setProdutos] = useState()
    useEffect(() => {
        async function buscarProdutos() {
            try {
                const response = await AXIOS.get('/api/products')
                console.log(response.data)
                setProdutos(response.data)
            } catch (err) {
                console.log(err)
            }
        }
        buscarProdutos()
    }, [user, produtos])

    const totalItems = useMemo(() => {
        return cart.reduce((acc, item) => acc + item.quantidade, 0);
    }, [cart]);

    const [query, setQuery] = useState("")
    const [resultados, setResultados] = useState([])
    const [mostrarDropdown, setMostrarDropdown] = useState(false)

    const handleSearch = (value) => {
        setQuery(value)

        if (!value || !produtos) {
            setResultados([])
            setMostrarDropdown(false)
            return
        }

        const filtrados = produtos.filter(prod =>
            prod.nome.toLowerCase().includes(value.toLowerCase())
        )

        setResultados(filtrados)
        setMostrarDropdown(true)
    }

    return (
        <header className="
        bg-[#0D0D0D]
        border-b border-[#2A2A2A]
        text-[#EAEAEA]
        ">

            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

                {/* LEFT - Search */}
                <div className="relative w-[350px]">

                    <div className="
        flex items-center
        bg-[#1E1E1E]
        border border-[#2A2A2A]
        rounded-lg
        overflow-hidden
    ">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => handleSearch(e.target.value)}
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

                    {/* DROPDOWN */}
                    {mostrarDropdown && (
                        <div className="
            absolute top-full left-0
            w-full
            bg-[#1E1E1E]
            border border-[#2A2A2A]
            rounded-lg
            mt-2
            max-h-80
            overflow-y-auto
            shadow-xl
            z-50
        ">

                            {resultados.length > 0 ? (
                                resultados.map(prod => (
                                    <a
                                        key={prod.id}
                                        href={`/product/${prod.id}`}
                                        className="flex items-center gap-3 p-3 hover:bg-[#2A2A2A] transition"
                                        onClick={() => setMostrarDropdown(false)}
                                    >
                                        <img
                                            src={prod.produto_imagens[0]?.url || "https://via.placeholder.com/50"}
                                            alt={prod.nome}
                                            className="w-12 h-12 object-cover rounded"
                                        />

                                        <div className="flex flex-col">
                                            <span className="text-sm">{prod.nome}</span>
                                            <span className="text-xs text-green-400 font-semibold">
                                                R$ {Number(prod.valor).toFixed(2)}
                                            </span>
                                        </div>
                                    </a>
                                ))
                            ) : (
                                <div className="p-4 text-sm text-gray-400">
                                    Nenhum produto encontrado
                                </div>
                            )}
                        </div>
                    )}
                </div>
                {/* CENTER - Logo */}
                <div className="flex-1 flex justify-center">

                    <img
                        src="/logo-icon-name.svg"
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

                        {
                            user ? (
                                <div className="flex items-center justify-center gap-4">
                                    <a href={`/usuario/${user.nome}`} className="flex items-center gap-2">
                                        {
                                            user.imagem ? (
                                                <img src={user.imagem} alt="" />
                                            ) : (
                                                <div className="px-2.5 py-2 *:font-bold *:text-xl rounded-full bg-gray-600 flex  justify-center gap-1">
                                                    <span> {user.nome[0].toUpperCase()}</span>
                                                    <span> {user.nome[1].toUpperCase()}</span>
                                                </div>
                                            )
                                        }
                                    </a>

                                    <div className="flex flex-col">
                                        <span>{user.nome}</span>
                                        <button onClick={logout}>Sair</button>
                                    </div>

                                </div>
                            ) : (
                                <div className="flex items-center gap-3">
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

                            )
                        }


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
                    <button onClick={toggleCart} className="relative cursor-pointer">

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
                    </button>
                </div>
            </div>
        </header>
    );
}