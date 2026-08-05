import { useReducer } from 'react';
import AddTask from './AddTask';
import {TaskData, TaskList} from './TaskList';

let nextId = 3;

const initialTasks = [
  { id: 0, text: 'Visit Kafka Museum', done: true },
  { id: 1, text: 'Watch a puppet show', done: false },
  { id: 2, text: 'Lennon Wall pic', done: false }
];

export default function TaskApp() {
  
  // Step 3: Use the reducer from your component

  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  );

  // Step 1: Move from setting state to dispatching actions

  // Instead of telling React “what to do” by setting state, you specify “what 
  // the user just did” by dispatching “actions” from your event handlers

  function handleAddTask(text: string) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task: TaskData) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId: number) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask
        onAddTask={handleAddTask}
      />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

// interface Action
// {
//   type: string,
//   id?: number,
//   text?: string
//   task?: TaskData
// }

// Use a Discriminated Union instead
type Action =
  | { type: 'added'; id: number; text: string }
  | { type: 'changed'; task: TaskData }
  | { type: 'deleted'; id: number };

// Step 2: Write a reducer function

// 1. Declare the current state (tasks) as the first argument
// 2. Declare the action object as the second argument
// 3. Return the next state from the reducer (which React will set the state to)

// Reducers must be pure. Each action describes a single user interaction, even 
// if that leads to multiple changes in the data

function tasksReducer(tasks: TaskData[], action: Action) {
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
