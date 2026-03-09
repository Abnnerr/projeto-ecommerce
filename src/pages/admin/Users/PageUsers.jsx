import { useEffect, useState } from "react";
import { FaEnvelope, FaFilter, FaUserPlus, FaUsers } from "react-icons/fa";
import { AXIOS } from "../../../services";
import { useUser } from "../../../contexts/UsuarioProvider";
import { BiTrash } from "react-icons/bi";
import { Link } from "react-router";

const PageUsers = () => {
    const { isOpen } = useUser()
    const [users, setUsers] = useState([])

    useEffect(() => {
        let intervalId;

        async function buscarUsuarios() {
            try {
                const response = await AXIOS.get("/api/users");
                console.log(response.data)
                setUsers(response.data);
            } catch (err) {
                console.log(err);
            }
        }

        // Chamada inicial
        buscarUsuarios();

        // Cria polling a cada 30 segundos
        intervalId = setInterval(() => {
            buscarUsuarios();
        }, 5000); // 30000 ms = 30 segundos

        // Limpeza ao desmontar componente
        return () => clearInterval(intervalId);
    }, [])

    async function deleteUser(id) {
        try {
            const response = await AXIOS.delete(`/api/users/${id}`)
            console.log(response.data);


        } catch (err) {
            console.log(err)
        }
    }
    return (
        <section className="space-y-6">
            <header className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm text-[var(--textColor)]">Painel administrativo</p>
                    <h1 className="text-2xl font-bold md:text-3xl">Usuarios</h1>
                </div>
                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-semibold transition hover:border-[var(--bgButton)]">
                        <FaFilter />
                        Filtrar
                    </button>
                    <button onClick={isOpen} className="flex items-center gap-2 rounded-lg bg-[var(--bgButton)] px-4 py-2 text-sm font-semibold transition hover:bg-[var(--bgHover)]">
                        <FaUserPlus />
                        Novo usuario
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">Clientes cadastrados</p>
                    <p className="mt-2 text-2xl font-bold">{users.length}</p>
                </article>
                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">Ativos no mes</p>
                    <p className="mt-2 text-2xl font-bold">382</p>
                </article>
                <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                    <p className="text-sm text-[var(--textColor)]">Novos hoje</p>
                    <p className="mt-2 text-2xl font-bold">19</p>
                </article>
            </div>

            <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                <h2 className="mb-4 text-lg font-semibold">Lista de usuarios</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] text-left text-sm">
                        <thead className="text-[var(--textColor)]">
                            <tr className="border-b border-white/10">
                                <th className="px-2 py-2 font-medium">Nome</th>
                                <th className="px-2 py-2 font-medium">Email</th>
                                <th className="px-2 py-2 font-medium">Pedidos</th>
                                <th className="px-2 py-2 font-medium">Total gasto</th>
                                <th className="px-2 py-2 font-medium">Status</th>
                                <th className="px-2 py-2 font-medium">Nivel</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((users) => (
                                <tr key={users.id} className="border-b border-white/5 last:border-b-0">
                                    <td className="px-2 py-3 font-medium">{users.nome}</td>
                                    <td className="px-2 py-3 text-[var(--textColor)]">{users.email}</td>
                                    <td className="px-2 py-3">{users.pedidos.length}</td>
                                    <td className="px-2 py-3">{users.pedidos.reduce((acc, pedido) => acc + Number(pedido.valor_total), 0)}</td>
                                    <td className="px-2 py-3">
                                        <span className={`rounded-md px-2 py-1 text-xs ${users.emailVerificado ? "bg-emerald-500/15 text-emerald-300" : "bg-zinc-500/15 text-zinc-300"}`}>
                                            {users.emailVerificado ? 'ativo' : 'inativo'}
                                        </span>
                                    </td>
                                    <td className="px-2 py-3">{users.nivel}</td>
                                    <td className="px-2 py-3">
                                        <button onClick={() => deleteUser(users.id)}>
                                            <BiTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </article>

            <article className="rounded-2xl bg-[var(--bgCard)] p-4 shadow-lg ring-1 ring-white/5">
                <Link to="/admin/coupons" className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-3 transition hover:border-[var(--bgButton)] hover:bg-white/5">
                    Criar cupom para base de clientes
                    <FaEnvelope className="text-[var(--bgButton)]" />
                </Link>
                <div className="mt-3 flex items-center gap-2 text-sm text-[var(--textColor)]">
                    <FaUsers />
                    Segmentacao por comportamento pode ser adicionada aqui.
                </div>
            </article>
        </section>
    );
}

export default PageUsers;