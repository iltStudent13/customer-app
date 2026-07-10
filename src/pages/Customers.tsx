import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";
import CustomerList from "../components/CustomerList";
import type { Customer } from "../types/customer";

function Customers() {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/customers");

        if (!response.ok) {
          throw new Error("Failed to load customers.");
        }

        const data: Customer[] = await response.json();
        setCustomers(data);
        setError(null);
      } catch {
        setError("Unable to fetch customers. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return customers;
    }

    return customers.filter((customer) => {
      return [
        customer.name,
        customer.email,
        customer.phone,
        customer.city ?? "",
      ].some((field) => field.toLowerCase().includes(query));
    });
  }, [customers, searchTerm]);

  const handleDeleteCustomer = async (id: number) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer.");
      }

      setCustomers((prev) => prev.filter((customer) => customer.id !== id));
      setError(null);
    } catch {
      setError("Unable to delete customer. Please try again.");
    }
  };

  return (
    <section className="p-4 text-left" style={{ textAlign: "left" }}>
      <div className="w-full mb-4 text-left" style={{ textAlign: "left" }}>
        <h2 className="text-2xl font-semibold mb-4">Customers</h2>
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {isLoading ? <p>Loading customers...</p> : null}
      {error ? <p>{error}</p> : null}

      {!isLoading && !error ? (
        <CustomerList
          customers={filteredCustomers}
          onEditCustomer={(id) => navigate(`/edit/${id}`)}
          onDeleteCustomer={handleDeleteCustomer}
        />
      ) : null}
    </section>
  );
}

export default Customers;
