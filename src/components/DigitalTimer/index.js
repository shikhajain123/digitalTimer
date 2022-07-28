// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerStart: false,
    timerLimit: 25,
    timeElapsedInSeconds: 0,
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  renderSeconds = () => {
    const {second} = this.state
    const totalSeconds = Math.floor(second % 60)

    if (totalSeconds < 10) {
      return `0${totalSeconds}`
    }
    return totalSeconds
  }

  onIncrement = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  onDecrement = () => {
    const {timerLimit, isTimerStart} = this.state
    if (timerLimit > 1 && isTimerStart === false) {
      this.setState(prevState => ({
        timerLimit: prevState.timerLimit - 1,
      }))
    }
  }

  onClickReset = () => {
    clearInterval(this.timeInterval)
    this.setState({
      isTimerStart: false,
      timerLimit: 25,
      timeElapsedInSeconds: 0,
    })
  }

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

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimit, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timerLimit * 60 - timeElapsedInSeconds

    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)

    const finalminutes = minutes > 9 ? minutes : `0${minutes}`
    const finalSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${finalminutes}:${finalSeconds}`
  }

  render() {
    const {isTimerStart, timerLimit} = this.state

    const runningStatusImgUrl = isTimerStart
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const altForImg = isTimerStart ? 'pause icon' : 'play icon'

    const statusForIcon = isTimerStart ? 'Pause' : 'Start'

    const pauseAndRunningStatus = isTimerStart ? 'Running' : 'Paused'

    return (
      <div className="app-container">
        <div className="digital-timer-app-container">
          <h1 className="digital-timer-heading">Digital Timer</h1>
          <div className="timer-and-timer-setting-container">
            <div className="clock-status-container">
              <div className="status-container">
                <h1 className="status-heading">
                  {' '}
                  {this.getElapsedSecondsInTimeFormat()}
                </h1>
                <p className="status">{pauseAndRunningStatus}</p>
              </div>
            </div>
            <div className="clock-setting-container">
              <div className="start-and-reset-container">
                <div className="play-pause-row-container">
                  <div className="start-pause-container">
                    <button
                      type="button"
                      className="start-btn icon-status"
                      onClick={this.OnClickStartOrPause}
                    >
                      {' '}
                      {statusForIcon}
                      <img
                        src={runningStatusImgUrl}
                        alt={altForImg}
                        className="icons"
                      />
                    </button>
                  </div>

                  <div className="start-pause-container">
                    <button
                      type="button"
                      className="start-btn icon-status"
                      onClick={this.onClickReset}
                    >
                      Reset
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                        alt="reset icon"
                        className="icons"
                      />
                    </button>
                  </div>
                </div>
                <p className="set-limit-para">Set Timer Limit</p>
                <div className="set-timer-limit-btn-container">
                  <button
                    type="button"
                    className="btns"
                    onClick={this.onIncrement}
                  >
                    +
                  </button>
                  <p className="timer">{timerLimit}</p>
                  <button
                    type="button"
                    className="btns"
                    onClick={this.onDecrement}
                  >
                    -
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
// <p className="icon-status">{statusForIcon}</p>

export default DigitalTimer
