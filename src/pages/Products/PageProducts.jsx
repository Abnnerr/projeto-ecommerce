import { useEffect, useState } from "react";
import { AXIOS } from "../../services";
import { Link } from "react-router";
import { FaBoxOpen } from "react-icons/fa";

const PageProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [priceMin, setPriceMin] = useState("");
    const [priceMax, setPriceMax] = useState("");
    const [sortOrder, setSortOrder] = useState(""); // "asc" or "desc" for price sorting

    useEffect(() => {
        async function fetchData() {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    AXIOS.get("/api/products"),
                    AXIOS.get("/api/categories")
                ]);

                console.info("Produtos carregados:", productsRes.data);
                console.info("Categorias carregadas:", categoriesRes.data);
                setProducts(productsRes.data);
                setFilteredProducts(productsRes.data);
                setCategories(categoriesRes.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (search) {
            filtered = filtered.filter(product =>
                product.nome.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (selectedCategory) {
            filtered = filtered.filter(product => product.categoria_id === parseInt(selectedCategory));
        }

        if (priceMin) {
            filtered = filtered.filter(product => product.valor >= parseFloat(priceMin));
        }

        if (priceMax) {
            filtered = filtered.filter(product => product.valor <= parseFloat(priceMax));
        }

        // sorting by price if requested
        if (sortOrder === 'asc') {
            filtered = filtered.slice().sort((a, b) => a.valor - b.valor);
        } else if (sortOrder === 'desc') {
            filtered = filtered.slice().sort((a, b) => b.valor - a.valor);
        }

        setFilteredProducts(filtered);
    }, [search, selectedCategory, priceMin, priceMax, sortOrder, products]);

    const formatPrice = (valor, desconto) => {
        let final = Number(valor);
        if (desconto) {
            final = final - (final * Number(desconto)) / 100;
        }
        return `R$ ${final.toFixed(2)}`;
    };

    const getProductImage = (product) => {
        try {
            if (product.imagens) {
                const imagens = JSON.parse(product.imagens);
                if (Array.isArray(imagens) && imagens.length > 0) {
                    return imagens[0];
                }
            }
        } catch (err) {
            console.error("Erro ao fazer parse das imagens:", err);
        }
        return null;
    };

    if (loading) {
        return <div className="text-center py-10 bg-white min-h-screen">Carregando produtos...</div>;
    }

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-2 text-gray-900 tracking-tight">Produtos</h1>
                <p className="text-gray-600 mb-8">Navegue por nossa coleção completa de produtos</p>

                {/* Filtros */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
                    <h2 className="text-sm uppercase tracking-widest text-gray-700 mb-4 font-semibold">Filtros</h2>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        <input
                            type="text"
                            placeholder="Buscar por nome..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
                        >
                            <option value="">Todas as categorias</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.nome}</option>
                            ))}
                        </select>
                        <input
                            type="number"
                            placeholder="Preço mínimo"
                            value={priceMin}
                            onChange={(e) => setPriceMin(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                        <input
                            type="number"
                            placeholder="Preço máximo"
                            value={priceMax}
                            onChange={(e) => setPriceMax(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-400 transition-colors"
                        />
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:border-blue-400 transition-colors"
                        >
                            <option value="">Ordenar</option>
                            <option value="asc">Menor preço</option>
                            <option value="desc">Maior preço</option>
                        </select>
                    </div>
                </div>

                {/* Produtos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 h-screen">
                    {filteredProducts.map(product => {
                        const imageSrc = getProductImage(product);
                        return (
                            <div key={product.id} className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-400 overflow-hidden transition-all duration-300 group flex flex-col h-90">
                                <div className="relative h-48 bg-gray-100 overflow-hidden">
                                    {imageSrc ? (
                                        <img
                                            src={imageSrc}
                                            alt={product.nome}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    ) : null}
                                    {!imageSrc && (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                                            <FaBoxOpen size={48} className="text-gray-400" />
                                        </div>
                                    )}
                                </div>
                                <div className="p-5 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2 text-gray-900">{product.nome}</h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.descricao}</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-xl font-bold text-blue-600">
                                            {formatPrice(product.valor, product.desconto)}
                                        </span>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                                        >
                                            Ver Detalhes
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                        <FaBoxOpen size={64} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-lg">Nenhum produto encontrado com os filtros aplicados.</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default PageProducts;