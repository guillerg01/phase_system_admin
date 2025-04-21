"use client";

import { useState } from "react";
import { Transition } from "@headlessui/react";

interface TooltipProps {
  children: React.ReactNode;
  className?: string;
  bg?: "dark" | "light" | null;
  size?: "sm" | "md" | "lg" | "none";
  position?: "top" | "bottom" | "left" | "right";
}

export default function Tooltip({
  children,
  className = "",
  bg = null,
  size = "none",
  position = "top",
}: TooltipProps) {
  const [tooltipOpen, setTooltipOpen] = useState<boolean>(false);

  const positionOuterClasses = (position: TooltipProps["position"]) => {
    switch (position) {
      case "right":
        return "left-full top-1/2 -translate-y-1/2";
      case "left":
        return "right-full top-1/2 -translate-y-1/2";
      case "bottom":
        return "top-full left-1/2 -translate-x-1/2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2";
    }
  };

  const sizeClasses = (size: TooltipProps["size"]) => {
    switch (size) {
      case "lg":
        return "min-w-[18rem]  p-3";
      case "md":
        return "min-w-[14rem] p-3";
      case "sm":
        return "min-w-[11rem] p-2";
      default:
        return "p-2";
    }
  };

  const colorClasses = (bg: TooltipProps["bg"]) => {
    switch (bg) {
      case "light":
        return "bg-white text-slate-600 border-slate-200";
      case "dark":
        return "bg-slate-700 text-slate-100 border-slate-600";
      default:
        return "text-slate-600 bg-white dark:bg-slate-700 dark:text-slate-100 border-slate-200 dark:border-slate-600";
    }
  };

  const positionInnerClasses = (position: TooltipProps["position"]) => {
    switch (position) {
      case "right":
        return "ml-2";
      case "left":
        return "mr-2";
      case "bottom":
        return "mt-2";
      default:
        return "mb-2";
    }
  };

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
      onFocus={() => setTooltipOpen(true)}
      onBlur={() => setTooltipOpen(false)}>
      <button
        className="block"
        aria-haspopup="true"
        aria-expanded={tooltipOpen}
        onClick={(e) => e.preventDefault()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none">
          <g clipPath="url(#clip0_474_670)">
            <path
              d="M5.5 3.5H6.5V4.5H5.5V3.5ZM5.5 5.5H6.5V8.5H5.5V5.5ZM6 1C3.24 1 1 3.24 1 6C1 8.76 3.24 11 6 11C8.76 11 11 8.76 11 6C11 3.24 8.76 1 6 1ZM6 10C3.795 10 2 8.205 2 6C2 3.795 3.795 2 6 2C8.205 2 10 3.795 10 6C10 8.205 8.205 10 6 10Z"
              fill="#6B7784"
            />
          </g>
          <defs>
            <clipPath id="clip0_474_670">
              <rect width="12" height="12" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <div className={`z-10 absolute ${positionOuterClasses(position)}`}>
        <Transition
          show={tooltipOpen}
          as="div"
          className={`rounded border overflow-hidden shadow-lg ${sizeClasses(
            size
          )} ${colorClasses(bg)} ${positionInnerClasses(position)}`}
          enter="transition ease-out duration-200 transform"
          enterFrom="opacity-0 -translate-y-2"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          unmount={false}>
          {children}
        </Transition>
      </div>
    </div>
  );
}
