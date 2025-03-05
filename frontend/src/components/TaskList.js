import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <Link to="/add-task" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Add Task</Link>
      {tasks.map(task => (
        <div key={task._id} className="border p-4 mb-2 rounded shadow">
          <h2 className="text-xl font-bold">{task.title}</h2>
          <p>{task.description}</p>
          <p className="text-sm">Status: {task.status}</p>
          <p className="text-sm">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
          <div className="mt-2">
            <Link to={`/edit-task/${task._id}`} className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">Edit</Link>
            <button onClick={() => deleteTask(task._id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
