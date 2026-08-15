import Image from 'next/image';
import { useRef, useState } from "react";

type Cat = {
  id: number;
  imageUrl: string;
};

export default function CatFriends() {
  const itemsRef = useRef<Map<number, HTMLElement | null> | null>(null);
  const [catList /*, setCatList*/] = useState(setupCatList);

  function scrollToCat(catId: number) {
    const map = getMap();
    const node = map.get(catId);

    if (node != null) {
      node.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }

  function getMap() {
    if (!itemsRef.current) {
      // Initialize the Map on first usage.
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <>
      <nav>
        <button onClick={() => scrollToCat(catList[0].id)}>Neo</button>
        <button onClick={() => scrollToCat(catList[5].id)}>Millie</button>
        <button onClick={() => scrollToCat(catList[8].id)}>Bella</button>
      </nav>
      <div>
        <ul>
          {catList.map((cat) => (
            <li
              key={cat.id}

              // ref callback:
              //   React will call your ref callback with the DOM node when it’s time 
              //   to set the ref, and call the cleanup function returned from the 
              //   callback when it’s time to clear it. This lets you maintain your own 
              //   array or a Map, and access any ref by its index or some kind of ID

              ref={(node) => {
                const map = getMap();
                map.set(cat.id, node);

                return () => {
                  map.delete(cat.id);
                };
              }}
            >
              <Image
                src={cat.imageUrl}
                alt={cat.id}
                width="100"
                height="100"
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function setupCatList() {
  
  const catCount = 10;
  const catList = new Array(catCount)

  for (let i = 0; i < catCount; i++) {
    let imageUrl = '';

    if (i < 5) {
      imageUrl = "https://placecats.com/neo/320/240";
    } else if (i < 8) {
      imageUrl = "https://placecats.com/millie/320/240";
    } else {
      imageUrl = "https://placecats.com/bella/320/240";
    }

    catList[i] = {
      id: i,
      imageUrl,
    };
  }

  return catList;
}