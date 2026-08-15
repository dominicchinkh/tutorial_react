import { useState, useRef, useEffect } from 'react';

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {

    /*
     * When VideoPlayer is called for the first time, its DOM does not exist yet! 
     * There isn’t a DOM node yet to call play() or pause() on, because React doesn’t 
     * know what DOM to create until you return the JSX
     *
     * The solution here is to wrap the side effect with useEffect to move it out of 
     * the rendering calculation:
     */

    if (isPlaying) {
      if (ref.current != null) {
        ref.current.play();
      }
    } else {
      if (ref.current != null) {
        ref.current.pause();
      }
    }

  }, [isPlaying]);

  return (
    <>
      <button onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      
      <video 
        ref={ref} 
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        loop playsInline 
      />;
    </>
  );
}