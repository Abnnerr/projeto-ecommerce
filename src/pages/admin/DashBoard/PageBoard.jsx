import { FaArrowUp, FaBoxOpen, FaLayerGroup, FaTags, FaUsers } from "react-icons/fa";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { AXIOS } from "../../../services";

const statusColor = {
    Pago: "bg-emerald-500/15 text-emerald-300",
    Pendente: "bg-amber-500/15 text-amber-300",
    Enviado: "bg-sky-500/15 text-sky-300",
};

const PageBoard = () => {

    const [kpis, setKpis] = useState([]);
    const [latestOrders, setLatestOrders] = useState([]);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const token = sessionStorage.getItem("token");

                const { data } = await AXIOS.get("/api/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setKpis([
                    {
                        id: "sales",
                        title: "Avaliações",
                        value: data.totalAvaliacoes,
                        delta: "+0%",
                        icon: FaArrowUp
                    },
                    {
                        id: "orders",
                        title: "Pedidos",
                        value: data.totalPedidos,
                        delta: "+0%",
                        icon: FaBoxOpen
                    },
                    {
                        id: "products",
                        title: "Produtos ativos",
                        value: data.totalProdutos,
                        delta: "+0%",
                        icon: FaLayerGroup
                    },
                    {
                        id: "users",
                        title: "Clientes",
                        value: data.totalUsuarios,
                        delta: "+0%",
                        icon: FaUsers
                    },
                    {
                        id: "categories",
                        title: "Categorias",
                        value: data.totalCategorias,
                        delta: "+0%",
                        icon: FaTags
                    }
                ]);

                const pedidosFormatados = data.pedidosRecentes.map((pedido) => ({
                    id: `#${pedido.id}`,
                    customer: pedido.usuarios.nome,
                    total: `R$ ${Number(pedido.valor_total || 0).toLocaleString("pt-BR")}`,
                    status: pedido.status
                }));

                setLatestOrders(pedidosFormatados);

            } catch (error) {
                console.error("Erro ao carregar dashboard", error);
            }

        };

        fetchDashboard();

    }, []);

    return (
        <section className="space-y-6">

            {/* Header */}
            <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
                    <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
                </div>
            </header>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {kpis.map((item) => {
                    const Icon = item.icon;
                    const deltaColor = item.delta.startsWith("+") ? "text-emerald-300" : "text-red-300";

                    return (
                        <article
                            key={item.id}
                            className="rounded-2xl bg-[var(--bgCard)] p-4 md:p-6 shadow-lg ring-1 ring-white/5"
                        >
                            <div className="mb-4 flex items-start justify-between">
                                <p className="text-sm text-[var(--textColor)]">{item.title}</p>
                                <span className="rounded-lg bg-white/5 p-2">
                                    <Icon className="text-[var(--bgButton)]" />
                                </span>
                            </div>

                            <p className="text-2xl font-bold">{item.value}</p>

                            <p className={`mt-2 text-xs ${deltaColor}`}>
                                {item.delta} vs ontem
                            </p>

                        </article>
                    );
                })}
            </div>

            {/* Recent Orders */}
            <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5 lg:col-span-2">

                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Pedidos recentes</h2>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[500px] text-left text-sm">

                        <thead className="text-[var(--textColor)]">
                            <tr className="border-b border-white/10">
                                <th className="px-2 py-2 font-medium">Pedido</th>
                                <th className="px-2 py-2 font-medium">Cliente</th>
                                <th className="px-2 py-2 font-medium">Total</th>
                                <th className="px-2 py-2 font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody>

                            {latestOrders.map((order) => (
                                <tr key={order.id} className="border-b border-white/5 last:border-b-0">

                                    <td className="px-2 py-3 font-medium">{order.id}</td>

                                    <td className="px-2 py-3 text-[var(--textColor)]">
                                        {order.customer}
                                    </td>

                                    <td className="px-2 py-3">
                                        {order.total}
                                    </td>

                                    <td className="px-2 py-3">
                                        <span className={`rounded-md px-2 py-1 text-xs ${statusColor[order.status]}`}>
                                            {order.status}
                                        </span>
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>

            </article>

        </section>
    );
}

export default PageBoard;