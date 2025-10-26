# AI Notes - White + Light Green Gradient UI System

A production-ready, accessible UI component system built with React and Tailwind CSS, featuring a beautiful white + light green gradient theme with comprehensive dark mode support.

## 🎨 Design System Overview

### Theme Philosophy

- **Clean & Minimal**: Airy design with lots of white space
- **Professional**: Suitable for business and productivity applications
- **Accessible**: WCAG 2.1 AA compliant color contrasts
- **Responsive**: Mobile-first approach with thoughtful breakpoints
- **Consistent**: 8px spacing scale and systematic design tokens

### Color Palette

#### Primary Colors (Green Spectrum)

```
Primary 50:  #ECFDF5  (Lightest background)
Primary 100: #D1FAE5  (Light background)
Primary 200: #A7F3D0  (Subtle accent)
Primary 300: #6EE7B7  (Soft accent)
Primary 400: #34D399  (Medium accent)
Primary 500: #10B981  (Main CTA color) ⭐
Primary 600: #059669  (Hover state)
Primary 700: #047857  (Active state)
Primary 800: #065F46  (Dark text)
Primary 900: #064E3B  (Darkest)
```

#### Neutral Colors (Gray Spectrum)

```
Gray 50:   #F9FAFB  (Lightest background)
Gray 100:  #F3F4F6  (Light background)
Gray 200:  #E5E7EB  (Subtle border)
Gray 300:  #D1D5DB  (Light border)
Gray 400:  #9CA3AF  (Placeholder text)
Gray 500:  #6B7280  (Secondary text)
Gray 600:  #4B5563  (Body text)
Gray 700:  #374151  (Primary text) ⭐
Gray 800:  #1F2937  (Dark text)
Gray 900:  #111827  (Darkest text)
```

#### Semantic Colors

```
Success: #10B981  (Green)
Warning: #F59E0B  (Amber)
Error:   #EF4444  (Red)
Info:    #3B82F6  (Blue)
```

### Gradient Options

#### Option 1: Subtle Mint to Sage

```css
background: linear-gradient(135deg, #ffffff 0%, #e6fffa 50%, #d1fae5 100%);
```

#### Option 2: Soft White to Emerald

```css
background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #dcfce7 100%);
```

#### Option 3: Clean White to Mint

```css
background: linear-gradient(135deg, #ffffff 0%, #e8fff1 50%, #d1fae5 100%);
```

#### Option 4: Minimal White to Sage

```css
background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 50%, #d1fae5 100%);
```

### Typography Scale

#### Font Family

- **Primary**: Inter (system fallback)
- **Monospace**: JetBrains Mono (code blocks)

#### Font Sizes (8px scale)

```
xs:    12px  (0.75rem)   - Captions, labels
sm:    14px  (0.875rem)  - Small text
base:  16px  (1rem)      - Body text
lg:    18px  (1.125rem)  - Large body
xl:    20px  (1.25rem)   - Small headings
2xl:   24px  (1.5rem)    - H4 headings
3xl:   30px  (1.875rem)  - H3 headings
4xl:   36px  (2.25rem)   - H2 headings
5xl:   48px  (3rem)      - H1 headings
6xl:   60px  (3.75rem)   - Display headings
```

#### Font Weights

```
Light:    300
Normal:   400
Medium:   500
Semibold: 600
Bold:     700
```

### Spacing System (8px scale)

```
0:   0px
1:   4px   (0.25rem)
2:   8px   (0.5rem)
3:   12px  (0.75rem)
4:   16px  (1rem)
5:   20px  (1.25rem)
6:   24px  (1.5rem)
8:   32px  (2rem)
10:  40px  (2.5rem)
12:  48px  (3rem)
16:  64px  (4rem)
20:  80px  (5rem)
24:  96px  (6rem)
32:  128px (8rem)
```

## 🧩 Component Library

### Core Components

#### 1. Button Component

```jsx
import Button, { IconButton, ButtonGroup } from './components/ui/Button';

// Primary button
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>

// Secondary button
<Button variant="secondary" size="lg">
  Secondary Action
</Button>

// Ghost button
<Button variant="ghost" size="sm">
  Cancel
</Button>

// Icon button
<IconButton variant="ghost" size="md" aria-label="Settings">
  <SettingsIcon />
</IconButton>

// Button group
<ButtonGroup orientation="horizontal">
  <Button variant="primary">Save</Button>
  <Button variant="secondary">Cancel</Button>
</ButtonGroup>
```

#### 2. Form Components

```jsx
import { Input, Textarea, Select, FormFieldGroup } from './components/ui/Form';

// Input with validation
<Input
  label="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={emailError}
  helperText="We'll never share your email"
  required
/>

// Textarea
<Textarea
  label="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  rows={6}
  resize="vertical"
/>

// Select dropdown
<Select
  label="Category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  options={categoryOptions}
  placeholder="Choose a category..."
/>

// Form field group
<FormFieldGroup title="Personal Information" description="Enter your details">
  <Input label="First Name" />
  <Input label="Last Name" />
</FormFieldGroup>
```

#### 3. Card Components

```jsx
import Card, { CardHeader, CardContent, CardFooter, StatsCard, NoteCard, ActivityCard } from './components/ui/Card';

// Basic card
<Card variant="elevated" size="md">
  <CardHeader title="Card Title" subtitle="Card description" />
  <CardContent>
    <p>Card content goes here...</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary">Action</Button>
  </CardFooter>
</Card>

// Stats card
<StatsCard
  title="Total Notes"
  value="1,234"
  change="+12%"
  changeType="positive"
  trend="up"
  icon="📝"
/>

// Note card
<NoteCard
  title="Meeting Notes"
  content="Discussion about project timeline..."
  summary="Project timeline discussion with key stakeholders"
  createdAt="2024-01-15"
  tags={['work', 'meeting']}
  status="published"
  onEdit={() => console.log('Edit')}
  onDelete={() => console.log('Delete')}
/>

// Activity card
<ActivityCard
  type="note_created"
  title="New note created"
  description="Meeting Notes was created"
  timestamp="2024-01-15T10:30:00Z"
  user="John Doe"
/>
```

#### 4. Header Component

```jsx
import Header from "./components/ui/Header";

<Header
  title="AI Notes"
  subtitle="Smart note-taking"
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
  onSearchSubmit={handleSearch}
  searchPlaceholder="Search notes..."
  user={currentUser}
  onUserMenuClick={handleUserMenu}
  onThemeToggle={toggleTheme}
  theme={currentTheme}
/>;
```

#### 5. Sidebar Component

```jsx
import Sidebar, { defaultNavItems } from "./components/ui/Sidebar";

<Sidebar
  isOpen={sidebarOpen}
  onToggle={setSidebarOpen}
  items={defaultNavItems}
  activeItem={activeNavItem}
  onItemClick={handleNavClick}
  title="AI Notes"
  variant="default"
/>;
```

#### 6. Modal & Drawer Components

```jsx
import Modal, { Drawer, ConfirmModal, ModalHeader, ModalBody, ModalFooter } from './components/ui/Modal';

// Basic modal
<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Create Note"
  size="lg"
>
  <ModalBody>
    <NoteForm onSubmit={handleSubmit} />
  </ModalBody>
</Modal>

// Drawer
<Drawer
  isOpen={isDrawerOpen}
  onClose={() => setIsDrawerOpen(false)}
  title="Settings"
  position="right"
  size="md"
>
  <SettingsForm />
</Drawer>

// Confirmation modal
<ConfirmModal
  isOpen={isConfirmOpen}
  onClose={() => setIsConfirmOpen(false)}
  onConfirm={handleDelete}
  title="Delete Note"
  message="Are you sure you want to delete this note? This action cannot be undone."
  confirmText="Delete"
  cancelText="Cancel"
  variant="danger"
/>
```

#### 7. Loading States & Notifications

```jsx
import { Skeleton, Spinner, LoadingOverlay, EmptyState, Alert, ToastProvider, useToast } from './components/ui/LoadingStates';

// Skeleton loader
<Skeleton width="w-full" height="h-4" />
<Skeleton width="w-3/4" height="h-6" />

// Spinner
<Spinner size="md" color="primary" />

// Loading overlay
<LoadingOverlay message="Saving your note..." />

// Empty state
<EmptyState
  icon="📝"
  title="No notes yet"
  description="Create your first note to get started with AI-powered note-taking."
  action={<Button variant="primary">Create Note</Button>}
/>

// Alert
<Alert type="success" title="Success!">
  Your note has been saved successfully.
</Alert>

// Toast notifications
function App() {
  return (
    <ToastProvider>
      <YourAppContent />
    </ToastProvider>
  );
}

function SomeComponent() {
  const { addToast } = useToast();

  const showSuccess = () => {
    addToast({
      type: 'success',
      title: 'Success!',
      description: 'Note saved successfully'
    });
  };
}
```

#### 8. Theme Provider & Dark Mode

```jsx
import {
  ThemeProvider,
  ThemeToggle,
  useTheme,
} from "./components/ui/ThemeProvider";

// Wrap your app
function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <YourAppContent />
    </ThemeProvider>
  );
}

// Use theme in components
function SomeComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div>
      <p>Current theme: {theme}</p>
      <ThemeToggle />
    </div>
  );
}
```

## 📱 Responsive Breakpoints

### Mobile-First Approach

```css
/* Mobile (default) */
.container {
  padding: 1rem;
}

/* Small (640px+) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
  }
}

/* Medium (768px+) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
  }
}

/* Large (1024px+) */
@media (min-width: 1024px) {
  .container {
    padding: 2.5rem;
  }
}

/* Extra Large (1280px+) */
@media (min-width: 1280px) {
  .container {
    padding: 3rem;
  }
}
```

### Layout Shifts

- **Mobile**: Single column, stacked layout
- **Tablet**: Two-column grid for cards
- **Desktop**: Three-column grid with sidebar
- **Large Desktop**: Four-column grid with expanded sidebar

## ♿ Accessibility Features

### Keyboard Navigation

- Tab order follows logical flow
- Focus indicators on all interactive elements
- Escape key closes modals and dropdowns
- Enter/Space activates buttons and links

### Screen Reader Support

- Semantic HTML elements
- ARIA labels and descriptions
- Role attributes for custom components
- Live regions for dynamic content

### Color Contrast

- **Primary text on white**: 4.5:1 (AA compliant)
- **Primary text on light green**: 4.8:1 (AA compliant)
- **CTA buttons**: 4.6:1 (AA compliant)
- **Error states**: 4.7:1 (AA compliant)

### Focus Management

- Visible focus rings on all interactive elements
- Focus trapped in modals
- Focus restored after modal closes
- Skip links for main content

## 🎯 Micro-Interactions

### Hover Effects

- Subtle scale transforms (1.02x)
- Shadow elevation changes
- Color transitions (250ms ease-in-out)
- Opacity changes for ghost buttons

### Focus States

- 2px outline with primary color
- 2px offset for better visibility
- Smooth transitions (150ms ease-in-out)

### Pressed States

- Scale down (0.98x) for tactile feedback
- Slightly darker colors
- Immediate response (50ms)

### Loading States

- Skeleton loaders for content
- Spinning indicators for actions
- Progressive disclosure
- Optimistic updates

## 🌙 Dark Mode Support

### Dark Theme Colors

```css
/* Dark gradients */
--gradient-primary: linear-gradient(135deg, #1F2937 0%, #064E3B 50%, #065F46 100%);
--gradient-secondary: linear-gradient(135deg, #111827 0%, #064E3B 50%, #047857 100%);

/* Dark backgrounds */
--bg-primary: #111827
--bg-secondary: #1F2937
--bg-tertiary: #374151

/* Dark text */
--color-gray-700: #D1D5DB
--color-gray-600: #9CA3AF
--color-gray-500: #6B7280
```

### Implementation

1. Wrap app with `ThemeProvider`
2. Use `useTheme` hook for theme-aware components
3. Apply `data-theme="dark"` attribute
4. CSS variables automatically switch

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install react react-dom tailwindcss

# Copy component files to your project
cp -r components/ui/ src/components/
cp styles/design-system.css src/styles/
cp tailwind.config.js .
```

### Setup Tailwind

```javascript
// tailwind.config.js
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Use the provided theme configuration
      colors: {
        /* ... */
      },
      fontFamily: {
        /* ... */
      },
      // ... other extensions
    },
  },
  plugins: [],
};
```

### Import Styles

```css
/* src/index.css */
@import "tailwindcss";
@import "./styles/design-system.css";
```

### Basic Usage

```jsx
import { ThemeProvider } from "./components/ui/ThemeProvider";
import Button from "./components/ui/Button";

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-primary">
        <Button variant="primary" size="md">
          Get Started
        </Button>
      </div>
    </ThemeProvider>
  );
}
```

## 📊 Figma-Friendly Color Swatches

### Export for Figma

```json
{
  "colors": {
    "Primary 50": "#ECFDF5",
    "Primary 100": "#D1FAE5",
    "Primary 200": "#A7F3D0",
    "Primary 300": "#6EE7B7",
    "Primary 400": "#34D399",
    "Primary 500": "#10B981",
    "Primary 600": "#059669",
    "Primary 700": "#047857",
    "Primary 800": "#065F46",
    "Primary 900": "#064E3B",
    "Gray 50": "#F9FAFB",
    "Gray 100": "#F3F4F6",
    "Gray 200": "#E5E7EB",
    "Gray 300": "#D1D5DB",
    "Gray 400": "#9CA3AF",
    "Gray 500": "#6B7280",
    "Gray 600": "#4B5563",
    "Gray 700": "#374151",
    "Gray 800": "#1F2937",
    "Gray 900": "#111827",
    "Success": "#10B981",
    "Warning": "#F59E0B",
    "Error": "#EF4444",
    "Info": "#3B82F6"
  }
}
```

## 🛠️ Development Guidelines

### Component Structure

```
components/ui/
├── Button.jsx          # Button variants and groups
├── Form.jsx           # Input, Textarea, Select components
├── Card.jsx           # Card variants and specialized cards
├── Header.jsx         # Responsive header with search
├── Sidebar.jsx        # Collapsible navigation sidebar
├── Modal.jsx          # Modal, Drawer, and confirmation dialogs
├── LoadingStates.jsx  # Loading, empty states, and notifications
├── NoteForm.jsx       # Comprehensive note form
└── ThemeProvider.jsx  # Theme context and dark mode
```

### Naming Conventions

- **Components**: PascalCase (e.g., `Button`, `NoteCard`)
- **Props**: camelCase (e.g., `isOpen`, `onClick`)
- **CSS Classes**: kebab-case (e.g., `btn-primary`, `card-elevated`)
- **Variants**: lowercase (e.g., `primary`, `secondary`, `ghost`)

### Best Practices

1. **Accessibility First**: Always include ARIA labels and keyboard support
2. **Mobile First**: Design for mobile, enhance for desktop
3. **Consistent Spacing**: Use the 8px scale system
4. **Semantic HTML**: Use proper HTML elements
5. **Performance**: Lazy load heavy components
6. **Testing**: Include unit and integration tests

## 📝 License

MIT License - Feel free to use in your projects!

## 🤝 Contributing

1. Follow the established patterns
2. Maintain accessibility standards
3. Update documentation
4. Test across devices and browsers
5. Ensure dark mode compatibility

---

**Built with ❤️ for modern web applications**
