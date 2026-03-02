import { createContext, useContext, useEffect, useState } from "react";
import { AXIOS } from "../services";

const UserContext = createContext();

export function UserProvider({ children }) {
    // 🔹 State do usuário com parse seguro
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem("user");
            return savedUser ? JSON.parse(savedUser) : null;
        } catch (err) {
            console.warn("Erro ao ler usuário do localStorage:", err);
            localStorage.removeItem("user"); // limpar dado corrompido
            return null;
        }
    });

    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [loading, setLoading] = useState(true);

    // 🔹 Configurar token no AXIOS automaticamente
    useEffect(() => {
        if (token) {
            AXIOS.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete AXIOS.defaults.headers.common["Authorization"];
        }
    }, [token]);

    // 🔹 Validar usuário ao iniciar app
    useEffect(() => {
        const fetchUser = async () => {
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const { data } = await AXIOS.get("/auth/me"); // endpoint backend
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            } catch (err) {
                console.warn("Token inválido ou erro ao buscar usuário:", err);
                logout();
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [token]);

    // 🔹 Login
   const login = async (email, senha) => {
    try {
        const response = await AXIOS.post("/api/users/login", { email, senha });

        if (response.data.user && response.data.token) {
            setUser(response.data.user);      // ✅ correto
            setToken(response.data.token);    // ✅ correto
            sessionStorage.setItem("user", JSON.stringify(response.data.user));
            sessionStorage.setItem("token", response.data.token);
        }

        console.log(response.data.user);
        console.log(response.data.token);

        return response;

    } catch (err) {
        throw new Error(err.response?.data?.message || "Erro ao fazer login");
    }
};

    // 🔹 Registro
    const register = async (nome, email, cpf, telefone, genero, data_nasc, senha) => {
        try {
            const { data } = await AXIOS.post("/api/users", {
                nome,
                email,
                cpf,
                telefone,
                genero,
                data_nasc, // string ISO "YYYY-MM-DD"
                senha,
            });

            setUser(data.user);
            setToken(data.token);

            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);

            console.log(data);
            

            return data;
        } catch (err) {
            throw new Error(err.response?.data?.message || "Erro ao criar conta");
        }
    };

    // 🔹 Logout
    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                loading,
                isAuthenticated: !!user,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);