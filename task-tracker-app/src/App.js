import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { TaskProvider } from './context/TaskContext';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import TaskDetails from './pages/TaskDetails';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <TaskProvider>
      <Router>
        <Navbar />
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </TaskProvider>
  );
}

export default App;
