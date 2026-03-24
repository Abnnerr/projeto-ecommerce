import { useState } from "react";
import { useUser } from "../../../contexts/UsuarioProvider";
import { isValidCPF, isValidPhone, maskCPF, maskPhone } from "../../../utils";

const RegisterForm = () => {


    const { register } = useUser()

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

        if (form.phone && !isValidPhone(form.phone)) {
            console.log("Telefone inválido:", form.phone);
            setError("Telefone inválido. Use DDD + número.");
            return;
        }

        if (!isValidCPF(form.cpf)) {
            console.log("CPF inválido:", form.cpf);
            setError("CPF inválido.");
            return;
        }

        if (form.senha !== form.confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }

        try {
            setLoading(true);
            console.log(form);


            await register(
                form.name,
                form.email,
                form.cpf.replaceAll('.', '').replaceAll('-', ''),
                form.phone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', ''),
                form.gender,
                new Date(form.birthDate),
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
                "Erro em criar uma conta. Tente novamente."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-zinc-800 flex flex-col p-10">
            <main className="flex-1 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6 sm:p-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Criar conta
                    </h2>

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

                    <p className="mt-6 text-center text-sm text-gray-600">
                        Já possui uma conta?{" "}
                        <a
                            href="/login"
                            className="text-gray-600 hover:underline font-medium"
                        >
                            Entrar
                        </a>
                    </p>
                </div>
            </main>
        </div>
    );
}

export default RegisterForm;