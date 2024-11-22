import React, { useState, useEffect, useRef } from "react";
import "./App.css";

const App = () => {
  // State to manage system time
  const [currentTime, setCurrentTime] = useState("");

  // States for countdown timer
  const [countdownValue, setCountdownValue] = useState("");
  const [countdown, setCountdown] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState("");

  // Ref to hold the interval ID
  const intervalRef = useRef(null);

  // Function to fetch the current system time
  const fetchSystemTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
  };

  // Function to start the countdown
  const startCountdown = () => {
    if (!countdown && countdown !== 0) {
      // Validate input
      if (!countdownValue) {
        setError("Please enter a value!");
        return;
      }

      const value = parseInt(countdownValue, 10);
      if (isNaN(value) || value <= 0) {
        setError("Invalid input! Enter a positive number.");
        return;
      }

      setCountdown(value);
      setError("");
    }

    // Start or resume countdown
    setIsRunning(true);
  };

  // Function to stop (pause) the countdown
  const stopCountdown = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current); // Stop the interval
  };

  // Function to reset the countdown
  const resetCountdown = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current); // Stop the interval
    setCountdown(null);
    setCountdownValue("");
    setError("");
  };

  // Effect to handle countdown logic
  useEffect(() => {
    if (isRunning && countdown !== null && countdown > 0) {
      intervalRef.current = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsRunning(false);
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current); // Cleanup interval
  }, [isRunning, countdown]);

  return (
    <div className="app">
      <h1>System Time and Countdown App</h1>

      {/* System Time Section */}
      <div className="time-section">
        <button onClick={fetchSystemTime}>Fetch System Time</button>
        <p>{currentTime && `Current Time: ${currentTime}`}</p>
      </div>

      {/* Countdown Timer Section */}
      <div className="countdown-section">
        <input
          type="text"
          placeholder="Enter countdown in seconds"
          value={countdownValue}
          onChange={(e) => setCountdownValue(e.target.value)}
          disabled={isRunning} // Disable input when running
        />

        <div className="button-group">
          <button onClick={startCountdown} disabled={isRunning}>
            Start
          </button>
          <button onClick={stopCountdown} disabled={!isRunning}>
            Stop
          </button>
          <button onClick={resetCountdown}>Reset</button>
        </div>

        {error && <p className="error">{error}</p>}
        {countdown !== null && countdown >= 0 && <p>Countdown: {countdown}s</p>}
        {countdown === 0 && <p>Countdown Complete!</p>}
      </div>
    </div>
  );
};

export default App;
