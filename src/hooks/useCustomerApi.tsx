import { useEffect, useState } from "react";
import { type Customer, type CustomerFormData } from "../types/customer";

const initialFormData: CustomerFormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  zip: "",
};

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [formData, setFormData] = useState<CustomerFormData>(initialFormData);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const addCustomer = async (newCustomer: CustomerFormData) => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCustomer),
      });

      if (!response.ok) {
        throw new Error("Failed to add customer.");
      }

      const addedCustomer: Customer = await response.json();
      setCustomers((prevCustomers) => [...prevCustomers, addedCustomer]);
      setFormData(initialFormData);
      setError(null);
    } catch {
      setError("Unable to add customer. Please try again.");
    }
  };

  const editCustomer = async (
    id: string,
    updatedCustomer: CustomerFormData,
  ) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCustomer),
      });

      if (!response.ok) {
        throw new Error("Failed to update customer.");
      }

      const updatedCustomerData: Customer = await response.json();
      setCustomers((prevCustomers) =>
        prevCustomers.map((customer) =>
          customer.id === updatedCustomerData.id
            ? updatedCustomerData
            : customer,
        ),
      );
      setError(null);
    } catch {
      setError("Unable to update customer. Please try again.");
      throw new Error("Unable to update customer. Please try again.");
    }
  };

  const deleteCustomer = async (id: string) => {
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete customer.");
      }

      setCustomers((prevCustomers) =>
        prevCustomers.filter((customer) => customer.id !== Number(id)),
      );
      setError(null);
    } catch {
      setError("Unable to delete customer. Please try again.");
    }
  };

  return {
    customers,
    formData,
    setFormData,
    error,
    isLoading,
    addCustomer,
    editCustomer,
    deleteCustomer,
  };
};

export default useCustomers;
