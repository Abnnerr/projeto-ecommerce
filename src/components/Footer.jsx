import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AXIOS } from "../services";

const Footer = () => {
    const [showMessage, setShowMessage] = useState(false);
    const [email, setEmail] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setShowMessage(true);
            let request = await AXIOS.post('/', email)
            console.log(request.data);

        } catch (error) {
            console.log(error.message);
        }
        finally {
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        }





    };

    return (
        <footer className="border-t border-[#2A2A2A] bg-[#181818] text-[#B3B3B3]">

            <AnimatePresence>
                {showMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="
                        fixed top-6 right-6 z-50
                        bg-[#1E1E1E]
                        border border-[#2A2A2A]
                        text-[#EAEAEA]
                        px-5 py-3
                        rounded-lg
                        shadow-lg
                        text-sm
                        "
                    >
                        Email cadastrado com sucesso ✓
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10">

                {/* Menu */}
                <div className="space-y-4">

                    <h2 className="text-sm uppercase tracking-widest text-[#808080]">
                        Navegação
                    </h2>

                    <ul className="space-y-2">
                        {["Home", "Produtos", "Contato"].map((item) => (
                            <li
                                key={item}
                                className="
                                text-[#B3B3B3]
                                hover:text-[#EAEAEA]
                                transition-colors
                                duration-200
                                cursor-pointer
                                "
                            >
                                {item}
                            </li>
                        ))}
                    </ul>

                </div>

                {/* Newsletter */}
                <div className="space-y-4">

                    <h2 className="text-sm uppercase tracking-widest text-[#808080]">
                        Newsletter
                    </h2>

                    <p className="text-sm text-[#808080]">
                        Receba atualizações e novidades do sistema.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="flex gap-3"
                    >

                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="seu@email.com"
                            className="
                            flex-1
                            px-4 py-2.5
                            bg-[#1E1E1E]
                            border border-[#2A2A2A]
                            rounded-lg
                            outline-none
                            focus:border-[#3B82F6]
                            focus:text-[#EAEAEA]
                            text-sm
                            transition
                            "
                            required
                        />

                        <button
                            type="submit"
                            className="
                            px-4 py-2.5
                            bg-[#3B82F6]
                            text-white
                            rounded-lg
                            text-sm
                            font-medium
                            hover:bg-[#2563EB]
                            transition
                            "
                        >
                            Inscrever
                        </button>

                    </form>

                </div>

            </div>

            {/* Bottom */}
            <div className="border-t border-[#2A2A2A]">

                <div className="max-w-6xl mx-auto px-6 py-6 text-xs text-[#808080] flex justify-between">

                    <span className="text-[#808080]">
                        © 2026 <span className="text-[#EAEAEA]">Ecommerce 3DTech</span>
                    </span>

                    <span className="tracking-wide text-[#5A5A5A]">
                        v1.0.0
                    </span>

                </div>
            </div>
        </footer>
    );
};

export default Footer;