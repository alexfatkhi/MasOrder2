import { useEffect, useState } from "react";
import ProductService from "../api/services/product";
import useCartStore from "../stores/useCartStore";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useTableNumberStore from "../stores/useTableNumberStore";
import { Link } from "react-router-dom";

const Cart = () => {

    const { tableNumber } = useTableNumberStore()
    const navigate = useNavigate()
    const [cartItems, setCartItems] = useState([]);
    const { addToCart } = useCartStore()

    const { carts, getCartQty, removeFromCart, toggleSelected, increaseQuantity } = useCartStore()

    const refreshCart = () => {
        if (carts.length > 0)
            ProductService.getProductsByIds(carts.map(cart => cart.id)).then(data => {
                const productQtyArray = carts.reduce((acc, item) => {
                    acc[item.id] = { qty: item.qty, selected: item.selected };
                    return acc;
                }, {});

                const arrayWithQty = data.map(product => ({ ...product, quantity: productQtyArray[product.id].qty, selected: productQtyArray[product.id].selected }))
                setCartItems(arrayWithQty)
                console.log(arrayWithQty)
            })
        else
            setCartItems([])
    }

    useEffect(() => {
        refreshCart()
    }, [carts, getCartQty])

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then(data => setRecommendations([data[0], data[1]]))
    }, [])

    const handleIncrement = (id) => {
        increaseQuantity(id, 1)
    };

    const handleDecrement = (id) => {
        increaseQuantity(id, -1)
    };

    const handleSelect = (id) => {
        toggleSelected(id)
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const totalHarga = cartItems
        .filter((item) => item.selected)
        .reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <header className="bg-teal-600 p-4 text-white text-center">
                <button onClick={() => navigate(-1)} className="absolute left-4 text-lg">
                    <ChevronLeft />
                </button>
                <h1 className="text-xl font-bold">Cart</h1>
            </header>
            <div className="flex-1 p-4 overflow-y-auto">
                <div className="flex items-center mb-3">
                    <h3 className="text-sm text-gray-800">Nomor Meja : <span className="font-medium text-teal-600">{tableNumber ?? (<>Belum ada nomor meja, <Link className="cursor-pointer" to={'/scan'}>Scan.</Link></>)}</span></h3>
                </div>
                <div>
                    <h2 className="font-semibold mb-2">Item</h2>
                    {cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 mb-2 border rounded-lg shadow-sm"
                        >
                            <input
                                type="checkbox"
                                defaultChecked={item.selected}
                                checked={item.selected}
                                onChange={() => handleSelect(item.id)}
                                className="mr-2"
                            />
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1 ml-2">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p>Rp {item.price.toLocaleString()}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={() => handleDecrement(item.id)}
                                    className="w-8 h-8 bg-gray-200 text-lg rounded"
                                >
                                    -
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    onClick={() => handleIncrement(item.id)}
                                    className="w-8 h-8 bg-gray-200 text-lg rounded"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => handleRemove(item.id)}
                                className="text-red-500 hover:text-red-700 ml-4"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Rekomendasi Produk */}
                <div className="mb-[109px]">
                    <h2 className="font-semibold mt-6 mb-2">Rekomendasi yang bisa anda pesan</h2>
                    {recommendations.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center p-4 mb-2 border rounded-lg shadow-sm"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded object-cover"
                            />
                            <div className="flex-1 ml-2">
                                <h3 className="font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600 truncate">{item.description}</p>
                                <p>Rp {item.price.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={() => addToCart(item.id, 1)}
                                className="text-teal-600 font-semibold hover:underline"
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Total Harga */}
            <div className="fixed bottom-0 left-0 right-0 bg-white p-4 border-t">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-semibold">Total Harga</span>
                    <span className="text-lg font-bold">Rp {totalHarga.toLocaleString()}</span>
                </div>
                <button onClick={() => navigate('/checkout')} className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700">
                    Checkout
                </button>
            </div>
        </div>
    );
};

export default Cart;
