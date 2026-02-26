// app/settings/page.jsx
"use client";
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { 
  FiArrowLeft, 
  FiSun, 
  FiMoon, 
  FiType, 
  FiCheck,
  FiSave,
  FiRefreshCw
} from "react-icons/fi";

const SettingsPage = () => {
  const { theme, font, toggleTheme, changeFont, fonts } = useTheme();
  const [selectedFont, setSelectedFont] = useState(font);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);

  const isDark = theme === "dark";

  const fontOptions = [
    { id: "inter", name: "Inter", category: "Sans-serif" },
    { id: "roboto", name: "Roboto", category: "Sans-serif" },
    { id: "poppins", name: "Poppins", category: "Sans-serif" },
    { id: "opensans", name: "Open Sans", category: "Sans-serif" },
    { id: "montserrat", name: "Montserrat", category: "Sans-serif" },
    { id: "system", name: "System Default", category: "System" },
  ];

  const handleFontChange = (fontId) => {
    setSelectedFont(fontId);
    changeFont(fontId);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate save action
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedMessage(true);
      
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);
    }, 800);
  };

  const handleReset = () => {
    setSelectedFont("inter");
    changeFont("inter");
    
    if (isDark) {
      toggleTheme();
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-slate-950' : 'bg-slate-50'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-10 border-b ${
        isDark ? 'bg-slate-950/50 border-slate-800' : 'bg-white border-slate-200'
      
      } backdrop-blur-2xl`}>
        <div className="max-w-4xl mx-auto lg:px-8">
          <div className="flex items-center justify-center h-16">
            
            <div className="flex items-center justify-center gap-2">
              <button
                onClick={handleReset}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                  flex items-center gap-2
                  ${isDark 
                    ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' 
                    : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
              >
                <FiRefreshCw className="w-4 h-4" />
                Reset
              </button>
              
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all
                  flex items-center gap-2
                  ${isDark 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                  } ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <FiSave className={`w-4 h-4 ${isSaving ? 'animate-spin' : ''}`} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSavedMessage && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 animate-fade-in
            ${isDark ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'}`}
          >
            <FiCheck className="w-5 h-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        {/* Theme Settings */}
        <section className={`mb-8 p-6 rounded-xl border ${
          isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2
            ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            <span className="text-2xl">🎨</span>
            Theme Preferences
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Light Mode Option */}
            <button
              onClick={toggleTheme}
              className={`p-4 rounded-lg border-2 transition-all ${
                !isDark 
                  ? 'border-blue-500 bg-blue-50 dark:bg-slate-700' 
                  : isDark 
                    ? 'border-slate-700 hover:border-slate-600' 
                    : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <FiSun className={`w-6 h-6 ${
                  !isDark ? 'text-yellow-500' : 'text-slate-400'
                }`} />
                {!isDark && (
                  <FiCheck className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <p className={`font-medium ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Light Mode</p>
              <p className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Bright and clean interface</p>
            </button>

            {/* Dark Mode Option */}
            <button
              onClick={toggleTheme}
              className={`p-4 rounded-lg border-2 transition-all ${
                isDark 
                  ? 'border-blue-500 bg-slate-700' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <FiMoon className={`w-6 h-6 ${
                  isDark ? 'text-blue-400' : 'text-slate-400'
                }`} />
                {isDark && (
                  <FiCheck className="w-5 h-5 text-blue-500" />
                )}
              </div>
              <p className={`font-medium ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>Dark Mode</p>
              <p className={`text-sm ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}>Easy on the eyes at night</p>
            </button>
          </div>
        </section>

        {/* Font Settings */}
        <section className={`p-6 pb-20 rounded-xl border ${
          isDark ? 'bg-slate-950 border-slate-700' : 'bg-white border-slate-200'
        }`}>
          <h2 className={`text-lg font-semibold mb-4 flex items-center gap-2
            ${isDark ? 'text-white' : 'text-slate-900'}`}
          >
            <FiType className="w-5 h-5" />
            Font Preferences
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fontOptions.map((fontOption) => (
              <button
                key={fontOption.id}
                onClick={() => handleFontChange(fontOption.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left
                  ${selectedFont === fontOption.id
                    ? isDark
                      ? 'border-blue-500 bg-slate-700'
                      : 'border-blue-500 bg-blue-50'
                    : isDark
                      ? 'border-slate-700 hover:border-slate-600'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                style={{ fontFamily: fonts[fontOption.id] }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded ${
                    isDark ? 'bg-slate-600 text-slate-300' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {fontOption.category}
                  </span>
                  {selectedFont === fontOption.id && (
                    <FiCheck className="w-4 h-4 text-blue-500" />
                  )}
                </div>
                <p className={`font-medium text-lg ${
                  isDark ? 'text-white' : 'text-slate-900'
                }`}>
                  {fontOption.name}
                </p>
                <p className={`text-sm mt-2 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}>
                  The quick brown fox jumps over the lazy dog
                </p>
              </button>
            ))}
          </div>

          {/* Preview Section */}
          <div className={`mt-6 p-4 rounded-lg ${
            isDark ? 'bg-slate-900' : 'bg-slate-100'
          }`}>
            <p className={`text-sm mb-2 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}>
              Live Preview:
            </p>
            <div className="space-y-2">
              <h3 className={`text-xl font-bold ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                Heading 1 - Welcome to the App
              </h3>
              <h4 className={`text-lg font-semibold ${
                isDark ? 'text-slate-200' : 'text-slate-800'
              }`}>
                Heading 2 - Settings and Preferences
              </h4>
              <p className={`${
                isDark ? 'text-slate-300' : 'text-slate-700'
              }`}>
                This is a preview of how your selected font will look in paragraphs. 
                You can change the font anytime from these settings.
              </p>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;