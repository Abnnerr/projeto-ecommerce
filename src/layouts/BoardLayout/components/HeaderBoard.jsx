import { FaUser } from "react-icons/fa";
import { useUser } from "../../../contexts/UsuarioProvider";

const HeaderBoard = () => {
    const { user } = useUser()
    return (
        <header className="bg-zinc-900 shadow-sm rounded-2xl flex items-end ">
            <div className=" px-4 py-4 flex items-end rounded">
                {
                    user ? (
                        <div className="flex items-center justify-center gap-4">
                            <a href={`/orders`}>
                                {
                                    user.imagem ? (
                                        <img src={user.imagem} alt="" />
                                    ) : (
                                        <div className="px-2.5 py-2 *:font-bold *:text-xl rounded-full bg-gray-600 flex  justify-center gap-1">
                                            <span> {user.nome[0].toUpperCase()}</span>
                                            <span> {user.nome[1].toUpperCase()}</span>
                                        </div>
                                    )
                                }
                            </a>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <FaUser className="text-[#B3B3B3]" />

                            <div className="text-xs leading-tight">

                                <span className="block text-[#808080]">
                                    Conta
                                </span>

                                <a href="/login" className="text-sm font-medium text-[#EAEAEA]">
                                    Entrar
                                </a>

                            </div>
                        </div>

                    )
                }
            </div>
        </header>
    );
}

export default HeaderBoard;