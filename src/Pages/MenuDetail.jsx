import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductService from "../api/services/product";
import useCartStore from "../stores/useCartStore";
import toast from "react-hot-toast";
import { ChevronLeft } from "lucide-react";

const MenuDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const [menuItem, setMenuItem] = useState(null)

    const { addToCart } = useCartStore()

    useEffect(() => {
        setLoading(true)
        ProductService.getProductById(id).then(data => setMenuItem(data)).finally(() => setLoading(false))
    }, [])

    const handleIncrement = () => setQuantity((prev) => prev + 1);
    const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const handleAddCart = () => {
        addToCart(id, quantity)
        toast.success("Product added to cart")
    }

    return (
        <div className="flex-1 w-full p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <button
                onClick={() => navigate('/menu')} // Navigasi kembali
                className="text-teal-600 hover:underline mb-4 flex flex-row"
            >
                <ChevronLeft className="mr-2" /> Back to Menu
            </button>

            {loading ?

                <div className="flex flex-col gap-y-4 w-full h-full justify-center items-center">
                    <div role="status">
                        <svg aria-hidden="true" className="w-16 h-16 text-gray-200 animate-spin fill-teal-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                    <p className="text-slate-600">Loading Product</p>
                </div>
                :
                menuItem ?
                    <>
                        <img
                            src={menuItem.image}
                            alt={menuItem.name}
                            className="w-full h-64 object-cover rounded-lg"
                        />
                        <h1 className="text-2xl font-bold mt-4">{menuItem.name}</h1>
                        <p className="text-lg text-gray-600 mt-2">Rp {menuItem.price.toLocaleString()}</p>
                        <p className="mt-2 text-gray-700">{menuItem.description}</p>

                        <div className="flex items-center mt-4">
                            <span className="text-lg font-medium">Order Total:</span>
                            <div className="flex items-center ml-4 space-x-4">
                                <button
                                    onClick={handleDecrement}
                                    className="w-8 h-8 bg-gray-200 text-lg text-gray-800 rounded hover:bg-gray-300"
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold">{quantity}</span>
                                <button
                                    onClick={handleIncrement}
                                    className="w-8 h-8 bg-gray-200 text-lg text-gray-800 rounded hover:bg-gray-300"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={handleAddCart} // Simulasi penambahan
                            className="mt-6 w-full bg-teal-600 text-white py-2 px-4 rounded hover:bg-teal-700"
                        >
                            Add to Cart
                        </button>
                    </>
                    :
                    <div className="flex flex-col gap-y-4 w-full h-full justify-center items-center">
                        <img className="max-w-xs w-full" src="/notfound.jpg" alt="" />
                        <p className="text-slate-600">Menu Not Found</p>
                    </div>
            }
        </div>
    );
};

export default MenuDetail;
