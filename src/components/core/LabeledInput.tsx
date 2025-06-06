import { useState, type ChangeEvent } from "react";
import { isEmailValid, isPasswordValid } from "../../utils/formValidation";

const scucessColor = "#0cff00";
const errorColor = "#ff1100";

interface LabeledInputProps {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  className?: string;
  successMessage?: string;
}

function LabeledInput({
  label,
  type,
  value,
  onChange,
  placeholder,
  name,
  id,
  className,
  successMessage = "valid feild",
}: LabeledInputProps) {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  const validate = (val: string) => {
    if (type === "email") {
      // Simple email regex validation
      
      if (!isEmailValid(val)) {
        setError("Please enter a valid email address.");
        return false;
      }
    } else if (type === "text") {
      if (val.trim() === "") {
        setError("This field cannot be blank.");
        return false;
      }
    } else if (type === "password") {
      // Password must be at least 8 characters, contain lowercase, uppercase, number, and special character
      
      if (!isPasswordValid(val)) {
        setError(
          "Password must be at least 8 characters and include lowercase, uppercase, and number."
        );
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleBlur = () => {
    validate(value);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setSuccess(validate(e.target.value));
    if (error) {
      validate(e.target.value);
    }
  };

  return (
    <div className={className + " flex justify-end"}>
      <label
        className="self-center w-[100px] md:w-[130px] pr-2 text-[13px] md:text-[16px] relative"
        htmlFor={id || name}
      >
        {label}
        {error && (
          <span
            style={{ color: errorColor }}
            className="text-xl md:text-3xl  pl-1  capitalize` absolute right-[10px] top-[-10px]"
          >
            *
          </span>
        )}
      </label>
      <div className="w-full relative">
        <input
          className="border-2 border-cyan-400 focus:border-cyan-600 outline-none w-[90%] md:w-[98%] p-2"
          style={{
            border: error
              ? `2px solid ${errorColor}`
              : success
              ? `2px solid ${scucessColor}`
              : "",
          }}
          type={type}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          name={name}
          id={id || name}
        />
        {error && (
          <div
            style={{ color: errorColor }}
            className="absolute  text-[12px] md:text-[14px] w-[90%] md:w-[98%] h-fit bg-red-100 p-2 pb-3 pt-3"
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{ color: scucessColor }}
            className="absolute  text-[12px] md:text-[14px] w-[90%] md:w-[98%] h-fit bg-green-100 p-2 pb-3 pt-3"
          >
            {successMessage}
          </div>
        )}
      </div>
    </div>
  );
}

export default LabeledInput;
