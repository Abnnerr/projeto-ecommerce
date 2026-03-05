import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
    return (
        <div className="flex">
            <Sidebar />

            <main className="flex-1 bg-gray-600 min-h-screen p-6">
                <Outlet />
            </main>
        </div>
    );
}