import { useEffect, useState } from "react";
import { FaPercent, FaPlus, FaTicketAlt } from "react-icons/fa";
import { AXIOS } from "../../../services";
import { useCart } from "../../../contexts/CartProvider";
import { BiTrash, BiTrashAlt } from "react-icons/bi";
import { Link } from "react-router";

const PageCoupon = () => {
    const [coupons, setCoupons] = useState([]);
    const { openCoupon } = useCart()

    useEffect(() => {
        async function buscarCupons() {
            try {
                const response = await AXIOS.get("/api/coupons");
                setCoupons(response.data);
                console.log(response.data);
            } catch (err) {
                console.log(err);
            }
        }
        buscarCupons();
    }, []);

    // =========================
    // Dados calculados
    // =========================
    async function apagarCoupon(id) {
        try {
            const response = await AXIOS.delete(`/api/coupons/${id}`)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const cuponsAtivos = coupons.filter((coupon) => {
        const hoje = new Date();
        return new Date(coupon.validade) >= hoje;
    });

    const descontoMedio =
        coupons.length > 0
            ? (
                coupons.reduce((acc, c) => acc + Number(c.valor_desc), 0) /
                coupons.length
            ).toFixed(1)
            : 0;

    return (
        <section className="space-y-6">
            <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm text-[var(--textColor)]">
                        Painel administrativo
                    </p>
                    <h1 className="text-2xl font-bold md:text-3xl">
                        Cupons
                    </h1>
                </div>

                <button onClick={openCoupon} className="flex w-fit items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
                    <FaPlus />
                    Novo cupom
                </button>
            </header>

            {/* CARDS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">
                        Cupons ativos
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {cuponsAtivos.length}
                    </p>
                </article>

                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">
                        Total disponível
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {coupons.reduce((acc, c) => acc + c.quantidade, 0)}
                    </p>
                </article>

                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">
                        Desconto médio
                    </p>
                    <p className="mt-2 text-2xl font-bold">
                        {descontoMedio}%
                    </p>
                </article>
            </div>

            {/* TABELA */}
            <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                <h2 className="mb-4 text-lg font-semibold">
                    Lista de cupons
                </h2>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[700px] text-left text-sm">
                        <thead className="text-[var(--textColor)]">
                            <tr className="border-b border-white/10">
                                <th className="px-2 py-2 font-medium">Código</th>
                                <th className="px-2 py-2 font-medium">Desconto</th>
                                <th className="px-2 py-2 font-medium">Quantidade</th>
                                <th className="px-2 py-2 font-medium">Validade</th>
                                <th className="px-2 py-2 font-medium">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {coupons.map((coupon) => {
                                const expirado =
                                    new Date(coupon.validade) < new Date();

                                return (
                                    <tr
                                        key={coupon.id}
                                        className="border-b border-white/5 last:border-b-0"
                                    >
                                        <td className="px-2 py-3 font-semibold">
                                            {coupon.nome}
                                        </td>

                                        <td className="px-2 py-3">
                                            {coupon.valor_desc}%
                                        </td>

                                        <td className="px-2 py-3">
                                            {coupon.quantidade}
                                        </td>

                                        <td className="px-2 py-3 text-[var(--textColor)]">
                                            {new Date(coupon.validade).toLocaleDateString(
                                                "pt-BR"
                                            )}
                                        </td>

                                        <td className="px-2 py-3">
                                            <span
                                                className={`rounded-md px-2 py-1 text-xs ${expirado
                                                    ? "bg-amber-500/15 text-amber-300"
                                                    : "bg-emerald-500/15 text-emerald-300"
                                                    }`}
                                            >
                                                {expirado ? "Expirado" : "Ativo"}
                                            </span>
                                        </td>
                                        <td className="px-2 py-3">
                                            <button onClick={() => apagarCoupon(coupon.id)}>
                                                <BiTrash />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </article>

            {/* LINKS */}
            <article className="grid grid-cols-1 gap-3 rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5 sm:grid-cols-2">
                <Link
                    to="/admin/banners"
                    className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5"
                >
                    Criar campanha visual
                    <FaPercent className="text-[var(--bgButton)]" />
                </Link>
            </article>
        </section>
    );
}

export default PageCoupon;