import React, { useState } from "react";

type TCounterProps = {
  min?: number;
  max?: number;
  initial?: number;
  className?: string;
};

const Counter: React.FC<TCounterProps> = ({
  min = 0,
  max = 10,
  initial = 0,
  className = "",
}) => {
  const [count, setCount] = useState<number>(initial);

  const decrement = () => {
    setCount((prev) => (prev > min ? prev - 1 : prev));
  };

  const increment = () => {
    setCount((prev) => (prev < max ? prev + 1 : prev));
  };

  return (
    <div
      className={`inline-flex items-center border border-gray-600 rounded select-none ${className}`}
    >
      <button
        style={{
          opacity: count === min ? "0.4" : "1",
          cursor: count === min ? "no-drop" : "pointer",
        }}
        onClick={decrement}
        className="px-2 py-1 cursor-pointer bg-gray-400 hover:bg-gray-600"
        aria-label="Decrease value"
      >
        -
      </button>
      <div className="mx-3 min-w-[24px] text-center text-base">{count}</div>
      <button
        style={{
          opacity: count === max ? "0.4" : "1",
          cursor: count === max ? "no-drop" : "pointer",
        }}
        onClick={increment}
        className="px-2 py-1 cursor-pointer bg-gray-400 hover:bg-gray-600"
        aria-label="Increase value"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
