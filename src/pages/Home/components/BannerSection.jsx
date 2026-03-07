import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const BannerSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const banners = [
    {
      id: 1,
      title: "Impressão 3D",
      subtitle: "Até 50% OFF",
      description: "Em filamentos e peças selecionados",
      image: "/image1.png",
      buttonText: "Ver Ofertas",
      buttonLink: "/products"
    },
    {
      id: 2,
      title: "Tecnologia de Ponta",
      subtitle: "Novos Modelos 2024",
      description: "Impressoras e equipamentos mais avançados",
      image: "/image2.png",
      buttonText: "Explorar",
      buttonLink: "/products"
    },
    {
      id: 3,
      title: "Projetos Personalizados",
      subtitle: "Realize suas Ideias",
      description: "Transforme conceitos em realidade com impressão 3D",
      image: "/image3.png",
      buttonText: "Saiba Mais",
      buttonLink: "/projects"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  // const prevSlide = () => {
  //   setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  // };

  // Auto-play do carrossel

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative h-[500px] overflow-hidden">
      {/* Banners */}
      <div className="relative h-full">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
          >
            {/* Imagem de fundo */}
            <div className="absolute inset-0">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay escuro */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {/* Conteúdo */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-6xl mx-auto px-6 w-full">
                <div className="max-w-lg">
                  <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
                    {banner.title}
                  </h2>
                  <h3 className="text-2xl font-semibold text-[#4FF8D9] mb-2">
                    {banner.subtitle}
                  </h3>
                  <p className="text-lg text-gray-200 mb-8">
                    {banner.description}
                  </p>
                  <a
                    href={banner.buttonLink}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
                  >
                    {banner.buttonText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navegação */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        {/* <button
          onClick={prevSlide}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Banner anterior"
        >
          <FaChevronLeft size={20} />
        </button> */}

        {/* Indicadores */}
        <div className="flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-3 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-[#4FF8D9] w-8"
                  : "bg-white/50 w-3"
                }`}
              aria-label={`Ir para banner ${index + 1}`}
            />
          ))}
        </div>

        {/* <button
          onClick={nextSlide}
          className="bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Próximo banner"
        >
          <FaChevronRight size={20} />
        </button> */}
      </div>
    </section>
  );
};

export default BannerSection;