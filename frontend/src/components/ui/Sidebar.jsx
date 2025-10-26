import React, { useState } from "react";
import { IconButton } from "./Button";

/**
 * Sidebar Component - Collapsible sidebar for dashboard navigation
 *
 * Features:
 * - Collapsible/expandable
 * - Responsive design
 * - Navigation items with icons
 * - Active state management
 * - Nested navigation support
 * - Mobile overlay mode
 */

const Sidebar = ({
  isOpen = true,
  onToggle,
  items = [],
  activeItem,
  onItemClick,
  logo,
  title = "AI Notes",
  className = "",
  variant = "default", // default, overlay
  ...props
}) => {
  const [expandedItems, setExpandedItems] = useState(new Set());

  const toggleExpanded = (itemId) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(itemId)) {
      newExpanded.delete(itemId);
    } else {
      newExpanded.add(itemId);
    }
    setExpandedItems(newExpanded);
  };

  const handleItemClick = (item) => {
    if (item.children) {
      toggleExpanded(item.id);
    }
    onItemClick?.(item);
  };

  const renderNavItem = (item, level = 0) => {
    const isActive = activeItem === item.id;
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="space-y-1">
        <button
          onClick={() => handleItemClick(item)}
          className={`
            w-full flex items-center justify-between px-3 py-2 rounded-lg
            text-left transition-all duration-fast
            ${level > 0 ? "ml-4" : ""}
            ${
              isActive
                ? "bg-primary-100 text-primary-700 font-medium"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
            }
          `}
        >
          <div className="flex items-center space-x-3">
            {item.icon && (
              <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
            )}
            <span className="truncate">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          {hasChildren && (
            <svg
              className={`w-4 h-4 transition-transform duration-fast ${
                isExpanded ? "rotate-180" : ""
              }`}
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
          )}
        </button>

        {/* Render children if expanded */}
        {hasChildren && isExpanded && (
          <div className="space-y-1">
            {item.children.map((child) => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const sidebarClasses = `
    bg-white border-r border-gray-200
    transition-all duration-normal ease-in-out
    ${variant === "overlay" ? "fixed inset-y-0 left-0 z-modal shadow-xl" : ""}
    ${isOpen ? "w-64" : "w-16"}
    ${className}
  `;

  return (
    <>
      {/* Overlay for mobile */}
      {variant === "overlay" && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-modal-backdrop"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside className={sidebarClasses} {...props}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {isOpen ? (
              <div className="flex items-center space-x-3">
                {logo ? (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    {logo}
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    {title}
                  </h2>
                  <p className="text-xs text-gray-500">Dashboard</p>
                </div>
              </div>
            ) : (
              <div className="w-full flex justify-center">
                {logo ? (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    {logo}
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            )}

            {/* Toggle Button */}
            <IconButton
              variant="ghost"
              size="sm"
              onClick={onToggle}
              className="flex-shrink-0"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <svg
                className={`w-5 h-5 transition-transform duration-normal ${
                  isOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </IconButton>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {items.map((item) => renderNavItem(item))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            {isOpen ? (
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-white">U</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      User Name
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      user@example.com
                    </p>
                  </div>
                </div>
                <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
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
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <IconButton variant="ghost" size="sm" aria-label="User menu">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                    <span className="text-sm font-medium text-white">U</span>
                  </div>
                </IconButton>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

/**
 * Default navigation items for the notes app
 */
export const defaultNavItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    href: "/dashboard",
  },
  {
    id: "notes",
    label: "All Notes",
    icon: (
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
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    href: "/notes",
    badge: "12",
  },
  {
    id: "categories",
    label: "Categories",
    icon: (
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
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
    children: [
      {
        id: "work",
        label: "Work",
        href: "/notes/category/work",
      },
      {
        id: "personal",
        label: "Personal",
        href: "/notes/category/personal",
      },
      {
        id: "ideas",
        label: "Ideas",
        href: "/notes/category/ideas",
      },
    ],
  },
  {
    id: "favorites",
    label: "Favorites",
    icon: (
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
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    href: "/notes/favorites",
  },
  {
    id: "trash",
    label: "Trash",
    icon: (
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
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
    ),
    href: "/notes/trash",
  },
];

export default Sidebar;
