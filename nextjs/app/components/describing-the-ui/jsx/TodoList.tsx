import Image from 'next/image';

const person = {
  name: 'Gregorio Y. Zara',
  theme: {
    backgroundColor: 'black',
    color: 'pink'
  }
};

export default function TodoList() {
  
  /* 
    Use curly braces to add a little JavaScript logic or reference a dynamic property inside 
    the markup 
  */

  return (
    <div style={person.theme}>
      <h1>{person.name}&apos;s Todos</h1>
      <Image
        className="avatar"
        src="https://react.dev/images/docs/scientists/7vQD0fPs.jpg"
        alt="Gregorio Y. Zara"
        width={100}
        height={100}
      />
      <ul>
        <li>Improve the videophone</li>
        <li>Prepare aeronautics lectures</li>
        <li>Work on the alcohol-fuelled engine</li>
      </ul>
    </div>
  );
}
