import Profile from "./Profile"

// React components are regular JavaScript functions, but their names must 
// start with a capital letter

// React assumes that every component you write is a pure function

// A file can have no more than one default export, but it can have as many 
// named exports as you like

// https://react.dev/learn/importing-and-exporting-components#default-vs-named-exports

export default function Gallery() {

  // if your markup isn’t all on the same line as the return keyword, you 
  // must wrap it in a pair of parentheses. you can write <> and </>

  return (

    // 1. To return multiple elements from a component, wrap them with a 
    //    single parent tag

    // 2. JSX requires tags to be explicitly closed

    // 3. In React, many HTML and SVG attributes are written in camelCase

    <section>
      <h1>Amazing scientists</h1>
      <Profile />
      <Profile />
      <Profile />
    </section>
  );
}
