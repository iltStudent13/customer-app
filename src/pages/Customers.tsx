import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";
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
        customer.city,
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
        <div className="overflow-x-auto">
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--code-bg)" }}>
                <th
                  scope="col"
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  Name
                </th>
                <th
                  scope="col"
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  Email
                </th>
                <th
                  scope="col"
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  Phone
                </th>
                <th
                  scope="col"
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  City
                </th>
                <th
                  scope="col"
                  style={{
                    textAlign: "left",
                    padding: "12px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr
                  key={customer.id}
                  style={{
                    backgroundColor:
                      index % 2 === 0 ? "transparent" : "var(--social-bg)",
                  }}
                >
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {customer.name}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {customer.email}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {customer.phone}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {customer.city}
                  </td>
                  <td
                    style={{
                      padding: "12px",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => navigate(`/edit/${customer.id}`)}
                        className="px-3 py-1 rounded-md text-white bg-blue-500 hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCustomer(customer.id)}
                        className="px-3 py-1 rounded-md text-white bg-red-500 hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

export default Customers;
