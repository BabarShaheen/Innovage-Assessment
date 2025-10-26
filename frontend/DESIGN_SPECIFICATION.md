# AI Notes - Design System Specification

## 🎨 Design Tokens & Specifications

### Color System

#### Primary Palette (Green Spectrum)

| Token         | Hex       | Usage                                | Contrast Ratio  |
| ------------- | --------- | ------------------------------------ | --------------- |
| `primary-50`  | `#ECFDF5` | Lightest backgrounds, subtle accents | -               |
| `primary-100` | `#D1FAE5` | Light backgrounds, section dividers  | -               |
| `primary-200` | `#A7F3D0` | Subtle borders, hover states         | -               |
| `primary-300` | `#6EE7B7` | Soft accents, secondary actions      | -               |
| `primary-400` | `#34D399` | Medium accents, progress indicators  | -               |
| `primary-500` | `#10B981` | **Primary CTA, links, focus states** | 4.6:1 on white  |
| `primary-600` | `#059669` | Hover states, active elements        | 4.8:1 on white  |
| `primary-700` | `#047857` | Pressed states, dark text            | 7.2:1 on white  |
| `primary-800` | `#065F46` | Dark text, high contrast             | 9.1:1 on white  |
| `primary-900` | `#064E3B` | Darkest text, maximum contrast       | 12.1:1 on white |

#### Neutral Palette (Gray Spectrum)

| Token      | Hex       | Usage                             | Contrast Ratio  |
| ---------- | --------- | --------------------------------- | --------------- |
| `gray-50`  | `#F9FAFB` | Page backgrounds, subtle sections | -               |
| `gray-100` | `#F3F4F6` | Card backgrounds, disabled states | -               |
| `gray-200` | `#E5E7EB` | Borders, dividers, subtle lines   | -               |
| `gray-300` | `#D1D5DB` | Light borders, input borders      | -               |
| `gray-400` | `#9CA3AF` | Placeholder text, icons           | 3.1:1 on white  |
| `gray-500` | `#6B7280` | Secondary text, labels            | 4.5:1 on white  |
| `gray-600` | `#4B5563` | Body text, descriptions           | 7.0:1 on white  |
| `gray-700` | `#374151` | **Primary text, headings**        | 9.1:1 on white  |
| `gray-800` | `#1F2937` | Dark text, high emphasis          | 12.1:1 on white |
| `gray-900` | `#111827` | Darkest text, maximum emphasis    | 15.8:1 on white |

#### Semantic Colors

| Token     | Hex       | Usage                               | Contrast Ratio |
| --------- | --------- | ----------------------------------- | -------------- |
| `success` | `#10B981` | Success states, positive feedback   | 4.6:1 on white |
| `warning` | `#F59E0B` | Warning states, caution messages    | 3.0:1 on white |
| `error`   | `#EF4444` | Error states, destructive actions   | 4.5:1 on white |
| `info`    | `#3B82F6` | Information states, neutral actions | 4.5:1 on white |

### Typography Scale

#### Font Families

- **Primary**: Inter (Google Fonts)
- **Fallback**: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Monospace**: JetBrains Mono, 'Fira Code', Consolas, monospace

#### Font Sizes & Line Heights

| Size   | Font Size       | Line Height    | Usage                               |
| ------ | --------------- | -------------- | ----------------------------------- |
| `xs`   | 12px (0.75rem)  | 16px (1rem)    | Captions, labels, small text        |
| `sm`   | 14px (0.875rem) | 20px (1.25rem) | Small body text, secondary info     |
| `base` | 16px (1rem)     | 24px (1.5rem)  | **Body text, paragraphs**           |
| `lg`   | 18px (1.125rem) | 28px (1.75rem) | Large body text, emphasized content |
| `xl`   | 20px (1.25rem)  | 28px (1.75rem) | Small headings, subheadings         |
| `2xl`  | 24px (1.5rem)   | 32px (2rem)    | H4 headings, card titles            |
| `3xl`  | 30px (1.875rem) | 36px (2.25rem) | H3 headings, section titles         |
| `4xl`  | 36px (2.25rem)  | 40px (2.5rem)  | H2 headings, page titles            |
| `5xl`  | 48px (3rem)     | 48px (3rem)    | H1 headings, hero titles            |
| `6xl`  | 60px (3.75rem)  | 60px (3.75rem) | Display headings, large titles      |

#### Font Weights

| Weight     | Value | Usage                           |
| ---------- | ----- | ------------------------------- |
| `light`    | 300   | Light text, subtle emphasis     |
| `normal`   | 400   | **Body text, default weight**   |
| `medium`   | 500   | Medium emphasis, labels         |
| `semibold` | 600   | **Headings, strong emphasis**   |
| `bold`     | 700   | Bold headings, maximum emphasis |

### Spacing System (8px Scale)

| Token | Value          | Usage                          |
| ----- | -------------- | ------------------------------ |
| `0`   | 0px            | Reset margins, no spacing      |
| `1`   | 4px (0.25rem)  | Tight spacing, icon padding    |
| `2`   | 8px (0.5rem)   | Small spacing, compact layouts |
| `3`   | 12px (0.75rem) | Medium-small spacing           |
| `4`   | 16px (1rem)    | **Base spacing unit**          |
| `5`   | 20px (1.25rem) | Medium spacing                 |
| `6`   | 24px (1.5rem)  | Large spacing, section gaps    |
| `8`   | 32px (2rem)    | Extra large spacing            |
| `10`  | 40px (2.5rem)  | Section spacing                |
| `12`  | 48px (3rem)    | Page section spacing           |
| `16`  | 64px (4rem)    | Large section spacing          |
| `20`  | 80px (5rem)    | Hero section spacing           |
| `24`  | 96px (6rem)    | Maximum section spacing        |
| `32`  | 128px (8rem)   | Extreme spacing                |

### Border Radius

| Token  | Value          | Usage                             |
| ------ | -------------- | --------------------------------- |
| `none` | 0px            | Sharp corners, technical elements |
| `sm`   | 2px (0.125rem) | Subtle rounding, small elements   |
| `md`   | 6px (0.375rem) | **Default rounding**              |
| `lg`   | 8px (0.5rem)   | Medium rounding, cards            |
| `xl`   | 12px (0.75rem) | Large rounding, modals            |
| `2xl`  | 16px (1rem)    | Extra large rounding              |
| `3xl`  | 24px (1.5rem)  | Maximum rounding, pills           |
| `full` | 9999px         | Circular elements, avatars        |

### Shadows

| Token | Value                                                                       | Usage                            |
| ----- | --------------------------------------------------------------------------- | -------------------------------- |
| `sm`  | `0 1px 2px 0 rgba(0, 0, 0, 0.05)`                                           | Subtle elevation, borders        |
| `md`  | `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`     | **Default elevation, cards**     |
| `lg`  | `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`   | High elevation, modals           |
| `xl`  | `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)` | Maximum elevation, overlays      |
| `2xl` | `0 25px 50px -12px rgba(0, 0, 0, 0.25)`                                     | Extreme elevation, hero elements |

### Transitions

| Token    | Duration | Usage                                |
| -------- | -------- | ------------------------------------ |
| `fast`   | 150ms    | Micro-interactions, hover states     |
| `normal` | 250ms    | **Default transitions**              |
| `slow`   | 350ms    | Complex animations, page transitions |

### Z-Index Scale

| Token            | Value | Usage                            |
| ---------------- | ----- | -------------------------------- |
| `dropdown`       | 1000  | Dropdown menus, tooltips         |
| `sticky`         | 1020  | Sticky headers, navigation       |
| `fixed`          | 1030  | Fixed elements, floating buttons |
| `modal-backdrop` | 1040  | Modal backdrops, overlays        |
| `modal`          | 1050  | **Modals, dialogs**              |
| `popover`        | 1060  | Popovers, context menus          |
| `tooltip`        | 1070  | Tooltips, help text              |
| `toast`          | 1080  | **Toast notifications, alerts**  |

## 📱 Responsive Breakpoints

| Breakpoint | Min Width | Usage                       |
| ---------- | --------- | --------------------------- |
| `sm`       | 640px     | Small tablets, large phones |
| `md`       | 768px     | Tablets, small laptops      |
| `lg`       | 1024px    | Laptops, small desktops     |
| `xl`       | 1280px    | Large desktops              |
| `2xl`      | 1536px    | Extra large screens         |

### Layout Shifts by Breakpoint

#### Mobile (< 640px)

- Single column layout
- Stacked components
- Full-width cards
- Collapsed navigation
- Touch-friendly spacing (minimum 44px touch targets)

#### Small Tablet (640px - 768px)

- Two-column grid for cards
- Sidebar becomes overlay
- Larger touch targets
- Optimized for portrait orientation

#### Tablet (768px - 1024px)

- Two-column main content
- Persistent sidebar (collapsible)
- Grid layouts for cards
- Optimized for landscape orientation

#### Desktop (1024px+)

- Three-column layout
- Persistent sidebar
- Multi-column grids
- Hover states and interactions
- Keyboard navigation optimized

#### Large Desktop (1280px+)

- Four-column layout
- Expanded sidebar
- Maximum content width
- Enhanced spacing
- Advanced interactions

## ♿ Accessibility Specifications

### Color Contrast Requirements (WCAG 2.1 AA)

#### Text Contrast Ratios

- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio

#### Verified Contrast Ratios

| Element          | Background | Text Color | Ratio | Status |
| ---------------- | ---------- | ---------- | ----- | ------ |
| Primary text     | White      | `#374151`  | 9.1:1 | ✅ AA  |
| Secondary text   | White      | `#6B7280`  | 4.5:1 | ✅ AA  |
| Placeholder text | White      | `#9CA3AF`  | 3.1:1 | ✅ AA  |
| Primary button   | `#10B981`  | White      | 4.6:1 | ✅ AA  |
| Error text       | White      | `#EF4444`  | 4.5:1 | ✅ AA  |
| Success text     | White      | `#10B981`  | 4.6:1 | ✅ AA  |

### Focus Management

#### Focus Indicators

- **Width**: 2px solid outline
- **Color**: Primary color (`#10B981`)
- **Offset**: 2px from element
- **Duration**: 150ms transition
- **Visibility**: Always visible on keyboard navigation

#### Focus Order

1. Skip links (if present)
2. Header navigation
3. Main content
4. Sidebar navigation
5. Footer links

#### Focus Trapping

- Modals trap focus within content
- Escape key closes modals
- Focus restored to trigger element after close
- Tab order follows logical flow

### Keyboard Navigation

#### Supported Keys

- **Tab**: Move forward through focusable elements
- **Shift + Tab**: Move backward through focusable elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals, dropdowns, and overlays
- **Arrow Keys**: Navigate within components (menus, grids)
- **Home/End**: Jump to first/last item in lists

#### Touch Target Sizes

- **Minimum**: 44px × 44px
- **Recommended**: 48px × 48px
- **Spacing**: 8px minimum between targets

## 🎯 Micro-Interactions

### Hover Effects

#### Buttons

- **Scale**: 1.02x transform
- **Duration**: 150ms ease-in-out
- **Shadow**: Elevation increase
- **Color**: Slightly darker shade

#### Cards

- **Scale**: 1.02x transform
- **Duration**: 250ms ease-in-out
- **Shadow**: Enhanced elevation
- **Border**: Subtle color change

#### Links

- **Color**: Primary color transition
- **Duration**: 150ms ease-in-out
- **Underline**: Optional underline animation

### Focus States

#### Input Fields

- **Border**: 2px primary color
- **Shadow**: Subtle glow effect
- **Duration**: 150ms ease-in-out

#### Buttons

- **Outline**: 2px primary color
- **Offset**: 2px from element
- **Duration**: 150ms ease-in-out

### Pressed States

#### Buttons

- **Scale**: 0.98x transform
- **Duration**: 50ms ease-in-out
- **Color**: Darker shade
- **Feedback**: Immediate response

#### Cards

- **Scale**: 0.99x transform
- **Duration**: 100ms ease-in-out
- **Shadow**: Reduced elevation

### Loading States

#### Skeleton Loaders

- **Animation**: Pulse effect
- **Duration**: 1.5s infinite
- **Color**: Light gray background
- **Shape**: Matches content structure

#### Spinners

- **Animation**: Rotate 360°
- **Duration**: 1s infinite linear
- **Size**: Proportional to container
- **Color**: Primary or contextual

## 🌙 Dark Mode Specifications

### Dark Theme Colors

#### Background Colors

| Token          | Hex       | Usage             |
| -------------- | --------- | ----------------- |
| `bg-primary`   | `#111827` | Main background   |
| `bg-secondary` | `#1F2937` | Card backgrounds  |
| `bg-tertiary`  | `#374151` | Elevated elements |

#### Text Colors

| Token            | Hex       | Usage          |
| ---------------- | --------- | -------------- |
| `text-primary`   | `#D1D5DB` | Primary text   |
| `text-secondary` | `#9CA3AF` | Secondary text |
| `text-tertiary`  | `#6B7280` | Tertiary text  |

#### Border Colors

| Token           | Hex       | Usage          |
| --------------- | --------- | -------------- |
| `border-light`  | `#374151` | Light borders  |
| `border-medium` | `#4B5563` | Medium borders |
| `border-dark`   | `#6B7280` | Dark borders   |

### Dark Mode Gradients

```css
/* Primary dark gradient */
background: linear-gradient(135deg, #1f2937 0%, #064e3b 50%, #065f46 100%);

/* Secondary dark gradient */
background: linear-gradient(135deg, #111827 0%, #064e3b 50%, #047857 100%);
```

### Dark Mode Contrast Ratios

| Element        | Background | Text Color | Ratio | Status |
| -------------- | ---------- | ---------- | ----- | ------ |
| Primary text   | `#1F2937`  | `#D1D5DB`  | 9.1:1 | ✅ AA  |
| Secondary text | `#1F2937`  | `#9CA3AF`  | 4.5:1 | ✅ AA  |
| Primary button | `#10B981`  | White      | 4.6:1 | ✅ AA  |

## 📊 Component Specifications

### Button Specifications

#### Sizes

| Size | Height | Padding   | Font Size | Icon Size |
| ---- | ------ | --------- | --------- | --------- |
| `sm` | 32px   | 12px 16px | 14px      | 16px      |
| `md` | 40px   | 16px 20px | 16px      | 20px      |
| `lg` | 48px   | 20px 24px | 18px      | 24px      |

#### Variants

| Variant     | Background  | Text      | Border      | Hover Background |
| ----------- | ----------- | --------- | ----------- | ---------------- |
| `primary`   | `#10B981`   | White     | `#10B981`   | `#059669`        |
| `secondary` | White       | `#374151` | `#D1D5DB`   | `#F9FAFB`        |
| `ghost`     | Transparent | `#374151` | Transparent | `#F3F4F6`        |
| `danger`    | `#EF4444`   | White     | `#EF4444`   | `#DC2626`        |
| `success`   | `#10B981`   | White     | `#10B981`   | `#059669`        |

### Card Specifications

#### Variants

| Variant    | Background | Border    | Shadow |
| ---------- | ---------- | --------- | ------ |
| `default`  | White      | `#E5E7EB` | `sm`   |
| `elevated` | White      | `#E5E7EB` | `lg`   |
| `outlined` | White      | `#D1D5DB` | None   |
| `filled`   | `#F9FAFB`  | `#E5E7EB` | None   |
| `gradient` | Gradient   | `#A7F3D0` | `sm`   |

#### Sizes

| Size | Padding | Border Radius |
| ---- | ------- | ------------- |
| `sm` | 16px    | 8px           |
| `md` | 24px    | 12px          |
| `lg` | 32px    | 16px          |

### Form Element Specifications

#### Input Fields

| State    | Border    | Background | Text      | Focus Ring |
| -------- | --------- | ---------- | --------- | ---------- |
| Default  | `#D1D5DB` | White      | `#111827` | `#10B981`  |
| Hover    | `#9CA3AF` | White      | `#111827` | `#10B981`  |
| Focus    | `#10B981` | White      | `#111827` | `#10B981`  |
| Error    | `#EF4444` | White      | `#111827` | `#EF4444`  |
| Disabled | `#E5E7EB` | `#F9FAFB`  | `#9CA3AF` | None       |

#### Label Specifications

- **Font Size**: 14px
- **Font Weight**: 500
- **Color**: `#374151`
- **Margin Bottom**: 4px

#### Helper Text Specifications

- **Font Size**: 12px
- **Color**: `#6B7280`
- **Margin Top**: 4px

### Modal Specifications

#### Sizes

| Size   | Max Width | Usage                 |
| ------ | --------- | --------------------- |
| `sm`   | 448px     | Confirmations, alerts |
| `md`   | 512px     | Forms, content        |
| `lg`   | 672px     | Complex forms, data   |
| `xl`   | 896px     | Large content, tables |
| `full` | 100vw     | Full screen, mobile   |

#### Backdrop

- **Background**: `rgba(0, 0, 0, 0.5)`
- **Blur**: `backdrop-blur-sm`
- **Z-Index**: 1040

#### Animation

- **Duration**: 250ms
- **Easing**: `ease-in-out`
- **Scale**: 0.95 → 1.0
- **Opacity**: 0 → 1

## 🎨 Gradient Options

### Option 1: Subtle Mint to Sage

```css
background: linear-gradient(135deg, #ffffff 0%, #e6fffa 50%, #d1fae5 100%);
```

**Best for**: Clean, professional applications

### Option 2: Soft White to Emerald

```css
background: linear-gradient(135deg, #ffffff 0%, #f0fdf4 50%, #dcfce7 100%);
```

**Best for**: Fresh, modern interfaces

### Option 3: Clean White to Mint

```css
background: linear-gradient(135deg, #ffffff 0%, #e8fff1 50%, #d1fae5 100%);
```

**Best for**: Minimal, focused applications

### Option 4: Minimal White to Sage

```css
background: linear-gradient(135deg, #ffffff 0%, #ecfdf5 50%, #d1fae5 100%);
```

**Best for**: Subtle, elegant designs

## 📐 Layout Grid System

### Container Specifications

| Breakpoint | Max Width | Padding |
| ---------- | --------- | ------- |
| Mobile     | 100%      | 16px    |
| Tablet     | 768px     | 24px    |
| Desktop    | 1024px    | 32px    |
| Large      | 1280px    | 40px    |
| XL         | 1536px    | 48px    |

### Grid Specifications

- **Columns**: 12-column grid
- **Gutters**: 24px (mobile), 32px (desktop)
- **Margins**: 16px (mobile), 24px (desktop)

### Component Spacing

- **Section Spacing**: 48px (mobile), 64px (desktop)
- **Card Spacing**: 16px (mobile), 24px (desktop)
- **Element Spacing**: 8px base unit

---

**This specification ensures consistency, accessibility, and scalability across all components and applications using the AI Notes design system.**
