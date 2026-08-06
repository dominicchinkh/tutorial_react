import { useState } from 'react';

let nextId = 0;

interface Artist {
  id: number;
  name: string;
}

export default function List() {
  const [name, setName] = useState('');
  const [artists, setArtists] = useState<Artist[]>([]);

  return (
    <>
      <h1>Inspiring sculptors:</h1>
      
      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      
      <button onClick={() => {
        setArtists(       // Replace the state
          [               // with a new array
            ...artists,   // that contains all the old items
            { id: nextId++, name: name } // and one new item at the end
          ]
        );

        // You can also prepend the item
          /*
          setArtists([
            { id: nextId++, name: name },
            ...artists // Put old items at the end
          ]);
          */

        // You can use the ... array spread syntax together with the slice() 
        // method to insert an item at a particular position that’s neither 
        // at the beginning nor at the end
          /*
          const insertAt = 1;
          
          const nextArtists = [
            // Items before the insertion point:
            ...artists.slice(0, insertAt),
            
            // New item:
            { id: nextId++, name: name },
            
            // Items after the insertion point:
            ...artists.slice(insertAt)
          ];
          */

      }}>
        Add
      </button>

      <button onClick={() => {
        const nextArtists = [...artists];

        // The JavaScript reverse() and sort() methods are mutating the original
        // array, so you can’t use them directly. However, you can copy the array
        // first, and then make changes to it

        // Note: even if you copy an array, you can’t mutate existing items inside 
        // of it directly. This is because copying is shallow - the new array will 
        // contain the same items as the original one

        nextArtists.reverse();
        setArtists(nextArtists);
      }}>
        Reverse
      </button>

      <button onClick={() => {
        
        const nextArtists = artists.map(artist => {
          if (artist.name === 'dominic') {
            // No change
            return artist;

          } else {
            // Return a new name appended with a 'G'
            return {
              ...artist,
              name: artist.name + 'G',
            };
          }
        });
        
        // Re-render with the new array
        setArtists(nextArtists);
      }}>
        Add a G
      </button>

      <ul>
        {artists.map(artist => (
          <li key={artist.id}>
            {artist.name}{' '}
            <button onClick={() => {
              setArtists(

                // Remove an item from an array by filtering it out
                artists.filter(a =>
                  a.id !== artist.id
                )
              );
            }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
