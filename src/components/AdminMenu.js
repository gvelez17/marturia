import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import DeleteUser from '../components/Admindeleteuser';
import ViewAllUsers from '../components/Viewallusers';
import LookupUser from '../components/Adminviewuser';
import CreateUser from '../components/Createuser';


const routes = [
 {
    path: "/deleteuser",
    sidebar: () => <div>Delete User</div>,
    main: () => <DeleteUser/>
  },
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
    path: "/lookupuser",
    sidebar: () => <div>Lookup User</div>,
    main: () => <LookupUser/>
  }
];


const AdminMenu = () => {

return(
	<Router>
      <div class="admin-wrapper">
        <div class="admin-choice-container">
          <ul>
            <li>
              <Link to="/createuser">Create User</Link>
            </li>
            <li>
              <Link to="/lookupuser">View User</Link>
            </li>
            <li>
              <Link to="/viewallusers">View All Users</Link>
            </li>
            <li>
              <Link to="/deleteuser">Delete User</Link>
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