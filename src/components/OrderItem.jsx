export default function OrderItem({ item }) {
  return (
    <div className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-b-0">
      <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
        <img
          src={item.product.imagens?.[0]}
          alt={item.product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-gray-900 mb-1 truncate">
          {item.product.name}
        </p>
        <p className="text-xs text-gray-500">
          {item.product.categoria} · Qtd: {item.quantidade}
        </p>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-bold text-sm text-gray-900">
          R$ {(item.valor_unitario * item.quantidade).toFixed(2)}
        </p>
        <p className="text-xs text-gray-500">
          {item.quantidade} × R$ {item.valor_unitario.toFixed(2)}
        </p>
      </div>
    </div>
  );
}