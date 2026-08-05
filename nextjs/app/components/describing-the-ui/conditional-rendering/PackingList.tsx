// Components can render other components, but you must never nest their 
// definitions. Instead, define every component at the top level

function Item({ name, isPacked }: { name: string, isPacked: boolean }) {
  return (
    <li className="item">
      {/* 
        Conditionally render JSX using JavaScript syntax like if statements,
        &&, and ? : operators 

        Make the left side a boolean
      */}
      {name} {isPacked && '✅'}
    </li>
  );

  // Alternative 1:
  /*
   * return (
   *   <li className="item">
   *     {isPacked ? name + ' ✅' : name}
   *   </li>
   * );
   */

  // Alternative 2:
  /*
   * if (isPacked) {
   *   return <li className="item">{name} ✅</li>;
   * }
   * return <li className="item">{name}</li>;
   */

  // Alternative 3:
  /*
   * let itemContent = name;
   * if (isPacked) {
   *   itemContent = name + " ✅";
   * }
   *
   * return (
   *   <li className="item">
   *     {itemContent}
   *   </li>
   * );
   */
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride&apos;s Packing List</h1>
      <ul>
        <Item
          isPacked={true}
          name="Space suit"
        />
        <Item
          isPacked={true}
          name="Helmet with a golden leaf"
        />
        <Item
          isPacked={false}
          name="Photo of Tam"
        />
      </ul>
    </section>
  );
}