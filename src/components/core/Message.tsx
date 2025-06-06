import React from "react";

interface MessageProps {
  icon?: React.ReactNode;
  text: string;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const Message: React.FC<MessageProps> = ({
  icon,
  text,
  onClose,
  className = "",
  style,
}) => {
  return (
    <div
      style={style}
      className={`relative flex items-center space-x-3 p-4 border rounded bg-gray-50 ${className}`}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-1 text-sm ">{text}</div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Close message"
          className="absolute top-2 right-2 text-red-400 hover:text-red-600 focus:outline-none cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Message;
