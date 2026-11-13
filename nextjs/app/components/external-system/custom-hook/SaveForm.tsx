import { useSyncExternalStore } from 'react';

/*
 *  You must follow these naming conventions:
 *
 *    1. React component names must start with a capital letter, like StatusBar and 
 *       SaveButton. React components also need to return something that React knows 
 *       how to display, like a piece of JSX
 * 
 *    2. Hook names must start with use followed by a capital letter, like useState 
 *       (built-in) or useOnlineStatus (custom). Hooks may return arbitrary values
*/

// Custom hook: You should give use prefix to a function (and thus make it a Hook) if 
// it uses at least one Hook inside of it

function subscribe(callback: () => void) {

  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);

  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function useOnlineStatus() {

  /*
   *  useSyncExternalStore forces the external store to be read synchronously during a 
   *  render, ensuring that all components on the screen show the exact same version of 
   *  the data
   * 
   *  subscribe: A function that registers a callback listener. Whenever the store 
   *             changes, it calls this callback, which tells React to re-render
   *
   *  getSnapshot: A function that returns a snapshot of the current value from the 
   *               store. React compares this value using Object.is to see if the store 
   *               has changed
   *
   *  getServerSnapshot: (Optional) A function that returns the initial snapshot used 
   *                     during Server-Side Rendering (SSR) and hydration
   */

  return useSyncExternalStore(
    subscribe,
    () => navigator.onLine, // How to get the value on the client
    () => true              // How to get the value on the server
  );
}

function StatusBar() {

  // Custom Hooks let you share stateful logic but not state itself. Each call to a Hook 
  // is completely independent from every other call to the same Hook
  
  const isOnline = useOnlineStatus();
  return <h1>{isOnline ? '✅ Online' : '❌ Disconnected'}</h1>;
}

function SaveButton() {
  const isOnline = useOnlineStatus();

  function handleSaveClick() {
    console.log('✅ Progress saved');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? 'Save progress' : 'Reconnecting...'}
    </button>
  );
}

export default function SaveForm() {
  return (
    <>
      <SaveButton />
      <StatusBar />
    </>
  );
}
