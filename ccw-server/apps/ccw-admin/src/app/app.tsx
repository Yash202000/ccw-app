// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Complaintinfo from '../pages/complaint/complaint';
import AdminDashboard from '../pages/dashboard/dashboard';
import MapWithCustomMarker from '../pages/mapLeaflet/mapLeaflet';
import MapComponent from '../pages/mapLeaflet/mapLeaflet';
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
      <Route path={'/'} element={<AdminDashboard />} />
      <Route path={'/complaint'} element={<Complaintinfo />} />
      <Route path={'/mapLeaflet'} element={<MapWithCustomMarker />}/>
      </Routes>
      {/* END: routes */}
    </div>
  );
}

export default App;
