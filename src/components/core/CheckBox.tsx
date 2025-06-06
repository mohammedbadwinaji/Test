
import React, { type ChangeEvent } from 'react';

interface CheckBoxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  name?: string;
  id?: string;
  className?: string;
  style?:React.CSSProperties
}

const CheckBox: React.FC<CheckBoxProps> = ({
  checked,
  onChange,
  label,
  name,
  id,
  className,
  style,
}) => {
  return (
    <label className={`inline-flex items-center cursor-pointer ${className || ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        name={name}
        id={id || name}
        className="hidden"
        style ={style}
      />
      <span
        className={`w-5 h-5 flex items-center justify-center border-1 border-gray-400
          ${checked ? 'bg-black' : 'bg-white'}
          transition-colors duration-200 ease-in-out`}
      >
        {checked && (
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {label && <span className="ml-2 select-none">{label}</span>}
    </label>
  );
};

export default CheckBox;
