import { useState, ChangeEvent } from 'react';
import Image from 'next/image';

export default function Form() {

  // Using object in state

  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://react.dev/images/docs/scientists/Sd1AgUOm.jpg',
    }
  });

  function handleNameChange(e: ChangeEvent<HTMLInputElement>) {

    // Note: Spread syntax is shallow: it only copies one level deep

    setPerson({
      ...person,
      name: e.target.value
    });
  }

  function handleTitleChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        title: e.target.value
      }
    });
  }

  function handleCityChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: e.target.value
      }
    });
  }

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        image: e.target.value
      }
    });
  }

  // With a single event handler instead of three different ones

  // function handleChange(e) {
  //   setPerson({
  //     ...person,
  //     artwork: {
  //       ...person.artwork,
  //       [e.target.name]: e.target.value
  //     }
  //   });
  // }

  return (
    <>
      <label>
        Name:
        <input
          value={person.name}
          onChange={handleNameChange}
        />
      </label>
      <label>
        Title:
        <input
          value={person.artwork.title}
          onChange={handleTitleChange}
        />
      </label>
      <label>
        City:
        <input
          value={person.artwork.city}
          onChange={handleCityChange}
        />
      </label>
      <label>
        Image:
        <input
          value={person.artwork.image}
          onChange={handleImageChange}
        />
      </label>
      <p>
        <i>{person.artwork.title}</i>
        {' by '}
        {person.name}
        <br />
        (located in {person.artwork.city})
      </p>
      <Image
        src={person.artwork.image}
        alt={person.artwork.title}
        width="100"
        height="100"
      />
    </>
  );
}