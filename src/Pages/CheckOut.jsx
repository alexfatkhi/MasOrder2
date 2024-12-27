import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";
import useTableNumberStore from "../stores/useTableNumberStore";
import { ChevronLeft } from "lucide-react";
import OrderService from "../api/services/order";
import ProductService from "../api/services/product";

const Checkout = () => {
    const [selectedPayment, setSelectedPayment] = useState("BRI");
    const navigate = useNavigate();

    const { carts, clearCheckedCart } = useCartStore()
    const { tableNumber } = useTableNumberStore()

    const refreshCart = () => {
        if (carts.length > 0)
            ProductService.getProductsByIds(carts.filter(cart => cart.selected).map(cart => cart.id)).then(data => {
                const productQtyArray = carts.reduce((acc, item) => {
                    acc[item.id] = { qty: item.qty, selected: item.selected };
                    return acc;
                }, {});

                const arrayWithQty = data.map(product => ({ ...product, quantity: productQtyArray[product.id].qty, selected: productQtyArray[product.id].selected }))
                setOrders(arrayWithQty)
            })
        else
            setOrders([])
    }

    useEffect(() => {
        refreshCart()
    }, [carts])

    const [orders, setOrders] = useState([])

    const paymentMethods = [
        { id: "BRI", account: "324324324324324" },
        { id: "Mandiri", account: "74543534543545" },
        { id: "BNI", account: "656565656565663" },
    ];

    const subtotal = orders.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleProcessPayment = async () => {
        try {
            await OrderService.createOrder(tableNumber, orders.map(({ selected, ...rest }) => rest))
            clearCheckedCart()
            toast.success("Order successfully placed")
            navigate("/done"); // Navigasi ke halaman sukses
        } catch (error) {
            console.log(error)
            toast.error("Order cannot be placed")
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="bg-teal-600 p-4 text-white text-center">
                <button onClick={() => navigate(-1)} className="absolute left-4 text-lg">
                    <ChevronLeft />
                </button>
                <h1 className="text-xl font-bold">Checkout</h1>
            </header>

            <main className="flex-1 p-4">
                <h2 className="text-lg font-semibold mb-1">Ringkasan Pesanan</h2>
                <div className="flex items-center mb-3">
                    <h3 className="text-sm text-gray-800">Nomor Meja : <span className="font-medium text-teal-600">{tableNumber ?? (<>Belum ada nomor meja, <Link className="cursor-pointer" to={'/scan'}>Scan.</Link></>)}</span></h3>
                </div>
                <div className="space-y-3">
                    {orders.map((order) => (
                        <div
                            key={order.id}
                            className="flex items-center justify-between bg-white p-3 rounded-md shadow"
                        >
                            <div className="flex items-center">
                                <img
                                    src={order.image}
                                    alt={order.name}
                                    className="mr-2 w-12 h-12 rounded object-cover"
                                />
                                <div>
                                    <h3 className="font-medium">{order.name}</h3>
                                    <p className="text-gray-500">
                                        Rp {order.price.toLocaleString()} x {order.quantity}
                                    </p>
                                </div>
                            </div>
                            <p className="font-bold">
                                Rp {(order.price * order.quantity).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 border-t pt-4">
                    <h2 className="text-lg font-semibold mb-2">Ringkasan Pembayaran</h2>
                    <div className="flex justify-between text-base font-medium">
                        <span>Subtotal</span>
                        <span>Rp {subtotal.toLocaleString()}</span>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mt-6 mb-2">Pilih Pembayaran</h2>
                <div className="space-y-3">
                    {paymentMethods.map((method) => (
                        <label
                            key={method.id}
                            className="flex items-center justify-between bg-white p-3 rounded-md shadow cursor-pointer"
                        >
                            <div className="flex items-center">
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method.id}
                                    checked={selectedPayment === method.id}
                                    onChange={() => setSelectedPayment(method.id)}
                                    className="mr-3"
                                />
                                <span className="font-medium">{method.id}</span>
                            </div>
                            <p className="text-sm text-gray-500">{method.account}</p>
                        </label>
                    ))}
                </div>

                <button
                    onClick={handleProcessPayment}
                    disabled={!tableNumber}
                    className="w-full mt-6 py-2 bg-teal-600 text-white font-bold rounded-md hover:bg-teal-700 disabled:bg-teal-500 disabled:cursor-not-allowed"
                >
                    Process
                </button>
            </main>
        </div>
    );
};

export default Checkout;
