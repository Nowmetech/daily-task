
import './App.css';
import Home from './components/home/Home';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Signup from './components/home/Signup';
import Login from './components/Login';
import Task from './components/home/Task';
import TaskPage from './components/home/TaskPage';
import TaskLists from './components/home/TaskLists';
import { GlobalProvider } from './context/globalContext/GlobalContex';
import EditTaskData from './components/home/EditTaskData';
import AdminPanel from './components/admin/AdminPanel';
import AdminEditPanel from './components/admin/AdminEditPanel';
function App() {
  return (

      <GlobalProvider>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/task" element={<Task/>} />
        <Route path="/taskpage" element={<TaskPage/>} />
        <Route path="/tasklist" element={<TaskLists/>} />
        <Route path="/editdata/:id" element={<EditTaskData/>} />
        <Route path="/adminDashboard" element={<AdminPanel/>} />
        <Route path="/adminEditPanel/:id" element={<AdminEditPanel/>} />

        {/*added a comment*/}
      </Routes>
    </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
