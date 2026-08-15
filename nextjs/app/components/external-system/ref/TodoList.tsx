import { useState, useRef } from 'react';
import { flushSync } from 'react-dom';

interface Todo
{
  id: number
  text: string
}

let nextId = 0;
const initialTodos: Todo[] = [];

for (let i = 0; i < 20; i++) {
  initialTodos.push({
    id: nextId++,
    text: 'Todo #' + (i + 1)
  });
}

export default function TodoList() {
  const listRef = useRef<HTMLUListElement>(null);
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  /*
   *  `useMemo` tells React that you don’t want the inner function to re-run unless either
   *  todos or filter have changed. React will remember the return value of getFilteredTodos()
   *  during the initial render. During the next renders, it will check if todos or filter 
   *  are different. If they’re the same as last time, useMemo will return the last result 
   *  it has stored. But if they are different, React will call the inner function again 
   *  (and store its result)
   * 
   *    const filter = '';
   *    const visibleTodos = useMemo(() => {
   *      return getFilteredTodos(todos, filter);
   *    
   *    }, [todos, filter]);
   *    
   *    function getFilteredTodos(todos: Todo[], filter: string) {
   *      console.log(filter);
   *      return todos;
   *    }
  */

  function handleAdd() {
    const newTodo = { id: nextId++, text: text };

    // You can force React to update (“flush”) the DOM synchronously. To do this, 
    // import flushSync from react-dom and wrap the state update into a flushSync 
    // call

    // As a result, the last todo will already be in the DOM by the time you try 
    // to scroll to it

    flushSync(() => {
      setText('');
      setTodos([ ...todos, newTodo]);
    });

    if (listRef.current != null && listRef.current.lastElementChild != null) {
      listRef.current.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  return (
    <>
      <button onClick={handleAdd}>
        Add
      </button>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />
      
      <ul ref={listRef}>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </>
  );
}
