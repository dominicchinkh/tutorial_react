import Image from 'next/image';
import { people } from '../data';
import { getImageUrl } from '../utils';

export default function List() {
  const chemists = people.filter(person =>
    person.profession === 'chemist'
  );

  const listItems = chemists.map(person =>

    // You need to give each array item a key — a string or a number that 
    // uniquely identifies it among other items in that array

    <li key={person.id}>

      {/* 
        Standard HTML <img> tags load the full-sized image immediately, 
        which can slow down your site. Next.js provides its own <Image/>
        component that automatically optimizes, resizes, and lazy-loads 
        your images to improve performance.
      */}

      <Image
        src={getImageUrl(person)}
        alt={person.name}

        // Next.js requires you to provide width and height properties to 
        // prevent the layout from shifting as the images load.

        width={100}
        height={100}
      />
      <p>
        <b>{person.name}:</b>
        {' ' + person.profession + ' '}
        known for {person.accomplishment}
      </p>
    </li>

    // When each item needs to render not one, but several DOM nodes, you 
    // need to either group them into a single <div>, or use the <Fragment>
    // syntax

    /*
     * import { Fragment } from 'react';
     *
     * const listItems = people.map(person =>
     *   <Fragment key={person.id}>
     *     <h1>{person.name}</h1>
     *     <p>{person.bio}</p>
     *   </Fragment>
     * );
     */
  );

  return (
    <article>
      <h1>Scientists</h1>
      <ul>{listItems}</ul>
    </article>
  );
}