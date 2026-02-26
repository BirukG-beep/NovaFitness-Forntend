'use client';

import React, { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const PinPage = () => {
  const router = useRouter();
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [error, setError] = useState(false);

  const handleInput = (index, e) => {
    const value = e.target.value;

    if (value.length === 1 && /^\d$/.test(value)) {
      if (index < 3) {
        inputRefs[index + 1].current?.focus();
      } else {
        checkCode();
      }
    } else {
      e.target.value = '';
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && e.target.value === '' && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const checkCode = () => {
    const code = inputRefs.map((ref) => ref.current?.value || '').join('');

    if (code === '4444') {
      router.push('/change-password');
    } else {
      setError(true);
      setTimeout(() => {
        setError(false);
        inputRefs.forEach((ref) => {
          if (ref.current) ref.current.value = '';
        });
        inputRefs[0].current?.focus();
      }, 2000);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">
          Enter 4-Digit Code
        </h2>

        <div className="flex space-x-4 justify-center">
          {inputRefs.map((ref, index) => (
            <input
              key={index}
              ref={ref}
              type="text"
              maxLength={1}
              className="w-12 h-12 text-center text-gray-700 text-2xl border-2 border-gray-300 rounded focus:outline-none focus:border-blue-500"
              pattern="[0-9]"
              inputMode="numeric"
              onInput={(e) => handleInput(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
            />
          ))}
        </div>

        {error && (
          <div className="mt-4 text-red-500 text-center">
            Wrong code!
          </div>
        )}
      </div>
    </div>
  );
};

export default PinPage;
