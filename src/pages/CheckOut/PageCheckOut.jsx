import React, { useEffect, useState } from "react";
import { useCart } from "../../contexts/CartProvider";
import { FaTruck, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useUser } from "../../contexts/UsuarioProvider";
import { AXIOS } from "../../services";
import Coupon from "./components/Coupon";
import Frete from "./components/Frete";

const PageCheckOut = () => {
    const { cart, totalItems, clearCart, frete, dadosLocalizacao, cupomAplicado } = useCart();
    // console.log(dadosLocalizacao);

    const { user } = useUser();
    const navigate = useNavigate();

    // Endereço e Frete


    const [payment, setPayment] = useState("pix");
    const [loading, setLoading] = useState(false);

    const subtotal = cart.reduce(
        (acc, item) => acc + Number(item.valor) * item.quantidade,
        0
    );

    const desconto = cupomAplicado
        ? subtotal * (cupomAplicado.valor_desc / 100)
        : 0;

    const total = subtotal - desconto + frete;

    useEffect(() => {
        if (!user) navigate('/')
    }, [user, navigate]);




    const handleFinalizePurchase = async () => {
        // if (!dadosLocalizacao.logradouro || !dadosLocalizacao.numero || !dadosLocalizacao.bairro || !dadosLocalizacao.cidade || !dadosLocalizacao.estado || !dadosLocalizacao.cep) {
        //     alert("Por favor, preencha todos os campos de endereço");
        //     return;
        // }

        if (cart.length === 0) {
            alert("Seu carrinho está vazio");
            return;
        }

        setLoading(true);

        try {

            const hoje = new Date();
            const diasEntrega = frete.custom_delivery_time || frete.delivery_time || 0;

            const previsaoEntrega = new Date(hoje);
            previsaoEntrega.setDate(hoje.getDate() + diasEntrega);

            const previsao = previsaoEntrega.toISOString().split("T")[0];

            const itens = cart.map(item => ({
                produto_id: item.id,
                quantidade: item.quantidade
            }));

            const pedidoData = {
                usuario_id: user.id,
                logradouro: dadosLocalizacao.logradouro,
                numero: dadosLocalizacao.numero,
                complemento: dadosLocalizacao.complemento || "",
                bairro: dadosLocalizacao.bairro,
                cidade: dadosLocalizacao.cidade,
                estado: dadosLocalizacao.estado,
                cep: dadosLocalizacao.cep,
                previsao_entrega: previsao,
                cupom_id: cupomAplicado ? cupomAplicado.id : null,
                metodo_pagamento: payment,
                itens
            };

            console.log(pedidoData);

            const response = await AXIOS.post("/api/orders", pedidoData);

            const pedido = response.data;
            console.log(pedido);
            
            clearCart();

            // navigate(`/order-tracking?pedido_id=${pedido.id}`);
        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            alert("Erro ao processar o pedido. Tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-4 md:p-8 font-sans text-gray-900 bg-white">

            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">
                {/* FORMULÁRIO PRINCIPAL */}
                <div className="lg:col-span-2 space-y-6">

                    {/* DADOS DO CLIENTE */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-xl font-bold border-b border-gray-200 pb-2">Dados do Cliente</h2>
                        <input type="text" placeholder="Nome completo" className="w-full p-3 rounded-md border border-gray-300" />
                        <input type="email" placeholder="E-mail" className="w-full p-3 rounded-md border border-gray-300" />
                        <input type="text" placeholder="Telefone" className="w-full p-3 rounded-md border border-gray-300" />
                    </div>

                    {/* ENDEREÇO E FRETE */}
                    <Frete />
                    {/* CUPOM */}
                    <Coupon />

                    {/* PAGAMENTO */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
                        <h2 className="text-xl font-bold border-b border-gray-200 pb-2">Pagamento</h2>
                        <div className="grid gap-4 md:grid-cols-2">
                            <label className={`p - 4 border rounded - md flex items - center gap - 3 cursor - pointer ${payment === "pix" ? "border-purple-600 text-gray-900" : ""}`}>
                                <FaMoneyBillWave className="text-purple-600" /> Pix
                                <input type="radio" checked={payment === "pix"} onChange={() => setPayment("pix")} className="hidden" />
                            </label>
                            <label className={`p - 4 border rounded - md flex items - center gap - 3 cursor - pointer ${payment === "card" ? "border-purple-600 text-gray-900" : ""} `}>
                                <FaCreditCard className="text-purple-600" /> Cartão de Crédito
                                <input type="radio" checked={payment === "card"} onChange={() => setPayment("card")} className="hidden" />
                            </label>
                        </div>

                        {/* Campos extras para cartão */}
                        {payment === "card" && (
                            <div className="space-y-4 mt-4">
                                <input type="text" placeholder="Número do cartão" className="w-full p-3 rounded-md border border-gray-300" />
                                <div className="flex gap-3">
                                    <input type="text" placeholder="Validade" className="flex-1 p-3 rounded-md border border-gray-300" />
                                    <input type="text" placeholder="CVV" className="w-24 p-3 rounded-md border border-gray-300" />
                                </div>
                            </div>
                        )}

                        {/* Mensagem Pix */}
                        {payment === "pix" && (
                            <p className="text-green-600 font-semibold mt-2">Você escolheu pagamento via Pix.</p>
                        )}
                    </div>

                    <button
                        onClick={handleFinalizePurchase}
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-5 rounded-md text-lg transition">
                        {loading ? "Processando..." : "Finalizar Compra"}
                    </button>
                </div>

                {/* RESUMO DO PEDIDO */}
                <aside className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4 sticky top-8 h-fit">
                    <h3 className="text-xl font-bold border-b border-gray-200 pb-2">Resumo do Pedido ({totalItems} itens)</h3>
                    <div className="space-y-2 max-h-[400px] overflow-y-auto">
                        {cart.map(item => (
                            <div key={item.id} className="flex justify-between border-b border-gray-200 py-2">
                                <div>
                                    <p className="font-semibold">{item.nome}</p>
                                    <p className="text-gray-500 text-sm">R$ {(Number(item.valor) * item.quantidade).toFixed(2)}</p>
                                </div>
                                <div>{item.quantidade}x</div>
                            </div>
                        ))}
                    </div>
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-gray-500">Subtotal: <span>R$ {subtotal.toFixed(2)}</span></div>
                        {desconto > 0 && <div className="flex justify-between text-green-600 font-semibold">Desconto {cupomAplicado?.valor_desc}%: <span>-R$ {desconto.toFixed(2)}</span></div>}
                        <div className="flex justify-between text-gray-500">Frete: <span>R$ {frete.toFixed(2)}</span></div>
                        <div className="flex justify-between font-bold text-lg text-purple-600">Total: <span>R$ {total.toFixed(2)}</span></div>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default PageCheckOut;