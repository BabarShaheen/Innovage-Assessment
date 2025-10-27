import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, updateNote, summarizeNote } from "../services/api";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  Input,
  Textarea,
  FormFieldGroup,
  LoadingOverlay,
  useToast,
} from "../components/ui";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { ToastProvider } from "../components/ui/LoadingStates";

// Enhanced NoteForm component for editing
function EditNoteForm({ initialData, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    category: initialData?.category || "",
    tags: initialData?.tags || [],
    status: initialData?.status || "draft",
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
      showToast("Note updated successfully!", "success");
    } catch (error) {
      showToast("Failed to update note. Please try again.", "error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormFieldGroup
        title="Basic Information"
        description="Update the essential details for your note"
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

      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={loading}
          disabled={loading}
          className="flex-1 sm:flex-none sm:min-w-[140px]"
        >
          {loading ? "Updating..." : "Update Note"}
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

// Main EditNote component
function EditNoteContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const { showToast } = useToast();

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const noteData = await getNoteById(id);
        setNote(noteData);
        setSummary(noteData.summary || "");
      } catch (error) {
        console.error("Error fetching note:", error);
        showToast("Failed to load note. Please try again.", "error");
        navigate("/");
      }
    };

    fetchNote();
  }, [id, navigate, showToast]);

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await updateNote(id, data);
      showToast("Note updated successfully!", "success");
      navigate("/");
    } catch (error) {
      console.error("Error updating note:", error);
      showToast("Failed to update note. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setSummaryLoading(true);
    try {
      const result = await summarizeNote(id);
      setSummary(result.summary);
      showToast("Summary generated successfully!", "success");
    } catch (error) {
      console.error("Error generating summary:", error);
      showToast("Failed to generate summary. Please try again.", "error");
    } finally {
      setSummaryLoading(false);
    }
  };

  if (!note) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-neutral-600 text-lg">Loading your note...</p>
        </div>
      </div>
    );
  }

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
                  aria-label="Go back"
                  className="p-2 rounded-lg bg-black text-white 
             hover:bg-gray-900 active:scale-95 
             transition-all duration-200 shadow-sm 
             hover:shadow-md focus:outline-none focus:ring-2 
             focus:ring-offset-2 focus:ring-gray-700"
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div>
                  <h1 className="text-2xl font-bold text-neutral-900">
                    Edit Note
                  </h1>
                  <p className="text-sm text-neutral-600">
                    Update your thoughts and ideas
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
          <Card variant="elevated" className="overflow-hidden mb-6">
            <CardHeader className="bg-gradient-to-r from-secondary-500 to-accent-500 text-white">
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
                  <h2 className="text-xl font-semibold">Edit Note</h2>
                  <p className="text-secondary-100 text-sm">
                    Update your thoughts and ideas
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <EditNoteForm
                initialData={note}
                onSubmit={handleSubmit}
                loading={loading}
              />
            </CardContent>
          </Card>

          {/* AI Summary Section */}
          <Card variant="elevated" className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-accent-500 to-primary-500 text-white">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-semibold">AI Summary</h2>
                  <p className="text-accent-100 text-sm">
                    Generate intelligent summaries of your content
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              <div className="space-y-6">
                <Button
                  onClick={handleSummarize}
                  loading={summaryLoading}
                  disabled={summaryLoading}
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  {summaryLoading
                    ? "Generating Summary..."
                    : "Generate AI Summary"}
                </Button>

                {summary && (
                  <div className="bg-gradient-to-r from-accent-50 to-primary-50 p-6 rounded-lg border border-accent-200">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent-100 flex items-center justify-center mr-3 mt-1">
                        <svg
                          className="w-4 h-4 text-accent-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-neutral-800 mb-2 text-lg">
                          Summary Generated
                        </h4>
                        <p className="text-neutral-700 leading-relaxed">
                          {summary}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

// Wrapped with providers
export default function EditNote() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <EditNoteContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
