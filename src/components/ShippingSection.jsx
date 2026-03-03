import React, { useState } from 'react';

const ShippingSection = ({ onShippingSelect, originCep }) => {
  const [cep, setCep] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const calculateShipping = async (targetCep) => {
    setLoading(true);
    try {
      const response = await fetch('https://sandbox.melhorenvio.com.br/api/v2/me/shipment/calculate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer SEU_TOKEN_AQUI', // <--- COLOQUE SEU TOKEN DO SANDBOX AQUI
          'User-Agent': 'CineVita (seu-email@exemplo.com)' 
        },
        body: JSON.stringify({
          from: { postal_code: originCep },
          to: { postal_code: targetCep },
          products: [{ id: "p1", width: 15, height: 5, length: 20, weight: 0.5, quantity: 1 }]
        })
      });

      if (!response.ok) throw new Error('Erro na resposta da API');

      const data = await response.json();
      setOptions(Array.isArray(data) ? data.filter(opt => !opt.error) : []);
    } catch (error) {
      console.error("Erro ao conectar com Melhor Envio:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCepChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    setCep(val);
    if (val.length === 8) calculateShipping(val);
  };

  return (
    <div className="space-y-4">
      <input 
        type="text"
        placeholder="Digite seu CEP (ex: 01001000)"
        value={cep}
        onChange={handleCepChange}
        maxLength={8}
        className="w-full border border-gray-300 rounded-md p-3 bg-slate-700 text-white focus:ring-2 focus:ring-purple-500 outline-none"
      />

      {loading && <p className="text-purple-400 animate-pulse text-sm">Buscando frete...</p>}

      <div className="grid gap-3">
        {options.map((opt) => (
          <label key={opt.id} className="border border-slate-700 rounded-lg p-4 flex justify-between items-center bg-slate-900 cursor-pointer hover:border-emerald-500 transition-all">
            <div className="flex items-center gap-3">
              <input type="radio" name="ship" onChange={() => onShippingSelect(opt)} className="accent-emerald-500 w-4 h-4" />
              <div>
                <p className="font-bold text-sm text-white">{opt.company.name} ({opt.name})</p>
                <p className="text-xs text-slate-400">{opt.delivery_range.max} dias úteis</p>
              </div>
            </div>
            <span className="font-bold text-emerald-400 text-sm">R$ {parseFloat(opt.price).toFixed(2)}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ShippingSection;