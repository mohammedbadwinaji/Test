import React, { type ChangeEvent } from "react";

interface RadioButtonProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name: string;
  id?: string;
  className?: string;
  checkedButtonColor?: string;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  checked,
  onChange,
  label,
  name,
  id,
  className,
  checkedButtonColor = "black",
}) => {
  return (
    <label
      className={`inline-flex items-center cursor-pointer ${className || ""}`}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={name}
        id={id || name}
        className="hidden"
      />
      <span
        style={{
          backgroundColor: checked ? checkedButtonColor : "white",
        }}
        className={`w-5 h-5 inline-block rounded-full border-2 border-gray-400
          
          relative transition-colors duration-200 ease-in-out`}
      >
        {checked && (
          <span className="block w-2.5 h-2.5 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
        )}
      </span>
      {label && <span className="ml-2 select-none">{label}</span>}
    </label>
  );
};

export default RadioButton;
