import type { Customer } from "../types/customer";
import { formatPhoneNumber, toTitleCase } from "../utils/formatter";

interface CustomerListProps {
  customers: Customer[];
  onEditCustomer: (id: number) => void;
  onDeleteCustomer: (id: number) => void;
}

const counter = (customers: Customer[]) => {
  if (customers.length === 0) {
    return "No customers found.";
  }
  return customers.length;
};

const CustomerList = ({
  customers,
  onEditCustomer,
  onDeleteCustomer,
}: CustomerListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="customer-table">
        <thead>
          <tr className="customer-table-head-row">
            <th scope="col" className="customer-table-header-cell">
              Name
            </th>
            <th scope="col" className="customer-table-header-cell">
              Email
            </th>
            <th scope="col" className="customer-table-header-cell">
              Phone
            </th>
            <th scope="col" className="customer-table-header-cell">
              City
            </th>
            <th scope="col" className="customer-table-header-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr
              key={customer.id}
              className={
                index % 2 === 0
                  ? "customer-table-row"
                  : "customer-table-row customer-table-row-alt"
              }
            >
              <td className="customer-table-cell">
                {toTitleCase(customer.name)}
              </td>
              <td className="customer-table-cell">{customer.email}</td>
              <td className="customer-table-cell">
                {formatPhoneNumber(customer.phone)}
              </td>
              <td className="customer-table-cell">
                {toTitleCase(customer.city)}
              </td>
              <td className="customer-table-cell">
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
      <p>{`Total customers: ${counter(customers)}`}</p>
    </div>
  );
};

export default CustomerList;
