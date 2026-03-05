import { createContext, useContext, useEffect, useState } from "react";
import { AXIOS } from "../services";
import { useNavigate } from "react-router";


const UserContext = createContext();

export function UserProvider({ children }) {


    // 🔹 Inicializa user corretamente do sessionStorage
    const [user, setUser] = useState(() => {
        const savedUser = sessionStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [userBarOpen, setUserBarOpen] = useState()
    const isOpen = () => setUserBarOpen(true)
    const isClose = () => setUserBarOpen(false)

    const [token, setToken] = useState(() =>
        sessionStorage.getItem("token") || null
    );

    // const [loading, setLoading] = useState(false);

    // 🔹 Configura o token automaticamente no Axios
    useEffect(() => {
        if (token) {
            AXIOS.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete AXIOS.defaults.headers.common["Authorization"];
        }
    }, [token]);

    // 🔹 Debug opcional (pode remover depois)
    useEffect(() => {
        console.log("User atualizado:", user);
        console.log("Token atualizado:", token);
    }, [user, token]);

    // 🔹 Login
    const login = async (email, senha) => {
        try {
            const { data } = await AXIOS.post("/api/auth/login", { email, senha });
            // console.log(data)
            if (data.usuario && data.token) {
                setUser(data.usuario);
                setToken(data.token);
                sessionStorage.setItem("user", JSON.stringify(data.user));
                sessionStorage.setItem("token", data.token);

            }

            return data;

        } catch (err) {
            throw new Error(err.response?.data?.message || "Erro ao fazer login");
        }
    };

    // 🔹 Registro (agora usando sessionStorage também)
    const register = async (nome, email, cpf, telefone, genero, data_nasc, senha) => {
        try {
            console.log(cpf, telefone);

            let data;

            if (user?.nivel === 'admin') {
                const response = await AXIOS.post("/api/users", {
                    nome,
                    email,
                    cpf,
                    telefone,
                    genero,
                    data_nasc,
                    senha,
                    nivel: "admin"
                });

                data = response.data;

            } else {
                const response = await AXIOS.post("/api/users", {
                    nome,
                    email,
                    cpf,
                    telefone,
                    genero,
                    data_nasc,
                    senha,
                });

                data = response.data;
            }

            if (data.user && data.token) {
                setUser(data.user);
                setToken(data.token);

                sessionStorage.setItem("user", JSON.stringify(data.user));
                sessionStorage.setItem("token", data.token);
            }

            return data;

        } catch (err) {
            throw new Error(err.response?.data?.message || "Erro ao criar conta");
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        sessionStorage.removeItem("user");
        sessionStorage.removeItem("token");
    };

    return (
        <UserContext.Provider
            value={{
                user,
                token,
                login,
                register,
                logout,
                isAuthenticated: !!user,

                userBarOpen,
                isOpen,
                isClose
            }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);