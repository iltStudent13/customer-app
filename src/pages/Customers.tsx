import { useEffect, useMemo, useState } from "react";
import SearchFilter from "../components/SearchFilter";
import type { Customer } from "../types/customer";

function Customers() {
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
      return [customer.name, customer.email, customer.city].some((field) =>
        field.toLowerCase().includes(query),
      );
    });
  }, [customers, searchTerm]);

  return (
    <section className="p-4 text-left">
      <h2 className="text-2xl font-semibold mb-4">Customers</h2>

      <div className="mb-4">
        <SearchFilter searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      {isLoading ? <p>Loading customers...</p> : null}
      {error ? <p>{error}</p> : null}

      {!isLoading && !error ? (
        <ul className="space-y-3">
          {filteredCustomers.map((customer) => (
            <li key={customer.id} className="border rounded-md p-3">
              <p className="font-medium">{customer.name}</p>
              <p>{customer.email}</p>
              <p>{customer.city}</p>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

export default Customers;
