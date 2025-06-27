import { Link } from 'react-router';

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  return (
    <div className="bg-white shadow rounded p-4 flex justify-between items-center hover:shadow-lg transition">
      <div>
        <Link to={`/task/${task.id}`} className="font-semibold text-lg hover:underline">
          {task.title}
        </Link>
        <p className="text-sm text-gray-600">{task.description}</p>
        <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
        <p className={`mt-1 font-semibold ${task.completed ? 'text-green-600' : 'text-red-600'}`}>
          {task.completed ? 'Completed' : 'Pending'}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onToggleComplete(task.id)}
          className={`px-3 py-1 rounded ${
            task.completed ? 'bg-yellow-400' : 'bg-green-500 text-white'
          } hover:opacity-80 transition`}
        >
          {task.completed ? 'Mark Pending' : 'Mark Complete'}
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 rounded bg-red-500 text-white hover:opacity-80 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
