import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="site-header bg-blue-500 text-white p-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-md font-bold text-left">Customer Manager</h1>
        <nav aria-label="Main Navigation" className="ml-auto">
          <ul className="header-list flex gap-4">
            <li>
              <button onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>
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
