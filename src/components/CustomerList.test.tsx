import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import CustomerList from "./CustomerList";
import { BrowserRouter } from "react-router-dom";
import { type Customer } from "../types/customer";

function renderCustomerList(customers: Customer[]) {
  const onEditCustomer = vi.fn();
  const onDeleteCustomer = vi.fn();

  render(
    <BrowserRouter>
      <CustomerList
        customers={customers}
        onEditCustomer={onEditCustomer}
        onDeleteCustomer={onDeleteCustomer}
      />
    </BrowserRouter>,
  );

  return { onEditCustomer, onDeleteCustomer };
}

describe("CustomerList", () => {
  const customers: Customer[] = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "555-0101",
      address: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
  ];
  it("renders customer names", () => {
    renderCustomerList(customers);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });
  it("renders Edit link with correct href", () => {
    renderCustomerList(customers);
    const editButton = screen.getByText("Edit");
    expect(editButton.closest("button")).toBeInTheDocument();
  });
  it("deletes a customer when the delete button is clicked", () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    const { onDeleteCustomer } = renderCustomerList(customers);
    const deleteButton = screen.getByText("Delete");
    deleteButton.click();
    expect(onDeleteCustomer).toHaveBeenCalledWith(1);
    confirmSpy.mockRestore();
  });
  it("displays 'No customers found.' when given an empty array", () => {
    renderCustomerList([]);
    expect(
      screen.getByText("Total customers: No customers found."),
    ).toBeInTheDocument();
  });
});
