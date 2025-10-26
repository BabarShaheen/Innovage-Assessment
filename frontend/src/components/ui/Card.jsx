import React from "react";

/**
 * Card Component - Base card with consistent styling and variants
 *
 * Variants: default, elevated, outlined, filled
 * Sizes: sm, md, lg
 * Interactive: hover effects, clickable states
 */

const Card = ({
  children,
  variant = "default",
  size = "md",
  interactive = false,
  className = "",
  onClick,
  ...props
}) => {
  const baseClasses = `
    rounded-xl transition-all duration-normal
    ${
      interactive ? "cursor-pointer hover:scale-[1.02] active:scale-[0.98]" : ""
    }
  `;

  const variantClasses = {
    default: "bg-white border border-gray-200 shadow-sm",
    elevated: "bg-white border border-gray-200 shadow-lg hover:shadow-xl",
    outlined: "bg-white border-2 border-gray-300 shadow-none",
    filled: "bg-gray-50 border border-gray-200 shadow-none",
    gradient:
      "bg-gradient-to-br from-white to-primary-50 border border-primary-200 shadow-sm",
  };

  const sizeClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <div
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Card Header Component
 */
export const CardHeader = ({
  title,
  subtitle,
  action,
  className = "",
  children,
  ...props
}) => {
  return (
    <div className={`space-y-1 ${className}`} {...props}>
      {(title || action) && (
        <div className="flex items-start justify-between">
          {title && (
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
            </div>
          )}
          {action && <div className="flex-shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

/**
 * Card Content Component
 */
export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`space-y-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

/**
 * Card Footer Component
 */
export const CardFooter = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`flex items-center justify-between pt-4 border-t border-gray-200 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

/**
 * Stats Card Component - For displaying metrics and statistics
 */
export const StatsCard = ({
  title,
  value,
  change,
  changeType = "neutral", // positive, negative, neutral
  icon,
  trend,
  className = "",
  ...props
}) => {
  const changeClasses = {
    positive: "text-success",
    negative: "text-error",
    neutral: "text-gray-600",
  };

  const trendIcon = {
    up: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
    down: (
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <Card variant="default" size="md" className={className} {...props}>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <div
              className={`flex items-center gap-1 text-sm ${changeClasses[changeType]}`}
            >
              {trend && trendIcon[trend]}
              <span>{change}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 text-xl">{icon}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

/**
 * Note Card Component - Specialized for note display
 */
export const NoteCard = ({
  title,
  content,
  summary,
  createdAt,
  updatedAt,
  tags = [],
  status = "draft", // draft, published, archived
  onClick,
  onEdit,
  onDelete,
  className = "",
  ...props
}) => {
  const statusClasses = {
    draft: "bg-yellow-100 text-yellow-800",
    published: "bg-success text-white",
    archived: "bg-gray-100 text-gray-800",
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card
      variant="elevated"
      size="md"
      interactive
      onClick={onClick}
      className={className}
      {...props}
    >
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${statusClasses[status]}`}
              >
                {status}
              </span>
              <span className="text-xs text-gray-500">
                {formatDate(updatedAt || createdAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Preview */}
        <div className="space-y-2">
          {summary && (
            <p className="text-sm text-gray-600 line-clamp-2">{summary}</p>
          )}
          <p className="text-sm text-gray-700 line-clamp-3">{content}</p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="text-sm text-error hover:text-red-700 font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

/**
 * Activity Feed Card Component
 */
export const ActivityCard = ({
  type, // note_created, note_updated, note_deleted, etc.
  title,
  description,
  timestamp,
  user,
  className = "",
  ...props
}) => {
  const typeIcons = {
    note_created: "📝",
    note_updated: "✏️",
    note_deleted: "🗑️",
    summary_generated: "🤖",
    default: "📄",
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return new Date(date).toLocaleDateString();
  };

  return (
    <Card variant="outlined" size="sm" className={className} {...props}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-sm">
            {typeIcons[type] || typeIcons.default}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-medium text-gray-900 truncate">
              {title}
            </h4>
            <span className="text-xs text-gray-500">
              {formatTimestamp(timestamp)}
            </span>
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
          {user && <p className="text-xs text-gray-500 mt-1">by {user}</p>}
        </div>
      </div>
    </Card>
  );
};

export default Card;
