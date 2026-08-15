import { ChangeEvent, useState } from 'react';

// You don’t need to extract a custom Hook for every little duplicated bit of code. 
// Some duplication is fine. For example, extracting a useFormInput Hook to wrap a 
// single useState call is probably unnecessary

function useFormInput(initialValue: string) {
  const [value, setValue] = useState<string>(initialValue);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const inputProps = {
    value: value,
    onChange: handleChange
  };

  return inputProps;
}

export default function Form() {
  const firstNameProps = useFormInput('Mary');
  const lastNameProps = useFormInput('Poppins');

  return (
    <>
      <label>
        First name:
        <input {...firstNameProps} />
      </label>
      <label>
        Last name:
        <input {...lastNameProps} />
      </label>
      <p><b>Good morning, {firstNameProps.value} {lastNameProps.value}.</b></p>
    </>
  );
}
