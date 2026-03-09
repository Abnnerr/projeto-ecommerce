import { useState } from "react";
import { AXIOS } from "../../../services";
import { useNavigate, useSearchParams } from "react-router";

const FormReset = () => {
    const [seachParams] = useSearchParams();
    const navigate = useNavigate();
    const token = seachParams.get("token");

    const [senha, setSenha] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (senha !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }
        try {
            setLoading(true);
            await AXIOS.post("/api/auth/reset-password", {
                token,
                senha,
            });

            setSuccess("Senha alterada com sucesso! Redirecionando para o login...");

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            setError(
                err.response?.data?.message || "Erro ao alterar a senha. Tente novamente."
            );
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="min-h-screen bg-zinc-800 flex flex-col">

            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
                    <h1 className="text-2xl font-mono text-gray-800 mb-4 text-center">
                        Redefinir senha
                    </h1>

                    {!token && (
                        <p className="mt-4 text-center text-sm text-red-500">
                            Token inválido ou expirado
                        </p>
                    )}


                    {token && (

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Nova senha"
                                required
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />

                            <input
                                type="password"
                                placeholder="Confirmar nova senha"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            />

                            <button
                                type="submit"
                                disabled={loading || !token}
                                className="w-full rounded-lg bg-purple-600 py-2.5 text-white font-medium hover:bg-purple-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
                            >

                                {loading ? "Salvando..." : "Alterar senha"}
                            </button>
                        </form>
                    )}

                    {error && (
                        <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-2 text-sm">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="mb-4 rounded-lg bg-gree-100 text-green-700 px-4 py-2 text-sm">
                            {success}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}

export default FormReset;