import { FaTimes } from "react-icons/fa";
import { AXIOS } from "../../../services";
import { useState } from "react";
import { useCart } from "../../../contexts/CartProvider";


const CategoriesEditBar = () => {

    const { isOpenEditCatego, closeEditCatego, idCatego } = useCart()

    console.log(idCatego);
    
    const [form, setForm] = useState({
        nome: "",
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
            await AXIOS.put(`/api/categories/${idCatego}`, form, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            });
            setSuccess("Categoria criado com sucesso!");
            setForm({
                nome: "",
            });
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao criar categoria");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={closeEditCatego}
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${isOpenEditCatego ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 text-black right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpenEditCatego ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-full overflow-y-auto p-6">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">Criar Categoria</h2>
                        <button onClick={closeEditCatego} className="text-gray-500 hover:text-black">
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

export default CategoriesEditBar;