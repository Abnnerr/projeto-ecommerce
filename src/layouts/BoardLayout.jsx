import { Outlet } from "react-router";

const BoardLayout = () => {
    return (
        <div className="min-h-screen bg-[var(--bg)] text-white">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-6">
                <Outlet />
            </div>
        </div>
    );
}

export default BoardLayout;
