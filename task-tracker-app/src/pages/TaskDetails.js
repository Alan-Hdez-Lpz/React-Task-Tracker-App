import { useState, useContext, useEffect } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useParams, useNavigate } from 'react-router';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { toast } from 'react-toastify';

const TaskDetails = () => {
  const { id } = useParams();
  const { tasks, updateTask, deleteTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const task = tasks.find((t) => t.id === id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        completed: task.completed,
      });
    }
  }, [task]);

  if (!task) {
    return <p className="text-center mt-8">Task not found.</p>;
  }

  const validate = () => {
    let tempErrors = {};
    if (!form.title.trim()) tempErrors.title = 'Title is required';
    if (!form.dueDate) tempErrors.dueDate = 'Due date is required';
    else if (isNaN(new Date(form.dueDate).getTime()))
      tempErrors.dueDate = 'Invalid date format';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      updateTask(id, form);
      toast.success('Task updated');
      navigate('/');
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(id);
      toast.info('Task deleted');
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Edit Task</h2>
            <button
            onClick={handleCancel}
            className="text-black hover:text-red-600 text-2xl font-bold"
            title="Close"
            aria-label="Close edit task"
            >
            ✖
            </button>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <FormInput
          label="Title"
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          error={errors.title}
          required
        />
        <FormInput
          label="Description"
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          error={errors.description}
        />
        <FormInput
          label="Due Date"
          id="dueDate"
          name="dueDate"
          type="date"
          value={form.dueDate}
          onChange={handleChange}
          error={errors.dueDate}
          required
        />
        <div className="mb-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="completed"
            name="completed"
            checked={form.completed}
            onChange={handleChange}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <label htmlFor="completed" className="font-semibold">
            Completed
          </label>
        </div>
        <div className="flex justify-between space-x-4">
          <Button type="submit" className="flex-1">
            Save Changes
          </Button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex-1 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600 transition"
          >
            Delete Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskDetails;
