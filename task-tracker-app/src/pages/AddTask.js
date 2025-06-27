import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import { v4 as uuidv4 } from 'uuid';

const AddTask = () => {
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  const [errors, setErrors] = useState({});

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
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addTask({
        id: uuidv4(),
        title: form.title,
        description: form.description,
        dueDate: form.dueDate,
        completed: false,
      });
      toast.success('Task added successfully');
      navigate('/');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Add New Task</h2>
            <button
            onClick={handleCancel}
            className="text-black hover:text-red-600 text-2xl font-bold"
            title="Close"
            aria-label="Close add task"
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
        <Button type="submit" className="w-full mt-4">
          Add Task
        </Button>
      </form>
    </div>
  );
};

export default AddTask;
