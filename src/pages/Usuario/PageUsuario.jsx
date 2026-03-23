import { useState, useEffect } from "react";
import { AXIOS } from "../../services";
import { useUser } from "../../contexts/UsuarioProvider";

// Importando ícones específicos do React Icons
import {
    FaUserCircle,
    FaBoxOpen,
    FaMapMarkerAlt,
    FaCog,
    FaSignOutAlt,
    FaChevronRight,
    FaEdit,
    FaPlus
} from "react-icons/fa";
import { MdOutlineHistory, MdVerifiedUser } from "react-icons/md";

const statusColors = {
    pendente: "bg-amber-100 text-amber-700 border-amber-200",
    processando: "bg-blue-100 text-blue-700 border-blue-200",
    enviado: "bg-purple-100 text-purple-700 border-purple-200",
    entregue: "bg-green-100 text-green-700 border-green-200",
    cancelado: "bg-red-100 text-red-700 border-red-200",
};

const PageUsuario = () => {
    const { user, token } = useUser();
    const [activeTab, setActiveTab] = useState("perfil");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return;
            try {
                const res = await AXIOS.get(`/api/orders/${user.id}`);
                setOrders(res.data);
            } catch (err) {
                console.error("Erro ao buscar pedidos:", err);
            }
        };
        fetchOrders();
    }, [token]);

    const menuItems = [
        { id: "perfil", label: "Meu Perfil", icon: <FaUserCircle /> },
        { id: "pedidos", label: "Meus Pedidos", icon: <FaBoxOpen /> },
        { id: "enderecos", label: "Endereços", icon: <FaMapMarkerAlt /> },
        { id: "config", label: "Configurações", icon: <FaCog /> },
    ];

    return (
        <div className="flex min-h-screen bg-[#f8fafc]">
            {/* SIDEBAR */}
            <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col">
                <div className="p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                            <MdVerifiedUser size={24} />
                        </div>
                        <span className="text-xl font-bold text-slate-800 tracking-tight">HubCliente</span>
                    </div>

                    <nav className="space-y-2">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id
                                        ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                                    }`}
                            >
                                <span className={activeTab === item.id ? "text-indigo-600" : "text-slate-400"}>
                                    {item.icon}
                                </span>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-auto p-8 border-t border-slate-100">
                    <button className="flex items-center gap-3 text-sm font-bold text-red-500 hover:bg-red-50 w-full p-3 rounded-lg transition">
                        <FaSignOutAlt />
                        Sair do Portal
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 p-6 md:p-12 overflow-y-auto">
                <div className="max-w-4xl mx-auto">

                    <div className="mb-10">
                        <h1 className="text-3xl font-extrabold text-slate-900 leading-tight">Painel do Cliente</h1>
                        <p className="text-slate-500 font-medium">Bem-vindo de volta, {user?.nome?.split(" ")[0]}!</p>
                    </div>

                    {/* ABA: PERFIL */}
                    {activeTab === "perfil" && (
                        <div className="grid gap-6">
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600" />
                                <div className="px-8 pb-8">
                                    <div className="relative -mt-12 mb-6 flex items-end justify-between">
                                        <div className="h-24 w-24 bg-white rounded-2xl border-4 border-white shadow-md flex items-center justify-center text-slate-200">
                                            <FaUserCircle size={80} />
                                        </div>
                                        <button className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition">
                                            <FaEdit size={14} /> Editar Perfil
                                        </button>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Nome Completo</p>
                                            <p className="text-lg font-semibold text-slate-800">{user?.nome}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">E-mail de Contato</p>
                                            <p className="text-lg font-semibold text-slate-800">{user?.email}</p>
                                        </div>
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Telefone</p>
                                            <p className="text-lg font-semibold text-slate-800">{user?.telefone || "(00) 00000-0000"}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ABA: PEDIDOS */}
                    {activeTab === "pedidos" && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-2">
                                <MdOutlineHistory size={24} className="text-indigo-600" />
                                <h2 className="text-xl font-bold text-slate-800">Histórico Recente</h2>
                            </div>

                            {orders.length === 0 ? (
                                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
                                    <FaBoxOpen size={48} className="mx-auto text-slate-200 mb-4" />
                                    <p className="text-slate-500 font-medium">Nenhum pedido encontrado no sistema.</p>
                                </div>
                            ) : (
                                orders.map((order) => (
                                    <div key={order.id} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 transition-all group">
                                        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="h-12 w-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                                    <FaBoxOpen size={20} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-slate-400 uppercase">Código do Pedido</p>
                                                    <p className="font-bold text-slate-800 italic">#{order.id}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-6">
                                                <div className="text-right hidden sm:block">
                                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Total Pago</p>
                                                    <p className="text-lg font-black text-indigo-600">R$ {order.valor_total}</p>
                                                </div>
                                                <span className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase border tracking-wider ${statusColors[order.status]}`}>
                                                    {order.status}
                                                </span>
                                                <FaChevronRight className="text-slate-300 hidden md:block" />
                                            </div>
                                        </div>

                                        {/* Lista de itens do pedido */}
                                        <div className="mt-6 flex flex-wrap gap-2 pt-6 border-t border-slate-50">
                                            {order.pedido_produto?.map((item) => (
                                                <div key={item.id_produto} className="bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 flex items-center gap-2">
                                                    <span className="text-[10px] font-bold bg-white text-slate-500 px-1.5 rounded border">x{item.quantidade}</span>
                                                    <span className="text-xs font-semibold text-slate-600">{item.produtos.nome}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    )}

                    {/* ABA: ENDEREÇOS */}
                    {activeTab === "enderecos" && (
                        <div className="bg-white rounded-3xl border border-slate-200 p-10 flex flex-col items-center">
                            <div className="h-20 w-20 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600 mb-6">
                                <FaMapMarkerAlt size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Seus Endereços</h2>
                            <p className="text-slate-500 mb-8 max-w-xs text-center font-medium">
                                Gerencie seus locais de entrega para um checkout mais rápido.
                            </p>
                            <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">
                                <FaPlus size={14} /> Adicionar Novo Local
                            </button>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
};

export default PageUsuario;