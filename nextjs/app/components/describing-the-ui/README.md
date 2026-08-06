# Thinking in React: 5 Steps to Build a UI

To implement a user interface in React, you will usually follow these five fundamental steps:


## Step 1: Break the UI into a Component Hierarchy

You can approach splitting up a design into components through various lenses:

* **Programming:** Use the same techniques you use for deciding if you should create a new function or object. One key technique is the **Separation of Concerns**: a component should ideally only be concerned with one thing. If your JSON data model is well-structured, you’ll often find that it naturally maps to the component structure of your UI.
* **CSS:** Consider what elements or sections you would create class selectors for.
* **Design:** Consider how you would organize the visual layers in a design tool (e.g., Figma).


## Step 2: Build a Static Version in React

To build a static version of your application that renders your data model:
* Build components that reuse other components and pass data using **props**.
* **Do not use state** at this stage; static versions require interactivity-free rendering.


## Step 3: Find the Minimal but Complete Representation of UI State

Figure out the absolute minimal representation of the state your application needs, and compute everything else on-demand during render.

> **State Checklist (If any of these apply, it isn’t state):**
> 1. **Does it remain unchanged over time?** If so, it isn’t state.
> 2. **Is it passed in from a parent via props?** If so, it isn’t state.
> 3. **Can you compute it based on existing state or props in your component?** If so, it isn’t state.


## Step 4: Identify Where Your State Should Live

React relies on one-way data flow, passing data down the component hierarchy from parent to child. 

**For each piece of state in your application:**
1. Identify **every component** that renders something based on that state.
2. Find their **closest common parent component**—a single component above all of them in the hierarchy.
3. Decide where the state should live:
   * Put the state directly into their **common parent**.
   * If no suitable common parent exists, **create a new component** solely for holding the state and place it higher in the hierarchy above the common parent.


## Step 5: Add Inverse Data Flow

To change state based on user input, you need data to flow in the opposite direction—allowing child components deep in the hierarchy to update state held in higher parent components.

* **Pass a callback function** (such as a state setter) from the parent component down to the child component via props.
* **Execute this function** inside the child component in response to user events (e.g., `onChange`, `onClick`).
* This approach ensures the **parent maintains absolute control** over its state, while providing children with a safe mechanism to request state updates.