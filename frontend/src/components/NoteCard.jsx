import { Link } from "react-router-dom";
import { Button } from "./ui";

export default function NoteCard({ note, onDelete, deleting = false }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short" });
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const getContentPreview = (content) => {
    if (!content) return "No content";
    return content.length > 150 ? content.substring(0, 150) + "..." : content;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 pb-2">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-neutral-900 line-clamp-2 flex-1 mr-2">
            {note.title || "Untitled Note"}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-neutral-500">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{formatDate(note.updatedAt)}</span>
          </div>
        </div>

        <p className="text-sm text-neutral-600 line-clamp-3 mb-3">
          {getContentPreview(note.content)}
        </p>

        {/* Tags */}
        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {note.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary-100 text-primary-700"
              >
                {tag}
              </span>
            ))}
            {note.tags.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-neutral-100 text-neutral-600">
                +{note.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Category */}
        {note.category && (
          <div className="flex items-center space-x-1 mb-3">
            <svg
              className="w-3 h-3 text-neutral-400"
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
            <span className="text-xs text-neutral-500">{note.category}</span>
          </div>
        )}
      </div>

      {/* Summary Section */}
      {note.summary && (
        <div className="px-4 py-2 bg-gradient-to-r from-accent-50 to-primary-50 border-t border-neutral-100">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0 w-5 h-5 rounded bg-accent-100 flex items-center justify-center mt-0.5">
              <svg
                className="w-3 h-3 text-accent-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-neutral-700 mb-1">
                AI Summary
              </p>
              <p className="text-xs text-neutral-600 line-clamp-2">
                {note.summary}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="p-4 pt-2 mt-auto">
        <div className="flex items-center justify-between space-x-3">
          {/* ✏️ Edit Button */}
          <Button
            as={Link}
            to={`/edit/${note._id}`}
            variant="ghost"
            size="sm"
            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium 
                 text-emerald-600 border border-emerald-300 rounded-lg 
                 bg-gradient-to-r from-white to-emerald-50 
                 hover:from-emerald-50 hover:to-emerald-100 
                 hover:shadow-md transition-all duration-200"
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414
             a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Button>

          {/* 🗑 Delete Button */}
          <Button
            onClick={() => onDelete(note._id)}
            variant="ghost"
            size="sm"
            loading={deleting}
            disabled={deleting}
            className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium 
                  text-red-600 border border-red-300 rounded-lg 
                  bg-gradient-to-r from-white to-red-50 
                  hover:from-red-50 hover:to-red-100 
                  hover:shadow-md transition-all duration-200
                  ${deleting ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            {!deleting && (
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
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
               a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4
               a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            )}
            {deleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
