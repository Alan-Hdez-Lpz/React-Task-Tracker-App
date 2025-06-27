import { useContext, useState } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskList from '../components/TaskList';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const toggleComplete = (id) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      updateTask(id, { completed: !task.completed });
      toast.success(`Task marked as ${task.completed ? 'pending' : 'completed'}`);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      toast.info('Task deleted');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Task Dashboard</h1>
      <div className="mb-6 flex space-x-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded ${
            filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded ${
            filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded ${
            filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200'
          }`}
        >
          Pending
        </button>
      </div>
      <TaskList tasks={filteredTasks} onToggleComplete={toggleComplete} onDelete={handleDelete} />
    </div>
  );
};

export default Dashboard;
