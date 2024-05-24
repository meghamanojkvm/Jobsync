import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../Pages/Home';
import FindJobs from '../Pages/FindJobs';
import UploadJob from '../Pages/UploadJob';
import MyJobs from '../Pages/MyJobs';
import UpdateJob from '../Pages/UpdateJob';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import JobRole from '../Pages/JobRole';
import ProfilePage from '../Pages/ProfilePage';
import CalendarComponent from '../Pages/Calendar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/FindJobs', element: <FindJobs /> },
      { path: '/UploadJob', element: <UploadJob /> },
      { path: '/MyJobs', element: <MyJobs /> },
      {
        path: '/edit-job/:id',
        element: <UpdateJob />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/api/apply/all-jobs/${params.id}`),
      },
      { path: '/Login', element: <Login /> },
      { path: '/Signup', element: <Signup /> },
      { path: '/JobRole', element: <JobRole /> },
      { path: '/ProfilePage', element: <ProfilePage /> },
      { path: '/Calender', element: <CalendarComponent /> },
    ],
  },
]);

export default router;
