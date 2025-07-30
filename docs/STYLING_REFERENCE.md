# Digital Timer App - Styling Reference

## Table of Contents
- [CSS Architecture](#css-architecture)
- [Component Styling](#component-styling)
- [Responsive Design](#responsive-design)
- [Color System](#color-system)
- [Typography](#typography)
- [Layout Patterns](#layout-patterns)
- [Animation and Transitions](#animation-and-transitions)
- [Theming Guide](#theming-guide)
- [CSS Variables](#css-variables)
- [Accessibility](#accessibility)

## CSS Architecture

The Digital Timer App follows a component-based CSS architecture with the following principles:

### File Structure
```
src/
├── App.css                    # Global app styles
└── components/
    └── DigitalTimer/
        └── index.css          # Component-specific styles
```

### Naming Convention
- **BEM-inspired**: `.component-element--modifier`
- **Descriptive**: Class names describe purpose/function
- **Consistent**: Similar elements use similar naming patterns

### CSS Organization
```css
/* 1. Layout containers */
.app-container { /* ... */ }
.digital-timer-app-container { /* ... */ }

/* 2. Component-specific styles */
.digital-timer-heading { /* ... */ }
.status-container { /* ... */ }

/* 3. Interactive elements */
.start-btn { /* ... */ }
.btns { /* ... */ }

/* 4. Responsive breakpoints */
@media screen and (min-width: 768px) { /* ... */ }
```

## Component Styling

### Main Container Classes

#### `.app-container`
**Purpose**: Root application container with gradient background

```css
.app-container {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(to bottom, #ffffff, #cffcf1);
}

@media screen and (min-width: 768px) {
  .app-container {
    background-image: linear-gradient(to right, #ffffff, #cffcf1);
  }
}
```

**Properties**:
- **Display**: Flexbox for centering
- **Height**: Full viewport height
- **Background**: Responsive gradient (vertical on mobile, horizontal on desktop)

#### `.digital-timer-app-container`
**Purpose**: Main timer component wrapper

```css
.digital-timer-app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-top: 47px;
  margin-bottom: 30px;
  max-width: 550px;
}

@media screen and (min-width: 768px) {
  .digital-timer-app-container {
    max-width: 900px;
    margin-top: 70px;
    margin-bottom: 70px;
  }
}
```

**Properties**:
- **Layout**: Vertical flexbox
- **Width**: 80% with max-width constraints
- **Responsive**: Different max-widths and margins for desktop

### Timer Display Classes

#### `.clock-status-container`
**Purpose**: Timer display area with background image

```css
.clock-status-container {
  background-image: url('https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png');
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
  height: 350px;
}

@media screen and (min-width: 768px) {
  .clock-status-container {
    height: 550px;
  }
}
```

**Properties**:
- **Background**: External image with cover sizing
- **Layout**: Centered flexbox
- **Responsive**: Increased height on desktop

#### `.status-container`
**Purpose**: White circular container for timer display

```css
.status-container {
  background-color: white;
  border-radius: 58px;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

**Properties**:
- **Shape**: Large border-radius for circular appearance
- **Layout**: Vertical flexbox for centered content
- **Spacing**: Generous padding for visual balance

### Typography Classes

#### `.digital-timer-heading`
**Purpose**: Main application title

```css
.digital-timer-heading {
  font-size: 35px;
  font-weight: 600;
  font-family: 'Roboto';
}

@media screen and (min-width: 768px) {
  .digital-timer-heading {
    font-size: 45px;
  }
}
```

#### `.status-heading`
**Purpose**: Timer display text (MM:SS format)

```css
.status-heading {
  color: #00d9f5;
  font-size: 25px;
  font-family: 'Roboto';
  font-weight: 600;
  margin-bottom: 0px;
}
```

#### `.status`
**Purpose**: Running/Paused status text

```css
.status {
  font-size: 17px;
  font-family: 'Roboto';
  font-weight: 600;
  margin-top: 0px;
}
```

### Control Elements

#### `.start-btn`
**Purpose**: Start/Pause and Reset buttons

```css
.start-btn {
  background-color: transparent;
  border: none;
}
```

#### `.btns`
**Purpose**: Plus/Minus increment buttons

```css
.btns {
  font-size: 25px;
  font-weight: 700;
  background-color: transparent;
  border: none;
  cursor: pointer;
}
```

#### `.timer`
**Purpose**: Timer limit display with gradient background

```css
.timer {
  font-size: 17px;
  font-weight: 800;
  font-family: 'Roboto';
  background-image: linear-gradient(to right, #defafe, #00d9f5);
  padding-left: 17px;
  padding-right: 17px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 8px;
  border: none;
}
```

### Icon Styling

#### `.icons`
**Purpose**: Control button icons

```css
.icons {
  width: 30px;
}
```

#### `.icon-status`
**Purpose**: Button text styling

```css
.icon-status {
  font-size: 25px;
  font-family: 'Roboto';
  font-weight: 800;
}
```

## Responsive Design

### Breakpoint Strategy

The app uses a single major breakpoint at `768px` for tablet/desktop layouts:

```css
/* Mobile-first approach */
.element {
  /* Mobile styles */
}

@media screen and (min-width: 768px) {
  .element {
    /* Tablet/Desktop styles */
  }
}
```

### Responsive Changes

| Element | Mobile | Desktop |
|---------|--------|---------|
| Background gradient | Vertical (top to bottom) | Horizontal (left to right) |
| Container max-width | 550px | 900px |
| Container margins | 47px top, 30px bottom | 70px top/bottom |
| Timer display height | 350px | 550px |
| Main heading size | 35px | 45px |
| Layout direction | Column (stacked) | Row (side-by-side) |

### Layout Transformations

#### Mobile Layout (< 768px)
```
┌─────────────────┐
│     Title       │
├─────────────────┤
│                 │
│   Timer Display │
│                 │
├─────────────────┤
│    Controls     │
└─────────────────┘
```

#### Desktop Layout (≥ 768px)
```
┌─────────────────────────────┐
│           Title             │
├─────────────┬───────────────┤
│             │               │
│   Timer     │   Controls    │
│   Display   │               │
│             │               │
└─────────────┴───────────────┘
```

## Color System

### Primary Color Palette

```css
:root {
  /* Background Colors */
  --bg-white: #ffffff;
  --bg-light-cyan: #cffcf1;
  --bg-dark-slate: #1e293b;
  --bg-darker-slate: #0f172a;
  
  /* Accent Colors */
  --accent-light-blue: #defafe;
  --accent-cyan: #00d9f5;
  
  /* Text Colors */
  --text-primary: #000000;
  --text-secondary: #666666;
  --text-accent: #00d9f5;
}
```

### Color Usage

| Color | Hex Code | Usage |
|-------|----------|-------|
| White | `#ffffff` | Background, timer display container |
| Light Cyan | `#cffcf1` | Gradient background |
| Dark Slate | `#1e293b` | Potential text color (unused) |
| Darker Slate | `#0f172a` | Potential dark theme background |
| Light Blue | `#defafe` | Timer limit gradient start |
| Cyan | `#00d9f5` | Timer limit gradient end, timer text |

### Gradient Patterns

#### Background Gradient
```css
/* Mobile */
background-image: linear-gradient(to bottom, #ffffff, #cffcf1);

/* Desktop */
background-image: linear-gradient(to right, #ffffff, #cffcf1);
```

#### Timer Limit Gradient
```css
background-image: linear-gradient(to right, #defafe, #00d9f5);
```

## Typography

### Font System

#### Primary Font
- **Family**: 'Roboto', sans-serif
- **Source**: Google Fonts (assumed)
- **Fallback**: System sans-serif

#### Font Weight Scale
```css
/* Font weights used */
--font-weight-medium: 500;   /* .set-limit-para */
--font-weight-semibold: 600; /* .digital-timer-heading, .status-heading, .status */
--font-weight-bold: 700;     /* .btns */
--font-weight-extrabold: 800; /* .icon-status, .timer */
```

#### Font Size Scale
```css
/* Font sizes used */
--font-size-small: 17px;     /* .status, .set-limit-para, .timer */
--font-size-medium: 25px;    /* .status-heading, .icon-status, .btns */
--font-size-large: 35px;     /* .digital-timer-heading (mobile) */
--font-size-xlarge: 45px;    /* .digital-timer-heading (desktop) */
```

### Typography Classes

#### Headings
```css
.digital-timer-heading {
  font-size: 35px;
  font-weight: 600;
  font-family: 'Roboto';
}

.status-heading {
  color: #00d9f5;
  font-size: 25px;
  font-family: 'Roboto';
  font-weight: 600;
  margin-bottom: 0px;
}
```

#### Body Text
```css
.status {
  font-size: 17px;
  font-family: 'Roboto';
  font-weight: 600;
  margin-top: 0px;
}

.set-limit-para {
  font-size: 17px;
  font-family: 'Roboto';
  font-weight: 500;
}
```

#### Interactive Text
```css
.icon-status {
  font-size: 25px;
  font-family: 'Roboto';
  font-weight: 800;
}

.timer {
  font-size: 17px;
  font-weight: 800;
  font-family: 'Roboto';
}
```

## Layout Patterns

### Flexbox Patterns

#### Centering Pattern
```css
.app-container {
  display: flex;
  justify-content: center;
  align-items: center; /* If vertical centering needed */
}
```

#### Column Layout Pattern
```css
.digital-timer-app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

#### Row Layout Pattern
```css
.play-pause-row-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.set-timer-limit-btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
```

### Spacing Patterns

#### Container Spacing
```css
/* Consistent padding pattern */
.status-container {
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 30px;
  padding-right: 30px;
}

/* Margin patterns */
.start-pause-container {
  margin-top: 0px;
  margin-left: 20px;
}
```

#### Text Spacing
```css
/* Remove default margins for precise control */
.status-heading {
  margin-bottom: 0px;
}

.status {
  margin-top: 0px;
}
```

## Animation and Transitions

### Current State
The current implementation doesn't include CSS animations or transitions, but here are recommended additions:

#### Button Hover Effects
```css
.start-btn:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease;
}

.btns:hover {
  transform: scale(1.1);
  transition: transform 0.15s ease;
}
```

#### Timer State Transitions
```css
.status-heading {
  transition: color 0.3s ease;
}

.status-heading.running {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
```

#### Background Transitions
```css
.app-container {
  transition: background-image 0.5s ease;
}
```

## Theming Guide

### Light Theme (Default)
```css
.app-container {
  background-image: linear-gradient(to bottom, #ffffff, #cffcf1);
}

.digital-timer-heading {
  color: #000000;
}

.status-container {
  background-color: white;
  color: #000000;
}
```

### Dark Theme Implementation
```css
.app-container.dark-theme {
  background-image: linear-gradient(to bottom, #1e293b, #0f172a);
}

.dark-theme .digital-timer-heading {
  color: #ffffff;
}

.dark-theme .status-container {
  background-color: #374151;
  color: #ffffff;
}

.dark-theme .status-heading {
  color: #00d9f5; /* Keep accent color */
}

.dark-theme .status {
  color: #d1d5db;
}
```

### Theme Toggle Implementation
```javascript
// JavaScript for theme switching
const toggleTheme = () => {
  const container = document.querySelector('.app-container')
  container.classList.toggle('dark-theme')
  
  // Save preference
  localStorage.setItem('theme', 
    container.classList.contains('dark-theme') ? 'dark' : 'light'
  )
}

// Apply saved theme on load
const savedTheme = localStorage.getItem('theme')
if (savedTheme === 'dark') {
  document.querySelector('.app-container').classList.add('dark-theme')
}
```

## CSS Variables

### Implementing CSS Custom Properties

```css
:root {
  /* Colors */
  --color-primary: #00d9f5;
  --color-background-start: #ffffff;
  --color-background-end: #cffcf1;
  --color-surface: #ffffff;
  --color-text-primary: #000000;
  --color-text-secondary: #666666;
  
  /* Spacing */
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
  
  /* Typography */
  --font-family-primary: 'Roboto', sans-serif;
  --font-size-sm: 17px;
  --font-size-md: 25px;
  --font-size-lg: 35px;
  --font-size-xl: 45px;
  
  /* Border Radius */
  --border-radius-sm: 8px;
  --border-radius-lg: 58px;
  
  /* Breakpoints */
  --breakpoint-tablet: 768px;
}

/* Dark theme variables */
.dark-theme {
  --color-background-start: #1e293b;
  --color-background-end: #0f172a;
  --color-surface: #374151;
  --color-text-primary: #ffffff;
  --color-text-secondary: #d1d5db;
}
```

### Using CSS Variables
```css
.app-container {
  background-image: linear-gradient(
    to bottom, 
    var(--color-background-start), 
    var(--color-background-end)
  );
}

.status-container {
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-md);
}

.digital-timer-heading {
  font-family: var(--font-family-primary);
  font-size: var(--font-size-lg);
  color: var(--color-text-primary);
}
```

## Accessibility

### Current Accessibility Features

#### Color Contrast
- Timer display uses high contrast cyan (#00d9f5) on white background
- Status text uses sufficient contrast ratios

#### Interactive Elements
- Buttons have proper cursor styling
- Images include alt text attributes

### Accessibility Improvements

#### Focus Management
```css
.start-btn:focus,
.btns:focus {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* Remove default outline and add custom */
.start-btn:focus,
.btns:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--color-primary);
}
```

#### High Contrast Mode Support
```css
@media (prefers-contrast: high) {
  .status-heading {
    color: #0066cc; /* Higher contrast blue */
  }
  
  .timer {
    background-image: none;
    background-color: #0066cc;
    color: white;
  }
}
```

#### Reduced Motion Support
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

#### Screen Reader Support
```css
/* Visually hidden but available to screen readers */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### ARIA and Semantic HTML Recommendations

```html
<!-- Enhanced button markup -->
<button 
  type="button"
  className="start-btn icon-status"
  onClick={this.OnClickStartOrPause}
  aria-label={isTimerStart ? 'Pause timer' : 'Start timer'}
>
  {statusForIcon}
  <img
    src={runningStatusImgUrl}
    alt=""
    className="icons"
    aria-hidden="true"
  />
</button>

<!-- Timer display with ARIA live region -->
<div className="status-container" role="timer" aria-live="polite">
  <h1 className="status-heading" aria-label={`Time remaining: ${this.getElapsedSecondsInTimeFormat()}`}>
    {this.getElapsedSecondsInTimeFormat()}
  </h1>
  <p className="status">{pauseAndRunningStatus}</p>
</div>
```

This comprehensive styling reference provides developers with detailed information about the CSS architecture, responsive design patterns, theming options, and accessibility considerations for the Digital Timer App.