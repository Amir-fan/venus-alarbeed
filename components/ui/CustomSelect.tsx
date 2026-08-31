'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.css';

interface Option {
  value: string;
  label: string;
}

interface Props {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  required?: boolean;
  theme?: 'light' | 'dark';
}

export default function CustomSelect({ options, value, onChange, placeholder, required, theme = 'light' }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  return (
    <div className={`${styles.container} ${theme === 'dark' ? styles.dark : ''}`} ref={containerRef}>
      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.open : ''} ${!value ? styles.empty : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOption ? selectedOption.label : placeholder}</span>
        <svg className={styles.chevron} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M6 9L12 15L18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Hidden input for form validation */}
      <input type="hidden" value={value} required={required} />

      <div className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ''}`} role="listbox">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            className={`${styles.option} ${value === opt.value ? styles.selected : ''}`}
            onClick={() => {
              onChange(opt.value);
              setIsOpen(false);
            }}
            role="option"
            aria-selected={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
