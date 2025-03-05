import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/taskForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center my-4">Task Manager</h1>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/edit-task/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
