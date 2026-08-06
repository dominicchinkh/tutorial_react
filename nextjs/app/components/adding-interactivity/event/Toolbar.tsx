import { ReactNode, MouseEvent } from 'react';

interface ButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void; // or simply () => void
  children: ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button onClick={e => {

      // If you want to prevent an event from reaching parent components, you 
      // need to call e.stopPropagation()

      onClick(e);
    }}>
      {children}
    </button>
  );
}

interface ToolbarProps {
  onPlayMovie:   () => void;
  onUploadImage: () => void;
}

export default function Toolbar({ onPlayMovie, onUploadImage }: ToolbarProps) {

  // If you click on either button, its onClick will run first, followed by 
  // the parent <div>’s onClick

  // An event “bubbles” or “propagates” up the tree: it starts with where 
  // the event happened, and then goes up the tree

  return (
    <div className="Toolbar" onClick={() => {
      alert('You clicked on the toolbar!');
    }}>
      
      <Button onClick={onPlayMovie}>
        Play Movie
      </Button>

      <Button onClick={onUploadImage}>
        Upload Image
      </Button>

    </div>
  );
}
