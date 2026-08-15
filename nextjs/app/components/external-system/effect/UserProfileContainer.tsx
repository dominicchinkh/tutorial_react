import { useState, useMemo } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface UserProfileProps {
  userId: string;
  firstName: string;
  lastName: string;
  todos: Todo[];
}

// ✅ 3. GOOD: Resetting state by treating different profiles as different components entirely.
export default function UserProfileContainer(props: UserProfileProps) {
  // We pass all props down, using userId as the key to automatically reset state on change
  return <UserProfile key={props.userId} {...props} />;
}

function UserProfile({ 
  userId, 
  firstName, 
  lastName, 
  todos 
}: UserProfileProps) {

  /*
   * ❌ 1. AVOID: Updating state based on props or state
   *
   *   const [fullName, setFullName] = useState<string>('');
   * 
   *   useEffect(() => {
   *     setFullName(`${firstName} ${lastName}`);
   *   }, [firstName, lastName]);
   * 
   */

  // ✅ 1. GOOD: Calculate derived data directly during rendering
  const fullName = `${firstName} ${lastName}`;

  /*
   * ❌ 2. AVOID: Caching/transforming data using state and an Effect
   *
   *   const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
   * 
   *   useEffect(() => {
   *     setActiveTodos(todos.filter(todo => !todo.completed));
   *   }, [todos]);
   * 
   */

  // ✅ 2. GOOD: Transform data directly during rendering. 
  const activeTodos = useMemo(() => {
    return todos.filter(todo => !todo.completed);
  }, [todos]);

  /*
   * ❌ 3. AVOID: Resetting state when a prop changes via an Effect
   *
   *   const [comment, setComment] = useState<string>('');
   * 
   *   useEffect(() => {
   *     setComment(''); 
   *   }, [userId]);
   */

  // ✅ 3. GOOD: State automatically resets when the parent changes the `key` prop.
  const [comment, setComment] = useState<string>('');

  /*
   * ❌ 4. AVOID: Handling user events inside an Effect
   *
   *   const [isSubscribing, setIsSubscribing] = useState<boolean>(false);
   * 
   *   useEffect(() => {
   *     if (isSubscribing) {
   *       fetch('/api/subscribe', { 
   *         method: 'POST', 
   *         body: JSON.stringify({ userId }) 
   *       })
   *       .then(() => {
   *         setIsSubscribing(false);
   *         alert('Subscribed!');
   *       });
   *     }
   *   }, [isSubscribing, userId]);
   */

  // ✅ 4. GOOD: Handle user events directly in event handlers.

  // Note: If this logic is caused by a particular interaction, keep it in the event 
  // handler. If it’s caused by the user seeing the component on the screen, keep it 
  // in the Effect

  const handleSubscribeClick = async () => {
    await fetch('/api/subscribe', { 
      method: 'POST', 
      body: JSON.stringify({ userId }) 
    });
    alert('Subscribed!');
  };

  return (
    <div>
      <h1>{fullName}</h1>
      
      <ul>
        {activeTodos.map(todo => <li key={todo.id}>{todo.text}</li>)}
      </ul>

      <textarea 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Leave a comment..."
      />

      <button onClick={handleSubscribeClick}>
        Subscribe to User
      </button>
    </div>
  );
}