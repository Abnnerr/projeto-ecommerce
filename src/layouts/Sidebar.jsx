import { aside } from "framer-motion/client";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="">
            <div className="">

            </div>

            <nav className="">
                <NavLink
                    to="/admin/dashboard"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink
                    to="/admin/products"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Products
                </NavLink>

                <NavLink
                    to="/admin/categories"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Categories
                </NavLink>

                <NavLink
                    to="/admin/users"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Users
                </NavLink>

                <NavLink
                    to="/admin/banners"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Banners
                </NavLink>

                <NavLink
                    to="/admin/coupons"
                    className={({ isActive }) =>
                        `block px-4 py-2 rounded-lg transition ${isActive
                            ? "bg-cyan-600"
                            : "hover:bg-slate-700"
                        }`
                    }
                >
                    Coupons
                </NavLink>

            </nav>

            <div className="p-4 border-t border-slate-700">
                    <button className="w-full bg-red-600 hover:bg-red-700 py-2 rounded-lg">
                        Logout
                    </button>
            </div>
        </aside>
    )
}