function NewTask({ onAdd }) {
  function handleAddTask(e) {
    e.preventDefault();
    onAdd(e.target.elements.task.value);
    e.target.reset();
  }
  return (
    <div>
      <form onSubmit={handleAddTask}>
        <input type='text' placeholder='Add a new task' name='task' />
        <button type='submit'>Add</button>
      </form>
    </div>
  );
}

export default NewTask;
