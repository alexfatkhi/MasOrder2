const Menu = () => {
  const menuItems = [
    {
      name: "Coffee Latte",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique libero.",
      price: "Rp 20.000",
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Coffee Latte",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique libero.",
      price: "Rp 20.000",
      image: "https://via.placeholder.com/100", // Placeholder image
    },
    {
      name: "Coffee Latte",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique libero.",
      price: "Rp 20.000",
      image: "https://via.placeholder.com/100", // Placeholder image
    },
  ];

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="bg-gray-200 p-4 text-center">
        <h1 className="text-lg font-semibold">Kafe Koffie Minor</h1>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Cari Menu"
            className="w-full px-4 py-2 border rounded-full"
          />
        </div>
      </header>

      {/* Tabs */}
      <nav className="flex justify-around bg-white border-b">
        {["Sort", "Rekomendasi", "Kopi", "Tea", "Milk"].map((tab, index) => (
          <button
            key={index}
            className="py-2 text-sm font-medium hover:text-blue-500"
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <h2 className="text-lg font-semibold mb-4">Rekomendasi</h2>
        <div className="space-y-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center bg-white shadow-sm p-4 rounded-lg border"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 ml-4">
                <h3 className="text-base font-medium">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <p className="text-sm font-semibold text-black mt-2">
                  {item.price}
                </p>
              </div>
              <button className="bg-blue-500 text-white text-sm px-4 py-2 rounded-md shadow hover:bg-blue-600">
                Add
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="flex justify-around bg-gray-200 p-4 border-t">
        {["Menus", "Keranjang", "Riwayat"].map((menu, index) => (
          <button
            key={index}
            className="text-sm font-medium hover:text-blue-500"
          >
            {menu}
          </button>
        ))}
      </footer>
    </div>
  );
};

export default Menu;
