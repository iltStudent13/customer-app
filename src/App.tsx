import { Routes, Route } from "react-router-dom";
import AddCustomer from "./pages/AddCustomer";
import Customers from "./pages/Customers";
import EditCustomer from "./pages/EditCustomer";
import Layout from "./pages/Layout";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ErrorBoundary fallback={<div>Something went wrong</div>}>
            <Layout />
          </ErrorBoundary>
        }
      >
        <Route index element={<Customers />} />
        <Route path="add" element={<AddCustomer />} />
        <Route path="edit/:id" element={<EditCustomer />} />
      </Route>
    </Routes>
  );
}

export default App;
