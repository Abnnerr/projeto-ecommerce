import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartProvider";
import { FaTruck, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useUser } from "../contexts/UsuarioProvider";
import { AXIOS } from "../services";
import { Title } from "react-head";

const Checkout = () => {
  const { cart, totalItems, clearCart } = useCart();
  const { user } = useUser();
  const navigate = useNavigate();

  // Endereço e Frete
  const [cep, setCep] = useState("");
  const [frete, setFrete] = useState(0);
  const [logradouro, setLogradouro] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");

  // Cupom e Pagamento
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(null);
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

  const handleCalculateShipping = () => {
    if (!cep || cep.length < 8) return;
    setFrete(15); // frete simulado
  };

  const handleApplyCoupon = async () => {

    try {
      const response = await AXIOS.get(`/api/coupons/${cupom}`);
      console.log(response.data);
      setCupomAplicado(response.data)
    } catch (error) {
      console.log(error)
    }

  };

  const handleFinalizePurchase = async () => {
    // Validações
    if (!logradouro || !numero || !bairro || !cidade || !estado || !cep) {
      alert("Por favor, preencha todos os campos de endereço");
      return;
    }

    if (cart.length === 0) {
      alert("Seu carrinho está vazio");
      return;
    }

    setLoading(true);

    try {
      // Calcular previsão de entrega (5 dias úteis)
      const previsaoEntrega = new Date();
      previsaoEntrega.setDate(previsaoEntrega.getDate() + 5);

      // Criar pedido
      const pedidoData = {
        usuario_id: user.id,
        status: "pendente",
        valor_total: total.toFixed(2),
        valor_desc: desconto.toFixed(2),
        logradouro,
        numero,
        complemento: complemento || "",
        bairro,
        cidade,
        estado,
        cep,
        previsao_entrega: previsaoEntrega.toISOString().split('T')[0], // YYYY-MM-DD
        cupom_id: cupomAplicado ? 1 : null, // ajuste conforme seu banco
        metodo_pagamento: payment
      };

      const response = await AXIOS.post("/api/orders", pedidoData);
      const pedidoId = response.data.id;

      // Criar pedido_produto para cada item
      const pedidoProdutos = cart.map(item => ({
        pedido_id: pedidoId,
        produto_id: item.id,
        quantidade: item.quantidade,
        valor_unitario: item.valor
      }));

      await AXIOS.post("/api/", { itens: pedidoProdutos });

      alert(`Pedido criado com sucesso! ID: ${pedidoId}\nTotal: R$ ${total.toFixed(2)}`);
      clearCart();
      navigate(`/ order - tracking ? pedido_id = ${pedidoId}`);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Erro ao processar o pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 font-sans text-gray-900 bg-white">
      <Title>3Dtech - Checkout</Title>
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
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-bold border-b border-gray-200 pb-2 flex items-center gap-2">
              <FaTruck className="text-purple-600" /> Entrega e Frete
            </h2>
            <div className="flex flex-col md:flex-row gap-3">
              <input
                type="text"
                placeholder="Digite seu CEP"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                className="flex-1 p-3 rounded-md border border-gray-300"
              />
              <button
                onClick={handleCalculateShipping}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-md font-semibold"
              >
                Calcular
              </button>
            </div>
            {frete > 0 && <p className="text-green-600 font-semibold">Frete: R$ {frete.toFixed(2)}</p>}

            <input
              type="text"
              placeholder="Rua"
              value={logradouro}
              onChange={(e) => setLogradouro(e.target.value)}
              className="flex-1 p-3 rounded-md border border-gray-300"
            />
            <input
              type="text"
              placeholder="Número"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
              className="w-24 p-3 rounded-md border border-gray-300"
            />
            <input
              type="text"
              placeholder="Complemento (opcional)"
              value={complemento}
              onChange={(e) => setComplemento(e.target.value)}
              className="flex-1 p-3 rounded-md border border-gray-300"
            />
            <input
              type="text"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
              className="w-32 p-3 rounded-md border border-gray-300"
            />
            <div className="flex gap-2 w-full">
              <input
                type="text"
                placeholder="Cidade"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                className="flex-1 p-3 rounded-md border border-gray-300"
              />
              <input
                type="text"
                placeholder="UF"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                maxLength="2"
                className="w-16 p-3 rounded-md border border-gray-300"
              />
            </div>

          </div>

          {/* CUPOM */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm flex gap-3 items-center">
            <input
              type="text"
              placeholder="Cupom de desconto"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
              className="flex-1 p-3 rounded-md border border-gray-300"
            />
            <button
              onClick={handleApplyCoupon}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md font-semibold"
            >
              Aplicar
            </button>
          </div>

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
};

export default Checkout;