import { useState } from 'react';

export default function Counters() {
  const [showB, setShowB] = useState(true);

  return (
    <div>
      {/* 
        Same component at the same position preserves state

        Remember that it’s the position in the UI tree - not in the JSX markup - that 
        matters to React. If you want to preserve the state between re-renders, the 
        structure of your tree needs to “match up” from one render to another
      */}
      <Counter />

      {/* 
        Note: the moment you stop rendering the second counter, its state disappears 
        completely. That’s because when React removes a component, it destroys its 
        state 
      */}
      {showB && <Counter />}

      <label>
        <input
          type="checkbox"
          checked={showB}
          onChange={e => {
            setShowB(e.target.checked)
          }}
        />
        Render the second counter
      </label>
    </div>
  );
}

function Counter() {
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
      <h1>{score}</h1>
      <button onClick={() => setScore(score + 1)}>
        Add one
      </button>
    </div>
  );
}
