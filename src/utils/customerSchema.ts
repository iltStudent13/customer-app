import type { CustomerFormData } from "../types/customer";

export type CustomerFormErrors = Partial<
  Record<keyof CustomerFormData, string>
>;

export const validateCustomerForm = (
  data: CustomerFormData,
): { isValid: boolean; errors: CustomerFormErrors } => {
  const errors: CustomerFormErrors = {};

  if (!data.name.trim()) {
    errors.name = "Name is required.";
  } else if (data.name.length > 70) {
    errors.name = "Name is too long.";
  } else if (!/^[a-zA-Z\s'-]+$/.test(data.name)) {
    errors.name = "Name contains invalid characters.";
  } else if (data.name.length < 2) {
    errors.name = "Name is too short.";
  }

  if (!data.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  } else if (data.email.length > 90) {
    errors.email = "Email is too long.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[0-9+\-()\s]{7,20}$/.test(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  } else if (data.phone.length > 20) {
    errors.phone = "Phone number is too long.";
  }

  if (data.zip.trim() && !/^[a-zA-Z0-9\- ]{3,10}$/.test(data.zip)) {
    errors.zip = "Enter a valid ZIP/postal code.";
  }

  if (data.state.trim() && data.state.length > 20) {
    errors.state = "State name is too long.";
  }

  if (data.city.trim() && data.city.length > 50) {
    errors.city = "City name is too long.";
  }

  if (data.address.trim() && data.address.length > 100) {
    errors.address = "Address is too long.";
  }

  return { isValid: Object.keys(errors).length === 0, errors };
};
