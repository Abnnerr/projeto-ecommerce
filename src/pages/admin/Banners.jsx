import { FaEye, FaImage, FaLink, FaPlus, FaToggleOn } from "react-icons/fa";

const summary = [
  { id: "ativos", label: "Banners ativos", value: "12", icon: FaImage },
  { id: "cliques", label: "Cliques hoje", value: "348", icon: FaEye },
  { id: "ctr", label: "CTR medio", value: "3.7%", icon: FaToggleOn },
];

const banners = [
  { id: 1, name: "Colecao Inverno", position: "Home - Topo", period: "01/03 a 31/03", status: "Ativo" },
  { id: 2, name: "Frete Gratis", position: "Home - Meio", period: "05/03 a 20/03", status: "Ativo" },
  { id: 3, name: "Cupom Primeira Compra", position: "Categoria", period: "10/03 a 30/03", status: "Pausado" },
];

const Banners = () => {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
          <h1 className="text-2xl font-bold md:text-3xl">Banners</h1>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
          <FaPlus />
          Novo banner
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summary.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.id} className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-[var(--textColor)]">{item.label}</p>
                <Icon className="text-[var(--bgButton)]" />
              </div>
              <p className="text-2xl font-bold">{item.value}</p>
            </article>
          );
        })}
      </div>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <h2 className="mb-4 text-lg font-semibold">Lista de banners</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-[var(--textColor)]">
              <tr className="border-b border-white/10">
                <th className="px-2 py-2 font-medium">Nome</th>
                <th className="px-2 py-2 font-medium">Posicao</th>
                <th className="px-2 py-2 font-medium">Periodo</th>
                <th className="px-2 py-2 font-medium">Status</th>
                <th className="px-2 py-2 font-medium">Acao</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner.id} className="border-b border-white/5 last:border-b-0">
                  <td className="px-2 py-3 font-medium">{banner.name}</td>
                  <td className="px-2 py-3 text-[var(--textColor)]">{banner.position}</td>
                  <td className="px-2 py-3">{banner.period}</td>
                  <td className="px-2 py-3">
                    <span className={`rounded-md px-2 py-1 text-xs ${banner.status === "Ativo" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
                      {banner.status}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <button className="rounded-md border border-white/10 px-2 py-1 text-xs transition hover:border-[var(--bgButton)]">
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <h2 className="mb-3 text-lg font-semibold">Links rapidos</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a href="/admin/products" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
            Produtos vinculados
            <FaLink className="text-[var(--bgButton)]" />
          </a>
          <a href="/admin/coupons" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
            Campanhas com cupom
            <FaLink className="text-[var(--bgButton)]" />
          </a>
        </div>
      </article>
    </section>
  );
};

export default Banners;
