import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AXIOS } from "../../../services";

const Categoria = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);

  // Diferentes fundos para cada card
  const fundos = [
    "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?q=80&w=500&auto=format&fit=crop"
  ];

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const res = await AXIOS.get("/api/categories");

        setCategorias(res.data.slice(0, 4));
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCategorias();
  }, []);

  if (loading  || categorias.length === 0) {
    return <div className="py-20 text-center font-bold">Carregando categorias...</div>;
  }

  return (
    <section className="py-16  flex justify-center">
      <div className="max-w-6xl mx-auto px-6 w-full">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categorias.map((item, index) => (
            <motion.div
              key={item.id}
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
                src={fundos[index % fundos.length]}
                alt={item.nome}
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
                    {item.nome}
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