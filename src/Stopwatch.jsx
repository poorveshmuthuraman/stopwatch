import { useEffect, useRef, useState } from "react";
import { isElementOfType } from "react-dom/test-utils";

function Stopwatch() {

  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(() => {
    if(isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current)
        console.log(elapsedTime)
      }, 10)
    }

    return () => {
      clearInterval(intervalIdRef.current)
    }
  }, [isRunning]) //code executes wen isRunning changes value

  function start() {
    setIsRunning(true); //re-renders due to useState hook
    startTimeRef.current = Date.now() - elapsedTime // DOES NOT re-render as useRef hook is used
  }

  function stop() {
    setIsRunning(false) //re-renders due to useState hook
  }

  function reset() {
    setElapsedTime(0) //re-renders due to useState hook
    setIsRunning(false) //re-renders due to useState hook
  }

  function formatTime() {
    //need to format elapsedTime variable, note elapsedTime is in mil-seconds
    let hours = Math.floor(elapsedTime / (1000*60*60))
    let minutes = Math.floor(elapsedTime / (1000*60)%60)
    let seconds = Math.floor(elapsedTime / (1000) %60)
    let milliSeconds = Math.floor((elapsedTime % 1000)/10)

    //zero padding
    hours = String(hours).padStart(2, "0")
    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")
    milliSeconds = String(milliSeconds).padStart(2, "0")

    return `${hours}:${minutes}:${seconds}:${milliSeconds}`
  }

  return(
    <div className="container">
      <h2 className="timer-text">{formatTime()}</h2>
      <div className="button-container">
        <button className="start-btn" onClick={start}>Start</button>
        <button className="stop-btn" onClick={stop}>Stop</button>
        <button className="reset-btn" onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default Stopwatch