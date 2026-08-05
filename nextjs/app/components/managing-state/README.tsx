/*
  Thinking about UI declaratively 
  
  1. Identify your component’s different visual states

  2. Determine what triggers those state changes

     * Changing the text input (human) should switch it from the Empty state to the 
      Typing state or back, depending on whether the text box is empty or not

     * Clicking the Submit button (human) should switch it to the Submitting state

     * Successful network response (computer) should switch it to the Success state

     * Failed network response (computer) should switch it to the Error state with 
      the matching error message

  3. Represent the state in memory using useState

     * Simplicity is key: each piece of state is a “moving piece”, and you want as 
      few “moving pieces” as possible

  4. Remove any non-essential state variables

     * Prevent the cases where the state in memory doesn’t represent any valid UI that
      you’d want a user to see

     * Here are some questions you can ask about your state variables:
       * Does this state cause a paradox?
       * Is the same information available in another state variable already?
       * Can you get the same information from the inverse of another state variable?

  5. Connect the event handlers to set the state

*/

/*
  Principles for structuring state 

  When you write a component that holds some state, you’ll have to make choices about
  how many state variables to use and what the shape of their data should be. There 
  are a few principles that can guide you to make better choices:

  1. Group related state
    * If you always update two or more state variables at the same time, consider 
      merging them into a single state variable

  2. Avoid contradictions in state
    * When the state is structured in a way that several pieces of state may contradict
      and “disagree” with each other, you leave room for mistakes. Try to avoid this

  3. Avoid redundant state
    * If you can calculate some information from the component’s props or its existing 
      state variables during rendering, you should not put that information into that
      component’s state

  4. Avoid duplication in state
    * When the same data is duplicated between multiple state variables, or within 
      nested objects, it is difficult to keep them in sync. Reduce duplication when 
      you can

  5. Avoid deeply nested state
    * Deeply hierarchical state is not very convenient to update. When possible, prefer
      to structure state in a flat way

*/