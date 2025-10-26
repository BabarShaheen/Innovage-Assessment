import React, { createContext, useContext, useState, useEffect } from "react";

/**
 * Theme Context and Provider for Dark Mode Support
 */

const ThemeContext = createContext();

export const ThemeProvider = ({ children, defaultTheme = "light" }) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme) {
      setTheme(savedTheme);
    } else if (prefersDark) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const value = {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === "dark",
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

/**
 * Theme Toggle Button Component
 */
export const ThemeToggle = ({ className = "", ...props }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        p-2 rounded-lg
        bg-gray-100 hover:bg-gray-200
        dark:bg-gray-800 dark:hover:bg-gray-700
        text-gray-700 dark:text-gray-300
        transition-colors duration-fast
        ${className}
      `}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      {...props}
    >
      {theme === "light" ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )}
    </button>
  );
};

/**
 * Dark Mode CSS Variables Override
 * This extends the design system with dark mode variants
 */
export const darkModeStyles = `
  [data-theme="dark"] {
    /* Dark gradient options */
    --gradient-primary: linear-gradient(135deg, #1F2937 0%, #064E3B 50%, #065F46 100%);
    --gradient-secondary: linear-gradient(135deg, #111827 0%, #064E3B 50%, #047857 100%);
    --gradient-alt-1: linear-gradient(135deg, #1F2937 0%, #065F46 50%, #047857 100%);
    --gradient-alt-2: linear-gradient(135deg, #111827 0%, #064E3B 50%, #065F46 100%);

    /* Dark color overrides */
    --bg-primary: #111827;
    --bg-secondary: #1F2937;
    --bg-tertiary: #374151;
    --bg-accent: #064E3B;

    /* Text colors for dark mode */
    --color-gray-700: #D1D5DB;
    --color-gray-600: #9CA3AF;
    --color-gray-500: #6B7280;
    --color-gray-400: #9CA3AF;
    --color-gray-300: #D1D5DB;
    --color-gray-200: #E5E7EB;

    /* Border colors for dark mode */
    --border-light: #374151;
    --border-medium: #4B5563;
    --border-dark: #6B7280;

    /* Shadow adjustments for dark mode */
    --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2);
    --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
    --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  }

  /* Dark mode specific component styles */
  [data-theme="dark"] body {
    background: var(--gradient-primary);
    color: var(--color-gray-700);
  }

  /* Dark mode form elements */
  [data-theme="dark"] input,
  [data-theme="dark"] textarea,
  [data-theme="dark"] select {
    background-color: var(--bg-secondary);
    border-color: var(--border-medium);
    color: var(--color-gray-300);
  }

  [data-theme="dark"] input:focus,
  [data-theme="dark"] textarea:focus,
  [data-theme="dark"] select:focus {
    border-color: var(--color-primary-500);
    background-color: var(--bg-secondary);
  }

  /* Dark mode cards */
  [data-theme="dark"] .card {
    background-color: var(--bg-secondary);
    border-color: var(--border-light);
  }

  /* Dark mode buttons */
  [data-theme="dark"] .btn-secondary {
    background-color: var(--bg-secondary);
    border-color: var(--border-medium);
    color: var(--color-gray-300);
  }

  [data-theme="dark"] .btn-secondary:hover {
    background-color: var(--bg-tertiary);
    border-color: var(--border-dark);
  }

  /* Dark mode navigation */
  [data-theme="dark"] .nav-item {
    color: var(--color-gray-400);
  }

  [data-theme="dark"] .nav-item:hover,
  [data-theme="dark"] .nav-item.active {
    color: var(--color-gray-200);
    background-color: var(--bg-accent);
  }

  /* Dark mode modals */
  [data-theme="dark"] .modal-backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }

  [data-theme="dark"] .modal-content {
    background-color: var(--bg-secondary);
    border-color: var(--border-light);
  }

  /* Dark mode toasts */
  [data-theme="dark"] .toast {
    background-color: var(--bg-secondary);
    border-color: var(--border-light);
    color: var(--color-gray-300);
  }

  /* Dark mode code blocks */
  [data-theme="dark"] pre,
  [data-theme="dark"] code {
    background-color: var(--bg-tertiary);
    color: var(--color-gray-300);
  }

  /* Dark mode tables */
  [data-theme="dark"] table {
    background-color: var(--bg-secondary);
  }

  [data-theme="dark"] th {
    background-color: var(--bg-tertiary);
    color: var(--color-gray-300);
  }

  [data-theme="dark"] td {
    border-color: var(--border-light);
    color: var(--color-gray-400);
  }

  /* Dark mode scrollbars */
  [data-theme="dark"] ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  [data-theme="dark"] ::-webkit-scrollbar-track {
    background: var(--bg-tertiary);
  }

  [data-theme="dark"] ::-webkit-scrollbar-thumb {
    background: var(--border-dark);
    border-radius: 4px;
  }

  [data-theme="dark"] ::-webkit-scrollbar-thumb:hover {
    background: var(--color-gray-500);
  }
`;

/**
 * Utility function to apply dark mode styles
 */
export const applyDarkModeStyles = () => {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = darkModeStyles;
  document.head.appendChild(styleSheet);
  return () => document.head.removeChild(styleSheet);
};

/**
 * Hook to detect system theme preference
 */
export const useSystemTheme = () => {
  const [systemTheme, setSystemTheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e) => {
      setSystemTheme(e.matches ? "dark" : "light");
    };

    setSystemTheme(mediaQuery.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return systemTheme;
};

export default ThemeProvider;
