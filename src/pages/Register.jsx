import { useState } from "react";
import { useUser } from "../contexts/UsuarioProvider";

export default function Register() {
  const { register } = useUser();

  const [form, setForm] = useState({
    nome: "",
    genero: "",
    cpf: "",
    email: "",
    telefone: "",
    data_nasc: "", // YYYY-MM-DD
    senha: "",
    confirmSenha: "",
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

    if (form.senha !== form.confirmSenha) {
      setError("As senhas não coincidem.");
      return;
    }

    try {
      setLoading(true);

      await register(
        form.nome,
        form.email,
        form.cpf,
        form.telefone ,
        form.genero,
        form.data_nasc,
        form.senha
      );

      setSuccess("Conta criada com sucesso!");

      // Resetar formulário

      console.log(form)
    //   setForm({
    //     nome: "",
    //     genero: "",
    //     cpf: "",
    //     email: "",
    //     telefone: "",
    //     data_nasc: "",
    //     senha: "",
    //     confirmSenha: "",
    //   });
    } catch (err) {
      setError(
        err.response?.data?.message || "Erro ao criar a conta. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
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
              name="nome"
              placeholder="Nome completo"
              required
              value={form.nome}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <input
              type="text"
              name="genero"
              placeholder="Gênero"
              required
              value={form.genero}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <input
              type="text"
              name="cpf"
              placeholder="CPF"
              required
              value={form.cpf}
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
              type="text"
              name="telefone"
              placeholder="Telefone"
              required
              value={form.telefone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

            <input
              type="date"
              name="data_nasc"
              placeholder="Data de Nascimento"
              required
              value={form.data_nasc}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />

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
              name="confirmSenha"
              placeholder="Confirmar senha"
              required
              value={form.confirmSenha}
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
              className="text-indigo-600 hover:underline font-medium"
            >
              Entrar
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}