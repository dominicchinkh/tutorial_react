import { useState, useEffect } from 'react';

const serverUrl = 'https://localhost:1234';

export function createConnection(serverUrl: string, roomId: string) {
  // A real implementation would actually connect to the server
  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');
    },
    disconnect() {
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl);
    }
  };
}

interface ChatRoomProps
{
  roomId: string
}

function ChatRoom({ roomId }: ChatRoomProps) {
  
  // ✅ Each Effect in your code should represent a separate and independent 
  //     synchronization process

  useEffect(() => {
    // logVisit(roomId);
  }, [roomId]);

  useEffect(() => {

    // ❌ Resist adding unrelated logic to your Effect only because this logic needs
    //    to run at the same time as an Effect you already wrote

    // logVisit(roomId);

    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();

    // Tell React that its code depends on `roomId` by including it in the list of 
    // dependencies

    // `serverUrl` is not a dependency because the serverUrl never changes due to a 
    // re-render

    // All values inside the component (including props, state, and variables in your 
    // component’s body) are reactive. Any reactive value can change on a re-render, 
    // so you need to include reactive values as Effect’s dependencies

    // Mutable values (including ref.current and global variables) aren’t reactive

    // Avoid relying on objects and functions as dependencies

  }, [roomId]);

  return <h1>Welcome to the {roomId} room!</h1>;
}

export default function ChatApp() {
  const [roomId, setRoomId] = useState('general');
  const [show, setShow] = useState(false);
  
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

      <button onClick={() => setShow(!show)}>
        {show ? 'Close chat' : 'Open chat'}
      </button>

      {show && <hr />}
      {show && <ChatRoom roomId={roomId} />}
    </>
  );
}
