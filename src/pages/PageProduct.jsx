import { useState, useMemo, useEffect } from "react";
import { FaStar, FaRegStar, FaTruck, FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import { useCart } from "../contexts/CartProvider";
import { useNavigate, useParams } from "react-router";
import { AXIOS } from "../services";
import { useUser } from "../contexts/UsuarioProvider";

export default function PageProduct() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { user } = useUser()
    const navigate = useNavigate()

    const [produto, setProduto] = useState(null);
    const [imagemAtiva, setImagemAtiva] = useState(0);
    const [quantidade, setQuantidade] = useState(1);
    // const [cep, setCep] = useState("");
    // const [fretes, setFretes] = useState([]);
    // const [loadingFrete, setLoadingFrete] = useState(false);

    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
    const [corSelecionada, setCorSelecionada] = useState(null);

    // =========================
    // Buscar Produto
    // =========================
    useEffect(() => {
        async function buscarProduto() {
            try {
                const response = await AXIOS.get(`/api/products/${id}`);
                const data = response.data;
                setProduto(data);

                if (data.tamanhos) {
                    const tamanhos = JSON.parse(data.tamanhos);
                    setTamanhoSelecionado(tamanhos[0]);
                }

                if (data.cores) {
                    const cores = JSON.parse(data.cores);
                    setCorSelecionada(cores[0]);
                }

            } catch (error) {
                console.log(error);
            }
        }

        buscarProduto();
    }, [id]);

    // =========================
    // Cálculo de Preço
    // =========================
    const preco = useMemo(() => {
        if (!produto) return { final: 0, pix: 0, parcela: 0 };

        const valor = Number(produto.valor || 0);
        const desconto = Number(produto.desconto || 0);

        const final = valor - (valor * desconto) / 100;

        return {
            original: valor,
            final,
            pix: final * 0.95,
            parcela: final / 12
        };
    }, [produto]);

    // =========================
    // Avaliação
    // =========================
    const avaliacaoMedia = useMemo(() => {
        if (!produto?.avaliacoes?.length) return 0;

        const total = produto.avaliacoes.reduce(
            (acc, item) => acc + Number(item.nota),
            0
        );

        return Number((total / produto.avaliacoes.length).toFixed(1));
    }, [produto]);


    const getImageUrl = (imageUrl) => {
        if (!imageUrl) return null;
        return imageUrl;
    };


    if (!produto) {
        return <div className="p-20 text-center h-screen">Carregando produto...</div>;
    }

    const imagens = produto.produto_imagens || [];
    const tamanhos = produto.tamanhos ? JSON.parse(produto.tamanhos) : [];
    const cores = produto.cores ? JSON.parse(produto.cores) : [];

    return (
        <main className="min-h-screen bg-gray-50">

            {/* Breadcrumb */}
            <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500">
                Home / {produto.categoria?.nome} /{" "}
                <span className="text-black">{produto.nome}</span>
            </div>

            <div className="max-w-7xl mx-auto px-6 pb-16 grid lg:grid-cols-2 gap-12">

                {/* GALERIA */}
                <div>
                    <div className="bg-white rounded-2xl shadow p-6 relative">

                        {/* Badge Desconto */}
                        {produto.desconto > 0 && (
                            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 text-sm rounded-full">
                                -{produto.desconto}%
                            </div>
                        )}

                        {/* Imagem ou fallback */}
                        {imagens.length > 0 && getImageUrl(imagens[imagemAtiva].url) ? (
                            <img
                                src={getImageUrl(imagens[imagemAtiva].url)}
                                className="w-full h-[450px] object-contain"
                                alt={produto.nome}
                                onError={(e) => {
                                    e.target.style.display = "none";
                                }}
                            />
                        ) : (
                            <div className="w-full h-[450px] flex items-center justify-center bg-gray-200">
                                <FaBoxOpen size={80} className="text-gray-400" />
                            </div>
                        )}

                        {/* Esgotado Overlay */}
                        {produto.estoque === 0 && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center text-3xl font-bold text-red-600">
                                ESGOTADO
                            </div>
                        )}
                    </div>

                    {/* Miniaturas */}
                    <div className="flex gap-4 mt-4">
                        {imagens.map((img, i) => {
                            const imgUrl = getImageUrl(img.url);
                            return imgUrl ? (
                                <img
                                    key={img.id}
                                    src={imgUrl}
                                    onClick={() => setImagemAtiva(i)}
                                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 
                                    ${imagemAtiva === i ? "border-black" : "border-transparent"}`}
                                    alt=""
                                    onError={(e) => {
                                        e.target.style.display = "none";
                                    }}
                                />
                            ) : (
                                <div
                                    key={img.id}
                                    onClick={() => setImagemAtiva(i)}
                                    className={`w-20 h-20 bg-gray-200 rounded-lg cursor-pointer border-2 flex items-center justify-center
                                    ${imagemAtiva === i ? "border-black" : "border-transparent"}`}
                                >
                                    <FaBoxOpen size={24} className="text-gray-400" />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* INFO */}
                <div className="space-y-6">

                    <h1 className="text-3xl font-bold">{produto.nome}</h1>

                    {/* Avaliação */}
                    <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map(star =>
                            star <= avaliacaoMedia
                                ? <FaStar key={star} className="text-yellow-400" />
                                : <FaRegStar key={star} className="text-gray-300" />
                        )}
                        <span className="text-sm text-gray-500">
                            ({avaliacaoMedia} de 5)
                        </span>
                    </div>

                    {/* Preço */}
                    <div>
                        {produto.desconto > 0 && (
                            <div className="text-gray-400 line-through">
                                R$ {preco.original.toFixed(2)}
                            </div>
                        )}

                        <div className="text-4xl font-bold">
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
                        {produto.estoque > 0 ? (
                            <span className="text-green-600">
                                {produto.estoque} disponíveis
                            </span>
                        ) : (
                            <span className="text-red-600 font-medium">
                                Produto esgotado
                            </span>
                        )}
                    </div>

                    {/* Tamanho */}
                    {tamanhos.length > 0 && (
                        <div>
                            <span className="font-medium">Tamanho:</span>
                            <div className="mt-2 flex gap-2 flex-wrap">
                                {tamanhos.map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setTamanhoSelecionado(t)}
                                        className={`px-4 py-2 border rounded-lg 
                                        ${tamanhoSelecionado === t ? "bg-black text-white" : "bg-white"}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Cor */}
                    {cores.length > 0 && (
                        <div>
                            <span className="font-medium">Cor:</span>
                            <div className="mt-2 flex gap-2 flex-wrap">
                                {cores.map(c => (
                                    <button
                                        key={c}
                                        onClick={() => setCorSelecionada(c)}
                                        className={`px-4 py-2 border rounded-lg 
                                        ${corSelecionada === c ? "bg-black text-white" : "bg-white"}`}
                                    >
                                        {c}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quantidade */}
                    <div className="flex items-center gap-4">
                        <span>Quantidade:</span>
                        <div className="flex border rounded-lg">
                            <button
                                onClick={() => quantidade > 1 && setQuantidade(q => q - 1)}
                                className="px-4"
                            >-</button>
                            <div className="px-6 py-2">{quantidade}</div>
                            <button
                                onClick={() =>
                                    quantidade < produto.estoque &&
                                    setQuantidade(q => q + 1)
                                }
                                className="px-4"
                            >+</button>
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4">

                        <button
                            disabled={produto.estoque === 0}
                            onClick={() => {

                                if (user) {
                                    addToCart({
                                        ...produto,
                                        quantidade,
                                        tamanhoSelecionado,
                                        corSelecionada
                                    })
                                    return
                                }

                                navigate('/login')
                            }

                            }
                            className={`flex-1 py-4 rounded-xl flex items-center justify-center gap-2
                            ${produto.estoque === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-black text-white"}`}
                        >
                            <FaShoppingCart />
                            Adicionar ao Carrinho
                        </button>



                        <button
                            onClick={() => {

                                if (user) {
                                    addToCart({
                                        ...produto,
                                        quantidade,
                                        tamanhoSelecionado,
                                        corSelecionada
                                    })
                                    navigate('/checkout')
                                    return
                                }

                                navigate('/login')
                            }
                            }
                            disabled={produto.estoque === 0}
                            className={`flex-1 py-4 rounded-xl text-center
                            ${produto.estoque === 0
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-green-600 text-white"}`}
                        >
                            Comprar Agora
                        </button>
                    </div>

                    {/* Informações Técnicas */}
                    <div className="bg-gray-100 rounded-xl p-6">
                        <h3 className="font-semibold text-lg mb-4">
                            Informações Técnicas
                        </h3>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><strong>Peso:</strong> {produto.peso} kg</div>
                            <div><strong>Altura:</strong> {produto.altura} cm</div>
                            <div><strong>Largura:</strong> {produto.largura} cm</div>
                            <div><strong>Comprimento:</strong> {produto.comprimento} cm</div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Descrição */}
            <div className="bg-white py-16 border-t">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-2xl font-bold mb-4">
                        Descrição do Produto
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                        {produto.descricao}
                    </p>
                </div>
            </div>

        </main>
    );
}