const TaskItem = ({ task, onDelete }) => {
    return (
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold">{task.title}</h2>
        <p>{task.description}</p>
        <p className="text-sm">Status: {task.status}</p>
        <p className="text-sm">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
        <div className="mt-2">
          <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
        </div>
      </div>
    );
  };
  
export default TaskItem;
  