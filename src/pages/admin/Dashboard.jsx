import { FaArrowUp, FaBoxOpen, FaLayerGroup, FaTags, FaUsers } from "react-icons/fa";

const kpis = [
  { id: "sales", title: "Vendas do dia", value: "R$ 3.420,00", delta: "+12%", icon: FaArrowUp },
  { id: "orders", title: "Pedidos", value: "47", delta: "+8%", icon: FaBoxOpen },
  { id: "products", title: "Produtos ativos", value: "128", delta: "+3%", icon: FaLayerGroup },
  { id: "users", title: "Novos clientes", value: "19", delta: "+5%", icon: FaUsers },
  { id: "categories", title: "Categorias", value: "24", delta: "+2%", icon: FaTags },
];

const latestOrders = [
  { id: "#3021", customer: "Lucas Silva", total: "R$ 289,90", status: "Pago" },
  { id: "#3020", customer: "Marina Costa", total: "R$ 119,00", status: "Pendente" },
  { id: "#3019", customer: "Rafael Souza", total: "R$ 459,40", status: "Pago" },
  { id: "#3018", customer: "Ana Lima", total: "R$ 89,90", status: "Enviado" },
];

const statusColor = {
  Pago: "bg-emerald-500/15 text-emerald-300",
  Pendente: "bg-amber-500/15 text-amber-300",
  Enviado: "bg-sky-500/15 text-sky-300",
};

const Dashboard = () => {
  return (
    <section className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
          <h1 className="text-2xl font-bold md:text-3xl">Dashboard</h1>
        </div>
        <button
          aria-label="Gerar relatório"
          className="w-fit rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]"
        >
          Gerar relatório
        </button>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
              <p className={`mt-2 text-xs ${deltaColor}`}>{item.delta} vs ontem</p>
            </article>
          );
        })}
      </div>

      {/* Recent Orders & Quick Actions */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Recent Orders */}
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Pedidos recentes</h2>
            <a
              className="text-sm text-[var(--bgButton)] hover:text-[var(--bgHover)]"
              href="/admin/orders"
            >
              Ver todos
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead className="text-[var(--textColor)]">
                <tr className="border-b border-white/10">
                  <th scope="col" className="px-2 py-2 font-medium">Pedido</th>
                  <th scope="col" className="px-2 py-2 font-medium">Cliente</th>
                  <th scope="col" className="px-2 py-2 font-medium">Total</th>
                  <th scope="col" className="px-2 py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 last:border-b-0">
                    <td className="px-2 py-3 font-medium">{order.id}</td>
                    <td className="px-2 py-3 text-[var(--textColor)]">{order.customer}</td>
                    <td className="px-2 py-3">{order.total}</td>
                    <td className="px-2 py-3">
                      <span
                        className={`rounded-md px-2 py-1 text-xs ${statusColor[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        {/* Quick Actions */}
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <h2 className="mb-4 text-lg font-semibold">Ações rápidas</h2>
          <div className="space-y-3">
            <a
              href="/admin/products"
              className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5"
            >
              <span className="text-sm">Gerenciar produtos</span>
              <FaLayerGroup className="text-[var(--bgButton)]" />
            </a>
            <a
              href="/admin/categories"
              className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5"
            >
              <span className="text-sm">Editar categorias</span>
              <FaTags className="text-[var(--bgButton)]" />
            </a>
            <a
              href="/admin/users"
              className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5"
            >
              <span className="text-sm">Ver clientes</span>
              <FaUsers className="text-[var(--bgButton)]" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;