import { FaPercent, FaPlus, FaTicketAlt } from "react-icons/fa";

const coupons = [
  { id: 1, code: "BEMVINDO10", discount: "10%", uses: 128, expires: "31/03/2026", status: "Ativo" },
  { id: 2, code: "FRETEGRATIS", discount: "Frete", uses: 67, expires: "20/03/2026", status: "Ativo" },
  { id: 3, code: "OUTLET20", discount: "20%", uses: 210, expires: "10/03/2026", status: "Expirando" },
];

const Coupons = () => {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
          <h1 className="text-2xl font-bold md:text-3xl">Cupons</h1>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
          <FaPlus />
          Novo cupom
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Cupons ativos</p>
          <p className="mt-2 text-2xl font-bold">8</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Uso no mes</p>
          <p className="mt-2 text-2xl font-bold">405</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Desconto medio</p>
          <p className="mt-2 text-2xl font-bold">12%</p>
        </article>
      </div>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <h2 className="mb-4 text-lg font-semibold">Lista de cupons</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left text-sm">
            <thead className="text-[var(--textColor)]">
              <tr className="border-b border-white/10">
                <th className="px-2 py-2 font-medium">Codigo</th>
                <th className="px-2 py-2 font-medium">Desconto</th>
                <th className="px-2 py-2 font-medium">Usos</th>
                <th className="px-2 py-2 font-medium">Validade</th>
                <th className="px-2 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b border-white/5 last:border-b-0">
                  <td className="px-2 py-3 font-semibold">{coupon.code}</td>
                  <td className="px-2 py-3">{coupon.discount}</td>
                  <td className="px-2 py-3">{coupon.uses}</td>
                  <td className="px-2 py-3 text-[var(--textColor)]">{coupon.expires}</td>
                  <td className="px-2 py-3">
                    <span className={`rounded-md px-2 py-1 text-xs ${coupon.status === "Ativo" ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"}`}>
                      {coupon.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="grid grid-cols-1 gap-3 rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5 sm:grid-cols-2">
        <a href="/admin/products" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
          Aplicar em produtos
          <FaTicketAlt className="text-[var(--bgButton)]" />
        </a>
        <a href="/admin/banners" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
          Criar campanha visual
          <FaPercent className="text-[var(--bgButton)]" />
        </a>
      </article>
    </section>
  );
};

export default Coupons;
