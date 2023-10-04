// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Complaintinfo from '../pages/complaint/complaint';
import AdminDashboard from '../pages/dashboard/dashboard';
import OrganizationPage from '../pages/organization/organization';
import PostPage from '../pages/post/PostPage';
import styles from './app.module.css';
import NxWelcome from './nx-welcome';

import { Route, Routes, Link } from 'react-router-dom';

export function App() {
  return (
    <div>
      

      {/* START: routes */}
      {/* These routes and navigation have been generated for you */}
      {/* Feel free to move and update them to fit your needs */}
      
     
      <Routes>
      <Route path={'/'} element={<OrganizationPage />} />
      <Route path={'/dashboard'} element={<AdminDashboard />} />
      <Route path={'/complaint'} element={<Complaintinfo />} />
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
