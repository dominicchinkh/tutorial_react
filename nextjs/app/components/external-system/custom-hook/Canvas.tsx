import { useState, useEffect } from 'react';

interface Position {
  x: number;
  y: number;
}

/*
 * You should use a custom hook in React whenever you find yourself duplicating stateful
 * logic across multiple components, or when you want to extract complex, messy code out
 * of a component to make it clean and readable
 *
 * A custom hook is simply a JavaScript function whose name starts with use (which tells 
 * React to apply hook rules) and can call other hooks like useState, useEffect, or 
 * useSyncExternalStore
 *
 * Key Scenarios for Custom Hooks:
 * 
 * 1. Sharing Stateful Logic (The DRY Principle)
 *    If two or more components need to do the same thing with state, don't copy-paste 
 *    the code. Extract it into a custom hook.
 *
 *    Examples: useAuth() to check if a user is logged in, useMediaQuery() to track 
 *              screen size, or useLocalStorage() to sync state with browser storage
 *
 * 2. Isolating Complex Side Effects and Subscriptions
 *    Components should ideally focus on rendering UI, not managing browser event 
 *    listeners, timers, or network subscriptions. Moving these out keeps your components
 *    focused and testable
 *
 *    Example: The useOnlineStatus() hook encapsulates all the window event listeners 
 *             (online and offline) away from the UI components
 *
 * 3. Decoupling Data Fetching or Form Management
 *    Managing API requests, loading states, errors, or complex multi-step form inputs 
 *    can bloat a component
 *
 *    Example: useFormValidation() or useFetchData(url) can handle the lifecycle of 
 *             fetching data so your component only has to worry about displaying the 
 *             result (isLoading, data, error)
 *
 * When NOT to Use a Custom Hook:
 * 
 * For pure utility functions: 
 * If your logic doesn't use any React hooks (like useState, useEffect, etc.) and just
 * transforms data (e.g., formatting a date or calculating a total price), it should 
 * just be a regular JavaScript helper function, not a custom hook
 *
 * Just to split up a single component: 
 * If a component is getting too big, but the state isn't being shared elsewhere, you 
 * might just need smaller sub-components rather than a custom hook
 * 
 */

// Custom hook
function useDelayedValue<T>(value: T, delay:number): T {
  const [delayedValue, setDelayedValue] = useState<T>(value);

  useEffect(() => {
    setTimeout(() => {
      setDelayedValue(value);
    }, delay);
  }, [value, delay]);

  return delayedValue;
}

function usePointerPosition(): Position {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener('pointermove', handleMove);
    return () => window.removeEventListener('pointermove', handleMove);
  }, []);
  return position;
}

export default function Canvas(): React.JSX.Element {
  const pos1 = usePointerPosition();
  const pos2 = useDelayedValue(pos1, 100);
  const pos3 = useDelayedValue(pos2, 200);
  const pos4 = useDelayedValue(pos3, 100);
  const pos5 = useDelayedValue(pos4, 50);

  return (
    <>
      <Dot position={pos1} opacity={1} />
      <Dot position={pos2} opacity={0.8} />
      <Dot position={pos3} opacity={0.6} />
      <Dot position={pos4} opacity={0.4} />
      <Dot position={pos5} opacity={0.2} />
    </>
  );
}

interface DotProps {
  position: Position;
  opacity: number;
}

function Dot({ position, opacity }: DotProps) {
  return (
    <div style={{
      position: 'absolute',
      backgroundColor: 'pink',
      borderRadius: '50%',
      opacity,
      transform: `translate(${position.x}px, ${position.y}px)`,
      pointerEvents: 'none',
      left: -20,
      top: -20,
      width: 40,
      height: 40,
    }} />
  );
}
