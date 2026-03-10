import { useState, useEffect } from "react";
import { AXIOS } from "../../services";
import { useUser } from "../../contexts/UsuarioProvider";

const statusColors = {
    pendente: "bg-yellow-400 text-gray-900",
    processando: "bg-blue-400 text-white",
    enviado: "bg-purple-600 text-white",
    entregue: "bg-green-600 text-white",
    cancelado: "bg-red-500 text-white",
};
const PageUsuario = () => {
    const { user, token } = useUser();
    const [activeTab, setActiveTab] = useState("perfil");
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!token) return;
            try {
                const res = await AXIOS.get("/orders/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) {
                console.error("Erro ao buscar pedidos:", err);
            }
        };
        fetchOrders();
    }, [token]);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 text-white p-6 flex flex-col gap-4 sticky top-0 h-screen">
                <h2 className="text-2xl font-bold mb-8">Minha Conta</h2>
                <button
                    className={`text-left p-3 rounded-lg font-semibold transition ${activeTab === "perfil" ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                    onClick={() => setActiveTab("perfil")}
                >
                    Perfil
                </button>
                <button
                    className={`text-left p-3 rounded-lg font-semibold transition ${activeTab === "pedidos" ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                    onClick={() => setActiveTab("pedidos")}
                >
                    Pedidos
                </button>
                <button
                    className={`text-left p-3 rounded-lg font-semibold transition ${activeTab === "enderecos" ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                    onClick={() => setActiveTab("enderecos")}
                >
                    Endereços
                </button>
                <button
                    className={`text-left p-3 rounded-lg font-semibold transition ${activeTab === "config" ? "bg-gray-700" : "hover:bg-gray-700"
                        }`}
                    onClick={() => setActiveTab("config")}
                >
                    Configurações
                </button>
            </aside>

            {/* Conteúdo */}
            <main className="flex-1 p-8 space-y-8">
                {/* PERFIL */}
                {activeTab === "perfil" && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Perfil</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600"><strong>Nome:</strong> {user?.nome}</p>
                                <p className="text-gray-600"><strong>Email:</strong> {user?.email}</p>
                                <p className="text-gray-600"><strong>Telefone:</strong> {user?.telefone}</p>
                            </div>
                            <div className="flex items-center">
                                <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                                    Editar Perfil
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* PEDIDOS */}
                {activeTab === "pedidos" && (
                    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
                        <h2 className="text-2xl font-bold mb-4">Meus Pedidos</h2>
                        {orders.length === 0 ? (
                            <p className="text-gray-500">Nenhum pedido encontrado.</p>
                        ) : (
                            orders.map((order) => (
                                <div
                                    key={order.id}
                                    className="border rounded-lg p-4 hover:shadow-lg transition"
                                >
                                    <div className="flex justify-between items-center mb-2">
                                        <p className="font-semibold">Pedido #{order.id}</p>
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 mb-2">Total: R$ {order.valor_total}</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {order.pedido_produto?.map((item) => (
                                            <div
                                                key={item.id_produto}
                                                className="bg-gray-50 p-2 rounded-md flex flex-col items-center"
                                            >
                                                <p className="font-semibold">{item.produtos.nome}</p>
                                                <p className="text-gray-500">Qtd: {item.quantidade}</p>
                                                <p className="text-gray-500">R$ {item.produtos.valor}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ENDEREÇOS */}
                {activeTab === "enderecos" && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Meus Endereços</h2>
                        <p className="text-gray-500">Nenhum endereço cadastrado ainda.</p>
                        <button className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
                            Adicionar Endereço
                        </button>
                    </div>
                )}

                {/* CONFIGURAÇÕES */}
                {activeTab === "config" && (
                    <div className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold mb-4">Configurações</h2>
                        <div className="flex flex-col md:flex-row gap-4">
                            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                                Alterar Senha
                            </button>
                            <button className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition">
                                Configurações de Email
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default PageUsuario;