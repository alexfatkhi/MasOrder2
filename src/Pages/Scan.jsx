import { Scanner } from '@yudiel/react-qr-scanner'
import { useNavigate } from 'react-router-dom'

const Scan = () => {
    const navigate = useNavigate()

    const handleScan = (result) => {
        const url = result[0].rawValue

        const tableId = url.split('/').at(-1)

        navigate(`/table/${tableId}`)
    }

    return (
        <div className="flex-1 flex justify-center items-center w-full p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
            <Scanner onScan={handleScan} />
        </div>
    )
}

export default Scan