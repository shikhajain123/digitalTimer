# Digital Timer App – Comprehensive Documentation

## Overview
The **Digital Timer App** is a small React application that showcases a feature-rich countdown timer.  
It is built with React 17 and ships with ESLint + Prettier pre-configured for an opinionated development workflow.

This document describes every *public* entry point of the code-base – currently the exported React components – and explains how to consume them in your own application.  Examples and tips are provided to help you get started quickly.

---

## Quick Start
```bash
# clone repository & install dependencies
pnpm i     # or npm install / yarn install

# start the development server on http://localhost:3000
pnpm start # or npm start / yarn start
```
The default command boots **create-react-app**’s dev-server with hot-reloading enabled.  Any code-change is reflected in-browser instantly.

> **Node requirement** – Node ≥ 10.13 is required (see `package.json → engines`).

---

## Public API Surface
At the moment the project exposes **two** consumable React components:

| Export | Location | Description |
| ------ | -------- | ----------- |
| `DigitalTimer` | `src/components/DigitalTimer/index.js` | An interactive countdown timer with start / pause, reset and limit-adjust controls. |
| `App` | `src/App.js` | Convenience wrapper that simply renders `<DigitalTimer />`.  Import this if you just want the timer as the root of your app. |

All remaining functions inside the code-base are *implementation details* and should be considered **private**.

### 1. `<DigitalTimer />`
*Signature*
```tsx
<DigitalTimer />
```
`DigitalTimer` does **not** accept any props today; it is entirely self-contained.  Internally, it keeps three pieces of state:

| State | Type | Purpose |
| ----- | ---- | ------- |
| `isTimerStart` | `boolean` | Whether the timer is currently running (`true`) or paused (`false`). |
| `timerLimit` | `number` | The length of the timer in **minutes**.  Defaults to **25**. |
| `timeElapsedInSeconds` | `number` | Seconds that have elapsed in the current run. |

#### Behaviour
1. **Start / Pause** – Toggles the running state.  When running, the timer counts down every second.  When the limit is hit it stops automatically and resets the UI to *Paused*.
2. **Reset** – Restores the default state (*25:00*, paused).
3. **Increment / Decrement** – Changes `timerLimit` in ±1 minute steps.  Buttons are disabled while the timer is running to prevent inconsistent state changes.

#### Usage Example
```jsx
import React from 'react';
import DigitalTimer from 'path/to/src/components/DigitalTimer';

const Example = () => (
  <section>
    <h2>Pomodoro – 25 minutes</h2>
    <DigitalTimer />
  </section>
);

export default Example;
```

> **Tip** – Because no props are required, dropping the component in any JSX hierarchy is all that is needed.

### 2. `<App />`
*Signature*
```tsx
<App />
```
`App` is a thin wrapper around `DigitalTimer` and exists mainly as the root component for **create-react-app**.  Import it if you want to embed the full timer page without manual styling.

#### Usage Example
```jsx
import ReactDOM from 'react-dom';
import App from './src/App';

ReactDOM.render(<App />, document.getElementById('root'));
```

---

## Project Structure (high-level)
```
├── public/                # CRA static assets
├── src/
│   ├── components/
│   │   └── DigitalTimer/
│   │       ├── index.js   # component implementation
│   │       └── index.css  # component styles
│   ├── App.js             # root wrapper component
│   ├── App.css            # global styles
│   └── index.js           # CRA entry-point
└── package.json
```

---

## NPM/Yarn/Pnpm Scripts
| Script | Purpose |
| ------ | ------- |
| `start` | Launch dev-server with hot-reload. |
| `build` | Production bundle in `build/`. |
| `test` | Jest test-runner. |
| `lint` / `lint:fix` | ESLint with Airbnb config. |
| `format` | Format source via Prettier. |

---

## Extending the Timer
While the current API is prop-less, the component has been coded with extension in mind.  Suggested enhancements:

1. **initialLimit** prop – Allow consumers to set a custom starting limit (e.g. pomodoro 50/10).
2. **onComplete** callback – Fire a side-effect (sound notification, toast, etc.) once the countdown reaches `00:00`.
3. **theme** prop – Switch between light and dark themes.

Feel free to open a pull-request if you implement a new prop or feature – contributions are welcome!

---

## Contributing
1. Fork & clone the repository.
2. Create a feature branch: `git checkout -b feat/my-awesome-prop`.
3. Run `pnpm run-all` (tests + lint) before committing.
4. Push and open a PR describing your changes.

---

© 2025 Digital Timer App – MIT License