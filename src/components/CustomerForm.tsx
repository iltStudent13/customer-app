import { useState, type ChangeEventHandler } from "react";
import type { CustomerFormData } from "../types/customer";
import { SubmitEvent } from "react";
import {
  validateCustomerForm,
  type CustomerFormErrors,
} from "../utils/customerSchema";

interface CustomerFormProps {
  formData: CustomerFormData;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  submitLabel: string;
  onCancel?: () => void;
  cancelLabel?: string;
}

const formFields: Array<keyof CustomerFormData> = [
  "name",
  "email",
  "phone",
  "address",
  "city",
  "state",
  "zip",
];

const requiredFields: Array<keyof CustomerFormData> = [
  "name",
  "email",
  "phone",
];

const CustomerForm = (props: CustomerFormProps) => {
  const {
    formData,
    onChange,
    onSubmit,
    submitLabel,
    onCancel,
    cancelLabel = "Cancel",
  } = props;
  const [errors, setErrors] = useState<CustomerFormErrors>({});

  const handleFormSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = validateCustomerForm(formData);

    if (!result.isValid) {
      setErrors(result.errors);
      return;
    }

    setErrors({});
    onSubmit();
  };

  return (
    <form noValidate onSubmit={handleFormSubmit} className="form">
      {formFields.map((key) => (
        <div key={key}>
          <label htmlFor={key} className="block font-medium mb-1">
            {key.charAt(0).toUpperCase() + key.slice(1)}
            {requiredFields.includes(key) ? (
              <span aria-hidden="true" className="text-red-500 ml-1">
                *
              </span>
            ) : null}
          </label>
          <input
            type={key === "email" ? "email" : "text"}
            id={key}
            name={key}
            value={formData[key]}
            onChange={onChange}
            className="input-field"
          />
          {errors[key] ? (
            <p role="alert" className="input-error">
              {errors[key]}
            </p>
          ) : null}
        </div>
      ))}

      <div className="flex gap-2 mt-2">
        <button type="submit" className="button">
          {submitLabel}
        </button>
        {onCancel ? (
          <button type="button" onClick={onCancel} className="button">
            {cancelLabel}
          </button>
        ) : null}
      </div>
    </form>
  );
};

export default CustomerForm;
