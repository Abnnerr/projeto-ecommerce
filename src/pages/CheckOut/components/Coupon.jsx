import { useState } from "react";
import { AXIOS } from "../../../services";
import { useCart } from "../../../contexts/CartProvider";

const Coupon = () => {

    const { cupomAplicado, setCupomAplicado } = useCart();
    const [cupom, setCupom] = useState("");
  

    console.log(cupomAplicado);

    const handleApplyCoupon = async () => {

        try {
            const response = await AXIOS.get(`/api/coupons/${cupom}`);
            // console.log(response.data);
            setCupomAplicado(response.data)
        } catch (error) {
            console.log(error)
        }

    };
    return (
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
    );
}

export default Coupon;