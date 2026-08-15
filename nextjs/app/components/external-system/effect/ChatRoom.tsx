import { useEffect } from 'react';

/*
 * Effects let you run some code after rendering. Use them to synchronize your 
 * component with a system outside of React
 *
 * Effects let you specify side effects that are caused by rendering itself, 
 * rather than by a particular event
 *
 * Effects run at the end of a commit after the screen updates
 * 
 * Controlling non-React widgets：
 * 
 *    useEffect(() => {
 *      const dialog = dialogRef.current;
 *      dialog.showModal();
 *      return () => dialog.close();
 *    }, []);
 * 
 * Subscribing to events：
 *    If your Effect subscribes to something, the cleanup function should unsubscribe 
 * 
 *    useEffect(() => {
 *      function handleScroll(e) {
 *        console.log(window.scrollX, window.scrollY);
 *      }
 *      window.addEventListener('scroll', handleScroll);
 *      return () => window.removeEventListener('scroll', handleScroll);
 *    }, []);
 * 
 * Triggering animations：
 *    If your Effect animates something in, the cleanup function should reset the 
 *    animation to the initial values
 * 
 *    useEffect(() => {
 *      const node = ref.current;
 *      node.style.opacity = 1; // Trigger the animation
 *      return () => {
 *        node.style.opacity = 0; // Reset to the initial value
 *      };
 *    }, []);
 * 
 * Fetching data:
 *    If your Effect fetches something, the cleanup function should either abort the 
 *    fetch or ignore its result. You can’t "undo" a network request that already 
 *    happened, but your cleanup function should ensure that the fetch that’s not relevant
 *    anymore does not keep affecting your application
 * 
 *    Note: recommended approaches of fetching data:
 *          1. If you use a framework, use its built-in data fetching mechanism
 *          2. Otherwise, consider using or building a client-side cache
 * 
 *    useEffect(() => {
 *      let ignore = false;
 *    
 *      async function startFetching() {
 *        const json = await fetchTodos(userId);
 *        if (!ignore) {
 *          setTodos(json);
 *        }
 *      }
 *    
 *      startFetching();
 *    
 *      return () => {
 *        ignore = true;
 *      };
 *    }, [userId]);
 * 
 * Not an Effect: Initializing the application 
 *    Some logic should only run once when the application starts. You can put it outside your components
 * 
 *    if (typeof window !== 'undefined') { // Check if we're running in the browser.
 *      checkAuthToken();
 *      loadDataFromLocalStorage();
 *    }
 *    
 *    function App() {
 *      // ...
 *    }
 * 
 * Not an Effect: Buying a product
 *    Buying is not caused by rendering; it’s caused by a specific interaction. It should run only when the
 *    user presses the button. Move your /api/buy request into the Buy button event handler
 * 
 */

function createConnection() {

  // A real implementation would actually connect to the server

  return {
    connect() {
      console.log('✅ Connecting...');
    },
    disconnect() {
      console.log('❌ Disconnected.');
    }
  };
}

export default function ChatRoom() {

  // Step 1: Declare an Effect
  //   Import the useEffect Hook from React. Then, call it at the top level of your 
  //   component and put some code inside your Effect:

  useEffect(() => {
    const connection = createConnection();
    connection.connect();

    /*
     * Step 3: Add cleanup if needed 
     * 
     *   Return a cleanup function from your Effect
     * 
     *   React will call your cleanup function each time before the Effect runs again, 
     *   and one final time when the component unmounts (gets removed)
     * 
     */

    return () => connection.disconnect();

    /*
     * Step 2: Specify the Effect dependencies
     *
     *   Specifying [isPlaying] as the dependency array tells React that it should skip 
     *   re-running your Effect if isPlaying is the same as it was during the previous 
     *   render.
     *
     *     useEffect(() => {
     *       // This runs after every render
     *     });
     *
     *     useEffect(() => {
     *       // This runs only on mount (when the component appears)
     *     }, []);
     *
     *     useEffect(() => {
     *       // This runs on mount *and also* if either a or b have changed since the last render
     *     }, [a, b]);
     *
     *   The ref object has a stable identity: React guarantees you’ll always get the same 
     *   object from the same useRef call on every render. It never changes, so it will never 
     *   by itself cause the Effect to re-run. Therefore, it does not matter whether you include 
     *   it or not
     *
     *   The set functions returned by useState also have stable identity, so you will often see 
     *   them omitted from the dependencies too
     */

  }, []);
  
  return <h1>Welcome to the chat!</h1>;
}
