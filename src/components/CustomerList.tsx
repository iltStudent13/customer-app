import type { Customer } from "../types/customer";
import { formatPhoneNumber, toTitleCase } from "../utils/formatter";

interface CustomerListProps {
  customers: Customer[];
  onEditCustomer: (id: number) => void;
  onDeleteCustomer: (id: number) => void;
}

const CustomerList = ({
  customers,
  onEditCustomer,
  onDeleteCustomer,
}: CustomerListProps) => {
  return (
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
          {customers.map((customer, index) => (
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
                {toTitleCase(customer.name)}
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
                {formatPhoneNumber(customer.phone)}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {toTitleCase(customer.city)}
              </td>
              <td
                style={{
                  padding: "12px",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div className="customer-actions">
                  <button
                    type="button"
                    onClick={() => onEditCustomer(customer.id)}
                    className="button-edit"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to delete the customer ${customer.name}?`,
                        )
                      )
                        onDeleteCustomer(customer.id);
                    }}
                    className="button-delete"
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
  );
};

export default CustomerList;
