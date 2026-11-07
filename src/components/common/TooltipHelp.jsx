import React, { useState, useRef, useEffect } from 'react';

export const TooltipHelp = ({ title, text, position = 'top' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <span className="relative inline-flex items-center" ref={containerRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        className="text-slate-600 hover:text-[#2D5A27] bg-slate-100 hover:bg-emerald-50 rounded-full w-4 h-4 text-[10px] font-bold inline-flex items-center justify-center transition cursor-help border border-slate-300"
        aria-label={title || 'Explicação metodológica'}
        aria-expanded={isOpen}
      >
        ?
      </button>

      {isOpen && (
        <span
          role="tooltip"
          className={`absolute z-50 w-64 p-3 bg-slate-900 text-white rounded-xl shadow-xl text-xs leading-relaxed pointer-events-none font-normal normal-case tracking-normal text-left ${
            position === 'bottom'
              ? 'top-full left-1/2 -translate-x-1/2 mt-2'
              : position === 'right'
              ? 'left-full top-1/2 -translate-y-1/2 ml-2'
              : 'bottom-full left-1/2 -translate-x-1/2 mb-2'
          }`}
        >
          {title && <span className="block font-bold text-emerald-400 mb-1">{title}</span>}
          <span className="block text-slate-200 text-[11px] leading-normal">{text}</span>
        </span>
      )}
    </span>
  );
};
