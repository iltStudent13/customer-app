import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="site-header bg-blue-500 text-white p-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-md font-bold text-left">Customer Manager</h1>
        <nav aria-label="Main Navigation" className="ml-auto">
          <ul className="flex gap-3 justify-end">
            <li>
              <button
                onClick={() => navigate("/")}
                className="px-3 py-1 rounded-md font-medium bg-transparent text-white hover:bg-white/10"
              >
                Customers
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate("/add")}
                className="px-3 py-1 rounded-md font-medium bg-transparent text-white hover:bg-white/10"
              >
                Add Customer
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
