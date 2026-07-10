import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { type CustomerFormData } from "../types/customer";
import useCustomers from "../hooks/useCustomerApi";

const initialFormData: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

const EditCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { editCustomer } = useCustomers();
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [hideForm, setHideForm] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      if (!id) {
        setError("Missing customer id.");
        setHideForm(true);
        return;
      }

      try {
        const response = await fetch(`/api/customers/${id}`);

        if (!response.ok) {
          throw new Error("Failed to load customer.");
        }

        const data: Partial<CustomerFormData> = await response.json();
        setFormData({
          name: data.name ?? "",
          email: data.email ?? "",
          phone: data.phone ?? "",
          address: data.address ?? "",
          city: data.city ?? "",
          state: data.state ?? "",
          zip: data.zip ?? "",
        });
        setError(null);
        setHideForm(false);
      } catch {
        setError("Unable to fetch customer. Please try again.");
        setHideForm(true);
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
      setHideForm(true);
      return;
    }

    try {
      await editCustomer(id, formData);

      setError(null);
      navigate("/");
    } catch {
      setError("Unable to update customer. Please try again.");
    }
  };

  return (
    <section className="max-w-2xl mx-auto p-4">
      <h2>Edit Customer</h2>

      {error ? (
        <p role="alert" className="mb-4 text-red-600">
          {error}
        </p>
      ) : null}

      {hideForm ? (
        <button
          type="button"
          onClick={() => navigate("/")}
          className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
        >
          Back to Customers
        </button>
      ) : (
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

          <div className="form customer-actions">
            <button
              type="submit"
              className="button"
              onClick={() => navigate("/")}
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="button"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default EditCustomer;
