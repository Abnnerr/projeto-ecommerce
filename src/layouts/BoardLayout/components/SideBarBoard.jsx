import { Link, NavLink, useNavigate } from "react-router";
import {
    FaChartPie,
    FaImage,
    FaTicketAlt,
    FaUsers,
    FaTags,
    FaBoxOpen,
    FaJediOrder
} from "react-icons/fa";
import { useUser } from "../../../contexts/UsuarioProvider";


const menuItems = [
    { path: "/admin", label: "Dashboard", icon: FaChartPie, end: true },
    { path: "/admin/banners", label: "Banners", icon: FaImage },
    { path: "/admin/coupons", label: "Cupons", icon: FaTicketAlt },
    { path: "/admin/users", label: "Usuários", icon: FaUsers },
    { path: "/admin/categories", label: "Categorias", icon: FaTags },
    { path: "/admin/products", label: "Produtos", icon: FaBoxOpen },
    { path: "/admin/orders", label: "Pedidos", icon: FaJediOrder },
];

const AdminSidebar = () => {
    const { logout } = useUser()
    const navigate = useNavigate()
    return (
        <aside className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
            <Link to={'/'} className="p-6 border-b border-slate-700 flex justify-center">
                <img
                    src="/logo-icon-name.svg"
                    alt="Logo"
                    className="h-10 object-contain" />
            </Link>
            {/* Menu */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={index}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                ${isActive
                                    ? "bg-indigo-600 text-white shadow-lg"
                                    : "hover:bg-slate-800 hover:text-white"
                                }`
                            }
                        >
                            <Icon className="text-lg" />
                            {item.label}
                        </NavLink>
                    );
                })}
            </nav>
            <div className="p-4 border-t border-slate-700">
                <button onClick={() => { logout(), navigate('/login') }} className="w-full bg-purple-600 text-white font-mono hover:bg-purple-700 py-2 rounded-lg">
                    Logout
                </button>
            </div>
            <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
                © 2026 Admin System
            </div>
        </aside>
    )
};

export default AdminSidebar;