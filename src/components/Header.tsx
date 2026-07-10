import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Header = () => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-title">Customer Manager</h1>
        <nav aria-label="Main Navigation">
          <ul className="header-list">
            <li>
              <button onClick={toggleTheme}>
                {theme === "light" ? "Dark Mode" : "Light Mode"}
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/")} className="button">
                Customers
              </button>
            </li>
            <li>
              <button onClick={() => navigate("/add")} className="button">
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
