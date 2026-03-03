import { useState } from "react";
import { AXIOS } from "../services";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            setLoading(true);
            await AXIOS.post("/forgot-password", { email });
            setSuccess("Email de recuperação enviado com sucesso!");
        } catch (err) {
            setError(err.response?.data?.message || "Erro ao enviar email de recuperação. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-800 flex flex-col">
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                        Mudar minha senha
                    </h2>

                    <p className="text-base text-gray-600 mb-6 text-center">
                        Informe seu email e enviaremos um link para redefinir sua senha.
                    </p>

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
                            type="email"
                            placeholder="Seu email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full rounded-lg bg-purple-600 py-2.5 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed">
                            {loading ? "Enviando..." : "Enviar link de recuperação"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-600">
                        lembrou a senha?{""}
                        <a href="/login"
                            className="text-indigo-600 hover:underline font-medium">
                            Volta para login
                        </a>
                    </p>
                </div>
            </main>
        </div>
    )
}