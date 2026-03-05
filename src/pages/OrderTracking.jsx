import React, { useState } from "react";
import { FaSearch, FaCheck, FaClock, FaTruck, FaBox, FaMapMarker } from "react-icons/fa";




const fakeOrders = {
    "3DTECH123": [
        { step: "Pedido recebido", date: "01/03/2026", done: true, icon: FaBox },
        { step: "Produção iniciada", date: "02/03/2026", done: true, icon: FaClock },
        { step: "Em transporte", date: "03/03/2026", done: false, icon: FaTruck },
        { step: "Entregue", date: "04/03/2026", done: false, icon: FaMapMarker },
    ],
    "3DTECH456": [
        { step: "Pedido recebido", date: "28/02/2026", done: true, icon: FaBox },
        { step: "Produção iniciada", date: "01/03/2026", done: true, icon: FaClock },
        { step: "Em transporte", date: "02/03/2026", done: true, icon: FaTruck },
        { step: "Entregue", date: "03/03/2026", done: false, icon: FaMapMarker },
    ]
};

const OrderTracking = () => {
    const [orderNumber, setOrderNumber] = useState("");
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrackOrder = async () => {
        if (!orderNumber.trim()) return;

        setLoading(true);
        setStatus(null);

        // Simular delay de API
        setTimeout(() => {
            const order = fakeOrders[orderNumber.toUpperCase()];
            setStatus(order || []);
            setLoading(false);
        }, 1000);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleTrackOrder();
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-4xl mx-auto px-6 py-12">
                {/* HEADER */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Rastreamento de Pedido
                    </h1>
                    <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
                        Acompanhe o status do seu pedido em tempo real com atualizações precisas
                    </p>
                </div>

                {/* SEARCH SECTION */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-12">
                    <div className="max-w-md mx-auto">
                        <label className="block text-gray-900 text-sm font-medium mb-3">
                            Número do Pedido
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ex: 3DTECH123"
                                value={orderNumber}
                                onChange={(e) => setOrderNumber(e.target.value)}
                                onKeyPress={handleKeyPress}
                                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-colors pr-12"
                            />
                            <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <button
                            onClick={handleTrackOrder}
                            disabled={loading || !orderNumber.trim()}
                            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Buscando...
                                </>
                            ) : (
                                <>
                                    <FaSearch size={16} />
                                    Rastrear Pedido
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* ORDER STATUS */}
                {status && status.length > 0 && (
                    <div className="bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-8">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[#EAEAEA] mb-2">
                                Status do Pedido #{orderNumber.toUpperCase()}
                            </h2>
                            <p className="text-[#808080]">
                                Última atualização: {new Date().toLocaleDateString('pt-BR')}
                            </p>
                        </div>

                        {/* TIMELINE */}
                        <div className="relative">
                            {status.map((step, idx) => {
                                const IconComponent = step.icon;
                                const isLast = idx === status.length - 1;

                                return (
                                    <div key={idx} className="flex items-start gap-6 mb-8 relative">
                                        {/* Timeline line */}
                                        {!isLast && (
                                            <div className={`absolute left-6 top-12 w-0.5 h-16 ${step.done ? 'bg-[#4FF8D9]' : 'bg-[#2A2A2A]'}`}></div>
                                        )}

                                        {/* Icon */}
                                        <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                                            step.done
                                                ? 'bg-[#4FF8D9] text-black'
                                                : 'bg-[#2A2A2A] text-[#808080]'
                                        }`}>
                                            {step.done ? (
                                                <FaCheck size={16} />
                                            ) : (
                                                <IconComponent size={16} />
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`text-lg font-semibold mb-1 ${
                                                step.done ? 'text-[#EAEAEA]' : 'text-[#808080]'
                                            }`}>
                                                {step.step}
                                            </h3>
                                            <p className="text-[#B3B3B3] text-sm mb-2">
                                                {step.date}
                                            </p>
                                            {step.done && (
                                                <div className="inline-flex items-center gap-2 text-[#4FF8D9] text-sm">
                                                    <FaCheck size={12} />
                                                    Concluído
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Current Status Summary */}
                        <div className="mt-8 p-4 bg-[#0D0D0D] rounded-lg border border-[#2A2A2A]">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-[#EAEAEA] font-semibold mb-1">
                                        Status Atual
                                    </h3>
                                    <p className="text-[#808080] text-sm">
                                        {status.find(s => !s.done)?.step || "Pedido entregue"}
                                    </p>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    status.every(s => s.done)
                                        ? 'bg-green-500/20 text-green-400'
                                        : 'bg-[#4FF8D9]/20 text-[#4FF8D9]'
                                }`}>
                                    {status.every(s => s.done) ? 'Entregue' : 'Em andamento'}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* NOT FOUND */}
                {status && status.length === 0 && !loading && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaSearch size={24} className="text-[#808080]" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#EAEAEA] mb-2">
                            Pedido não encontrado
                        </h3>
                        <p className="text-[#808080] max-w-md mx-auto">
                            Verifique se o número do pedido está correto e tente novamente.
                            Pedidos são rastreados apenas após a confirmação do pagamento.
                        </p>
                    </div>
                )}

                {/* HELP SECTION */}
                <div className="mt-12 bg-[#1E1E1E] rounded-xl border border-[#2A2A2A] p-8">
                    <h3 className="text-xl font-semibold text-[#EAEAEA] mb-4">
                        Precisa de ajuda?
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="text-[#EAEAEA] font-medium mb-2">Onde encontrar o número do pedido?</h4>
                            <p className="text-[#808080] text-sm">
                                O número do pedido foi enviado por email na confirmação da compra.
                                Também está disponível na sua conta, na seção "Meus Pedidos".
                            </p>
                        </div>
                        <div>
                            <h4 className="text-[#EAEAEA] font-medium mb-2">Problemas com o rastreamento?</h4>
                            <p className="text-[#808080] text-sm">
                                Entre em contato conosco pelo email suporte@3dtech.com ou
                                pelo WhatsApp (11) 99999-9999.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderTracking;