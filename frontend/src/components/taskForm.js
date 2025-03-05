import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TaskForm = () => {
  const [task, setTask] = useState({ title: "", description: "", status: "pending", dueDate: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/tasks/${id}`)
        .then(response => setTask(response.data))
        .catch(error => console.error("Error fetching task:", error));
    }
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/tasks/${id}`, task);
      } else {
        await axios.post("http://localhost:5000/tasks", task);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Task" : "Add Task"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="title" value={task.title} onChange={handleChange} placeholder="Title" required className="w-full p-2 border rounded" />
        <textarea name="description" value={task.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded"></textarea>
        <select name="status" value={task.status} onChange={handleChange} className="w-full p-2 border rounded">
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <input type="date" name="dueDate" value={task.dueDate} onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default TaskForm;
