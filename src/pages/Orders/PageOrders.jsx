import { useEffect, useState } from "react";
import { AXIOS } from "../../services/index.js";
import { useUser } from "../../contexts/UsuarioProvider.jsx";
import { FaBox, FaSearch, FaFilter, FaChevronRight, FaMapPin, FaDollarSign, FaCalendar } from "react-icons/fa";
import { Link } from "react-router";

const PageOrders = () => {
    const { user } = useUser();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtroStatus, setFiltroStatus] = useState("todos");
    const [busca, setBusca] = useState("");
    const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
        async function fetchOrders() {
            try {
                if (!user?.id) {
                    console.warn("Usuário não encontrado");
                    setLoading(false);
                    return;
                }

                // Buscar pedidos do usuário logado
                const request = await AXIOS.get(`/api/orders?usuario_id=${user.id}`);
                console.log("Pedidos carregados:", request.data);
                setOrders(request.data || []);
            } catch (error) {
                console.error("Erro ao buscar pedidos:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        }

        fetchOrders();
    }, [user?.id]);

    // Filtrar e buscar pedidos
    useEffect(() => {
        let resultado = [...orders];

        // Filtro por status
        if (filtroStatus !== "todos") {
            resultado = resultado.filter(order => {
                const status = order.status?.toLowerCase() || "pendente";
                return status.includes(filtroStatus.toLowerCase());
            });
        }

        // Busca por número do pedido
        if (busca) {
            resultado = resultado.filter(order =>
                order.id?.toString().includes(busca) ||
                order.numero_pedido?.includes(busca.toUpperCase())
            );
        }

        setFilteredOrders(resultado);
    }, [orders, filtroStatus, busca]);

    const getStatusColor = (status) => {
        const s = status?.toLowerCase() || "pendente";
        if (s.includes("entregue") || s.includes("completo")) {
            return { bg: "bg-green-100", text: "text-green-800", label: "Entregue" };
        }
        if (s.includes("processando") || s.includes("andamento")) {
            return { bg: "bg-blue-100", text: "text-blue-800", label: "Em Andamento" };
        }
        if (s.includes("cancelado")) {
            return { bg: "bg-red-100", text: "text-red-800", label: "Cancelado" };
        }
        return { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pendente" };
    };

    const formatPrice = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor || 0);
    };

    const formatDate = (date) => {
        if (!date) return "-";
        return new Date(date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Carregando seus pedidos...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            
            <div className="max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Meus Pedidos</h1>
                    <p className="text-gray-600">
                        {filteredOrders.length} {filteredOrders.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
                    </p>
                </div>

                {/* Filtros e Busca */}
                <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Busca */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Buscar pedido
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Número do pedido..."
                                    value={busca}
                                    onChange={(e) => setBusca(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors pl-10"
                                />
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>

                        {/* Filtro de Status */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Filtrar por status
                            </label>
                            <div className="flex gap-2 flex-wrap">
                                {["todos", "andamento", "entregue", "cancelado"].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFiltroStatus(status)}
                                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${filtroStatus === status
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                            }`}
                                    >
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lista de Pedidos */}
                {filteredOrders.length === 0 ? (
                    <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaBox size={32} className="text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {orders.length === 0 ? "Nenhum pedido ainda" : "Nenhum pedido encontrado"}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {orders.length === 0
                                ? "Você ainda não fez nenhuma compra. Visite nossa loja para começar!"
                                : "Nenhum pedido corresponde aos filtros selecionados."}
                        </p>
                        <Link
                            to="/products"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
                        >
                            Ver Produtos
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredOrders.map((order) => {
                            const statusInfo = getStatusColor(order.status);
                            const total = parseFloat(order.valor_total || 0);

                            return (
                                <Link key={order.id} to={`/order-tracking`} className="group">
                                    <div className="bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                                                {/* Informações Principais */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            Pedido #{order.id || order.numero_pedido || "---"}
                                                        </h3>
                                                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bg} ${statusInfo.text}`}>
                                                            {statusInfo.label}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-500">
                                                        {order.numero_itens || "N/A"} {order.numero_itens === 1 ? "item" : "itens"}
                                                    </p>
                                                </div>

                                                {/* Preço */}
                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-gray-900">
                                                        {formatPrice(total)}
                                                    </div>
                                                    <p className="text-sm text-gray-500">Total do pedido</p>
                                                </div>

                                                {/* Botão de Ação */}
                                                <div className="flex items-center text-gray-400 group-hover:text-blue-600 transition-colors">
                                                    <FaChevronRight size={20} />
                                                </div>
                                            </div>

                                            {/* Detalhes do Pedido */}
                                            <div className="grid md:grid-cols-4 gap-6 pt-4 border-t border-gray-200">
                                                {/* Data */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <FaCalendar size={16} className="text-gray-600" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-600 font-medium">Data do Pedido</p>
                                                        <p className="text-sm font-semibold text-gray-900">{formatDate(order.data_pedido)}</p>
                                                    </div>
                                                </div>

                                                {/* Endereço de Entrega */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <FaMapPin size={16} className="text-gray-600" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-600 font-medium">Entrega</p>
                                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                                            {order.endereco_entrega || "Não informado"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Método de Pagamento */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <FaDollarSign size={16} className="text-gray-600" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-600 font-medium">Pagamento</p>
                                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                                            {order.metodo_pagamento || "Não informado"}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Data de Entrega Estimada */}
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                        <FaBox size={16} className="text-gray-600" />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-600 font-medium">Rastreamento</p>
                                                        <p className="text-sm font-semibold text-blue-600 hover:text-blue-700">
                                                            Ver detalhes →
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PageOrders;