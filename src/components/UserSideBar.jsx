import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useUser } from "../contexts/UsuarioProvider";
import { maskCPF, maskPhone } from "../utils";


const UserSideBar = () => {
    const { register, isClose, userBarOpen } = useUser();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        gender: "",
        cpf: "",
        birthDate: "",
        senha: "",
        confirmPassword: "",
    });

    console.log(form)

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

        if (form.senha !== form.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            setLoading(true);

            await register(
                form.name,
                form.email,
                form.cpf.replaceAll(".", "").replaceAll("-", ""),
                form.phone.replaceAll("(", "").replaceAll(")", "").replaceAll(" ", ""),
                form.gender,
                form.birthDate,
                form.senha
            );

            setSuccess("Conta criada com sucesso!");

            setForm({
                name: "",
                email: "",
                phone: "",
                gender: "",
                cpf: "",
                birthDate: "",
                senha: "",
                confirmPassword: "",
            });

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Erro ao criar conta."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Overlay */}
            <div
                onClick={isClose}
                className={`fixed  inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-40 ${userBarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 text-black right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${userBarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="h-full overflow-y-auto p-6">

                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-gray-800">
                            Criar conta
                        </h2>
                        <button
                            onClick={isClose}
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
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome completo"
                            required
                            value={form.name}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />


                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="tel"
                            name="phone"
                            placeholder="Telefone (DDD + número)"
                            value={form.phone}
                            onChange={(e) => setForm({ ...form, phone: maskPhone(e.target.value) })
                            }
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <select
                            name="gender"
                            required
                            value={form.gender}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        >
                            <option value="">Selecione o gênero</option>
                            <option value="male">Masculino</option>
                            <option value="female">Feminino</option>
                            <option value="other">Outro</option>
                            <option value="prefer_not_say">Prefiro não informar</option>
                        </select>

                        <input
                            type="text"
                            name="cpf"
                            placeholder="CPF"
                            value={form.cpf}
                            onChange={(e) =>
                                setForm({ ...form, cpf: maskCPF(e.target.value) })}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="date"
                            name="birthDate"
                            required
                            value={form.birthDate}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />

                        <input
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            required
                            value={form.senha}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirmar senha"
                            required
                            value={form.confirmPassword}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 py-2.5 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Criando conta..." : "Criar conta"}
                        </button>

                    </form>
                </div>
            </aside>
        </>
    );
};

export default UserSideBar;