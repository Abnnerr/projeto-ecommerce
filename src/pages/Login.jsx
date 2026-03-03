import { useState } from "react";
import { useUser } from "../contexts/UsuarioProvider";
import { useNavigate } from "react-router";

export default function Login() {

    const { login } = useUser()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: "",
        senha: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // const [user, setUser] = useState()

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        try {
            setLoading(true);
            await login(form.email, form.senha)
            navigate('/')
        } catch (err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Email ou senha inválidos."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" min-h-screen  flex flex-col">
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Entrar
                    </h2>
                    {error && (
                        <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <div>
                            <input
                                type="password"
                                name="senha"
                                placeholder="Senha"
                                required
                                value={form.senha}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />

                            <div className="mt-2 text-right">
                                <a
                                    href="/forgot-password"
                                    className="text-sm text-gray-600 hover:underline">
                                    Esqueci minha senha
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 py-2.5 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Não tem uma conta?{""}
                        <a
                            href="/register"
                            className="text-indigo-600 hover:underline font-medium">
                            Criar conta
                        </a>
                    </p>
                </div>
            </main>
        </div>
    )
}
