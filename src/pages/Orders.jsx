import { useEffect, useState } from "react";
import { AXIOS } from "../services/index.js";
import OrderCard from "../components/OrderCard.jsx";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const request = await AXIOS.get("/orders");
        setOrders(request.data);
      } catch (error) {
        console.error("Erro ao buscar pedidos", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f8f9fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#9ca3af",
          fontSize: 14,
        }}
      >
        Carregando pedidos...
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8f9fb",
        padding: "40px 20px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        {/* Page header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", margin: 0 }}>
            Meus Pedidos
          </h1>
          <p style={{ fontSize: 14, color: "#9ca3af", margin: "4px 0 0" }}>
            {orders.length} {orders.length === 1 ? "pedido encontrado" : "pedidos encontrados"}
          </p>
        </div>

        {orders.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "60px 20px",
              background: "#fff",
              borderRadius: 16,
              border: "1px solid #f0f0f0",
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d1d5db"
              strokeWidth="1.5"
              style={{ margin: "0 auto 12px", display: "block" }}
            >
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            <p style={{ color: "#6b7280", fontWeight: 600, margin: "0 0 4px" }}>
              Nenhum pedido ainda
            </p>
            <p style={{ color: "#9ca3af", fontSize: 13, margin: 0 }}>
              Seus pedidos aparecerão aqui assim que você comprar algo.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}