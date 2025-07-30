# Digital Timer App - API Documentation

## Table of Contents
- [Overview](#overview)
- [Components](#components)
  - [App Component](#app-component)
  - [DigitalTimer Component](#digitaltimer-component)
- [Component Methods](#component-methods)
- [State Management](#state-management)
- [Event Handlers](#event-handlers)
- [Utility Functions](#utility-functions)

## Overview

The Digital Timer App is a React-based countdown timer application that allows users to set a timer limit, start/pause the timer, and reset it. The app features a clean, responsive design with gradient backgrounds and intuitive controls.

## Components

### App Component

**File**: `src/App.js`

The main application component that serves as the entry point for the Digital Timer App.

#### API

```javascript
const App = () => <DigitalTimer />
```

#### Description
- **Type**: Functional Component
- **Purpose**: Root component that renders the DigitalTimer component
- **Props**: None
- **Returns**: JSX element containing the DigitalTimer component

#### Usage Example

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(<App />, document.getElementById('root'))
```

---

### DigitalTimer Component

**File**: `src/components/DigitalTimer/index.js`

The main timer component that provides all timer functionality including countdown, start/pause, reset, and timer limit adjustment.

#### API

```javascript
class DigitalTimer extends Component {
  // State properties
  state = {
    isTimerStart: boolean,
    timerLimit: number,
    timeElapsedInSeconds: number
  }
  
  // Public methods
  render()
}
```

#### Props
This component doesn't accept any props.

#### State Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `isTimerStart` | `boolean` | `false` | Indicates whether the timer is currently running |
| `timerLimit` | `number` | `25` | Timer limit in minutes |
| `timeElapsedInSeconds` | `number` | `0` | Number of seconds elapsed since timer started |

#### Usage Example

```javascript
import DigitalTimer from './components/DigitalTimer'

const App = () => {
  return (
    <div>
      <DigitalTimer />
    </div>
  )
}
```

## Component Methods

### Public Methods

#### `render()`

**Description**: Renders the timer interface with controls and display.

**Returns**: JSX element containing the complete timer UI

**Usage**:
```javascript
// Called automatically by React
<DigitalTimer />
```

### Private Methods

#### `componentWillUnmount()`

**Description**: Cleanup method that clears the timer interval when component unmounts.

**Parameters**: None

**Returns**: `void`

**Implementation**:
```javascript
componentWillUnmount() {
  clearInterval(this.timeInterval)
}
```

#### `renderSeconds()`

**Description**: Formats seconds for display (currently unused in the component).

**Parameters**: None

**Returns**: `string` - Formatted seconds with leading zero if needed

**Implementation**:
```javascript
renderSeconds = () => {
  const {second} = this.state
  const totalSeconds = Math.floor(second % 60)
  
  if (totalSeconds < 10) {
    return `0${totalSeconds}`
  }
  return totalSeconds
}
```

#### `getElapsedSecondsInTimeFormat()`

**Description**: Converts remaining time to MM:SS format for display.

**Parameters**: None

**Returns**: `string` - Time in "MM:SS" format

**Example Output**: `"24:59"`, `"00:30"`, `"10:05"`

**Implementation**:
```javascript
getElapsedSecondsInTimeFormat = () => {
  const {timerLimit, timeElapsedInSeconds} = this.state
  const totalRemainingSeconds = timerLimit * 60 - timeElapsedInSeconds
  
  const minutes = Math.floor(totalRemainingSeconds / 60)
  const seconds = Math.floor(totalRemainingSeconds % 60)
  
  const finalminutes = minutes > 9 ? minutes : `0${minutes}`
  const finalSeconds = seconds > 9 ? seconds : `0${seconds}`
  
  return `${finalminutes}:${finalSeconds}`
}
```

#### `incrementTimeElapsedInSecond()`

**Description**: Increments elapsed time by one second and handles timer completion.

**Parameters**: None

**Returns**: `void`

**Side Effects**:
- Updates `timeElapsedInSeconds` state
- Stops timer and updates `isTimerStart` when timer completes
- Clears interval when timer reaches zero

**Implementation**:
```javascript
incrementTimeElapsedInSecond = () => {
  const {timeElapsedInSeconds, timerLimit} = this.state
  const isTimerCompleted = timeElapsedInSeconds === timerLimit * 60
  
  if (isTimerCompleted) {
    clearInterval(this.timeInterval)
    this.setState({isTimerStart: false})
  } else {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }
}
```

## Event Handlers

### `onIncrement()`

**Description**: Increases the timer limit by 1 minute.

**Parameters**: None

**Returns**: `void`

**Constraints**: Can only be used when timer is not running

**Usage**:
```javascript
<button onClick={this.onIncrement}>+</button>
```

**Implementation**:
```javascript
onIncrement = () => {
  this.setState(prevState => ({
    timerLimit: prevState.timerLimit + 1,
  }))
}
```

### `onDecrement()`

**Description**: Decreases the timer limit by 1 minute.

**Parameters**: None

**Returns**: `void`

**Constraints**: 
- Can only be used when timer is not running
- Timer limit cannot go below 1 minute

**Usage**:
```javascript
<button onClick={this.onDecrement}>-</button>
```

**Implementation**:
```javascript
onDecrement = () => {
  const {timerLimit, isTimerStart} = this.state
  if (timerLimit > 1 && isTimerStart === false) {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit - 1,
    }))
  }
}
```

### `OnClickStartOrPause()`

**Description**: Toggles timer between start and pause states.

**Parameters**: None

**Returns**: `void`

**Behavior**:
- If timer is paused: Starts the timer interval
- If timer is running: Pauses the timer by clearing interval
- If timer is completed: Resets elapsed time to 0

**Usage**:
```javascript
<button onClick={this.OnClickStartOrPause}>
  {isTimerStart ? 'Pause' : 'Start'}
</button>
```

**Implementation**:
```javascript
OnClickStartOrPause = () => {
  const {isTimerStart, timeElapsedInSeconds, timerLimit} = this.state
  const isTimerCompleted = timeElapsedInSeconds === timerLimit * 60
  
  if (isTimerCompleted) {
    this.setState({timeElapsedInSeconds: 0})
  }
  if (isTimerStart) {
    clearInterval(this.timeInterval)
  } else {
    this.timeInterval = setInterval(this.incrementTimeElapsedInSecond, 1000)
  }
  this.setState(prevState => ({isTimerStart: !prevState.isTimerStart}))
}
```

### `onClickReset()`

**Description**: Resets the timer to its initial state.

**Parameters**: None

**Returns**: `void`

**Behavior**:
- Stops the timer if running
- Resets timer limit to 25 minutes
- Resets elapsed time to 0
- Sets timer state to paused

**Usage**:
```javascript
<button onClick={this.onClickReset}>Reset</button>
```

**Implementation**:
```javascript
onClickReset = () => {
  clearInterval(this.timeInterval)
  this.setState({
    isTimerStart: false,
    timerLimit: 25,
    timeElapsedInSeconds: 0,
  })
}
```

## State Management

### State Structure

```javascript
{
  isTimerStart: false,      // Boolean: Timer running status
  timerLimit: 25,           // Number: Timer limit in minutes
  timeElapsedInSeconds: 0   // Number: Elapsed time in seconds
}
```

### State Transitions

| Action | State Changes | Side Effects |
|--------|---------------|--------------|
| Start Timer | `isTimerStart: true` | Starts 1-second interval |
| Pause Timer | `isTimerStart: false` | Clears interval |
| Increment Limit | `timerLimit: +1` | Only when timer stopped |
| Decrement Limit | `timerLimit: -1` | Only when timer stopped and limit > 1 |
| Timer Tick | `timeElapsedInSeconds: +1` | Every second when running |
| Timer Complete | `isTimerStart: false` | Clears interval |
| Reset | All properties to defaults | Clears interval |

## Utility Functions

### Time Formatting

The component uses several utility functions for time formatting:

#### Minutes to Seconds Conversion
```javascript
const totalSeconds = timerLimit * 60
```

#### Remaining Time Calculation
```javascript
const totalRemainingSeconds = timerLimit * 60 - timeElapsedInSeconds
```

#### MM:SS Format Conversion
```javascript
const minutes = Math.floor(totalRemainingSeconds / 60)
const seconds = Math.floor(totalRemainingSeconds % 60)
const formattedTime = `${minutes > 9 ? minutes : `0${minutes}`}:${seconds > 9 ? seconds : `0${seconds}`}`
```

## Constants and Assets

### Image URLs
- Play Icon: `https://assets.ccbp.in/frontend/react-js/play-icon-img.png`
- Pause Icon: `https://assets.ccbp.in/frontend/react-js/pause-icon-img.png`
- Reset Icon: `https://assets.ccbp.in/frontend/react-js/reset-icon-img.png`
- Background Image: `https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png`

### Default Values
- Default Timer Limit: 25 minutes
- Minimum Timer Limit: 1 minute
- Timer Interval: 1000ms (1 second)

## Error Handling

The component includes basic error prevention:

1. **Decrement Protection**: Prevents timer limit from going below 1 minute
2. **Control Disabling**: Plus/minus buttons are disabled when timer is running
3. **Cleanup**: Proper interval cleanup on component unmount
4. **Completion Handling**: Automatic timer stop when countdown reaches zero