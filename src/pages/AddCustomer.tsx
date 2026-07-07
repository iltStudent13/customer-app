// AddCustomer form
// - Should be a form that allows the user to add a new customer
// - Should have fields for name, email, phone, address, state, zip, and city
// - Should have a submit button that sends a POST request to /api/customers
// - Should handle errors and display them to the user
// - Should assign a unique id to the new customer that is +1 above the highest id in the current list of customers
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { type CustomerFormData } from "../types/customer";
import CustomerForm from "../components/CustomerForm";

const initialFormData: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const AddCustomer = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add customer.");
      }

      setFormData(initialFormData);
      setError(null);
      navigate("/add", { replace: true });
    } catch {
      setError("Unable to add customer. Please try again.");
    }
  };

  return (
    <section className="p-4 text-left">
      <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <CustomerForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Add Customer"
      />
    </section>
  );
};

export default AddCustomer;
