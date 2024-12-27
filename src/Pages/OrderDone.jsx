import { useEffect } from "react"
import useTableNumberStore from "../stores/useTableNumberStore"

const OrderDone = () => {

    const { clearTableNumber } = useTableNumberStore()

    useEffect(() => {
        clearTableNumber()
    }, [clearTableNumber])

    return (
        <div className="flex-1 flex flex-col w-full p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg justify-center items-center">
            <img className="max-w-xs mb-4" src="done.jpg" alt="" />
            <h3>Pesanan sukses dibuat, Mohon ditunggu!</h3>
        </div>
    )
}

export default OrderDone