import React from 'react';
import { motion } from 'framer-motion';

const Depoimentos = () => {
  const reviews = [
    { 
      nome: "Elvis", 
      texto: "Produtos de altíssima fidelidade e acabamento impecável.",
      cor: "from-cyan-500 to-blue-500",
      foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
    },
    { 
      nome: "Diego", 
      texto: "Entrega agilidade e um carinho único em cada detalhe do projeto.",
      cor: "from-purple-600 to-indigo-500",
      foto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
    },
    { 
      nome: "Juliana", 
      texto: "Surpresa com a qualidade! O cuidado com a embalagem e a rapidez me conquistaram.",
      cor: "from-orange-500 to-red-500",
      foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="flex items-center gap-4 mb-12 justify-center">
          <div className="h-[1px] w-12 bg-slate-300"></div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase italic">
            Feedback dos Clientes
          </h2>
          <div className="h-[1px] w-12 bg-slate-300"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-20">
          {reviews.map((item, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.02 }}
              className="relative p-5 bg-[#050b18] rounded-2xl border border-white/5 shadow-xl flex items-center min-h-[110px] group"
            >
              {/* Barra lateral de cor */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${item.cor} rounded-l-2xl`}></div>
              
              <div className="flex items-center gap-4 w-full pl-2">
                {/* FOTO DO CLIENTE */}
                <div className="relative shrink-0">
                  <div className={`absolute -inset-1 bg-gradient-to-br ${item.cor} rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
                  <img 
                    src={item.foto} 
                    alt={item.nome} 
                    className="relative w-14 h-14 rounded-full object-cover border-2 border-white/10"
                  />
                </div>

                <div className="flex flex-col">
                  <p className="text-gray-300 text-[13px] leading-snug mb-2 italic font-medium">
                    "{item.texto}"
                  </p>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest opacity-70">
                    {item.nome}
                  </span>
                </div>
              </div>

              {/* Glow interno sutil */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-2xl"></div>
            </motion.div>
          ))}
        </div>

        {/* Banner Final (Mantido conforme a última versão) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden bg-[#050b18] rounded-[2.5rem] p-10 md:p-14 text-center max-w-5xl mx-auto shadow-2xl"
        >
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/hexellence.png')` }}>
          </div>

          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter uppercase italic">
              🚀 Engenharia & Criatividade 🚀
            </h3>
            <p className="text-blue-400 font-bold mb-8 tracking-[0.3em] uppercase text-xs">
              A tecnologia que você sente no toque
            </p>
            <div className="space-y-6">
                <p className="text-gray-300 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                  Na <span className="text-white font-bold tracking-tight">3DCOMTECH</span>, não apenas imprimimos objetos; nós <span className="text-white font-semibold">materializamos inovação</span>. Combinamos o rigor do desenvolvimento de software com a precisão da manufatura 3D.
                </p>
                <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto font-light border-t border-white/10 pt-6 italic">
                  Transformamos designs complexos em peças tangíveis com personalidade única.
                </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Depoimentos;