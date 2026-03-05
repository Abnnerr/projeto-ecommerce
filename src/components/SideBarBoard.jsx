import { NavLink } from "react-router";
import {
    FaChartPie,
    FaImage,
    FaTicketAlt,
    FaUsers,
    FaTags,
    FaBoxOpen
} from "react-icons/fa";

const menuItems = [
    { path: "/admin", label: "Dashboard", icon: FaChartPie, end: true },
    { path: "/admin/banners", label: "Banners", icon: FaImage },
    { path: "/admin/coupons", label: "Cupons", icon: FaTicketAlt },
    { path: "/admin/users", label: "Usuários", icon: FaUsers },
    { path: "/admin/categories", label: "Categorias", icon: FaTags },
    { path: "/admin/products", label: "Produtos", icon: FaBoxOpen },
];

const AdminSidebar = () => {
    return (
        <aside className="h-screen w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl">

            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-slate-800">
                <h1 className="text-xl font-bold text-white tracking-wide">
                    Admin Panel
                </h1>
            </div>

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

            {/* Footer */}
            <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
                © 2026 Admin System
            </div>
        </aside>
    );
};

export default AdminSidebar;