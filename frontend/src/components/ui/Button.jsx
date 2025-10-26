import React from "react";

/**
 * Button Component - Production-ready with accessibility and micro-interactions
 *
 * Variants: primary, secondary, ghost
 * Sizes: sm, md, lg
 * States: default, loading, disabled
 *
 * Usage:
 * <Button variant="primary" size="md" loading={false}>
 *   Click me
 * </Button>
 */

const Button = ({
  children,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  type = "button",
  className = "",
  icon,
  iconPosition = "left",
  fullWidth = false,
  as: Component = "button",
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-fast ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95 transform
    ${fullWidth ? "w-full" : ""}
  `;

  const variantClasses = {
    primary: `
      bg-primary-500 text-white border border-primary-500
      hover:bg-primary-600 hover:border-primary-600
      focus:ring-primary-500
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50 hover:border-gray-400
      focus:ring-gray-500
      shadow-sm hover:shadow-md
    `,
    ghost: `
      bg-transparent text-gray-700 border border-transparent
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-500
    `,
    danger: `
      bg-error text-white border border-error
      hover:bg-red-600 hover:border-red-600
      focus:ring-error
      shadow-sm hover:shadow-md
    `,
    success: `
      bg-success text-white border border-success
      hover:bg-green-600 hover:border-green-600
      focus:ring-success
      shadow-sm hover:shadow-md
    `,
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-base gap-2",
    lg: "px-6 py-3 text-lg gap-2.5",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const isDisabled = disabled || loading;

  return (
    <Component
      type={Component === "button" ? type : undefined}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {loading && (
        <svg
          className={`animate-spin ${iconSizeClasses[size]}`}
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
      )}

      {!loading && icon && iconPosition === "left" && (
        <span className={iconSizeClasses[size]}>{icon}</span>
      )}

      <span className={loading ? "opacity-0" : ""}>{children}</span>

      {!loading && icon && iconPosition === "right" && (
        <span className={iconSizeClasses[size]}>{icon}</span>
      )}
    </Component>
  );
};

// Icon Button variant for compact actions
export const IconButton = ({
  children,
  variant = "ghost",
  size = "md",
  loading = false,
  disabled = false,
  onClick,
  className = "",
  "aria-label": ariaLabel,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center font-medium rounded-lg
    transition-all duration-fast ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:scale-95 transform
  `;

  const variantClasses = {
    primary: `
      bg-primary-500 text-white
      hover:bg-primary-600
      focus:ring-primary-500
      shadow-sm hover:shadow-md
    `,
    secondary: `
      bg-white text-gray-700 border border-gray-300
      hover:bg-gray-50
      focus:ring-gray-500
      shadow-sm hover:shadow-md
    `,
    ghost: `
      bg-transparent text-gray-700
      hover:bg-gray-100 hover:text-gray-900
      focus:ring-gray-500
    `,
  };

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <svg
          className={`animate-spin ${iconSizeClasses[size]}`}
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
      ) : (
        <span className={iconSizeClasses[size]}>{children}</span>
      )}
    </button>
  );
};

// Button Group for related actions
export const ButtonGroup = ({
  children,
  orientation = "horizontal",
  className = "",
  ...props
}) => {
  const orientationClasses = {
    horizontal: "flex-row",
    vertical: "flex-col",
  };

  return (
    <div
      className={`
        inline-flex ${orientationClasses[orientation]}
        ${orientation === "horizontal" ? "space-x-0" : "space-y-0"}
        ${className}
      `}
      role="group"
      {...props}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const isFirst = index === 0;
          const isLast = index === React.Children.count(children) - 1;

          return React.cloneElement(child, {
            className: `
              ${child.props.className || ""}
              ${
                orientation === "horizontal"
                  ? `${
                      isFirst
                        ? "rounded-r-none"
                        : isLast
                        ? "rounded-l-none"
                        : "rounded-none"
                    } ${!isFirst ? "border-l-0" : ""}`
                  : `${
                      isFirst
                        ? "rounded-b-none"
                        : isLast
                        ? "rounded-t-none"
                        : "rounded-none"
                    } ${!isFirst ? "border-t-0" : ""}`
              }
            `,
          });
        }
        return child;
      })}
    </div>
  );
};

export default Button;
