import { useEffect, useState } from "react";
import { AXIOS } from "../../../services";

import { FaTimes } from "react-icons/fa";
import { useCart } from "../../../contexts/CartProvider";

const ProductPutBar = () => {

    const { isOpenEdit, closeEdit, id } = useCart()
    const [categorias, setCategorias] = useState([]);
    const [form, setForm] = useState({
        nome: "",
        valor: "",
        descricao: "",
        desconto: 0,
        estoque: 0,
        categoria_id: "",
        tamanhos: "[]",
        cores: "[]",
        altura: "",
        largura: "",
        comprimento: "",
        peso: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        if (!isOpenEdit) return;
        async function fetchCategorias() {
            try {
                const response = await AXIOS.get("/api/categories");
                setCategorias(response.data);
            } catch (err) {
                console.error("Erro ao buscar categorias:", err);
            }
        }
        fetchCategorias();
    }, [isOpenEdit]);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            setLoading(true);
            await AXIOS.put(`/api/products/${id}`, form);
            setSuccess("Produto criado com sucesso!");
            setForm({
                nome: "",
                valor: "",
                descricao: "",
                desconto: 0,
                estoque: 0,
                categoria_id: "",
                tamanhos: "[]",
                cores: "[]",
                altura: "",
                largura: "",
                comprimento: "",
                peso: "",
            });
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao Editar produto");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeEdit}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${isOpenEdit ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 text-black right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpenEdit ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-full overflow-y-auto p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Editar Produto</h2>
                        <button onClick={closeEdit} className="text-gray-500 hover:text-black">
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
                        <input
                            type="text"
                            name="nome"
                            placeholder="Nome do produto"
                            required
                            value={form.nome}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="text"
                            name="valor"
                            placeholder="Valor"
                            required
                            value={form.valor}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <textarea
                            name="descricao"
                            placeholder="Descrição"
                            value={form.descricao}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="number"
                            name="desconto"
                            placeholder="Desconto (%)"
                            value={form.desconto}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="number"
                            name="estoque"
                            placeholder="Estoque"
                            value={form.estoque}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <select
                            name="categoria_id"
                            required
                            value={form.categoria_id}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        >
                            <option value="">Selecione a categoria</option>
                            {categorias.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.nome}
                                </option>
                            ))}
                        </select>

                        <input
                            type="text"
                            name="tamanhos"
                            placeholder='Tamanhos (ex: ["único"])'
                            value={form.tamanhos}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="text"
                            name="cores"
                            placeholder='Cores (ex: ["multicolorido"])'
                            value={form.cores}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="text"
                            name="altura"
                            placeholder="Altura"
                            value={form.altura}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="text"
                            name="largura"
                            placeholder="Largura"
                            value={form.largura}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="text"
                            name="comprimento"
                            placeholder="Comprimento"
                            value={form.comprimento}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="text"
                            name="peso"
                            placeholder="Peso"
                            value={form.peso}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 py-2.5 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Criando produto..." : "Criar Produto"}
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
};

export default ProductPutBar;