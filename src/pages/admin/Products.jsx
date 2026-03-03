import { FaBoxOpen, FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const products = [
  { id: 1, name: "Tenis Street Black", category: "Tenis", stock: 23, price: "R$ 299,90", status: "Ativo" },
  { id: 2, name: "Moletom Urban Gray", category: "Moletons", stock: 8, price: "R$ 199,90", status: "Baixo estoque" },
  { id: 3, name: "Camiseta Basic White", category: "Camisetas", stock: 42, price: "R$ 79,90", status: "Ativo" },
  { id: 4, name: "BonE Classic", category: "Acessorios", stock: 0, price: "R$ 59,90", status: "Sem estoque" },
];

const Products = () => {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
          <h1 className="text-2xl font-bold md:text-3xl">Produtos</h1>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
          <FaPlus />
          Novo produto
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Produtos ativos</p>
          <p className="mt-2 text-2xl font-bold">128</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Baixo estoque</p>
          <p className="mt-2 text-2xl font-bold">11</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Sem estoque</p>
          <p className="mt-2 text-2xl font-bold">4</p>
        </article>
      </div>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <h2 className="mb-4 text-lg font-semibold">Catalogo</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-[var(--textColor)]">
              <tr className="border-b border-white/10">
                <th className="px-2 py-2 font-medium">Produto</th>
                <th className="px-2 py-2 font-medium">Categoria</th>
                <th className="px-2 py-2 font-medium">Estoque</th>
                <th className="px-2 py-2 font-medium">Preco</th>
                <th className="px-2 py-2 font-medium">Status</th>
                <th className="px-2 py-2 font-medium">Acoes</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-white/5 last:border-b-0">
                  <td className="px-2 py-3 font-medium">{product.name}</td>
                  <td className="px-2 py-3 text-[var(--textColor)]">{product.category}</td>
                  <td className="px-2 py-3">{product.stock}</td>
                  <td className="px-2 py-3">{product.price}</td>
                  <td className="px-2 py-3">
                    <span className={`rounded-md px-2 py-1 text-xs ${product.status === "Ativo" ? "bg-emerald-500/15 text-emerald-300" : product.status === "Baixo estoque" ? "bg-amber-500/15 text-amber-300" : "bg-red-500/15 text-red-300"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <button className="rounded-md border border-white/10 p-2 transition hover:border-[var(--bgButton)]">
                        <FaEdit />
                      </button>
                      <button className="rounded-md border border-white/10 p-2 transition hover:border-red-400 hover:text-red-300">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <a href="/admin/categories" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
          Ajustar categorias do catalogo
          <FaBoxOpen className="text-[var(--bgButton)]" />
        </a>
      </article>
    </section>
  );
};

export default Products;
