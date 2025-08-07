function Tasks({ tasks, onDelete, onComplete }) {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <input
            type='checkbox'
            checked={task.completed}
            onChange={() => onComplete(task.id)}
          />
          <span>{task.title}</span>
          <button onClick={() => onDelete(task.id)}>🗑️</button>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
