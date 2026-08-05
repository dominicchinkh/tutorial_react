/*
  To implement a UI in React, you will usually follow the same five steps

  //----------------------------------------------
  Step 1: Break the UI into a component hierarchy

    You can think about splitting up a design into components in different ways

    * Programming:
      Use the same techniques for deciding if you should create a new function or 
      object. One such technique is the separation of concerns, that is, a component
      should ideally only be concerned with one thing
      (https://en.wikipedia.org/wiki/Separation_of_concerns)

      If your JSON is well-structured, you’ll often find that it naturally maps to the
      component structure of your UI

    * CSS:
      Consider what you would make class selectors for

    * Design:
      Consider how you would organize the design’s layers

  //--------------------------------------
  Step 2: Build a static version in React

    To build a static version of your app that renders your data model, you’ll want
    to build components that reuse other components and pass data using *props* 
    (don’t use state)

  //---------------------------------------------------------------
  Step 3: Find the minimal but complete representation of UI state

    Figure out the absolute minimal representation of the state your application needs
    and compute everything else on-demand

    Think of all of the pieces of data:
    * Does it remain unchanged over time? If so, it isn’t state
    * Is it passed in from a parent via props? If so, it isn’t state
    * Can you compute it based on existing state or props in your component? If so, 
      it isn’t state

  //--------------------------------------------
  Step 4: Identify where your state should live

    React uses one-way data flow, passing data down the component hierarchy from 
    parent to child component

    For each piece of state in your application:
    1. Identify every component that renders something based on that state.
    2. Find their closest common parent component - a component above them all in the
      hierarchy.
    3. Decide where the state should live:
      * Often, you can put the state directly into their common parent
      * If you can’t find a component where it makes sense to own the state, create a
        new component solely for holding the state and add it somewhere in the hierarchy
        above the common parent component

  //----------------------------
  Step 5: Add inverse data flow

    To change the state based on user input, you need to support data flowing in the
    opposite direction: child components deep in the hierarchy need to update the
    state living in higher parent components.

    * Pass a callback function (like a state setter) from the parent component 
      down to the child component via props.
    * Inside the child component, execute this passed-down function in response 
      to user events (like an `onChange` or `onClick`).
    * This ensures the parent maintains absolute control over its state, while 
      giving children a safe way to request updates.

*/