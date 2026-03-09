import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { AXIOS } from "../../../services";
import { useCart } from "../../../contexts/CartProvider";

const CouponsBar = () => {

    const { isOpenCoupon, closeCoupon } = useCart();

    const [form, setForm] = useState({
        nome: "",
        quantidade: "",
        validade: "",
        valor_desc: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            setLoading(true);

            const response = await AXIOS.post('/api/coupons',{
                nome: form.nome,
                quantidade: Number(form.quantidade),
                validade: form.validade,
                valor_desc: Number(form.valor_desc)
            },
            {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            }
        );
            console.log(response.data)
            setSuccess("Cupom criado com sucesso!");
            setForm({
                nome: "",
                quantidade: "",
                validade: "",
                valor_desc: ""
            });

        } catch (err) {
            setError(err.response?.data?.message || "Erro ao criar cupom");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeCoupon}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${
                    isOpenCoupon ? "opacity-100 visible" : "opacity-0 invisible"
                }`}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
                    isOpenCoupon ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="h-full overflow-y-auto p-6 text-black">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Criar Cupom
                        </h2>

                        <button
                            onClick={closeCoupon}
                            className="text-gray-500 hover:text-black"
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
                            {error}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 rounded-lg bg-green-100 text-green-700 px-4 py-2 text-sm">
                            {success}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Nome */}
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome do cupom (ex: BLACK10)"
                            required
                            value={form.nome}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        />

                        {/* Quantidade */}
                        <input
                            type="number"
                            name="quantidade"
                            placeholder="Quantidade disponível"
                            required
                            value={form.quantidade}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        />

                        {/* Validade */}
                        <input
                            type="date"
                            name="validade"
                            required
                            value={form.validade}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        />

                        {/* Valor desconto */}
                        <input
                            type="number"
                            name="valor_desc"
                            placeholder="Valor de desconto (ex: 20)"
                            required
                            value={form.valor_desc}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 py-2.5 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Criando cupom..." : "Criar Cupom"}
                        </button>

                    </form>
                </div>
            </aside>
        </>
    );
};

export default CouponsBar;