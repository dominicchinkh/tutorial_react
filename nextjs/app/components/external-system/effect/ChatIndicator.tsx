import React, { useSyncExternalStore } from 'react';

/**
 * The callback function provided by `useSyncExternalStore` takes no arguments 
 * and returns void. It simply tells React to re-evaluate the store's current value.
 */
type StoreChangeCallback = () => void;

function subscribe(callback: StoreChangeCallback): () => void {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  
  // Return a cleanup function that React will call when the component unmounts
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

export function useOnlineStatus(): boolean {

  // ✅ Good: Subscribing to an external store with a built-in Hook
  return useSyncExternalStore(
    subscribe,              // Tell React how to listen for changes
    () => navigator.onLine, // Tell React how to get the current value (client side)
    () => true              // Tell React what value to use on the server (SSR)
  );
}

export default function ChatIndicator(): React.ReactElement {
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      <h1>Chat Application</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px' }}>
        <span 
          style={{
            display: 'inline-block',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            backgroundColor: isOnline ? '#22c55e' : '#ef4444', // Green if online, Red if offline
            transition: 'background-color 0.3s ease'
          }}
          aria-hidden="true"
        />
        <p style={{ margin: 0, fontWeight: 500, fontFamily: 'sans-serif' }}>
          {isOnline ? 'Online' : 'Offline - Reconnecting...'}
        </p>
      </div>
    </div>
  );
}
