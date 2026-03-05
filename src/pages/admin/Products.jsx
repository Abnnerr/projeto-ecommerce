import { useEffect, useState } from "react";
import { AXIOS } from "../../services";
import { FaPlus, FaEdit, FaTrash, FaBoxOpen } from "react-icons/fa";
import { useCart } from "../../contexts/CartProvider";

const Products = () => {
  const [products, setProducts] = useState([]);
  const { openProduct, openEdit, setId } = useCart()

  console.log(products);


  useEffect(() => {
    async function buscarProdutos() {
      try {
        const response = await AXIOS.get("/api/products");
        console.log(response.data)
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    buscarProdutos();
  }, []);

  async function apagarProduto(id) {
    try {
      const response = await AXIOS.delete(`/api/products/${id}`)
      console.log(response.data);

    } catch (err) {
      console.log(err)
    }
  }
  const formatPrice = (valor, desconto) => {
    let final = Number(valor);
    if (desconto) {
      final = final - (final * Number(desconto)) / 100;
    }
    return `R$ ${final.toFixed(2)}`;
  };

  const getStatus = (estoque) => {
    if (estoque === 0) return "Sem estoque";
    if (estoque < 10) return "Baixo estoque";
    return "Ativo";
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
          <h1 className="text-2xl font-bold md:text-3xl">Produtos</h1>
        </div>
        <button onClick={openProduct} className="flex w-fit items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
          <FaPlus /> Novo produto
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Produtos ativos</p>
          <p className="mt-2 text-2xl font-bold">{products.filter(p => p.estoque).length}</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Baixo estoque</p>
          <p className="mt-2 text-2xl font-bold">{products.filter(p => p.estoque > 0 && p.estoque <= 5).length}</p>
        </article>
        <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
          <p className="text-sm text-[var(--textColor)]">Sem estoque</p>
          <p className="mt-2 text-2xl font-bold">{products.filter(p => p.estoque === 0).length}</p>
        </article>
      </div>

      <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
        <h2 className="mb-4 text-lg font-semibold">Catálogo</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-sm">
            <thead className="text-[var(--textColor)]">
              <tr className="border-b border-white/10">
                <th className="px-2 py-2 font-medium">Produto</th>
                <th className="px-2 py-2 font-medium">Categoria</th>
                <th className="px-2 py-2 font-medium">Estoque</th>
                <th className="px-2 py-2 font-medium">Preço</th>
                <th className="px-2 py-2 font-medium">Status</th>
                <th className="px-2 py-2 font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-white/5 last:border-b-0">
                  <td className="px-2 py-3 font-medium">{product.id}</td>
                  <td className="px-2 py-3 font-medium">{product.categoria.nome}</td>
                  <td className="px-2 py-3 text-[var(--textColor)]">{product.estoque || "-"}</td>
                  <td className="px-2 py-3">{formatPrice(product.valor, product.desconto)}</td>
                  <td className="px-2 py-3">
                    <span
                      className={`rounded-md px-2 py-1 text-xs ${getStatus(product.estoque) === "Ativo"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : getStatus(product.estoque) === "Baixo estoque"
                          ? "bg-amber-500/15 text-amber-300"
                          : "bg-red-500/15 text-red-300"
                        }`}
                    >
                      {getStatus(product.estoque)}
                    </span>
                  </td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => {
                        openEdit(),
                          setId(product.id)
                      }
                      } className="rounded-md border border-white/10 p-2 transition hover:border-[var(--bgButton)]">
                        <FaEdit />
                      </button>
                      <button onClick={() => apagarProduto(product.id)} className="rounded-md border border-white/10 p-2 transition hover:border-red-400 hover:text-red-300">
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
        <a
          href="/admin/categories"
          className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5"
        >
          Ajustar categorias do catálogo
          <FaBoxOpen className="text-[var(--bgButton)]" />
        </a>
      </article>
    </section>
  );
};

export default Products;