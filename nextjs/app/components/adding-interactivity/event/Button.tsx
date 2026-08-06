export default function Button() {

  // By convention, it is common to name event handlers as handle followed 
  // by the event name

  function handleClick() {
    alert('You clicked me!');
  }

  return (
    <button onClick={handleClick}>
      Click me
    </button>
  );

  // Alternative 1
    // <button onClick={function handleClick() {
    //   alert('You clicked me!');
    // }}>

  // Alternative 2
    // <button onClick={() => {
    //   alert('You clicked me!');
    // }}></button>


}