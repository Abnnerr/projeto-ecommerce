import React from 'react';
import { motion } from 'framer-motion';

const Categoria = () => {
  const categorias = [
    { 
      titulo: "Frontend", 
      cor: "from-blue-500", 
      // Substitua pela URL da sua foto de linguagens/chaveiros
      imagem: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=500&auto=format&fit=crop" 
    },
    { 
      titulo: "Backend", 
      cor: "from-purple-500", 
      imagem: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop" 
    },
    { 
      titulo: "Mobile", 
      cor: "from-orange-500", 
      imagem: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=500&auto=format&fit=crop" 
    },
    { 
      titulo: "DevOps", 
      cor: "from-emerald-500", 
      imagem: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=500&auto=format&fit=crop" 
    },
  ];

  return (
    <section className="py-16 bg-white flex justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          
          {categorias.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -8 }}
              className="relative flex items-center justify-center min-h-[160px] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
            >
              {/* 1. A Foto de Fundo */}
              <img 
                src={item.imagem} 
                alt={item.titulo}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* 2. Overlay Escuro (para o texto não sumir na foto) */}
              <div className="absolute inset-0 bg-[#050b18]/80 group-hover:bg-[#050b18]/60 transition-colors duration-500"></div>

              {/* 3. Brilho de Cor no Hover (Glow) */}
              <div className={`absolute inset-0 bg-gradient-to-t ${item.cor} to-transparent opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>

              {/* 4. Conteúdo Central */}
              <div className="relative z-10 text-center px-4">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                  {item.titulo}
                </h3>
                
                {/* Linha Neon Inferior */}
                <div className="flex justify-center mt-2">
                  <div className={`h-1 w-12 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:w-20 transition-all duration-500`}></div>
                </div>
              </div>

              {/* Borda de Vidro sutil */}
              <div className="absolute inset-0 border border-white/10 rounded-3xl pointer-events-none"></div>
            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
};

export default Categoria;