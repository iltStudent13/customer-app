import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import { useEffect } from "react";

const LayoutContent = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

const Layout = () => {
  return (
    <ThemeProvider>
      <LayoutContent />
    </ThemeProvider>
  );
};

export default Layout;
