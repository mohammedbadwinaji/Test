
import React from "react";

interface ButtonProps {
  type: "icon" | "icon-text" | "text";
  icon?: React.ReactNode;
  text?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Button: React.FC<ButtonProps> = ({
  type,
  icon,
  text,
  onClick,
  disabled = false,
  className = "",
  style,
}) => {
  const baseClasses =
    "flex items-center justify-center rounded px-3 py-2 font-medium focus:outline-none focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  if (type === "icon") {
    return (
      <button
        style={style}
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${className}`}
        aria-label={typeof text === "string" ? text : "icon button"}
      >
        {icon}
      </button>
    );
  }

  if (type === "icon-text") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${className}`}
      >
        {icon && <span className="inline-flex">{icon}</span>}
        {text && <span>{text}</span>}
      </button>
    );
  }

  // type === 'text'
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
