import { useNavigate, useParams } from "react-router-dom"
import useTableNumberStore from "../stores/useTableNumberStore"
import { useEffect } from "react"

const ScanResult = () => {
    const { tableId } = useParams()

    const navigate = useNavigate()

    const { redirectPage, setTableNumber } = useTableNumberStore()

    useEffect(() => {
        setTableNumber(tableId)
        if (redirectPage && redirectPage != '')
            navigate(redirectPage)
        else
            navigate('/menu')
    }, [redirectPage, setTableNumber, tableId, navigate])
}

export default ScanResult