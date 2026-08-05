import { createContext, Dispatch, ReactNode, useContext, useReducer } from 'react';

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export type Action =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: Task }
  | { type: 'deleted'; id: number };

// Step 1: Create the context

// Here, we’re passing null as the default value to both contexts. The actual
// values will be provided by the TasksProvider component

const TasksContext = createContext<Task[] | null>(null);

const TasksDispatchContext = createContext<Dispatch<Action> | null>(null);

interface TaskProviderProps
{
  children: ReactNode
}

export function TasksProvider({ children }: TaskProviderProps) {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  // Step 2: Put state and dispatch into context 

  // Take the tasks and dispatch returned by useReducer() and provide them to
  // the entire tree

  return (
    <TasksContext value={tasks}>
      <TasksDispatchContext value={dispatch}>
        {children}
      </TasksDispatchContext>
    </TasksContext>
  );
}

// Functions like useTasks and useTasksDispatch are called Custom Hooks. Your
// function is considered a custom Hook if its name starts with use. This lets
// you use other Hooks, like useContext, inside it

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === null) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}

export function useTasksDispatch() {
  const context = useContext(TasksDispatchContext);
  if (context === null) {
    throw new Error('useTasksDispatch must be used within a TasksProvider');
  }
  return context;
}

function tasksReducer(tasks: Task[], action: Action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks, 
        {
          id: action.id,
          text: action.text,
          done: false
        }
      ];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

const initialTasks = [
  { id: 0, text: 'Philosopher’s Path', done: true },
  { id: 1, text: 'Visit the temple', done: false },
  { id: 2, text: 'Drink matcha', done: false }
];
