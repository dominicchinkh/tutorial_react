import { Ref, useImperativeHandle, useRef } from 'react';

export interface MyInputHandle {
  focus: () => void;
}

interface MyInputProps {
  ref: Ref<MyInputHandle>;
}

function MyInput({ ref }: MyInputProps) {

  const realInputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => ({

    // Only expose focus and nothing else
    focus() {
      if (realInputRef.current != null) {
        realInputRef.current.focus();
      }
    },
  }));

  // Step 3: MyInput then passes the ref to <input>. Because <input>
  //         is a built-in component React sets the .current property
  //         of the ref to the <input> DOM element

  return <input ref={realInputRef} />;
}

export default function MyForm() {

  // Step 1: a ref is created in the parent component

  const inputRef = useRef<HTMLElement | null>(null);

  function handleClick() {
    if (inputRef.current != null) {
      inputRef.current.focus();
    }
  }

  return (
    <>
      {/* 
        Step 2: `inputRef` is passed to the child component, MyInput 
      */}

      <MyInput ref={inputRef} />

      <button onClick={handleClick}>
        Focus the input
      </button>
    </>
  );
}
