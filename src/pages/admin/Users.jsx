import { FaEnvelope, FaFilter, FaUserPlus, FaUsers } from "react-icons/fa";

const users = [
  { id: 1, name: "Lucas Silva", email: "lucas@email.com", orders: 7, spent: "R$ 1.420,00", status: "Ativo" },
  { id: 2, name: "Marina Costa", email: "marina@email.com", orders: 2, spent: "R$ 389,00", status: "Ativo" },
  { id: 3, name: "Pedro Santos", email: "pedro@email.com", orders: 0, spent: "R$ 0,00", status: "Inativo" },
  { id: 4, name: "Ana Lima", email: "ana@email.com", orders: 3, spent: "R$ 640,00", status: "Ativo" },
];

const Users = () => {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
          <h1 className="text-2xl font-bold md:text-3xl">Usuarios</h1>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:border-[var(--bgButton)]">
            <FaFilter />
            Filtrar
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
            <FaUserPlus />
            Novo usuario
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Clientes cadastrados</p>
          <p className="mt-2 text-2xl font-bold">1.294</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Ativos no mes</p>
          <p className="mt-2 text-2xl font-bold">382</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Novos hoje</p>
          <p className="mt-2 text-2xl font-bold">19</p>
        </article>
      </div>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <h2 className="mb-4 text-lg font-semibold">Lista de usuarios</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="text-[var(--textColor)]">
              <tr className="border-b border-white/10">
                <th className="px-2 py-2 font-medium">Nome</th>
                <th className="px-2 py-2 font-medium">Email</th>
                <th className="px-2 py-2 font-medium">Pedidos</th>
                <th className="px-2 py-2 font-medium">Total gasto</th>
                <th className="px-2 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-white/5 last:border-b-0">
                  <td className="px-2 py-3 font-medium">{user.name}</td>
                  <td className="px-2 py-3 text-[var(--textColor)]">{user.email}</td>
                  <td className="px-2 py-3">{user.orders}</td>
                  <td className="px-2 py-3">{user.spent}</td>
                  <td className="px-2 py-3">
                    <span className={`rounded-md px-2 py-1 text-xs ${user.status === "Ativo" ? "bg-emerald-500/15 text-emerald-300" : "bg-zinc-500/15 text-zinc-300"}`}>
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <a href="/admin/coupons" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
          Criar cupom para base de clientes
          <FaEnvelope className="text-[var(--bgButton)]" />
        </a>
        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--textColor)]">
          <FaUsers />
          Segmentacao por comportamento pode ser adicionada aqui.
        </div>
      </article>
    </section>
  );
};

export default Users;
