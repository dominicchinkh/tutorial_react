import { ReactNode, useContext } from 'react';
import { LevelContext } from './LevelContext';

class HeadingProps
{
  children: ReactNode
}

export default function Heading({ children }: HeadingProps) {

  // Step 2: Use the context
  
  // `useContext` is a Hook. Just like useState and useReducer, you can only call
  // a Hook immediately inside a React component (not inside loops or conditions)

  const level = useContext(LevelContext);

  switch (level) {
    case 1:
      return <h1>{children}</h1>;
    case 2:
      return <h2>{children}</h2>;
    case 3:
      return <h3>{children}</h3>;
    case 4:
      return <h4>{children}</h4>;
    case 5:
      return <h5>{children}</h5>;
    case 6:
      return <h6>{children}</h6>;
    default:
      throw Error('Unknown level: ' + level);
  }
}
