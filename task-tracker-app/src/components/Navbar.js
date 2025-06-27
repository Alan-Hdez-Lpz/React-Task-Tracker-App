import { NavLink } from 'react-router';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <NavLink to="/" className="font-bold text-xl">Task Manager</NavLink>
      <NavLink
        to="/add-task"
        className={({ isActive }) =>
          `bg-white text-blue-600 px-3 py-1 rounded hover:bg-blue-100 transition ${
            isActive ? 'font-semibold' : ''
          }`
        }
      >
        Add Task
      </NavLink>
    </nav>
  );
};

export default Navbar;
