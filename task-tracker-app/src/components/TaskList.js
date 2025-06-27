import TaskCard from './TaskCard';

const TaskList = ({ tasks, onToggleComplete, onDelete }) => {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500 mt-8">No tasks to show</p>;
  }
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
