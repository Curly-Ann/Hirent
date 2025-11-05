import React, { useState, useRef, useEffect } from "react";

const SortDropdown = () => {
  const [selected, setSelected] = useState("Popular");
  const textRef = useRef(null);
  const selectRef = useRef(null);

  useEffect(() => {
    if (textRef.current && selectRef.current) {
      selectRef.current.style.width = `${textRef.current.offsetWidth + 4}px`;
    }
  }, [selected]);

  return (
    <div className="flex items-center border border-gray-400 rounded-lg px-2 py-1.5 text-sm text-gray-400 w-fit">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 text-gray-600 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M6.75 12h10.5m-7.5 5.25h4.5"
        />
      </svg>
      <span className="text-gray-400 mr-1">Sort by:</span>

      <select
        ref={selectRef}
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="bg-transparent focus:outline-none text-[#7A1CA9] font-light cursor-pointer appearance-none border-none p-0 m-0 leading-tight"
      >
        <option>Popular</option>
        <option>Newest</option>
        <option>Lowest Price</option>
        <option>Highest Price</option>
      </select>

      <span
        ref={textRef}
        className="absolute invisible whitespace-pre font-light text-sm"
      >
        {selected}
      </span>
    </div>
  );
};

export default SortDropdown;
