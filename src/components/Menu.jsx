import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Início", href: "/" },
    { name: "Quem Somos", href: "#" },
    { name: "Produtos", href: "#" },
    { name: "Projetos Personalizados", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Rastreie seu Pedido", href: "#" },
    { name: "Filamentos 3D", href: "#" },
  ];

  return (
    <header className="
      w-full
      bg-[#0D0D0D]
      border-b border-[#2A2A2A]
    ">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-center h-14">
          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center gap-6">

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="
                  text-sm
                  text-[#B3B3B3]
                  hover:text-[#EAEAEA]
                  transition-colors
                  duration-200
                "
              >
                {link.name}
              </a>
            ))}

          </nav>

          {/* Botão Mobile */}
          <button
            onClick={() => setOpen(!open)}
            className="
              md:hidden
              text-[#B3B3B3]
              hover:text-[#EAEAEA]
              text-lg
              transition
            "
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>

        </div>

      </div>

      {/* Menu Mobile */}
      {open && (
        <div className="
          md:hidden
          bg-[#1E1E1E]
          border-t border-[#2A2A2A]
        ">

          <nav className="flex flex-col py-3">

            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="
                  px-6 py-3
                  text-sm
                  text-[#B3B3B3]
                  hover:text-[#EAEAEA]
                  hover:bg-[#2A2A2A]/40
                  transition
                "
              >
                {link.name}
              </a>
            ))}

          </nav>

        </div>
      )}

    </header>
  );
}