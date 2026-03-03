const HeaderAuth = () => {
    return (
        <header className="bg-zinc-900 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 py-4 flex itens-center justify-between">
                <h1 className="text-xl font-mono text-gray-300">3Dtech</h1>
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