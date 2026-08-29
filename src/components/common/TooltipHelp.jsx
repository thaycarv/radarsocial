import React, { useState, useRef, useEffect } from 'react';

export const TooltipHelp = ({ title, text, position = "top" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-flex items-center" ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="text-slate-500 hover:text-[#2D5A27] bg-slate-100 hover:bg-emerald-50 rounded-full w-4 h-4 text-[10px] font-bold inline-flex items-center justify-center transition cursor-help border border-slate-300 shadow-2xs"
        aria-label="Ajuda"
      >
        ?
      </button>

      {isOpen && (
        <div
          className={`absolute z-[999] w-64 p-3 bg-slate-900 text-white rounded-xl shadow-2xl text-xs leading-relaxed animate-in fade-in zoom-in-95 duration-150 pointer-events-none ${
            position === "bottom"
              ? "top-full left-1/2 -translate-x-1/2 mt-2"
              : position === "right"
              ? "left-full top-1/2 -translate-y-1/2 ml-2"
              : "bottom-full left-1/2 -translate-x-1/2 mb-2"
          }`}
        >
          {title && <p className="font-bold text-emerald-400 mb-1">{title}</p>}
          <p className="text-slate-200 text-[11px] font-normal leading-normal">{text}</p>
          <div
            className={`absolute w-2 h-2 bg-slate-900 rotate-45 ${
              position === "bottom"
                ? "bottom-full left-1/2 -translate-x-1/2 -mb-1"
                : position === "right"
                ? "right-full top-1/2 -translate-y-1/2 -mr-1"
                : "top-full left-1/2 -translate-x-1/2 -mt-1"
            }`}
          />
        </div>
      )}
    </div>
  );
};
