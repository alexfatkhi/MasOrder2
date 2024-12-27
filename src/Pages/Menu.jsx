import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderSearch from "../components/menu/HeaderSearch";
import { Filter } from "lucide-react";
import ProductService from "../api/services/product";
import useTableNumberStore from "../stores/useTableNumberStore";

const Menu = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("Rekomendasi");
    const [sortOption, setSortOption] = useState(null);
    const [showSortOptions, setShowSortOptions] = useState(false);

    const navigate = useNavigate();

    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        ProductService.getProducts().then(data => setMenuItems(data))
    }, [])

    const { tableNumber } = useTableNumberStore()

    const tabs = ["Rekomendasi", "Kopi", "Tea", "Milk"];

    const filteredMenu = menuItems
        .filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((item) => activeTab === "Rekomendasi" || item.category === activeTab);

    const sortedMenu = sortOption
        ? [...filteredMenu].sort((a, b) =>
            sortOption === "highest" ? b.price - a.price : a.price - b.price
        )
        : filteredMenu;

    const handleTabClick = (tab) => {
        setActiveTab(tab);
        setSortOption(null);
    };

    const toggleSortOptions = () => setShowSortOptions(!showSortOptions);

    const handleMenuClick = (id) => {
        navigate(`/menu/${id}`); // Navigasi ke halaman detail menu
    };

    return (
        <>
            {/* Header */}
            <HeaderSearch
                searchValue={searchTerm}
                setSearchValue={setSearchTerm} />

            {/* Tabs */}
            <nav className="bg-white border-b px-4 w-full">
                <div className="flex flex-row justify-evenly items-center space-x-8 w-full">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            id={`tab-${tab.toLowerCase()}`}
                            className={`w-full py-2 text-base font-medium ${activeTab === tab
                                ? "text-teal-600 border-b-2 border-teal-600"
                                : "hover:text-teal-600"
                                }`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </nav>

            {/* Sort Options */}
            {showSortOptions && (
                <div className="flex justify-around bg-gray-100 p-4" id="sort-options">
                    <button
                        onClick={() => setSortOption("lowest")}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${sortOption === "lowest" ? "bg-teal-600 text-white" : "bg-white border"
                            }`}
                    >
                        Lowest Price
                    </button>
                    <button
                        onClick={() => setSortOption("highest")}
                        className={`px-4 py-2 rounded-md text-sm font-medium ${sortOption === "highest" ? "bg-teal-600 text-white" : "bg-white border"
                            }`}
                    >
                        Highest Price
                    </button>
                </div>
            )}

            {/* Content */}
            <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="flex items-center mb-1">
                    <h3 className="text-sm text-gray-800">Nomor Meja : <span className="font-medium text-teal-600">{tableNumber ?? (<>Belum ada nomor meja, <Link className="cursor-pointer" to={'/scan'}>Scan.</Link></>)}</span></h3>
                </div>
                <div className="flex flex-row items-center gap-x-4 mb-4 justify-between">
                    <h2 className="text-lg font-semibold">{activeTab}</h2>
                    <div className={`transition-all ${showSortOptions ? 'text-teal-600' : 'text-black hover:text-teal-600'}`}>
                        <Filter onClick={toggleSortOptions} className='cursor-pointer' strokeWidth={1.5} />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sortedMenu.map((item) => (
                        <div
                            key={item.id}
                            id={`menu-item-${item.id}`}
                            className="flex items-center bg-white shadow-sm p-4 rounded-lg border cursor-pointer hover:shadow-md"
                            onClick={() => handleMenuClick(item.id)}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover"
                            />
                            <div className="flex-1 ml-4">
                                <h3 className="text-base font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <p className="text-sm font-semibold">Rp {item.price.toLocaleString()}</p>
                                    <button
                                        className="bg-teal-600 text-white text-sm px-4 py-2 rounded-md shadow hover:bg-teal-700"
                                        id={`add-to-cart-${item.id}`}
                                    >
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default Menu;
