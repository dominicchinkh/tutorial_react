import { ReactNode, useContext } from 'react';
import { LevelContext } from './LevelContext';

interface SectionProps
{
  children: ReactNode
}

export default function Section({ children }: SectionProps) {
  const level = useContext(LevelContext);

  return (
    <section className="section">

      {/* 
        Step 3: Provide the context 

          Wrap the `children` with a context provider to provide the `LevelContext` 
          to them.

          This tells React: “if any component inside this `<Section>` asks for 
          `LevelContext`, give them this `level`.” The component will use the value 
          of the nearest `<LevelContext>` in the UI tree above it.

      */}

      <LevelContext value={level + 1}>
        {children}
      </LevelContext>
    </section>
  );
}
