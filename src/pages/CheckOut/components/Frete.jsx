import { useState } from "react";
import { AXIOS } from "../../../services";
import { FaTruck } from "react-icons/fa";
import { useCart } from "../../../contexts/CartProvider";

const Frete = () => {
    const { cart, frete, setFrete, opcaofrete, setOpcaoFrete, setDadosLocalizacao } = useCart();
    // const [frete, setFrete] = useState(0);
    // const [fretes, setFretes] = useState([]);
    const [freteSelecionado, setFreteSelecionado] = useState(null);
    const [cep, setCep] = useState("");
    const [logradouro, setLogradouro] = useState("");
    const [numero, setNumero] = useState("");
    const [complemento, setComplemento] = useState("");
    const [bairro, setBairro] = useState("");
    const [cidade, setCidade] = useState("");
    const [estado, setEstado] = useState("");


    console.log(opcaofrete);
    
    async function handleCalculateShipping() {
        try {
            if (!cep || cart.length === 0) return;

            const products = cart.map(item => ({
                id: String(item.id),
                width: item.largura,
                height: item.altura,
                length: item.comprimento,
                weight: item.peso,
                insurance_value: item.valor * item.quantidade,
                quantity: item.quantidade
            }));

            const response = await AXIOS.post("/api/frete", { cep, products });
            const fretesDisponiveis = response.data.filter(f => !f.error);
            console.log("Resposta do servidor:", response.data);
            console.log(fretesDisponiveis);

            setOpcaoFrete(fretesDisponiveis);
            setDadosLocalizacao({
                cep,
                logradouro,
                numero,
                complemento,
                bairro,
                cidade,
                estado
            })



            const primeiroValido = response.data.find(f => !f.error);
            if (primeiroValido) {
                setFrete(Number(primeiroValido.custom_price || primeiroValido.price));
                setFreteSelecionado(primeiroValido);
            }

        } catch (error) {
            console.log(error);
        }
    }

    function handleSelectFrete(f) {
        if (f.error) return;
        setFreteSelecionado(f);
        setFrete(Number(f.custom_price || f.price));
    }

    return (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 flex items-center gap-2">
                <FaTruck className="text-purple-600" /> Entrega e Frete
            </h2>

            {/* CEP */}
            <div className="flex flex-col md:flex-row gap-3">
                <input
                    type="text"
                    placeholder="Digite seu CEP"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="flex-1 p-3 rounded-md border border-gray-300"
                />
                <button
                    onClick={handleCalculateShipping}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-md font-semibold"
                >
                    Calcular
                </button>
            </div>

            {/* Lista de Fretes */}
            {opcaofrete.length > 0 && (
                <div className="mt-4 space-y-2">
                    {opcaofrete.map(f => (
                        <div
                            key={f.id}
                            onClick={() => handleSelectFrete(f)}
                            className={`p-2 border rounded-lg flex justify-between items-center cursor-pointer
                                ${f.error ? "bg-red-100 text-red-600 cursor-not-allowed" :
                                    freteSelecionado?.id === f.id ? "bg-purple-100 border-purple-600" : "bg-green-50 text-green-700"}`}
                        >
                            <div className="flex items-center gap-2">
                                {f.company?.picture && (
                                    <img src={f.company.picture} alt={f.company.name} className="w-10 h-3" />
                                )}
                                <span>{f.name}</span>
                            </div>
                            <span>
                                {f.error ? f.error : `R$ ${Number(f.custom_price || f.price).toFixed(2)}`}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* Frete selecionado */}
            {freteSelecionado && !freteSelecionado.error && (
                <p className="text-green-600 font-semibold mt-2">
                    Frete selecionado: {freteSelecionado.name} → R$ {frete.toFixed(2)}
                </p>
            )}

            {/* Endereço */}
            <div className="mt-4 space-y-2">
                <input
                    type="text"
                    placeholder="Rua"
                    value={logradouro}
                    onChange={(e) => setLogradouro(e.target.value)}
                    className="flex-1 p-3 rounded-md border border-gray-300"
                />
                <input
                    type="text"
                    placeholder="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                    className="w-24 p-3 rounded-md border border-gray-300"
                />
                <input
                    type="text"
                    placeholder="Complemento (opcional)"
                    value={complemento}
                    onChange={(e) => setComplemento(e.target.value)}
                    className="flex-1 p-3 rounded-md border border-gray-300"
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                    className="w-32 p-3 rounded-md border border-gray-300"
                />
                <div className="flex gap-2 w-full">
                    <input
                        type="text"
                        placeholder="Cidade"
                        value={cidade}
                        onChange={(e) => setCidade(e.target.value)}
                        className="flex-1 p-3 rounded-md border border-gray-300"
                    />
                    <input
                        type="text"
                        placeholder="UF"
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        maxLength="2"
                        className="w-16 p-3 rounded-md border border-gray-300"
                    />
                </div>
            </div>
        </div>
    );
}

export default Frete;