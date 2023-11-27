import { useContext, useState } from 'react';
import { FaHome, FaList, FaSignInAlt, FaUsers } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';
import {RxAvatar} from 'react-icons/rx';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Sidebar from '../pages/Shared/Sidebar';
import { Outlet } from 'react-router-dom';

function Dashboard() {
  return (
    <div className='position-relative dashboard d-md-flex justify-content-between'>
      <div className="col-md-2 col-sm-12">
        <Sidebar />
      </div>
      <div className="col-md-10 col-sm-12">
        <div className='' style={{ height: '100%' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;