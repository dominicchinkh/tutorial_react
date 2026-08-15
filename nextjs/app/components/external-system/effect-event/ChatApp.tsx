import { useState, useEffect } from 'react';
import { useEffectEvent } from 'react';

const serverUrl = 'https://localhost:1234';

export interface Connection {
  connect(): void;
  on(event: 'connected', callback: () => void): void;
  disconnect(): void;
}

export function createConnection(serverUrl: string, roomId: string): Connection {

  // A real implementation would actually connect to the server
  let connectedCallback: (() => void) | undefined;
  let timeout: ReturnType<typeof setTimeout> | undefined;

  return {
    connect() {
      timeout = setTimeout(() => {
        if (connectedCallback) {
          connectedCallback();
        }
      }, 100);
    },
    on(event: 'connected', callback: () => void) {
      if (connectedCallback) {
        throw new Error('Cannot add the handler twice.');
      }
      if (event !== 'connected') {
        throw new Error('Only "connected" event is supported.');
      }
      connectedCallback = callback;
    },
    disconnect() {
      clearTimeout(timeout);
    }
  };
}

function showNotification(message: string, theme: string) {
  alert(message + ' in theme: ' + theme);
}

interface ChatAppProps
{
  roomId: string
  theme: string
}

/*
 *  Removing unnecessary dependencies:
 *
 *    1. Should this code move to an event handler?
 * 
 *    2. Is your Effect doing several unrelated things? Avoid: A single Effect synchronizes
 *       two independent processes
 * 
 *    3. Are you reading some state to calculate the next state? Pass an updater function
 *         ❌ setMessages([...messages, receivedMessage]);
 *         ✅ setMessages(msgs => [...msgs, receivedMessage]);
 * 
 *    4. Do you want to read a value without “reacting” to its changes? Move this non-reactive
 *       piece of logic into an Effect Event
 * 
 *    5. Does some reactive value change unintentionally?
 * 
 *       In JavaScript, each newly created object and function is considered distinct from all
 *       the others. It doesn’t matter that the contents inside of them may be the same!
 * 
 *       Whenever possible, you should try to avoid objects and functions as your Effect’s 
 *       dependencies. Instead, try moving them outside the component, inside the Effect, or 
 *       extracting primitive values out of them
 */

// These are reactive values
function ChatRoom({ roomId, theme }: ChatAppProps) {

  // Here, onConnected is called an Effect Event. It’s a part of your Effect logic, but
  // it behaves a lot more like an event handler. The logic inside it is not reactive, 
  // and it always “sees” the latest values of your props and state.

  // You should name your Effect Events after what the user thinks has happened (onMessage, 
  // onTick, onVisit, or onConnected), not when some code happened to run (onMount, onUpdate, 
  // onUnmount, or onAfterRender)

  const onConnected = useEffectEvent(() => {
    showNotification('Connected!', theme);
  });

  // Effects are reactive, so createConnection(serverUrl, roomId) and connection.connect()
  // will run for every distinct value of roomId

  useEffect(() => {

    // This Effect reads the `roomId` reactive value
    const connection = createConnection(serverUrl, roomId);
    connection.on('connected', () => {
      onConnected();
    });
    connection.connect();
    return () => connection.disconnect();

    // You must specify that reactive value as a dependency of your Effect
  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>
}

export default function ChatApp() {
  const [roomId, setRoomId] = useState('general');
  const [isDark, setIsDark] = useState(false);
  return (
    <>
      <label>
        Choose the chat room:{' '}
        <select
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        >
          <option value="general">general</option>
          <option value="travel">travel</option>
          <option value="music">music</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={isDark}
          onChange={e => setIsDark(e.target.checked)}
        />
        Use dark theme
      </label>
      <hr />
      <ChatRoom
        roomId={roomId}
        theme={isDark ? 'dark' : 'light'}
      />
    </>
  );
}
