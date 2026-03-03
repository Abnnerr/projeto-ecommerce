import { useState } from "react";
import OrderItem from "./OrderItem.jsx";

const STATUS_CONFIG = {
  Entregue: {
    color: "#16a34a",
    bg: "#dcfce7",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  "Em trânsito": {
    color: "#d97706",
    bg: "#fef3c7",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <rect x="1" y="3" width="15" height="13" />
        <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  Cancelado: {
    color: "#dc2626",
    bg: "#fee2e2",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  Processando: {
    color: "#7c3aed",
    bg: "#ede9fe",
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { color: "#6b7280", bg: "#f3f4f6", icon: null };
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "3px 10px",
        borderRadius: 999,
        fontSize: 12,
        fontWeight: 600,
        color: cfg.color,
        background: cfg.bg,
      }}
    >
      {cfg.icon}
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
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 6,
        border: "1px solid #e5e7eb",
        background: copied ? "#f0fdf4" : "#f9fafb",
        color: copied ? "#16a34a" : "#6b7280",
        fontSize: 12,
        fontWeight: 500,
        cursor: "pointer",
      }}
    >
      {copied ? "✓ Copiado" : "Copiar"}
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
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        border: "1px solid #f0f0f0",
        boxShadow: "0 1px 4px rgba(0,0,0,.06)",
        marginBottom: 16,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "18px 20px",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "#111827" }}>
              Pedido #{order.id}
            </span>
            <StatusBadge status={order.status} />
          </div>
          <span style={{ fontSize: 12, color: "#9ca3af" }}>{formattedDate}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ fontWeight: 800, fontSize: 18, color: "#111827" }}>
            R$ {order.valor_total.toFixed(2)}
          </span>
          <button
            onClick={() => setOpen(!open)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
              border: "1px solid #e5e7eb",
              background: open ? "#f9fafb" : "#fff",
              color: "#374151",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {open ? "Ocultar" : "Detalhes"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform .2s" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded details */}
      {open && (
        <div style={{ borderTop: "1px solid #f3f4f6" }}>
          {/* Items */}
          <div style={{ padding: "4px 20px 8px" }}>
            {order.items.map((item, index) => (
              <OrderItem key={index} item={item} />
            ))}
          </div>

          {/* Meta info */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
              gap: 16,
              padding: "16px 20px 20px",
              background: "#fafafa",
              borderTop: "1px solid #f3f4f6",
            }}
          >
            <div>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>Rastreio</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: "0 0 6px" }}>
                {order.cod_rastreio}
              </p>
              <CopyButton text={order.cod_rastreio} />
            </div>

            <div>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>Previsão de entrega</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: 0 }}>
                {formattedDelivery}
              </p>
            </div>

            <div>
              <p style={{ fontSize: 11, color: "#9ca3af", margin: "0 0 2px" }}>Endereço</p>
              <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: 0, lineHeight: 1.5 }}>
                {fullAddr}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}