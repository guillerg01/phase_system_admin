"use client";
import { Dispatch, SetStateAction, useRef, useState } from "react";
interface IProps {
  placeholder?: string;
  setSearch: Dispatch<SetStateAction<string>>;
}
export default function SearchForm({ ...props }: IProps) {
  const [inputValue, setInputValue] = useState("");

  const debounceRef = useRef<NodeJS.Timeout>(null);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      props.setSearch(event.target.value);
    }, 1000);
  };
  const handleSubmit = () => {
    props.setSearch(inputValue);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSubmit();
    }
    //
  };
  return (
    <div className="relative w-full h-10">
      <label htmlFor="action-search" className="sr-only">
        Search by file name…
      </label>
      <input
        id="action-search"
        className="form-input h-full bg-[#00000066] text-white backdrop-blur-sm rounded-lg border-[#6E6868] border pl-9  w-full "
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={props.placeholder}
        onKeyDown={handleKeyDown}
      />
      <button
        className="absolute inset-0 right-auto group left-4"
        type="button"
        aria-label="Search"
        onClick={handleSubmit}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="15"
          height="16"
          viewBox="0 0 15 16"
          fill="none"
        >
          <g clipPath="url(#clip0_27_114)">
            <path
              d="M9.6875 9.25H9.19375L9.01875 9.08125C9.63125 8.36875 10 7.44375 10 6.4375C10 4.19375 8.18125 2.375 5.9375 2.375C3.69375 2.375 1.875 4.19375 1.875 6.4375C1.875 8.68125 3.69375 10.5 5.9375 10.5C6.94375 10.5 7.86875 10.1313 8.58125 9.51875L8.75 9.69375V10.1875L11.875 13.3063L12.8063 12.375L9.6875 9.25ZM5.9375 9.25C4.38125 9.25 3.125 7.99375 3.125 6.4375C3.125 4.88125 4.38125 3.625 5.9375 3.625C7.49375 3.625 8.75 4.88125 8.75 6.4375C8.75 7.99375 7.49375 9.25 5.9375 9.25Z"
              fill="#333333"
            />
          </g>
          <defs>
            <clipPath id="clip0_27_114">
              <rect
                width="15"
                height="15"
                fill="white"
                transform="translate(0 0.5)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}
