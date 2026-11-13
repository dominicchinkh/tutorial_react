import { Ref, useImperativeHandle, useRef } from 'react';

export interface MyInputHandle {
  focus: () => void;
}

interface MyInputProps {
  ref: Ref<MyInputHandle>;
}

function MyInput({ ref }: MyInputProps) {

  const realInputRef = useRef<HTMLInputElement | null>(null);

  /*
   * By default, when a parent passes a ref to a child, that ref points directly to 
   * the child's DOM node (like an <input> or <div>). This breaks component 
   * encapsulation because the parent can now access or modify anything inside that 
   * DOM node
   *
   * useImperativeHandle solves this by letting you restrict what the parent can do,
   * exposing only specific methods (like focus(), reset(), or scrollTo()) while keeping
   * the rest of the child's internals private
   */

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

      // Under the hood, this triggers the custom function we wrote inside 
      // useImperativeHandle
      
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
