import { useEffect, useState } from "react";
import { maskPhone } from "../../../utils";
import { useCart } from "../../../contexts/CartProvider";

const DadosCliente = () => {
    const { setCliente, cliente } = useCart()
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')

    useEffect(() => {
        setCliente({ nome, email, tel });
    }, [nome, email, tel]); // só dispara quando algum desses muda
    console.log(cliente);


    return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2">Dados do Cliente</h2>
            <input type="text" placeholder="Nome completo" className="w-full p-3 rounded-md border border-gray-300" onChange={(e) => setNome(e.target.value)} />
            <input type="email" placeholder="E-mail" className="w-full p-3 rounded-md border border-gray-300" onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" value={tel} placeholder="Telefone" className="w-full p-3 rounded-md border border-gray-300" onChange={(e) => setTel(maskPhone(e.target.value))} />
        </div>

    );
}

export default DadosCliente;