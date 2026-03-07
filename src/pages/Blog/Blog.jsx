import { Title } from "react-head";
import { FaCalendar, FaUser, FaArrowRight, FaClock, FaTag } from "react-icons/fa";
import { Link } from "react-router";

const blogPosts = [
  {
    id: 1,
    title: "Como a impressão 3D transforma produtos personalizados",
    summary: "Descubra como a tecnologia 3D permite criar produtos exclusivos e sob medida para cada cliente.",
    content: "A impressão 3D revolucionou a forma como criamos produtos personalizados. Com essa tecnologia, é possível fabricar itens únicos adaptados às necessidades específicas de cada cliente.",
    date: "10 de Março de 2026",
    author: "João Silva",
    readTime: "5 min",
    category: "Tecnologia",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop",
    link: "/blog/impressoes-personalizadas"
  },
  {
    id: 2,
    title: "Materiais mais usados em impressão 3D",
    summary: "Conheça os principais materiais utilizados em impressoras 3D e suas aplicações em projetos reais.",
    content: "Existem diversos materiais disponíveis para impressão 3D, cada um com suas características e aplicações específicas.",
    date: "5 de Março de 2026",
    author: "Maria Santos",
    readTime: "7 min",
    category: "Materiais",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=800&auto=format&fit=crop",
    link: "/blog/materiais-3d"
  },
  {
    id: 3,
    title: "Dicas para otimizar seus projetos 3D",
    summary: "Aprenda técnicas para reduzir erros, economizar tempo e obter peças perfeitas na impressão 3D.",
    content: "Otimizar seus projetos 3D é essencial para obter melhores resultados e economizar recursos.",
    date: "1 de Março de 2026",
    author: "Carlos Costa",
    readTime: "6 min",
    category: "Dicas",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=800&auto=format&fit=crop",
    link: "/blog/dicas-projetos-3d"
  }
];

const Blog = () => {
  return (
    <div className="min-h-screen bg-white">
      <Title>3Dtech - Blog de Impressão 3D</Title>
      {/* HEADER HERO */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog 3DTech</h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto">
            Fique por dentro das novidades, dicas e tendências da impressão 3D. Aprenda com especialistas e transforme suas ideias em realidade.
          </p>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        {/* Filtros e Busca */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Artigos Recentes</h2>
              <p className="text-gray-600">{blogPosts.length} artigos publicados</p>
            </div>
            <input
              type="text"
              placeholder="Buscar artigos..."
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* GRID DE POSTS */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {blogPosts.map(post => (
            <Link key={post.id} to={post.link} className="group">
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300 h-full flex flex-col">
                {/* IMAGE */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <FaTag size={10} />
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {post.summary}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <FaCalendar size={12} />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaUser size={12} />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500">
                        <FaClock size={12} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Button */}
                  <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors flex items-center justify-center gap-2 group-hover:gap-3">
                    Ler Artigo
                    <FaArrowRight size={14} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* SEÇÃO ADICIONAL */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Artigos Populares */}
          <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">📈 Artigos Populares</h3>
            <div className="space-y-4">
              {blogPosts.map(post => (
                <Link key={post.id} to={post.link} className="group block">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors">
                    <div className="text-2xl font-bold text-blue-600 mt-1 w-8">
                      #{blogPosts.indexOf(post) + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1">{post.readTime}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Dicas Rápidas */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-8 border border-blue-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Dicas Rápidas</h3>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                <h4 className="font-semibold text-gray-900 mb-1">Qualidade de Impressão</h4>
                <p className="text-sm text-gray-600">Ajuste a temperatura e velocidade da impressora para melhores resultados.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                <h4 className="font-semibold text-gray-900 mb-1">Preparação do Arquivo</h4>
                <p className="text-sm text-gray-600">Sempre normalize e limpe seu modelo 3D antes de imprimir.</p>
              </div>
              <div className="bg-white rounded-lg p-4 border-l-4 border-blue-600">
                <h4 className="font-semibold text-gray-900 mb-1">Segurança</h4>
                <p className="text-sm text-gray-600">Mantenha a área de impressão bem ventilada e segura.</p>
              </div>
            </div>
          </div>
        </div>

        {/* CALL TO ACTION */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-12 text-white text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Quer saber mais sobre impressão 3D?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Inscreva-se na nossa newsletter e receba novidades, dicas e conteúdos exclusivos diretamente no seu email.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <input
              type="email"
              placeholder="seu@email.com"
              className="px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 flex-1 max-w-sm"
            />
            <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg transition-colors">
              Inscrever
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className="bg-gray-50 border-t border-gray-200 py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Explore nossos produtos
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Coloque seus conhecimentos em prática com os melhores produtos de impressão 3D do mercado.
          </p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors flex items-center gap-2 justify-center"
          >
            Ver Produtos
            <FaArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Blog;