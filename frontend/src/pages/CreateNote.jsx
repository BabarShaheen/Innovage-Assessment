import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNote } from "../services/api";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Input,
  Textarea,
  FormFieldGroup,
  LoadingOverlay,
  EmptyState,
  useToast,
} from "../components/ui";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { ToastProvider } from "../components/ui/LoadingStates";

// Enhanced NoteForm component using our UI system
function EnhancedNoteForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
    status: "draft",
  });
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [newTag, setNewTag] = useState("");
  const { showToast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 3) {
      newErrors.title = "Title must be at least 3 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 10) {
      newErrors.content = "Content must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      showToast("Please fix the errors below", "error");
      return;
    }

    try {
      await onSubmit({
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: formData.category,
        tags: formData.tags,
        status: formData.status,
      });
      showToast("Note created successfully!", "success");
    } catch (error) {
      showToast("Failed to create note. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormFieldGroup
        title="Basic Information"
        description="Provide the essential details for your note"
      >
        <Input
          label="Title"
          placeholder="Enter a descriptive title for your note"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          error={errors.title}
          required
          className="text-lg"
        />

        <Textarea
          label="Content"
          placeholder="Write your thoughts, ideas, or important information here..."
          value={formData.content}
          onChange={(e) => handleInputChange("content", e.target.value)}
          error={errors.content}
          rows={8}
          required
          className="min-h-[200px]"
        />
      </FormFieldGroup>

      <FormFieldGroup
        title="Organization"
        description="Help organize and categorize your note"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Category"
            placeholder="e.g., Work, Personal, Ideas"
            value={formData.category}
            onChange={(e) => handleInputChange("category", e.target.value)}
            className="w-full"
          />

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
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
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add a tag"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), handleAddTag())
              }
              className="flex-1"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={handleAddTag}
              disabled={!newTag.trim()}
            >
              Add Tag
            </Button>
          </div>
        </div>
      </FormFieldGroup>

      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg border border-primary-200">
        <h4 className="font-medium text-neutral-800 mb-2">
          💡 Tips for better notes
        </h4>
        <ul className="text-sm text-neutral-600 space-y-1">
          <li>• Use clear, descriptive titles</li>
          <li>• Break content into paragraphs for readability</li>
          <li>• Add relevant tags to make notes easier to find</li>
          <li>• Use categories to organize related notes</li>
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading}
          className="flex-1 sm:flex-none sm:min-w-[140px]"
        >
          {loading ? "Creating..." : "Create Note"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => window.history.back()}
          disabled={loading}
          className="flex-1 sm:flex-none sm:min-w-[120px]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

// Main CreateNote component
function CreateNoteContent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await createNote(data);
      showToast("Note created successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error creating note:", error);
      showToast("Failed to create note. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="min-h-screen bg-gradient-primary">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Go back"
                >
                  <svg
                    className="w-5 h-5 text-neutral-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">
                    Create New Note
                  </h1>
                  <p className="text-sm text-neutral-600">
                    Capture your thoughts and ideas
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-neutral-500">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Auto-save enabled</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">New Note</h2>
                  <p className="text-primary-100 text-sm">
                    Start writing your thoughts and ideas
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <EnhancedNoteForm onSubmit={handleSubmit} loading={loading} />
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card
              variant="outlined"
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-primary-600"
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
                <div>
                  <h3 className="font-medium text-neutral-900">Templates</h3>
                  <p className="text-sm text-neutral-600">
                    Use pre-made templates
                  </p>
                </div>
              </div>
            </Card>

            <Card
              variant="outlined"
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-secondary-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-secondary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12h6m-6 4h6"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">AI Summary</h3>
                  <p className="text-sm text-neutral-600">
                    Auto-generate summaries
                  </p>
                </div>
              </div>
            </Card>

            <Card
              variant="outlined"
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent-100 rounded-lg">
                  <svg
                    className="w-5 h-5 text-accent-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-neutral-900">Settings</h3>
                  <p className="text-sm text-neutral-600">
                    Customize your experience
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

// Wrapped with providers
export default function CreateNote() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <CreateNoteContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
