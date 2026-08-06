import Image from 'next/image';
import { useState } from 'react';
import { sculptureList } from '../data';

export default function Gallery() {
  
  //-----------------------------------------------------------------------
  // In React, useState, as well as any other function starting with “use”, 
  // is called a Hook

  // Hooks can only be called at the top level of your components or your 
  // own Hooks.

  // State is isolated and private. State is local to a component instance 
  // on the screen. Unlike props, state is fully private to the component 
  // declaring it

  // You should treat any JavaScript object that you put into state as 
  // read-only

  //-----------------------------------------------------------------------
  // Trigger -> render -> commit

  // Step 1: Trigger a render
  //   There are two reasons for a component to render:
  //   1. It’s the component’s initial render.
  //   2. The component’s (or one of its ancestors’) state has been updated.

  // Step 2: React renders your components 
  //   This process is recursive: if the updated component returns some 
  //   other component, React will render that component next

  // Step 3: React commits changes to the DOM
  //   React only changes the *DOM nodes* if there’s a difference between 
  //   renders

  //-----------------------------------------------------------------------
  // Unlike regular JavaScript variables, React state behaves more like a 
  // snapshot. Setting it does not change the state variable you already 
  // have, but instead triggers a re-render
  
  // For example:
    // console.log(count);  // 0
    // setCount(count + 1); // Request a re-render with 1
    // console.log(count);  // Still 0!

  // Updating the same state multiple times before the next render
  //    instead of passing the next state value like setNumber(number + 1), 
  //    you can pass a function that calculates the next state based on the 
  //    previous one in the queue, like setNumber(n => n + 1)

  const [index, setIndex] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const hasNext = index < sculptureList.length - 1;

  function handleNextClick() {
    if (hasNext) {
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }

  function handleMoreClick() {
    setShowMore(!showMore);
  }

  const sculpture = sculptureList[index];
  return (
    <>
      <button onClick={handleNextClick}>
        Next
      </button>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <h3>
        ({index + 1} of {sculptureList.length})
      </h3>
      <button onClick={handleMoreClick}>
        {showMore ? 'Hide' : 'Show'} details
      </button>
      {showMore && <p>{sculpture.description}</p>}
      <Image
        src={sculpture.url}
        alt={sculpture.alt}
        width="100"
        height="100"
      />
    </>
  );
}
