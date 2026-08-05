import { useState } from 'react';

export interface TaskData
{
  id: number,
  text: string,
  done: boolean
}

interface TaskListProps
{
  tasks: TaskData[],
  onChangeTask: (task: TaskData) => void,
  onDeleteTask: (taskId: number) => void
}

export function TaskList({tasks, onChangeTask, onDeleteTask}: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <Task task={task} onChange={onChangeTask} onDelete={onDeleteTask} />
        </li>
      ))}
    </ul>
  );
}

interface TaskProps
{
  task: TaskData,
  onChange: (task: TaskData) => void,
  onDelete: (taskId: number) => void
}

function Task({task, onChange, onDelete}: TaskProps) {
  const [isEditing, setIsEditing] = useState(false);

  let taskContent;
  
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={task.text}
          onChange={(e) => {
            onChange({
              ...task,
              text: e.target.value,
            });
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {task.text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  
  return (
    <label>
      <input
        type="checkbox"
        checked={task.done}
        onChange={(e) => {
          onChange({
            ...task,
            done: e.target.checked,
          });
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </label>
  );
}
