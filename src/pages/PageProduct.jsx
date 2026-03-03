import { useState, useMemo, useEffect } from "react";
import { FaStar, FaRegStar, FaTruck, FaShoppingCart } from "react-icons/fa";
import { useCart } from "../contexts/CartProvider";
import { useParams } from "react-router";
import { AXIOS } from "../services";

const produtoCompleto = {
    id: 1,
    nome: "Tênis Esportivo Performance Pro",
    valor: "299.90",
    descricao: "Tênis leve e confortável, ideal para corrida e treinos diários. Feito com materiais respiráveis, sola antiderrapante e design moderno.",
    desconto: 15,
    estoque: 120,
    categoria_id: 3,
    categoria: { id: 3, nome: "Calçados Esportivos" },
    tamanhos: JSON.stringify(["38", "39", "40", "41", "42"]),
    cores: JSON.stringify(["Preto", "Branco", "Azul"]),
    altura: "12",
    largura: "20",
    comprimento: "30",
    peso: "0.8",
    avaliacao: 4,
    produto_imagens: [
        { id: 1, url: "/images/produto1-1.jpg" },
        { id: 2, url: "/images/produto1-2.jpg" },
        { id: 3, url: "/images/produto1-3.jpg" }
    ],
};

export default function PageProduct() {
    const { id } = useParams()
    const { addToCart } = useCart(); // pegando função do contexto
    const [produto, setProduto] = useState(produtoCompleto);
    const [imagemAtiva, setImagemAtiva] = useState(0);
    const [quantidade, setQuantidade] = useState(1);
    const [cep, setCep] = useState("");
    const [fretes, setFretes] = useState([]);
    const [loadingFrete, setLoadingFrete] = useState(false);

    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(JSON.parse(produto.tamanhos)[0]);
    const [corSelecionada, setCorSelecionada] = useState(JSON.parse(produto.cores)[0]);

    // =========================
    // CÁLCULO DE PREÇO
    // =========================

    useEffect(() => {
        async function buscarProduto() {

            try {
                const response = await AXIOS.get(`/api/products/${id}`)

                setProduto(response.data)
            } catch (error) {
                console.log(error);
                
            }

        }
        buscarProduto()
    }, [])

    const preco = useMemo(() => {
        const valorNumero = Number(produto.valor);
        const descontoNumero = Number(produto.desconto || 0);
        const final = valorNumero - (valorNumero * descontoNumero) / 100;
        return {
            final,
            pix: final * 0.95,
            parcela: final / 12
        };
    }, [produto]);

    // =========================
    // CALCULAR FRETE MOCK
    // =========================
    async function calcularFrete() {
        if (!cep || cep.length < 8) return;
        setLoadingFrete(true);
        try {
            const mockFretes = [
                { id: 1, name: "PAC", price: 20.0, delivery_time: 5 },
                { id: 2, name: "SEDEX", price: 35.0, delivery_time: 2 }
            ];
            setFretes(mockFretes);
        } catch (error) {
            setFretes([]);
            return error
        } finally {
            setLoadingFrete(false);
        }
    }

    // =========================
    // Ações dos botões
    // =========================
    const handleAddToCart = () => {
        addToCart({
            ...produto,
            quantidade,
            tamanhoSelecionado,
            corSelecionada
        });
        // alert("Produto adicionado ao carrinho!");
    };

    const handleComprarAgora = () => {
        addToCart({
            ...produto,
            quantidade,
            tamanhoSelecionado,
            corSelecionada
        });
        // Aqui você poderia redirecionar para página de checkout
        // alert("Produto adicionado ao carrinho. Redirecionando para o checkout...");
    };

    return (
        <main className="min-h-screen bg-gray-50">

            {/* BREADCRUMB */}
            <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500">
                <a href="/">Home</a> /{" "}
                <a href="#">{produto.categoria.nome}</a> /{" "}
                <span className="text-black">{produto.nome}</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12">

                {/* GALERIA */}
                <div>
                    <div className="bg-white rounded-2xl shadow p-6">
                        <img
                            src={produto.produto_imagens[imagemAtiva].url}
                            className="w-full h-[450px] object-contain"
                            alt={produto.nome}
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        {produto.produto_imagens.map((img, i) => (
                            <img
                                key={img.id}
                                src={img.url}
                                onClick={() => setImagemAtiva(i)}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition 
                  ${imagemAtiva === i ? "border-black" : "border-transparent"}`}
                                alt="Miniatura"
                            />
                        ))}
                    </div>
                </div>

                {/* INFO */}
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold">{produto.nome}</h1>

                    {/* Avaliação */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                            star <= produto.avaliacao
                                ? <FaStar key={star} className="text-yellow-400" />
                                : <FaRegStar key={star} className="text-gray-300" />
                        ))}
                        <span className="text-sm text-gray-500">({produto.avaliacao} de 5)</span>
                    </div>

                    {/* Preço */}
                    <div className="space-y-1">
                        {produto.desconto > 0 && (
                            <div className="text-sm text-gray-400 line-through">
                                R$ {Number(produto.valor).toFixed(2)}
                            </div>
                        )}
                        <div className="text-4xl font-bold text-black">
                            R$ {preco.final.toFixed(2)}
                        </div>
                        <div className="text-green-600 font-medium">
                            5% OFF no PIX → R$ {preco.pix.toFixed(2)}
                        </div>
                        <div className="text-gray-500 text-sm">
                            ou 12x de R$ {preco.parcela.toFixed(2)} sem juros
                        </div>
                    </div>

                    {/* Estoque */}
                    <div>
                        {produto.estoque > 0
                            ? <span className="text-green-600 font-medium">{produto.estoque} unidades disponíveis</span>
                            : <span className="text-red-600 font-medium">Produto esgotado</span>
                        }
                    </div>

                    {/* Tamanho */}
                    <div>
                        <span className="font-medium mr-2">Tamanho:</span>
                        {JSON.parse(produto.tamanhos).map(tam => (
                            <button
                                key={tam}
                                onClick={() => setTamanhoSelecionado(tam)}
                                className={`px-3 py-1 mr-2 mb-2 rounded-lg border ${tamanhoSelecionado === tam ? "bg-black text-white" : "bg-white text-black"}`}
                            >
                                {tam}
                            </button>
                        ))}
                    </div>

                    {/* Cor */}
                    <div>
                        <span className="font-medium mr-2">Cor:</span>
                        {JSON.parse(produto.cores).map(cor => (
                            <button
                                key={cor}
                                onClick={() => setCorSelecionada(cor)}
                                className={`px-3 py-1 mr-2 mb-2 rounded-lg border ${corSelecionada === cor ? "bg-black text-white" : "bg-white text-black"}`}
                            >
                                {cor}
                            </button>
                        ))}
                    </div>

                    {/* Quantidade */}
                    <div className="flex items-center gap-4">
                        <span className="font-medium">Quantidade:</span>
                        <div className="flex border rounded-lg overflow-hidden">
                            <button onClick={() => quantidade > 1 && setQuantidade(q => q - 1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200">-</button>
                            <div className="px-6 py-2">{quantidade}</div>
                            <button onClick={() => setQuantidade(q => q + 1)} className="px-4 py-2 bg-gray-100 hover:bg-gray-200">+</button>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4">
                        <button onClick={handleAddToCart} className="flex-1 bg-black text-white py-4 rounded-xl hover:opacity-90 flex items-center justify-center gap-2">
                            <FaShoppingCart /> Adicionar ao Carrinho
                        </button>
                        <button onClick={handleComprarAgora} className="flex-1 bg-green-600 text-white py-4 rounded-xl hover:bg-green-700">
                            Comprar Agora
                        </button>
                    </div>

                    {/* Frete */}
                    <div className="bg-white rounded-xl shadow p-6 space-y-4">
                        <h3 className="font-semibold text-lg flex items-center gap-2">
                            <FaTruck /> Calcular Frete
                        </h3>
                        <div className="flex gap-3">
                            <input placeholder="Digite seu CEP" value={cep} onChange={e => setCep(e.target.value)} className="border rounded-lg p-3 flex-1" />
                            <button onClick={calcularFrete} className="bg-black text-white px-6 rounded-lg">{loadingFrete ? "..." : "Calcular"}</button>
                        </div>
                        {fretes.map(frete => (
                            <div key={frete.id} className="flex justify-between border rounded-lg p-4">
                                <div>
                                    <div className="font-medium">{frete.name}</div>
                                    <div className="text-sm text-gray-500">Entrega em {frete.delivery_time} dias</div>
                                </div>
                                <div className="font-bold">R$ {frete.price}</div>
                            </div>
                        ))}
                    </div>

                    {/* Garantia */}
                    <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                        🔒 Compra 100% segura • 7 dias para troca • Garantia de 3 meses
                    </div>

                </div>
            </div>

            {/* Descrição */}
            <div className="bg-white py-16 border-t">
                <div className="max-w-4xl mx-auto px-6 space-y-6">
                    <h2 className="text-2xl font-bold">Descrição do Produto</h2>
                    <p className="text-gray-600 leading-relaxed">{produto.descricao}</p>
                </div>
            </div>

            {/* Produtos Relacionados */}
            <div className="bg-gray-100 py-16">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-8">Produtos Relacionados</h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition">
                                <img src="https://via.placeholder.com/300" className="w-full h-40 object-cover rounded-lg" />
                                <div className="mt-4 font-medium">Produto Relacionado</div>
                                <div className="text-black font-bold mt-2">R$ 99,90</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </main>
    );
}