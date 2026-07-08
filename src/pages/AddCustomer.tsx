import { useNavigate } from "react-router-dom";
import CustomerForm from "../components/CustomerForm";
import useCustomers from "../hooks/useCustomers";

const AddCustomer = () => {
  const navigate = useNavigate();
  const { formData, setFormData, addCustomer, error } = useCustomers();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    await addCustomer(formData);
    navigate("/add", { replace: true });
  };

  return (
    <section className="p-4 text-left">
      <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
      {error ? <p className="text-red-500 mb-4">{error}</p> : null}
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
