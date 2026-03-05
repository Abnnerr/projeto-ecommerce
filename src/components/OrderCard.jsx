import { useState } from "react";
import OrderItem from "./OrderItem.jsx";
import { FaChevronDown, FaChevronUp, FaCopy, FaCheck } from "react-icons/fa";

const STATUS_CONFIG = {
  Entregue: {
    color: "text-green-700",
    bg: "bg-green-100",
    border: "border-green-200",
    icon: FaCheck,
  },
  "Em trânsito": {
    color: "text-yellow-700",
    bg: "bg-yellow-100",
    border: "border-yellow-200",
    icon: FaCheck,
  },
  Cancelado: {
    color: "text-red-700",
    bg: "bg-red-100",
    border: "border-red-200",
    icon: FaCheck,
  },
  Processando: {
    color: "text-purple-700",
    bg: "bg-purple-100",
    border: "border-purple-200",
    icon: FaCheck,
  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || {
    color: "text-gray-700",
    bg: "bg-gray-100",
    border: "border-gray-200",
    icon: FaCheck
  };
  const IconComponent = cfg.icon;

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${cfg.color} ${cfg.bg} border ${cfg.border}`}>
      <IconComponent size={12} />
      {status}
    </span>
  );
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={copy}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-md border text-sm font-medium transition-colors ${
        copied
          ? 'bg-green-50 text-green-700 border-green-200'
          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
      }`}
    >
      {copied ? (
        <>
          <FaCheck size={12} />
          Copiado
        </>
      ) : (
        <>
          <FaCopy size={12} />
          Copiar
        </>
      )}
    </button>
  );
}

export default function OrderCard({ order }) {
  const [open, setOpen] = useState(false);

  const formattedDate = new Date(order.date + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedDelivery = new Date(order.previsao_entrega + "T12:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });

  const addr = order.endereco;
  const fullAddr = `${addr.logradouro}, ${addr.numero} — ${addr.bairro}, ${addr.cidade}/${addr.estado}`;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-lg text-gray-900">
                  Pedido #{order.id}
                </span>
                <StatusBadge status={order.status} />
              </div>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-end gap-4">
            <span className="font-bold text-2xl text-gray-900">
              R$ {order.valor_total.toFixed(2)}
            </span>
            <button
              onClick={() => setOpen(!open)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition-colors ${
                open
                  ? 'bg-gray-50 text-gray-900 border-gray-300'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {open ? 'Ocultar' : 'Detalhes'}
              {open ? <FaChevronUp size={14} /> : <FaChevronDown size={14} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded details */}
      {open && (
        <div className="border-t border-gray-200">
          {/* Items */}
          <div className="p-6 pt-4">
            <h3 className="font-semibold text-gray-900 mb-4">Itens do pedido</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <OrderItem key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Meta info */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Código de Rastreio
                </p>
                <p className="font-semibold text-gray-900 mb-2">
                  {order.cod_rastreio}
                </p>
                <CopyButton text={order.cod_rastreio} />
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Previsão de Entrega
                </p>
                <p className="font-semibold text-gray-900">
                  {formattedDelivery}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Endereço de Entrega
                </p>
                <p className="font-semibold text-gray-900 leading-relaxed">
                  {fullAddr}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}