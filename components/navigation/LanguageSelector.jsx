// LanguageSelector.jsx
import React from 'react';

const languages = [
  { code: 'am', name: 'አማርኛ (Amharic)', flag: '🇪🇹' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  // Add more languages here easily
  // { code: 'es', name: 'Español', flag: '🇪🇸' },
];

const LanguageSelector = ({
  value = 'en',
  onChange,
  className = '',
}) => {
  return (
    <div className={`relative inline-block w-48 max-w-[140px] ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full appearance-none rounded-lg  outline-none  px-4 py-2.5 pr-10 text-white shadow-sm 
          cursor-pointer hover:border-gray-400
        `}
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code} className='bg-white text-gray-900 rounded-sm'>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>

      {/* Custom dropdown arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3">
        <svg
          className="h-5 w-5 text-gray-500 dark:text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  );
};

export default LanguageSelector;