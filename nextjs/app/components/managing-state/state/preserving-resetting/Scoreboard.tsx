import { useState } from 'react';

export default function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);

  return (
    <div>

      {/* 
        If you want these two Counters to be independent, you can render them in two 
        different positions

        Initially, `isPlayerA` is true. So the first position contains Counter state, 
        and the second one is empty. When you click the “Next player” button the first 
        position clears but the second one now contains a Counter
      */}

      {isPlayerA &&
        <Counter person="Taylor" />
      }
      {!isPlayerA &&
        <Counter person="Sarah" />
      }

      {/* 
        In this example, the two <Counter />s don’t share state even though they appear 
        in the same place in JSX. You can use keys to make React distinguish between 
        any components

          {isPlayerA ? (
            <Counter key="Taylor" person="Taylor" />
          ) : (
            <Counter key="Sarah" person="Sarah" />
          )} 

      */}

      <button onClick={() => {
        setIsPlayerA(!isPlayerA);
      }}>
        Next player!
      </button>
    </div>
  );
}

interface PersonProps
{
  person: string
}

function Counter({ person }: PersonProps) {
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(false);

  let className = 'counter';
  if (hover) {
    className += ' hover';
  }

  return (
    <div
      className={className}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      <h1>{person}&apos;s score: {score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
