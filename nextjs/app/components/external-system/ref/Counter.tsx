import { useRef } from 'react';

export default function Counter() {

  // When you want a component to “remember” some information, but you don’t want that 
  // information to trigger new renders, you can use a `ref`

  // When you mutate the current value of a ref, it changes immediately

  const ref = useRef(0);

  function handleClick() {

    // You can access the current value of `ref` through the `ref.current` property.
    // This value is intentionally mutable, meaning you can both read and write to it

    // You could point to anything: a string, an object, or even a function

    ref.current = ref.current + 1;
    alert('You clicked ' + ref.current + ' times!');
  }

  return (
    <button onClick={handleClick}>
      Click me!
    </button>
  );
}
