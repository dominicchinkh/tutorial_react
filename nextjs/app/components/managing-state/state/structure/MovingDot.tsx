import { useState } from 'react';

export default function MovingDot() {

  // if some two state variables always change together, it might be a good idea to 
  // unify them into a single state variable

  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });

  return (
    <div
      onPointerMove={e => {
        setPosition({
          x: e.clientX,
          y: e.clientY
        });
      }}

      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
      }}>

      <div style={{
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: '50%',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: -10,
        top: -10,
        width: 20,
        height: 20,
      }} />
      
    </div>
  )
}
