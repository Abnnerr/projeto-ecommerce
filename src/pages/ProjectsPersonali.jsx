import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router';

const ProjectsPersonali = () => {
  // sample projects data
  const projects = [
    {
      id: 1,
      title: 'Prótese Personalizada',
      image: 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=600&h=400&fit=crop',
      description: 'Prótese customizada em silicone para cliente especial.'
    },
    {
      id: 2,
      title: 'Peças Industriais',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
      description: 'Componentes personalizados para maquinário pesado.'
    },
    {
      id: 3,
      title: 'Figuras Miniaturas',
      image: 'https://images.unsplash.com/photo-1578866078328-74f1d1669a0f?w=600&h=400&fit=crop',
      description: 'Miniaturas feitas sob medida para colecionadores.'
    }
  ];

  const filteredProjects = projects;


  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Projetos Personalizados</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Transforme suas ideias em realidade com soluções 3D sob medida. 
            Veja alguns de nossos projetos mais impressionantes.
          </p>
        </div>
      </header>


      {/* GALERIA DE PROJETOS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredProjects.map(project => (
              <div
                key={project.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-2xl hover:border-blue-400 transition-all duration-300"
              >
                {/* IMAGE */}
                <div className="relative overflow-hidden h-64 bg-gray-200">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">
                      Ver Mais
                    </button>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>

                  <Link to="/contato" className="w-full flex items-center justify-center gap-2 text-blue-600 font-bold hover:text-blue-700 transition-colors">
                    Solicitar Orçamento
                    <FaArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhum projeto disponível no momento.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProjectsPersonali;
