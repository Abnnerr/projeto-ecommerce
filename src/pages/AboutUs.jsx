import React from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <header className="bg-white border-b border-gray-200 py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-gray-900">3DTech</h1>
          <p className="text-xl text-gray-600">
            Transformando Ideias em Realidade
          </p>
        </div>
      </header>

      {/* QUEM SOMOS */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Sobre Nós
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Somos uma empresa especializada em tecnologia de impressão 3D, 
                oferecendo soluções inovadoras e personalizadas para transformar suas ideias em realidade.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600 shrink-0" size={20} />
                  <span className="text-gray-700">Soluções de alta qualidade</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600 shrink-0" size={20} />
                  <span className="text-gray-700">Equipe especializada e experiente</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600 shrink-0" size={20} />
                  <span className="text-gray-700">Atendimento personalizado</span>
                </li>
                <li className="flex items-center gap-3">
                  <FaCheckCircle className="text-blue-600 shrink-0" size={20} />
                  <span className="text-gray-700">Entrega rápida e confiável</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Nossa Missão</h3>
              <p className="text-gray-600 leading-relaxed">
                Fornecer soluções inovadoras em impressão 3D que superem as expectativas 
                de nossos clientes, oferecendo qualidade, precisão e personalização em cada projeto.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-16 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Vamos Começar Seu Projeto?
          </h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Conheça nossos produtos e serviços. Estamos prontos para transformar suas ideias em realidade.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
          >
            Explorar Produtos
            <FaArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;