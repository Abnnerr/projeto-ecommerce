import { useEffect, useState } from "react";
import { FaLayerGroup, FaPlus, FaTag } from "react-icons/fa";
import { AXIOS } from "../../../services";
import { useCart } from "../../../contexts/CartProvider";
import { Link } from "react-router";

const PageCategories = () => {
    const { openCatego, openEditCatego, setIdCatego } = useCart()
    const { token } = JSON.parse(localStorage.getItem("user")) || {};

    const [categories, setCategories] = useState([])
    useEffect(() => {
        async function buscarCategorias() {
            try {
                const response = await AXIOS.get("/api/categories",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );
                console.log(response.data)
                setCategories(response.data);
            } catch (err) {
                console.error(err);
            }
        }
        buscarCategorias();
    }, []);

    async function apagarCategoria(id) {
        try {
            const response = await AXIOS.delete(`/api/categories/${id}`)
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }

    // Total de produtos geral
    const totalProdutos = categories.reduce(
        (acc, categoria) => acc + (categoria.produtos?.length || 0),
        0
    );

    // Categoria mais popular
    const categoriaMaisPopular = categories.reduce((prev, current) => {
        if (!prev) return current;
        return (current.produtos?.length || 0) >
            (prev.produtos?.length || 0)
            ? current
            : prev;
    }, null);

    return (
        <section className="space-y-6">

            {/* HEADER */}
            <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm text-[var(--textColor)]">
                        Painel administrativo
                    </p>
                    <h1 className="text-2xl font-bold md:text-3xl">
                        Categorias
                    </h1>
                </div>

                <button onClick={openCatego} className="flex w-fit items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
                    <FaPlus />
                    Nova categoria
                </button>
            </header>

            {/* CARDS SUPERIORES */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">
                        Total de categorias
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {categories.length}
                    </p>
                </article>

                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">
                        Total de produtos
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {totalProdutos}
                    </p>
                </article>

                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">
                        Categoria mais popular
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {categoriaMaisPopular?.nome || "-"}
                    </p>
                </article>

            </div>

            {/* LISTA DE CATEGORIAS */}
            <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                <h2 className="mb-4 text-lg font-semibold">
                    Lista de categorias
                </h2>

                <div className="space-y-3">
                    {categories.map((categoria) => (
                        <div
                            key={categoria.id}
                            className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3"
                        >
                            <div>
                                <p className="font-semibold">
                                    {categoria.nome}
                                </p>
                                <p className="text-sm text-[var(--textColor)]">
                                    ID: {categoria.id}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="rounded-md bg-white/5 px-3 py-1 text-xs">
                                    {categoria.produtos?.length || 0} produtos
                                </span>

                                <button onClick={() => { openEditCatego(), setIdCatego(categoria.id) }} className="rounded-md border border-white/10 px-3 py-1 text-xs transition hover:border-[var(--bgButton)]">
                                    Editar
                                </button>
                                <button onClick={() => apagarCategoria(categoria.id)} className="rounded-md border border-white/10 px-3 py-1 text-xs transition hover:border-[var(--bgButton)]">
                                    Apagar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </article>

            {/* LINKS RÁPIDOS */}
            <article className="grid grid-cols-1 gap-3 rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5 sm:grid-cols-2">
                <Link
                    to="/admin/products"
                    className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5"
                >
                    Gerenciar produtos
                    <FaLayerGroup className="text-[var(--bgButton)]" />
                </Link>

                <Link
                    to="/admin/banners"
                    className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5"
                >
                    Atualizar banners por categoria
                    <FaTag className="text-[var(--bgButton)]" />
                </Link>
            </article>

        </section>
    );
}

export default PageCategories;