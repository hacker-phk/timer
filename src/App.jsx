import React, { useState, useEffect } from 'react';
import "./index.css";
import book from "./asserts/book2.webp";

function App() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [timer, setTimer] = useState(null);
  const [notification, setNotification] = useState(false); 
  const[count, setCount] = useState(0);
  // State for notification

  const handleStart = () => {
    // Clear existing timer if one is running
    if (timer) clearInterval(timer);

    const newTimer = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    setTimer(newTimer); // Set the new timer
  };

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes(prevMinutes => prevMinutes + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours(prevHours => prevHours + 1);
    }
    if (minutes === 25 && seconds === 0) {
      setCount(prevCount => prevCount + 1);
      setNotification(true); // Show notification
      setTimeout(() => {
        setNotification(false); // Hide notification after 5 seconds
      }, 5000);
    }
  }, [seconds, minutes]);

  const handleStop = () => {
    clearInterval(timer); // Stop the timer
    setTimer(null); // Reset the timer state
  };

  const handleReset = () => {
    clearInterval(timer); // Stop the timer
    setTimer(null); // Reset the timer state
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  // Clean up on component unmount
  useEffect(() => {
    return () => {
      if (timer) clearInterval(timer); // Clear timer on unmount
    };
  }, [timer]);

  return (
    <div className='w-screen h-screen flex flex-col items-center justify-center gap-5 bg-cover bg-center' style={{ backgroundImage: `url(${book})` }}>
      <h1 className='text-9xl text-gray-800 text-center'>Timer</h1>
      <h2 className='text-7xl font-sans font-bold text-teal-500 text-center'>{`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}</h2>
      <div className='flex gap-4'>
        <button className='bg-green-500 text-white font-bold py-2 px-4 rounded w-[100px] hover:shadow-lg hover:shadow-yellow-200' onClick={handleStart}>
          Start
        </button>
        <button className='bg-red-400 text-white font-bold py-2 px-4 rounded w-[100px] hover:shadow-lg hover:shadow-yellow-200' onClick={handleStop}>
          Stop
        </button>
        <button className='bg-blue-400 text-white font-bold py-2 px-4 rounded w-[100px] hover:shadow-lg hover:shadow-yellow-200' onClick={handleReset}>
          Reset
        </button>
      </div>
        <p className='text-3xl font-sans font-bold text-slate-500'>Count: {count}</p>

      {/* Notification Display */}
      {notification && (
        <div className='absolute top-20 left-1/2 transform -translate-x-1/2 bg-yellow-300 text-black font-bold py-2 px-4 rounded'>
          25 Minutes Reached!
        </div>
      )}
    </div>
  );
}

export default App;
