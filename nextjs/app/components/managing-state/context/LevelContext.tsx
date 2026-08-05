import { createContext } from 'react';

// Step 1: Create the context

// The only argument to `createContext` is the default value. You could pass any 
// kind of value (even an object)

export const LevelContext = createContext(1);
