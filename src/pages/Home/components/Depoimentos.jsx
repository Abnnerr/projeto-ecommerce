import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AXIOS } from "../../../services";

const Depoimentos = () => {

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    async function buscarReview() {
      try {
        const response = await AXIOS.get('/api/reviews')
        console.log(response.data);

        setReviews(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    buscarReview()
  }, [])
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
        <div className={`${reviews?.length > 0 ? 'grid grid-cols-1 md:grid-cols-3 gap-6 mb-16' : 'py-20 text-center flex items-center justify-center font-bold'} `}>

          {
            reviews?.length > 0 ? (reviews.map((item, index) => (
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

                {
                  item.usuarios.foto ? (
                    <img
                      src={item.usuarios.foto}
                      alt={item.nome}
                      className="
                w-12 h-12
                rounded-full
                object-cover
                border border-[#2A2A2A]
                "
                    />
                  ) : (
                    <div className="px-2.5 py-2 *:font-bold *:text-xl rounded-full bg-gray-600 flex  justify-center gap-1">
                      <span> {item.usuarios.nome[0].toUpperCase()}</span>
                      <span> {item.usuarios.nome[1].toUpperCase()}</span>
                    </div>
                  )
                }

                {/* Conteúdo */}
                <div>

                  <p className="
                  text-[#B3B3B3]
                  text-sm
                  leading-relaxed
                  mb-2
                ">
                    "{item.descricao}"
                  </p>

                  <span className="
                  text-[#EAEAEA]
                  text-xs
                  font-medium
                ">
                    {item.usuarios.nome}
                  </span>

                </div>

              </motion.div>
            ))) : (
              <div>Nenhum Depoimento</div>
            )
          }

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