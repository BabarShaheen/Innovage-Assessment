import React, { useState } from "react";
import {
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "./components/ui/ThemeProvider";
import { ToastProvider, useToast } from "./components/ui/LoadingStates";
import Header from "./components/ui/Header";
import Sidebar, { defaultNavItems } from "./components/ui/Sidebar";
import Button, { IconButton, ButtonGroup } from "./components/ui/Button";
import { Input, Textarea, Select, FormFieldGroup } from "./components/ui/Form";
import Card, {
  CardHeader,
  CardContent,
  CardFooter,
  StatsCard,
  NoteCard,
  ActivityCard,
} from "./components/ui/Card";
import Modal, { Drawer, ConfirmModal } from "./components/ui/Modal";
import NoteForm from "./components/ui/NoteForm";
import {
  Skeleton,
  Spinner,
  LoadingOverlay,
  EmptyState,
  Alert,
} from "./components/ui/LoadingStates";

/**
 * Comprehensive Demo Page - Showcases all UI components
 * This demonstrates the complete design system in action
 */

const DemoContent = () => {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useToast();

  // State management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  });

  // Mock data
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
  };

  const mockNotes = [
    {
      _id: "1",
      title: "Project Planning Meeting",
      content:
        "Discussed the upcoming project timeline and deliverables. Key points include...",
      summary:
        "Project timeline discussion with key stakeholders and milestone planning",
      createdAt: "2024-01-15",
      updatedAt: "2024-01-15",
      tags: ["work", "meeting", "planning"],
      status: "published",
    },
    {
      _id: "2",
      title: "Ideas for New Feature",
      content: "Brainstorming session for the new AI-powered search feature...",
      summary: "AI search feature brainstorming with implementation ideas",
      createdAt: "2024-01-14",
      updatedAt: "2024-01-14",
      tags: ["ideas", "ai", "feature"],
      status: "draft",
    },
  ];

  const mockStats = [
    {
      title: "Total Notes",
      value: "1,234",
      change: "+12%",
      changeType: "positive",
      trend: "up",
      icon: "📝",
    },
    {
      title: "This Month",
      value: "89",
      change: "+5%",
      changeType: "positive",
      trend: "up",
      icon: "📅",
    },
    {
      title: "AI Summaries",
      value: "456",
      change: "+23%",
      changeType: "positive",
      trend: "up",
      icon: "🤖",
    },
    {
      title: "Categories",
      value: "12",
      change: "0%",
      changeType: "neutral",
      trend: null,
      icon: "📂",
    },
  ];

  const mockActivities = [
    {
      id: "1",
      type: "note_created",
      title: "New note created",
      description: "Project Planning Meeting was created",
      timestamp: "2024-01-15T10:30:00Z",
      user: "John Doe",
    },
    {
      id: "2",
      type: "summary_generated",
      title: "AI summary generated",
      description: "Summary created for Ideas for New Feature",
      timestamp: "2024-01-14T15:45:00Z",
      user: "System",
    },
  ];

  // Event handlers
  const handleSearch = (query) => {
    console.log("Searching for:", query);
    addToast({
      type: "info",
      title: "Search",
      description: `Searching for "${query}"...`,
    });
  };

  const handleUserMenuClick = (action) => {
    console.log("User menu action:", action);
    addToast({
      type: "info",
      title: "User Action",
      description: `${action} clicked`,
    });
  };

  const handleNavClick = (item) => {
    setActiveNavItem(item.id);
    addToast({
      type: "success",
      title: "Navigation",
      description: `Navigated to ${item.label}`,
    });
  };

  const handleFormSubmit = (data) => {
    setLoading(true);
    console.log("Form submitted:", data);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsModalOpen(false);
      addToast({
        type: "success",
        title: "Success!",
        description: "Note created successfully",
      });
    }, 2000);
  };

  const handleDeleteNote = () => {
    setIsConfirmOpen(true);
  };

  const confirmDelete = () => {
    setIsConfirmOpen(false);
    addToast({
      type: "success",
      title: "Deleted",
      description: "Note deleted successfully",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <Header
        title="AI Notes"
        subtitle="Smart note-taking"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearch}
        searchPlaceholder="Search notes..."
        user={mockUser}
        onUserMenuClick={handleUserMenuClick}
        onThemeToggle={toggleTheme}
        theme={theme}
      />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={setSidebarOpen}
          items={defaultNavItems}
          activeItem={activeNavItem}
          onItemClick={handleNavClick}
          title="AI Notes"
          variant="default"
        />

        {/* Main Content */}
        <main
          className={`flex-1 transition-all duration-normal ${
            sidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Welcome back! Here's what's happening with your notes.
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Button
                    variant="secondary"
                    onClick={() => setIsDrawerOpen(true)}
                  >
                    Settings
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create Note
                  </Button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {mockStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  changeType={stat.changeType}
                  trend={stat.trend}
                  icon={stat.icon}
                />
              ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Notes Section */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Recent Notes
                  </h2>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </div>

                {mockNotes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mockNotes.map((note) => (
                      <NoteCard
                        key={note._id}
                        title={note.title}
                        content={note.content}
                        summary={note.summary}
                        createdAt={note.createdAt}
                        updatedAt={note.updatedAt}
                        tags={note.tags}
                        status={note.status}
                        onEdit={() => setIsModalOpen(true)}
                        onDelete={handleDeleteNote}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon="📝"
                    title="No notes yet"
                    description="Create your first note to get started with AI-powered note-taking."
                    action={
                      <Button
                        variant="primary"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Create Note
                      </Button>
                    }
                  />
                )}
              </div>

              {/* Activity Feed */}
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Recent Activity
                </h2>

                <div className="space-y-4">
                  {mockActivities.map((activity) => (
                    <ActivityCard
                      key={activity.id}
                      type={activity.type}
                      title={activity.title}
                      description={activity.description}
                      timestamp={activity.timestamp}
                      user={activity.user}
                    />
                  ))}
                </div>

                {/* Quick Actions Card */}
                <Card variant="gradient" size="md">
                  <CardHeader title="Quick Actions" />
                  <CardContent>
                    <div className="space-y-3">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        onClick={() => setIsModalOpen(true)}
                      >
                        Create Note
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        fullWidth
                        onClick={() =>
                          addToast({
                            type: "info",
                            title: "AI Summary",
                            description:
                              "Generating summary for recent notes...",
                          })
                        }
                      >
                        Generate AI Summary
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        fullWidth
                        onClick={() => setIsDrawerOpen(true)}
                      >
                        Settings
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Component Showcase Section */}
            <div className="mt-16 space-y-8">
              <h2 className="text-2xl font-bold text-gray-900">
                Component Showcase
              </h2>

              {/* Buttons */}
              <Card variant="outlined" size="lg">
                <CardHeader title="Button Variants" />
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary">Primary</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="danger">Danger</Button>
                      <Button variant="success">Success</Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary" size="sm">
                        Small
                      </Button>
                      <Button variant="primary" size="md">
                        Medium
                      </Button>
                      <Button variant="primary" size="lg">
                        Large
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <Button variant="primary" loading>
                        Loading
                      </Button>
                      <Button variant="primary" disabled>
                        Disabled
                      </Button>
                    </div>
                    <ButtonGroup orientation="horizontal">
                      <Button variant="primary">Save</Button>
                      <Button variant="secondary">Cancel</Button>
                    </ButtonGroup>
                  </div>
                </CardContent>
              </Card>

              {/* Form Elements */}
              <Card variant="outlined" size="lg">
                <CardHeader title="Form Elements" />
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Email"
                      placeholder="Enter your email"
                      helperText="We'll never share your email"
                    />
                    <Input
                      label="Password"
                      type="password"
                      placeholder="Enter your password"
                      error="Password is required"
                    />
                    <Textarea
                      label="Message"
                      placeholder="Enter your message"
                      rows={4}
                    />
                    <Select
                      label="Category"
                      options={[
                        { value: "", label: "Select a category..." },
                        { value: "work", label: "Work" },
                        { value: "personal", label: "Personal" },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <div className="space-y-4">
                <Alert type="success" title="Success!">
                  Your note has been saved successfully.
                </Alert>
                <Alert type="error" title="Error">
                  There was an error saving your note. Please try again.
                </Alert>
                <Alert type="warning" title="Warning">
                  This action cannot be undone.
                </Alert>
                <Alert type="info" title="Info">
                  AI summary generation is in progress.
                </Alert>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Note"
        size="xl"
      >
        <NoteForm
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
          loading={loading}
        />
      </Modal>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Settings"
        position="right"
        size="md"
      >
        <div className="space-y-6">
          <FormFieldGroup title="Appearance">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900">Dark Mode</h4>
                <p className="text-sm text-gray-600">
                  Switch between light and dark themes
                </p>
              </div>
              <ThemeToggle />
            </div>
          </FormFieldGroup>

          <FormFieldGroup title="Notifications">
            <div className="space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="ml-2 text-sm text-gray-700">
                  Email notifications
                </span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="rounded" />
                <span className="ml-2 text-sm text-gray-700">
                  Push notifications
                </span>
              </label>
            </div>
          </FormFieldGroup>
        </div>
      </Drawer>

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />

      {/* Loading Overlay (for demo) */}
      {loading && <LoadingOverlay message="Creating your note..." />}
    </div>
  );
};

/**
 * Main Demo App Component
 */
const DemoApp = () => {
  return (
    <ThemeProvider defaultTheme="light">
      <ToastProvider>
        <DemoContent />
      </ToastProvider>
    </ThemeProvider>
  );
};

export default DemoApp;
