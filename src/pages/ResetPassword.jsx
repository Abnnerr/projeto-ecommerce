import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AXIOS } from "../services"

export default function ResetPassword() {
    const [seachParams] = useSearchParams();
    const navigate = useNavigate();
    const token = seachParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("As senhas não coincidem.");
            return;
        }
         try {
            setLoading(true);
            await AXIOS.post("/reset-password", {
                token,
                password,
            });

            setSuccess("Senha alterada com sucesso! Redirecionando para o login...");
            
            setTimeout(() => {
                navigate("/login");
            }, 2000);
         } catch (err) {
            setError(
                err.response?.data?.message || "Erro ao alterar a senha. Tente novamente."
            );
         } finally {
            setLoading(false);
         }
    }

    return (
        <div className="">
            <main className="">
            <div>
                <h1 className="">
                    Redefinir senha
                    </h1>

                    <p className="">
                        digite sua nova senha abaixo.
                    </p>

                    {error && (
                        <div className="">
                            {error}
                        </div>
                    )}
            </div>
            </main>
        </div>
    )
}