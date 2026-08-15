import { useRef, useState } from 'react';

/*
 * When to use refs
 *
 *   Typically, you will use a ref when your component needs to “step outside” 
 *   React and communicate with external APIs - often a browser API that won’t  
 *   impact the appearance of the component
 * 
 *   Avoid changing DOM nodes managed by React. Modifying, adding children to, 
 *   or removing children from elements that are managed by React can lead to 
 *   inconsistent visual results or crashes 
 * 
 *   If you do modify DOM nodes managed by React, modify parts that React has 
 *   no reason to update
 * 
 * Best practices for refs
 * 
 *   * Refs are useful when you work with external systems or browser APIs. If
 *     much of your application logic and data flow relies on refs, you might
 *     want to rethink your approach
 * 
 *   * Don’t read or write ref.current during rendering
 * 
 */
export default function Stopwatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function handleStart() {

    // Start counting.
    setStartTime(Date.now());
    setNow(Date.now());

    // Clear existing timer safely before starting a new one
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }

    // Since the interval ID is not used for rendering, you can keep it in a ref

    intervalRef.current = setInterval(() => {
      // Update the current time every 10ms.
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
  }

  let secondsPassed = 0;

  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <>
      <h1>Time passed: {secondsPassed.toFixed(3)}</h1>
      <button onClick={handleStart}>
        Start
      </button>
      <button onClick={handleStop}>
        Stop
      </button>
    </>
  );
}
