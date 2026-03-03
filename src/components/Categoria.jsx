import React from "react";
import { motion } from "framer-motion";

const Categoria = () => {
  const categorias = [
    {
      titulo: "Teste",
      imagem:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=500&auto=format&fit=crop",
    },
    {
      titulo: "TES",
      imagem:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop",
    },
    {
      titulo: "Mobile",
      imagem:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=500&auto=format&fit=crop",
    },
    {
      titulo: "DevOps",
      imagem:
        "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=500&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-16  flex justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">

        {/* titulo opcional */}
        <h2 className="text-[#1E1E1E] text-lg font-semibold mb-8 tracking-wide">
          Categorias
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categorias.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="
              relative
              h-[160px]
              rounded-xl
              overflow-hidden
              cursor-pointer
              border border-[#2A2A2A]
              bg-[#1E1E1E]
              group
              "
            >

              {/* imagem */}
              <img
                src={item.imagem}
                alt={item.titulo}
                className="
                absolute inset-0
                w-full h-full
                object-cover
                opacity-60
                group-hover:opacity-80
                transition duration-300
                "
              />

              {/* overlay escuro */}
              <div className="absolute inset-0 bg-[#121212]/60"></div>

              {/* conteúdo */}
              <div className="relative z-10 h-full flex items-center justify-center">

                <div className="text-center">

                  <h3 className="
                    text-[#EAEAEA]
                    font-semibold
                    text-lg
                    tracking-wide
                  ">
                    {item.titulo}
                  </h3>

                  {/* linha tech minimalista */}
                  <div className="
                    mx-auto mt-2
                    h-[2px] w-6
                    bg-[#3B82F6]
                    opacity-70
                    group-hover:w-10
                    transition-all duration-300
                  " />

                </div>

              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Categoria;