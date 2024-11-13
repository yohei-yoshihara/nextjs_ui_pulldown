"use client";

import React, { ReactNode, useState, useRef } from "react";
import { useOutsideClick } from "../lib/use-outside-click";

type Props = {
  items: ReactNode[];
  onSelect(index: number): void;
};

export default function PulldownMenu({ items, onSelect }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef(null); // Reference to the popover element
  const triggerRef = useRef(null); // Reference to the button element that triggers the popover

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  function handleSelect(index: number) {
    setIsVisible(false);
    onSelect(index);
  }

  const ref = useOutsideClick(() => {
    console.log("outside click");
    setIsVisible(false); // Close the popover if clicked outside
  });

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        ref={triggerRef}
        onClick={toggleVisibility}
        className="bg-white text-white p-2 cursor-pointer rounded-md border-[1px] border-gray-300 shadow-sm shadow-gray-300/50"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content">
        {threeDots}
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className="absolute top-full bg-white border-[1px] border-solid border-gray-300 shadow-md rounded-md p-2 z-10 whitespace-nowrap"
          role="dialog"
          aria-modal="true">
          <ul className="space-y-2">
            {items.map((item, index) => {
              return (
                <li
                  key={index}
                  className="flex flex-row items-center justify-start hover:bg-gray-200 rounded-md px-2 py-1"
                  onClick={() => {
                    handleSelect(index);
                  }}>
                  <div className="mr-2 text-gray-800 text-sm">{item}</div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const threeDots: ReactNode = (
  <svg height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
    <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
  </svg>
);
