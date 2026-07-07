// Brings up the customer data from the API and displays it in a form for editing.
// The form is pre-filled with the customer's current data
// when the user submits the form, it sends a PUT request to update the customer data in the API.

import { useEffect, useState, type ChangeEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type CustomerFormData } from "../types/customer";
import CustomerForm from "../components/CustomerForm";

const EditCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CustomerFormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) {
        setError("Missing customer id.");
        return;
      }

      try {
        const response = await fetch(`/api/customers/${id}`);

        if (!response.ok) {
          throw new Error("Failed to load customer.");
        }

        const data: CustomerFormData = await response.json();
        setFormData(data);
        setError(null);
      } catch {
        setError("Unable to fetch customer. Please try again.");
      }
    };

    fetchCustomer();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!id) {
      setError("Missing customer id.");
      return;
    }

    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to update customer.");
      }

      setError(null);
      navigate("/");
    } catch {
      setError("Unable to update customer. Please try again.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Edit Customer</h2>

      {error && (
        <p role="alert" className="mb-4 text-red-600">
          {error}
        </p>
      )}

      <CustomerForm
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitLabel="Update Customer"
        onCancel={() => navigate("/")}
      />
    </section>
  );
};

export default EditCustomer;
