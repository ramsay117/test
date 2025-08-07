import { useState } from 'react';

import NewTask from './NewTask';
import Tasks from './Tasks';

function Todo() {
  const [tasks, setTasks] = useState([]);

  function handleAddTask(task) {
    setTasks([...tasks, { id: Date.now(), title: task, completed: false }]);
  }

  function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function handleCompleteTask(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }
  return (
    <div>
      <NewTask onAdd={handleAddTask} />
      <Tasks
        tasks={tasks}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
      />
    </div>
  );
}

export default Todo;
