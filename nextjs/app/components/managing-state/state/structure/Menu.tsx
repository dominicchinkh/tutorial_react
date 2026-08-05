import { ChangeEvent, useState } from 'react';

const initialItems = [
  { title: 'pretzels', id: 0 },
  { title: 'crispy seaweed', id: 1 },
  { title: 'granola bar', id: 2 },
];

export default function Menu() {
  const [items, setItems] = useState(initialItems);
  const [selectedId, setSelectedId] = useState(0);

  // ❌ The contents of the selectedItem is the same object as one of the items 
  //    inside the items list. This means that the information about the item itself
  //    is duplicated in two places

  /*
    const [selectedItem, setSelectedItem] = useState(
      items[0]
    );
  */

  const selectedItem = items.find(item =>
    item.id === selectedId
  );

  function handleItemChange(
    id: number, 
    e: ChangeEvent<HTMLInputElement>) 
  {
    setItems(items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          title: e.target.value,
        };
      } else {
        return item;
      }
    }));
  }

  return (
    <>
      <h2>What&apos;s your travel snack?</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              value={item.title}
              onChange={e => {
                handleItemChange(item.id, e)
              }}
            />
            {' '}
            <button onClick={() => {
              setSelectedId(item.id);
            }}>Choose</button>
          </li>
        ))}
      </ul>
      <p>You picked {selectedItem? selectedItem.title: ''}.</p>
    </>
  );
}
