import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NoteCard from "../components/NoteCard";
import { getNotes, deleteNote } from "../services/api";
import {
  Card,
  CardHeader,
  CardContent,
  Button,
  EmptyState,
  LoadingOverlay,
  useToast,
} from "../components/ui";
import { ThemeProvider } from "../components/ui/ThemeProvider";
import { ToastProvider } from "../components/ui/LoadingStates";

// Enhanced Home component using our UI system
function HomeContent() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const { showToast } = useToast();

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await getNotes();
      setNotes(res);
    } catch (error) {
      console.error("Error fetching notes:", error);
      showToast("Failed to load notes. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      showToast("Note deleted successfully!", "success");
    } catch (error) {
      console.error("Error deleting note:", error);
      showToast("Failed to delete note. Please try again.", "error");
    } finally {
      setDeletingId(null);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <>
      <LoadingOverlay loading={loading} />

      <div className="min-h-screen bg-gradient-primary">
        {/* Header Section */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-neutral-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-primary-600"
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
                  <h1 className="text-2xl font-bold text-neutral-900">
                    AI Notes
                  </h1>
                  <p className="text-sm text-neutral-600">
                    Organize your thoughts beautifully
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  as={Link}
                  to="/create"
                  variant="primary"
                  size="lg"
                  className="hidden sm:flex"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Note
                </Button>

                <Button
                  as={Link}
                  to="/create"
                  variant="primary"
                  size="sm"
                  className="sm:hidden"
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Card variant="gradient" className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
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
                  <p className="text-neutral-600 text-sm">Total Notes</p>
                  <p className="text-neutral-900 text-2xl font-bold">
                    {notes.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="outlined" className="p-4">
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
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-600 text-sm">AI Summaries</p>
                  <p className="text-neutral-900 text-2xl font-bold">
                    {notes.filter((note) => note.summary).length}
                  </p>
                </div>
              </div>
            </Card>

            <Card variant="outlined" className="p-4">
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
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-neutral-600 text-sm">Last Updated</p>
                  <p className="text-neutral-900 text-sm font-medium">
                    {notes.length > 0
                      ? new Date(notes[0].updatedAt).toLocaleDateString()
                      : "Never"}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Notes Grid */}
          {notes.length === 0 ? (
            <EmptyState
              icon={
                <svg
                  className="w-16 h-16 text-neutral-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              }
              title="No notes yet"
              description="Create your first note to get started!"
              action={
                <Button as={Link} to="/create" variant="primary" size="lg">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Your First Note
                </Button>
              }
            />
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.map((note) => (
                <Card
                  key={note._id}
                  variant="elevated"
                  className="transform transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                >
                  <NoteCard
                    note={note}
                    onDelete={handleDelete}
                    deleting={deletingId === note._id}
                  />
                </Card>
              ))}
            </div>
          )}

          {/* Quick Actions */}
        </div>
      </div>
    </>
  );
}

// Wrapped with providers
export default function Home() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <HomeContent />
      </ToastProvider>
    </ThemeProvider>
  );
}
