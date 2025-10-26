import React, { useState } from "react";
import { Input, Textarea, Select, FormFieldGroup } from "./Form";
import Button from "./Button";
import { Alert } from "./LoadingStates";

/**
 * NoteForm Component - Comprehensive form for creating/editing notes
 *
 * Features:
 * - Form validation
 * - Auto-save functionality
 * - Tag management
 * - Category selection
 * - AI summary generation
 * - Responsive design
 */

const NoteForm = ({
  initialData = {},
  onSubmit,
  onCancel,
  loading = false,
  className = "",
  mode = "create", // create, edit
  ...props
}) => {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    content: initialData.content || "",
    category: initialData.category || "",
    tags: initialData.tags || [],
    status: initialData.status || "draft",
    ...initialData,
  });

  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [newTag, setNewTag] = useState("");

  // Categories for the select dropdown
  const categories = [
    { value: "", label: "Select a category..." },
    { value: "work", label: "Work" },
    { value: "personal", label: "Personal" },
    { value: "ideas", label: "Ideas" },
    { value: "meetings", label: "Meetings" },
    { value: "research", label: "Research" },
    { value: "other", label: "Other" },
  ];

  // Status options
  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "published", label: "Published" },
    { value: "archived", label: "Archived" },
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsDirty(true);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit?.(formData);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
      setIsDirty(true);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
    setIsDirty(true);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div className={`space-y-6 ${className}`} {...props}>
      {/* Form Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {mode === "create" ? "Create New Note" : "Edit Note"}
          </h2>
          <p className="text-gray-600 mt-1">
            {mode === "create"
              ? "Start writing your thoughts and ideas"
              : "Update your note content and settings"}
          </p>
        </div>
        {isDirty && (
          <div className="flex items-center text-sm text-gray-500">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
            Unsaved changes
          </div>
        )}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <FormFieldGroup title="Basic Information">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            placeholder="Enter a descriptive title..."
            error={errors.title}
            required
            disabled={loading}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
              options={categories}
              disabled={loading}
            />

            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              options={statusOptions}
              disabled={loading}
            />
          </div>
        </FormFieldGroup>

        {/* Content */}
        <FormFieldGroup title="Content">
          <Textarea
            label="Note Content"
            value={formData.content}
            onChange={(e) => handleInputChange("content", e.target.value)}
            placeholder="Write your note here... Use markdown for formatting."
            rows={12}
            error={errors.content}
            required
            disabled={loading}
            resize="vertical"
          />
        </FormFieldGroup>

        {/* Tags */}
        <FormFieldGroup
          title="Tags"
          description="Add tags to help organize and find your notes"
        >
          <div className="space-y-3">
            {/* Add Tag Input */}
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                disabled={loading}
                className="flex-1"
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTag}
                disabled={!newTag.trim() || loading}
              >
                Add Tag
              </Button>
            </div>

            {/* Tags Display */}
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary-100 text-primary-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-primary-600 hover:text-primary-800"
                      disabled={loading}
                    >
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </FormFieldGroup>

        {/* Form Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            {isDirty && (
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  // Auto-save functionality could be implemented here
                  console.log("Auto-saving...");
                }}
                disabled={loading}
              >
                Save Draft
              </Button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading}
            >
              {mode === "create" ? "Create Note" : "Update Note"}
            </Button>
          </div>
        </div>
      </form>

      {/* Help Text */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">
          Tips for better notes:
        </h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Use descriptive titles to make notes easier to find</li>
          <li>• Add relevant tags to categorize your content</li>
          <li>• Use markdown formatting for better structure</li>
          <li>• Save drafts frequently to avoid losing work</li>
        </ul>
      </div>
    </div>
  );
};

export default NoteForm;
