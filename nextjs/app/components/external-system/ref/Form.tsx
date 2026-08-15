import { useRef } from 'react';

export default function Form() {

  // You can have more than a single ref in a component
  
  const inputRef = useRef<HTMLInputElement>(null);

  function handleClick() {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }

  return (
    <>
      {/* 
        Pass your ref as the ref attribute to the JSX tag for which you want to get the 
        DOM node 

        Initially, myRef.current will be null. When React creates a DOM node for this 
        <div>, React will put a reference to this node into myRef.current. You can then 
        access this DOM node from your event handlers and use the built-in browser APIs 
        defined on it.
        
      */}
      <input ref={inputRef} />

      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
