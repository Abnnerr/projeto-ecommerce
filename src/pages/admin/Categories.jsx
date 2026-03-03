import { FaLayerGroup, FaPlus, FaTag } from "react-icons/fa";

const categories = [
  { id: 1, name: "Tenis", products: 42, slug: "tenis" },
  { id: 2, name: "Camisetas", products: 35, slug: "camisetas" },
  { id: 3, name: "Acessorios", products: 19, slug: "acessorios" },
  { id: 4, name: "Moletons", products: 14, slug: "moletons" },
];

const Categories = () => {
  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
          <h1 className="text-2xl font-bold md:text-3xl">Categorias</h1>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
          <FaPlus />
          Nova categoria
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Total de categorias</p>
          <p className="mt-2 text-2xl font-bold">{categories.length}</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Produtos categorizados</p>
          <p className="mt-2 text-2xl font-bold">110</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Mais popular</p>
          <p className="mt-2 text-2xl font-bold">Tenis</p>
        </article>
      </div>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <h2 className="mb-4 text-lg font-semibold">Lista de categorias</h2>
        <div className="space-y-3">
          {categories.map((item) => (
            <div key={item.id} className="flex flex-col gap-3 rounded-xl border border-white/10 px-4 py-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-[var(--textColor)]">Slug: {item.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-md bg-white/5 px-2 py-1 text-xs">{item.products} produtos</span>
                <button className="rounded-md border border-white/10 px-2 py-1 text-xs transition hover:border-[var(--bgButton)]">
                  Editar
                </button>
              </div>
            </div>
          ))}
        </div>
      </article>

      <article className="grid grid-cols-1 gap-3 rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5 sm:grid-cols-2">
        <a href="/admin/products" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
          Gerenciar produtos
          <FaLayerGroup className="text-[var(--bgButton)]" />
        </a>
        <a href="/admin/banners" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
          Atualizar banners por categoria
          <FaTag className="text-[var(--bgButton)]" />
        </a>
      </article>
    </section>
  );
};

export default Categories;
