import { useState, useRef } from 'react';
function Todo() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Task 1',
      completed: false,
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);
  function handleDelete(id) {
    setTasks((prev) => prev.filter((t) => t.id != id));
  }

  function handleAdd(e) {
    e.preventDefault();
    const { value } = e.target.elements.task;
    setTasks((prev) => [
      ...prev,
      { id: Date.now(), title: value, completed: false },
    ]);
    inputRef.current.value = '';
  }

  function handleCheck(id) {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id == id) {
          return { ...t, completed: !t.completed };
        }
        return t;
      }),
    );
  }

  return (
    <div>
      <form action='' onSubmit={handleAdd}>
        <input type='text' name='task' ref={inputRef} />
        <button type='submit'>Add</button>
      </form>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            onChange={() => handleCheck(task.id)}
            type='checkbox'
            checked={task.completed}
          ></input>
          <span
            style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
          >
            {task.title}
          </span>
          <button onClick={() => handleDelete(task.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default Todo;
