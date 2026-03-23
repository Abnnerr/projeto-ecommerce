import { useState, useEffect } from "react";
import { AXIOS } from "../../../services";
import { Link } from "react-router";
import { FaBoxOpen, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const CategoryCarousel = ({ categoryId, categoryName }) => {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await AXIOS.get("/api/products");
        console.log(response.data.dados);
        
        const filtered = response.data.dados.filter(
          (product) => product.categoria_id === categoryId
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Erro ao buscar produtos:", err);
      }
    }
    fetchProducts();
  }, [categoryId]);

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

  const itemsPerPage = 4;
  const totalSlides = Math.ceil(products.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const visibleProducts = products.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  if (products.length === 0) {
    return (
      <section className="py-12 flex justify-center ">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <h2 className="text-[#1E1E1E] text-lg font-semibold tracking-wide mb-8">
            {categoryName}
          </h2>
          <p className="text-center text-[#808080]">Nenhum produto disponível nesta categoria no momento.</p>
        </div>
      </section>
    );
  }
  return (
    <section className="py-6 flex justify-center ">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-[#1E1E1E] text-lg font-semibold tracking-wide">
            {categoryName}
          </h2>
          <Link
            to="/products"
            className="text-blue-500 text-sm font-medium hover:text-[#3DCCAA] transition-colors"
          >
            Ver Tudo →
          </Link>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {visibleProducts.map((product) => {
              const imageSrc = getProductImage(product);
              return (
                <div
                  key={product.id}
                  className="bg-[#1E1E1E] rounded-lg border border-[#2A2A2A] overflow-hidden hover:border-[#808080] transition-all duration-300 group"
                >
                  <div className="relative h-48 bg-[#0D0D0D] overflow-hidden">
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={product.nome}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    ) : null}
                    {!imageSrc && (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2A2A2A] to-[#161616]">
                        <FaBoxOpen size={48} className="text-[#2A2A2A]" />
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex flex-col justify-between">
                    <h3 className="font-semibold text-lg mb-2 text-[#EAEAEA]">
                      {product.nome}
                    </h3>
                    <p className="text-[#B3B3B3] text-sm mb-4 line-clamp-2 h-15">
                      {product.descricao}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-[#4FF8D9]">
                        {formatPrice(product.valor, product.desconto)}
                      </span>
                      <Link
                        to={`/product/${product.id}`}
                        className="bg-[#2A2A2A] text-[#EAEAEA] px-4 py-2 rounded-lg hover:bg-[#808080] transition-colors text-sm font-medium"
                      >
                        Ver
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {totalSlides > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevSlide}
                className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#EAEAEA] p-3 rounded-lg transition-colors"
                aria-label="Slide anterior"
              >
                <FaChevronLeft size={20} />
              </button>
              <div className="flex items-center gap-2">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all ${idx === currentIndex
                        ? "bg-[#4FF8D9] w-6"
                        : "bg-[#2A2A2A] w-2"
                      }`}
                    aria-label={`Ir para slide ${idx + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextSlide}
                className="bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#EAEAEA] p-3 rounded-lg transition-colors"
                aria-label="Próximo slide"
              >
                <FaChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryCarousel;
