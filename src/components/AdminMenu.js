import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import DeleteUser from '../components/Admindeleteuser';
import ViewAllUsers from '../components/Viewallusers';
import LookupUser from '../components/Adminviewuser';
import CreateUser from '../components/Createuser';
import SetReportStatus from '../components/SetReportStatus';
import {tokenIsStillValid} from '../utils/utils';


const routes = [
  {
    path: "/createuser",
    sidebar: () => <div>Create User</div>,
    main: () => <CreateUser/>
  },
  {
    path: "/viewallusers",
    sidebar: () => <div>View All Users</div>,
    main: () => <ViewAllUsers/>
  },
  {
    path: "/setreportstatus",
    sidebar: () => <div>Manage Reports</div>,
    main: () => <SetReportStatus/>
  }
];


const AdminMenu = () => {

if(!tokenIsStillValid()) {
		return <Redirect to='/login'/>
	}

	const logout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('expiration')
		localStorage.removeItem('role')
		window.location.reload()
	}
return(
	<Router>
      <div class="admin-wrapper">
        <div class="admin-choice-container">
          <ul>
		  {localStorage.getItem('role')==='admin' &&
			<li>
              <Link to="/createuser">Create User</Link>
            </li>
		  }
		 {localStorage.getItem('role')==='admin' &&
            <li>
              <Link to="/viewallusers">View All Users</Link>
            </li>           
		 } 
			<li>
              <Link to="/setreportstatus">Manage Reports</Link>
            </li>
		  <li>
			<Link onClick={logout} to="">Logout</Link>
		   </li>
          </ul>

        
        </div>

        <div class='admin-container'>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default AdminMenu