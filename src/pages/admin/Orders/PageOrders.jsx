import { useEffect, useState } from "react";
import { AXIOS } from "../../../services";


const statusColors = {
    aguardando_pagamento: "bg-yellow-100 text-yellow-700",
    pago: "bg-green-100 text-green-700",
    enviado: "bg-blue-100 text-blue-700",
    cancelado: "bg-red-100 text-red-700",
};

const PageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const token = sessionStorage.getItem("token");
            const response = await AXIOS.get("/api/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            console.log(response.data);

            setOrders(response.data);
        } catch (error) {
            console.error("Erro ao buscar pedidos", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Pedidos</h1>

            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-100 text-gray-600 text-sm">
                        <tr>
                            <th className="p-4 text-left">Pedido</th>
                            <th className="p-4 text-left">Cliente</th>
                            <th className="p-4 text-left">Itens</th>
                            <th className="p-4 text-left">Total</th>
                            <th className="p-4 text-left">Status</th>
                            <th className="p-4 text-left">Data</th>
                            <th className="p-4 text-left">Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="7" className="p-6 text-center">
                                    Carregando pedidos...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="p-6 text-center">
                                    Nenhum pedido encontrado
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr
                                    key={order.id}
                                    className="border-t hover:bg-gray-50 transition text-black"
                                >
                                    <td className="p-4 font-semibold ">#{order.id}</td>

                                    <td className="p-4">
                                        {order.usuarios?.nome || "Cliente"}
                                    </td>

                                    <td className="p-4">
                                        {order.pedido_produto?.length} itens
                                    </td>

                                    <td className="p-4 font-semibold">
                                        R$ {Number(order.valor_total).toFixed(2)}
                                    </td>

                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className="p-4">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="p-4">
                                        <button
                                            onClick={() => setSelectedOrder(order)}
                                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                                        >
                                            Ver
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* MODAL DETALHES */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white w-full max-w-xl rounded-xl p-6 shadow-lg">

                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">
                                Pedido #{selectedOrder.id}
                            </h2>

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-500 hover:text-black"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-2 text-sm">

                            <p>
                                <strong>Cliente:</strong>{" "}
                                {selectedOrder.usuarios?.nome}
                            </p>

                            <p>
                                <strong>Email:</strong>{" "}
                                {selectedOrder.usuarios?.email}
                            </p>

                            <p>
                                <strong>Total:</strong>{" "}
                                R$ {Number(selectedOrder.valor_total).toFixed(2)}
                            </p>

                            <p>
                                <strong>Status:</strong>{" "}
                                {selectedOrder.status}
                            </p>

                            <p>
                                <strong>Previsão de entrega:</strong>{" "}
                                {new Date(
                                    selectedOrder.previsao_entrega
                                ).toLocaleDateString()}
                            </p>

                            {selectedOrder.cupons && (
                                <p>
                                    <strong>Cupom:</strong>{" "}
                                    {selectedOrder.cupons.codigo}
                                </p>
                            )}
                        </div>

                        <h3 className="font-bold mt-6 mb-3">Produtos</h3>

                        <div className="space-y-2 max-h-64 overflow-y-auto">
                            {selectedOrder.pedido_produto.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex justify-between border rounded p-3"
                                >
                                    <span>{item.produtos?.nome}</span>

                                    <span>
                                        R$ {Number(item.produtos?.valor).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="mt-6 w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PageOrders;