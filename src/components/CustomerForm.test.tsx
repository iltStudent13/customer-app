import { fireEvent, render, screen } from "@testing-library/react";
import CustomerForm from "./CustomerForm";
import { BrowserRouter } from "react-router-dom";
import { type CustomerFormData } from "../types/customer";
import { vi } from "vitest";

function renderCustomerForm(
  initialData?: CustomerFormData,
  onSubmit?: () => void,
  onCancel?: () => void,
) {
  const submitLabel = "Add Customer";
  const cancelLabel = "Cancel";

  render(
    <BrowserRouter>
      <CustomerForm
        formData={
          initialData ?? {
            name: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            zip: "",
          }
        }
        onChange={() => {}}
        onSubmit={onSubmit ?? (() => {})}
        submitLabel={submitLabel}
        onCancel={onCancel ?? (() => {})}
        cancelLabel={cancelLabel}
      />
    </BrowserRouter>,
  );

  return { submitLabel, cancelLabel };
}

describe("CustomerForm", () => {
  const initialData: CustomerFormData = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "555-0101",
    address: "123 Main St",
    city: "Anytown",
    state: "CA",
    zip: "12345",
  };

  const emptyData: CustomerFormData = {
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  };

  it("renders the form with initial data", () => {
    renderCustomerForm(initialData);
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("john.doe@example.com"),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("555-0101")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Anytown")).toBeInTheDocument();
    expect(screen.getByDisplayValue("CA")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
  });

  it("Shows error messages for required fields when submitting empty form", async () => {
    const onSubmit = vi.fn();
    renderCustomerForm(emptyData, onSubmit);

    const submitButton = screen.getByText("Add Customer");
    fireEvent.click(submitButton);
    expect(await screen.findByText("Name is required.")).toBeInTheDocument();
    expect(await screen.findByText("Email is required.")).toBeInTheDocument();
    expect(
      await screen.findByText("Phone number is required."),
    ).toBeInTheDocument();
  });

  it("calls onCancel when cancel button is clicked", () => {
    const onCancel = vi.fn();
    renderCustomerForm(initialData, undefined, onCancel);

    const cancelButton = screen.getByText("Cancel");
    cancelButton.click();
    expect(onCancel).toHaveBeenCalled();
  });

  it("passing initialData renders the form with existing values", () => {
    renderCustomerForm(initialData);
    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(
      screen.getByDisplayValue("john.doe@example.com"),
    ).toBeInTheDocument();
    expect(screen.getByDisplayValue("555-0101")).toBeInTheDocument();
    expect(screen.getByDisplayValue("123 Main St")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Anytown")).toBeInTheDocument();
    expect(screen.getByDisplayValue("CA")).toBeInTheDocument();
    expect(screen.getByDisplayValue("12345")).toBeInTheDocument();
  });
});
