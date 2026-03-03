export default function OrderItem({ item }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 0",
        borderBottom: "1px solid #f3f4f6",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          background: "#f3f4f6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          overflow: "hidden",
        }}
      >
        <img
          src={item.product.imagens[0]}
          alt={item.product.name}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, fontSize: 14, color: "#111827", margin: 0 }}>
          {item.product.name}
        </p>
        <p style={{ fontSize: 12, color: "#9ca3af", margin: "2px 0 0" }}>
          {item.product.categoria} · Qtd: {item.quantidade}
        </p>
      </div>

      <div style={{ textAlign: "right", flexShrink: 0 }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: "#111827", margin: 0 }}>
          R$ {(item.valor_unitario * item.quantidade).toFixed(2)}
        </p>
        <p style={{ fontSize: 11, color: "#9ca3af", margin: "2px 0 0" }}>
          {item.quantidade} × R$ {item.valor_unitario.toFixed(2)}
        </p>
      </div>
    </div>
  );
}