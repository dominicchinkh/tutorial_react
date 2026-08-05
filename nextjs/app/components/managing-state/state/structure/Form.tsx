import { ChangeEvent, useState } from 'react';

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const fullName = firstName + ' ' + lastName;

  // ❌ If you can calculate some information from the component’s props or its 
  //    existing state variables during rendering, you should not put that information
  //    into that component’s state

  // const [fullName, setFullName] = useState('');

  /*
    Note: The `color` state variable holds the *first* value of `initialColor`. 
          Further changes to the `initialColor` prop are ignored.
    
    function Message({ initialColor }) {
      const [color, setColor] = useState(initialColor);
  */

  function handleFirstNameChange(e: ChangeEvent<HTMLInputElement>) {
    setFirstName(e.target.value);
    // setFullName(e.target.value + ' ' + lastName);
  }

  function handleLastNameChange(e: ChangeEvent<HTMLInputElement>) {
    setLastName(e.target.value);
    // setFullName(firstName + ' ' + e.target.value);
  }

  return (
    <>
      <h2>Let’s check you in</h2>
      <label>
        First name:{' '}
        <input
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </label>
      <label>
        Last name:{' '}
        <input
          value={lastName}
          onChange={handleLastNameChange}
        />
      </label>
      <p>
        Your ticket will be issued to: <b>{fullName}</b>
      </p>
    </>
  );
}
