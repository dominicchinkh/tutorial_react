import Image from 'next/image';
import { ReactNode } from 'react';
import { PersonProps } from '../data';
import { getImageUrl } from '../utils'

interface CardProps
{
  children: ReactNode
}

function Card({ children }: CardProps) {
  return (
    <div className="card">
      {children}
    </div>
  );
}

interface AvatarProps
{
  person: PersonProps,
  size: number
}

function Avatar({ person, size = 100 }: AvatarProps) {

  // You can only use curly braces in two ways inside JSX

  // 1. As text directly inside a JSX tag
  // 2. As attributes immediately following the = sign

  return (
    <Image
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={size}
      height={size}
    />
  );
}

export default function Profile() {
  return (
    <Card>
      {/* 
        Parent component can pass some information to its child components
        by giving them props

        props are immutable. When a component needs to change its props, it 
        will have to “ask” its parent component to pass it different props. 
        Its old props will then be cast aside, and eventually the JavaScript 
        engine will reclaim the memory taken by them

        When you need to respond to the user input, you will need to “set 
        state”

        When you nest content inside a JSX tag, the parent component will 
        receive that content in a prop called children
      */}
      <Avatar
        size={100}
        person={{
          id: 0,
          name: 'Katsuko Saruhashi',
          imageId: 'YfeOqp2',
          profession: 'mathematician',
          accomplishment: 'spaceflight calculations'
        }}
      />
    </Card>
  );
}

// Some components forward all of their props to their children

// Note: Use spread syntax with restraint. If you’re using it in every other
//       component, something is wrong. Often, it indicates that you should
//       split your components and pass children as JSX

// function Profile(props) {
//   return (
//     <div className="card">
//       <Avatar {...props} />
//     </div>
//   );
// }
