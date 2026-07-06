// Brings up the customer data from the API and displays it in a form for editing.
// The form is pre-filled with the customer's current data
// when the user submits the form, it sends a PUT request to update the customer data in the API.

import { useEffect, useState, type ChangeEvent, SubmitEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type CustomerFormData } from "../types/customer";

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

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

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

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="border rounded px-3 py-2"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border rounded px-3 py-2"
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="border rounded px-3 py-2"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Address"
          className="border rounded px-3 py-2"
        />
        <input
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="City"
          className="border rounded px-3 py-2"
        />
        <input
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="State"
          className="border rounded px-3 py-2"
        />
        <input
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          placeholder="ZIP"
          className="border rounded px-3 py-2"
        />

        <div className="flex gap-2 mt-2">
          <button
            type="submit"
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditCustomer;
