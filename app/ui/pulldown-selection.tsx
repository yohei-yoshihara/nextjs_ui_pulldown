"use client";
import { ReactNode, useState, useRef } from "react";
import { useOutsideClick } from "../lib/use-outside-click";

type Props = {
  items: ReactNode[];
  defaultSelected: number;
  onSelect(index: number): void;
};

export default function PulldownSelection({
  items,
  defaultSelected = 0,
  onSelect,
}: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState<number>(defaultSelected);
  const popoverRef = useRef(null); // Reference to the popover element
  const triggerRef = useRef(null); // Reference to the button element that triggers the popover

  function toggleVisibility() {
    setIsVisible(!isVisible);
  }

  function handleSelect(index: number) {
    setSelected(index);
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
        className="bg-blue-500 text-white p-2 cursor-pointer rounded-md"
        aria-haspopup="true"
        aria-expanded={isVisible}
        aria-controls="popover-content">
        {items[selected]}
        <div className="ml-2 inline-block">{arrow}</div>
      </button>
      {isVisible && (
        <div
          id="popover-content"
          ref={popoverRef}
          className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white border-[1px] border-solid border-gray-300 shadow-md rounded-md p-2 z-10 whitespace-nowrap"
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
                  <div className="mr-2">{item}</div>
                  {index == selected && <div className="">{checkmark}</div>}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

const arrow: ReactNode = (
  <svg
    fill="#ffffff"
    version="1.1"
    id="Capa_1"
    width="14px"
    height="14px"
    viewBox="0 0 562.392 562.391">
    <g>
      <g>
        <path
          d="M123.89,262.141h314.604c19.027,0,17.467-31.347,15.496-47.039c-0.605-4.841-3.636-11.971-6.438-15.967L303.965,16.533
			c-12.577-22.044-32.968-22.044-45.551,0L114.845,199.111c-2.803,3.996-5.832,11.126-6.438,15.967
			C106.43,230.776,104.863,262.141,123.89,262.141z"
        />
        <path
          d="M114.845,363.274l143.569,182.584c12.577,22.044,32.968,22.044,45.551,0l143.587-182.609
			c2.804-3.996,5.826-11.119,6.438-15.967c1.971-15.691,3.531-47.038-15.496-47.038H123.89c-19.027,0-17.46,31.365-15.483,47.062
			C109.019,352.147,112.042,359.277,114.845,363.274z"
        />
      </g>
    </g>
  </svg>
);

const checkmark: ReactNode = (
  <svg
    width="18px"
    height="18px"
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    fill="none">
    <path
      stroke="#535358"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M6.5 17l6 6 13-13"
    />
  </svg>
);
