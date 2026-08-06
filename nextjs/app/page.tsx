// By default, every file you create in Next.js is a Server Component. 
// This means the code runs entirely on your server and sends only static,
// finished HTML to the browser

// If you are defining interactivity inside this file, you need to tell 
// Next.js to treat this specific file as a Client Component so it runs in
// the browser

"use client";

import Scoreboard from './components/managing-state/state/preserving-resetting/Scoreboard';

export default function Home() {
  return (
    <div>
      <main className="p-8">

        <Scoreboard
        />

      </main>
    </div>
  );
}
