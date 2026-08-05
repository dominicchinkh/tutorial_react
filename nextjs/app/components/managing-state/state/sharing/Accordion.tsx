import { ReactNode, useState } from 'react';

// Sometimes, you want the state of two components to always change together. To do 
// it, remove state from both of them, move it to their closest common parent, and 
// then pass it down to them via props

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <h2>Almaty, Kazakhstan</h2>
      
      <Panel
        title="About"
        isActive={activeIndex === 0}

        // Pass the event handlers down so that the children can change the parent’s
        // state
        onShow={() => setActiveIndex(0)}
      >
        With a population of about 2 million, Almaty is Kazakhstan&apos;s largest city. From 1929 to 1997, it was its capital city.
      </Panel>

      <Panel
        title="Etymology"
        isActive={activeIndex === 1}
        onShow={() => setActiveIndex(1)}
      >
        The name comes from <span lang="kk-KZ">алма</span>, the Kazakh word for &quot;apple&quot; and is often translated as &quot;full of apples&quot;. In fact, the region surrounding Almaty is thought to be the ancestral home of the apple, and the wild <i lang="la">Malus sieversii</i> is considered a likely candidate for the ancestor of the modern domestic apple.
      </Panel>
    </>
  );
}

interface PanelProps {
  title: string;
  children: ReactNode;
  isActive: boolean;
  onShow: () => void;
}

function Panel(
  {title, children, isActive, onShow}: PanelProps
) {
  return (
    <section className="panel">
      <h3>{title}</h3>
      {isActive ? (
        <p>{children}</p>
      ) : (
        <button onClick={onShow}>
          Show
        </button>
      )}
    </section>
  );
}
