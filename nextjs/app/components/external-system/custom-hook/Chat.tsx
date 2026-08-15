import { useState, useEffect, useEffectEvent } from 'react';

function showNotification(message: string, theme = 'dark') {
  console.log(theme + ': ' + message);
}

interface ConnectionProps
{
  serverUrl: string
  roomId: string
}

function createConnection({ serverUrl, roomId }: ConnectionProps) {

  // A real implementation would actually connect to the server
  if (typeof serverUrl !== 'string') {
    throw Error('Expected serverUrl to be a string. Received: ' + serverUrl);
  }

  if (typeof roomId !== 'string') {
    throw Error('Expected roomId to be a string. Received: ' + roomId);
  }

  let intervalId: ReturnType<typeof setTimeout> | undefined;
  let messageCallback: ((message: string, theme?: string) => void) | null;

  return {
    connect() {
      console.log('✅ Connecting to "' + roomId + '" room at ' + serverUrl + '...');

      clearInterval(intervalId);
      
      intervalId = setInterval(() => {
        if (messageCallback) {
          if (Math.random() > 0.5) {
            messageCallback('hey')
          } else {
            messageCallback('lol');
          }
        }
      }, 10000);
    },
    
    disconnect() {
      clearInterval(intervalId);
      messageCallback = null;
      console.log('❌ Disconnected from "' + roomId + '" room at ' + serverUrl + '');
    },

    on(event: string, callback: (message: string, theme?: string) => void) {

      if (messageCallback) {
        throw Error('Cannot add the handler twice.');
      }

      if (event !== 'message') {
        throw Error('Only "message" event is supported.');
      }

      messageCallback = callback;
    },
  };
}

interface UseChatRoomProps
{
  serverUrl: string
  roomId: string
  onReceiveMessage: (msg: string) => void
}

// Custom hook
function useChatRoom({ serverUrl, roomId, onReceiveMessage }: UseChatRoomProps) {

  // Adding a dependency on onReceiveMessage is not ideal because it will cause the chat
  // to re-connect every time the component re-renders. Wrap this event handler into an 
  // Effect Event to remove it from the dependencies
  
  const onMessage = useEffectEvent(onReceiveMessage);

  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    const connection = createConnection(options);

    connection.on('message', (msg) => {
      onMessage(msg);
    });

    connection.connect();

    return () => connection.disconnect();
  }, [roomId, serverUrl]);
}

interface ChatRoomProps
{
  roomId: string
}

function ChatRoom({ roomId }: ChatRoomProps) {
  const [serverUrl, setServerUrl] = useState('https://localhost:1234');

  useChatRoom({
    roomId: roomId,
    serverUrl: serverUrl,
    onReceiveMessage(msg) {
      showNotification('New message: ' + msg);
    }
  });

  return (
    <>
      <label>
        Server URL:
        <input value={serverUrl} onChange={e => setServerUrl(e.target.value)} />
      </label>
      <h1>Welcome to the {roomId} room!</h1>
    </>
  );
}

export default function Chat() {
  const [roomId, setRoomId] = useState('general');
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
      <hr />
      <ChatRoom
        roomId={roomId}
      />
    </>
  );
}
