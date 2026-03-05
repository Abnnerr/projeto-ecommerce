const HeaderAuth = () => {
    return (
        <header className="bg-zinc-900 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <a href="/"><img src="/logo-icon.svg " className="w-10 h-10"></img></a>
                <a href="/Login"
                    className="text-sm text-gray-300 hover:text-purple-600 transition"
                >
                    Entrar
                </a>
            </div>
        </header>
    );
}

export default HeaderAuth;