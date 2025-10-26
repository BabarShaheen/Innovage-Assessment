import React, { useState, useEffect } from "react";
import { IconButton } from "./Button";

/**
 * Loading States Components
 */

/**
 * Skeleton Loader - For content placeholders
 */
export const Skeleton = ({
  width = "w-full",
  height = "h-4",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        animate-pulse bg-gray-200 rounded
        ${width} ${height}
        ${className}
      `}
      {...props}
    />
  );
};

/**
 * Spinner Component - Loading indicator
 */
export const Spinner = ({
  size = "md",
  color = "primary",
  className = "",
  ...props
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
  };

  const colorClasses = {
    primary: "text-primary-600",
    white: "text-white",
    gray: "text-gray-600",
  };

  return (
    <svg
      className={`
        animate-spin ${sizeClasses[size]} ${colorClasses[color]}
        ${className}
      `}
      fill="none"
      viewBox="0 0 24 24"
      {...props}
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
  );
};

/**
 * Loading Overlay - Full screen loading state
 */
export const LoadingOverlay = ({
  loading = false,
  message = "Loading...",
  className = "",
  ...props
}) => {
  if (!loading) return null;

  return (
    <div
      className={`
        fixed inset-0 z-modal
        bg-white bg-opacity-80 backdrop-blur-sm
        flex items-center justify-center
        ${className}
      `}
      {...props}
    >
      <div className="text-center space-y-4">
        <Spinner size="xl" />
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};

/**
 * Empty State Component
 */
export const EmptyState = ({
  icon,
  title,
  description,
  action,
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        py-12 px-4 text-center
        ${className}
      `}
      {...props}
    >
      {icon && (
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-2xl">{icon}</span>
        </div>
      )}

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {description && (
        <p className="text-gray-600 mb-6 max-w-md">{description}</p>
      )}

      {action && <div>{action}</div>}
    </div>
  );
};

/**
 * Toast Notification System
 */

// Toast Context (simplified version)
const ToastContext = React.createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = Date.now().toString();
    const newToast = { id, ...toast };
    setToasts((prev) => [...prev, newToast]);

    // Auto remove after duration
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const showToast = (message, type = "info", options = {}) => {
    context.addToast({
      type,
      title: message,
      description: options.description,
      duration: options.duration || 5000,
    });
  };

  return {
    showToast,
    addToast: context.addToast,
    removeToast: context.removeToast,
  };
};

/**
 * Individual Toast Component
 */
const Toast = ({
  id,
  type = "info", // success, error, warning, info
  title,
  description,
  duration = 5000,
  onRemove,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Trigger enter animation
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleRemove = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onRemove(id);
    }, 300);
  };

  const typeConfig = {
    success: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-success",
      textColor: "text-white",
      borderColor: "border-success",
    },
    error: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-error",
      textColor: "text-white",
      borderColor: "border-error",
    },
    warning: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-warning",
      textColor: "text-white",
      borderColor: "border-warning",
    },
    info: {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
      bgColor: "bg-info",
      textColor: "text-white",
      borderColor: "border-info",
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`
        max-w-sm w-full
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        border rounded-lg shadow-lg
        transform transition-all duration-300 ease-in-out
        ${
          isVisible && !isLeaving
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }
        ${isLeaving ? "translate-x-full opacity-0" : ""}
      `}
      {...props}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{config.icon}</div>
          <div className="ml-3 flex-1">
            {title && <p className="text-sm font-medium">{title}</p>}
            {description && (
              <p className={`text-sm ${title ? "mt-1" : ""}`}>{description}</p>
            )}
          </div>
          <div className="ml-4 flex-shrink-0">
            <IconButton
              variant="ghost"
              size="sm"
              onClick={handleRemove}
              className="text-white hover:bg-white hover:bg-opacity-20"
              aria-label="Close notification"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </IconButton>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Toast Container - Renders all active toasts
 */
const ToastContainer = ({ toasts, onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-toast space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

/**
 * Alert Component - Inline alerts for forms and content
 */
export const Alert = ({
  type = "info", // success, error, warning, info
  title,
  children,
  className = "",
  ...props
}) => {
  const typeConfig = {
    success: {
      bgColor: "bg-success",
      textColor: "text-white",
      borderColor: "border-success",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    error: {
      bgColor: "bg-error",
      textColor: "text-white",
      borderColor: "border-error",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    warning: {
      bgColor: "bg-warning",
      textColor: "text-white",
      borderColor: "border-warning",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    info: {
      bgColor: "bg-info",
      textColor: "text-white",
      borderColor: "border-info",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  };

  const config = typeConfig[type];

  return (
    <div
      className={`
        ${config.bgColor} ${config.textColor} ${config.borderColor}
        border rounded-lg p-4
        ${className}
      `}
      {...props}
    >
      <div className="flex">
        <div className="flex-shrink-0">{config.icon}</div>
        <div className="ml-3">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className={`text-sm ${title ? "mt-1" : ""}`}>{children}</div>
        </div>
      </div>
    </div>
  );
};
