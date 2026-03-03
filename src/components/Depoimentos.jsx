import React from "react";
import { motion } from "framer-motion";

const Depoimentos = () => {
  const reviews = [
    {
      nome: "Elvis",
      texto: "Produtos de altíssima fidelidade e acabamento impecável.",
      foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
    },
    {
      nome: "Diego",
      texto: "Entrega ágil e um cuidado único em cada detalhe.",
      foto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100&auto=format&fit=crop"
    },
    {
      nome: "Juliana",
      texto: "Excelente qualidade e experiência profissional.",
      foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-20 ">

      <div className="max-w-6xl mx-auto px-6">

        {/* Título */}
        <div className="flex items-center justify-center gap-4 mb-12">

          <div className="h-px w-12 bg-[#2A2A2A]" />

          <h2 className="text-[#1E1E1E] text-lg font-semibold tracking-wide">
            Feedback dos clientes
          </h2>

          <div className="h-px w-12 bg-[#2A2A2A]" />

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">

          {reviews.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="
              bg-[#1E1E1E]
              border border-[#2A2A2A]
              rounded-xl
              p-5
              flex gap-4
              items-start
              "
            >

              {/* Foto */}
              <img
                src={item.foto}
                alt={item.nome}
                className="
                w-12 h-12
                rounded-full
                object-cover
                border border-[#2A2A2A]
                "
              />

              {/* Conteúdo */}
              <div>

                <p className="
                  text-[#B3B3B3]
                  text-sm
                  leading-relaxed
                  mb-2
                ">
                  "{item.texto}"
                </p>

                <span className="
                  text-[#EAEAEA]
                  text-xs
                  font-medium
                ">
                  {item.nome}
                </span>

              </div>

            </motion.div>
          ))}

        </div>

        {/* Banner minimalista */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="
          bg-[#1E1E1E]
          border border-[#2A2A2A]
          rounded-xl
          p-10
          text-center
          "
        >

          <h3 className="
            text-[#EAEAEA]
            text-xl
            font-semibold
            mb-4
          ">
            Engenharia & Tecnologia
          </h3>

          <p className="
            text-[#B3B3B3]
            max-w-2xl
            mx-auto
            text-sm
            leading-relaxed
          ">
            Na <span className="text-[#EAEAEA] font-medium">3DCOMTECH</span>,
            combinamos desenvolvimento de software e manufatura 3D para criar
            produtos com precisão, qualidade e inovação.
          </p>

          {/* linha accent */}
          <div className="
            mt-6
            mx-auto
            h-px
            w-16
            bg-[#3B82F6]
            opacity-70
          " />

        </motion.div>

      </div>

    </section>
  );
};

export default Depoimentos;