const HeaderSearch = ({ searchValue, setSearchValue}) => {
    return (
        <header className="bg-teal-600 p-4 text-center text-white">
            <h1 className="text-lg font-semibold" id="header-title">
                Koffie Minor Cafe
            </h1>
            <div className="mt-2">
                <input
                    id="search-input"
                    type="text"
                    placeholder="Find Menu"
                    className="w-full px-4 py-2 border rounded-full text-black"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </div>
        </header>
    )
}

export default HeaderSearch