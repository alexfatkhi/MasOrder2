import { FileClock, ShoppingCart, SquareMenu } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import useCartStore from "../stores/useCartStore"

const MainLayout = () => {
    const [cart, setCart] = useState(0)
    const { carts, getCartQty } = useCartStore()

    useEffect(() => {
        setCart(getCartQty())
    }, [carts, getCartQty])

    return (
        <div className="flex flex-col h-screen">
            <Outlet />

            {/* Footer */}
            <footer className="flex justify-around bg-white p-4 border-t">
                <Link
                    to={'/menu'}
                    className="text-sm font-medium hover:text-teal-600 drop-shadow-glow transition-colors"
                >
                    <SquareMenu strokeWidth={1.5} />
                </Link>
                <Link
                    to={'/cart'}
                    className="relative text-sm font-medium hover:text-teal-600 drop-shadow-glow transition-colors"
                >
                    {cart > 0 &&
                        <div className="absolute bg-teal-600 text-white font-bold rounded-full text-xs leading-6 aspect-square w-6 h-6 -top-3 -right-3 justify-center items-center text-center">{cart}</div>
                    }
                    <ShoppingCart strokeWidth={1.5} />
                </Link>
                <button
                    className="text-sm font-medium hover:text-teal-600 drop-shadow-glow transition-colors"
                >
                    <FileClock strokeWidth={1.5} />
                </button>
            </footer>
        </div>
    )
}

export default MainLayout