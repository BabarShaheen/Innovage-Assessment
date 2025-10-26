import React, { useState, forwardRef } from "react";

/**
 * Input Component - Production-ready with validation and accessibility
 *
 * Features:
 * - Inline validation with error states
 * - Loading states
 * - Icon support (left/right)
 * - Different sizes and variants
 * - Proper focus management
 */

const Input = forwardRef(
  (
    {
      label,
      error,
      helperText,
      loading = false,
      disabled = false,
      required = false,
      size = "md",
      variant = "default",
      icon,
      iconPosition = "left",
      className = "",
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const baseClasses = `
    w-full border rounded-lg transition-all duration-fast
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
  `;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const variantClasses = {
      default: `
      border-gray-300 bg-white text-gray-900
      focus:border-primary-500 focus:ring-primary-500
      placeholder-gray-400
    `,
      error: `
      border-error bg-white text-gray-900
      focus:border-error focus:ring-error
      placeholder-gray-400
    `,
      success: `
      border-success bg-white text-gray-900
      focus:border-success focus:ring-success
      placeholder-gray-400
    `,
    };

    const iconSizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    const getVariant = () => {
      if (error) return "error";
      return variant;
    };

    return (
      <div className={`space-y-1 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className={iconSizeClasses[size]}>{icon}</span>
            </div>
          )}

          <input
            ref={ref}
            disabled={disabled || loading}
            className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${variantClasses[getVariant()]}
            ${icon && iconPosition === "left" ? "pl-10" : ""}
            ${icon && iconPosition === "right" ? "pr-10" : ""}
            ${loading ? "pr-10" : ""}
          `}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            {...props}
          />

          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg
                className={`animate-spin text-gray-400 ${iconSizeClasses[size]}`}
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </div>
          )}

          {icon && iconPosition === "right" && !loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <span className={iconSizeClasses[size]}>{icon}</span>
            </div>
          )}
        </div>

        {(error || helperText) && (
          <div className="text-sm">
            {error && (
              <p className="text-error flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

/**
 * Textarea Component
 */
const Textarea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      size = "md",
      resize = "vertical",
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = `
    w-full border rounded-lg transition-all duration-fast
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
  `;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const resizeClasses = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    const variantClasses = error
      ? `
    border-error bg-white text-gray-900
    focus:border-error focus:ring-error
    placeholder-gray-400
  `
      : `
    border-gray-300 bg-white text-gray-900
    focus:border-primary-500 focus:ring-primary-500
    placeholder-gray-400
  `;

    return (
      <div className={`space-y-1 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          disabled={disabled}
          className={`
          ${baseClasses}
          ${sizeClasses[size]}
          ${variantClasses}
          ${resizeClasses[resize]}
        `}
          {...props}
        />

        {(error || helperText) && (
          <div className="text-sm">
            {error && (
              <p className="text-error flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

/**
 * Select Component
 */
const Select = forwardRef(
  (
    {
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      size = "md",
      placeholder = "Select an option...",
      options = [],
      className = "",
      ...props
    },
    ref
  ) => {
    const baseClasses = `
    w-full border rounded-lg transition-all duration-fast
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50
    appearance-none bg-white
  `;

    const sizeClasses = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-4 py-2 text-base",
      lg: "px-4 py-3 text-lg",
    };

    const variantClasses = error
      ? `
    border-error text-gray-900
    focus:border-error focus:ring-error
  `
      : `
    border-gray-300 text-gray-900
    focus:border-primary-500 focus:ring-primary-500
  `;

    return (
      <div className={`space-y-1 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            disabled={disabled}
            className={`
            ${baseClasses}
            ${sizeClasses[size]}
            ${variantClasses}
            pr-10
          `}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
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

        {(error || helperText) && (
          <div className="text-sm">
            {error && (
              <p className="text-error flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-gray-500">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

/**
 * Form Field Group for organizing related fields
 */
export const FormFieldGroup = ({
  title,
  description,
  children,
  className = "",
  ...props
}) => {
  return (
    <fieldset className={`space-y-4 ${className}`} {...props}>
      {(title || description) && (
        <div className="space-y-1">
          {title && (
            <legend className="text-lg font-semibold text-gray-900">
              {title}
            </legend>
          )}
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
        </div>
      )}
      <div className="space-y-4">{children}</div>
    </fieldset>
  );
};

export { Input, Textarea, Select };
