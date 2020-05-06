import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './Header.scss';

const Header = () => {
  return (
    <div className="header-container">
    <Navbar expand="lg" className="main-header navbar-dark">
        <Navbar.Brand className="logo" href="#">Testimony Database</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="">
                <li>
          <NavLink className="nav-link"  to="/victims" activeClassName="active">Victims</NavLink>
      </li>
      <li to="/submit" activeClassName="active">
          <NavLink className="nav-link" to="/submit" activeClassName="active">Submit</NavLink>
      </li>
      <li>
          <NavLink className="nav-link"  exact to="/" activeClassName="active">About</NavLink>
      </li>
      <li>
          <NavLink className="nav-link"  exact to="/admin" activeClassName="active">Admin</NavLink>
      </li>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    </div>
  );
};

export default Header;

    //   <header className="main-header">
    //     <div className="logo"><p>Testimony Database</p></div>
    //     <nav className="main-navigation">
    //       <ul>
    //         <li>
    //           <NavLink to="/victims" activeClassName="active">Victims</NavLink>
    //         </li>
    //         <li>
    //           <NavLink to="/submit" activeClassName="active">Submit</NavLink>
    //         </li>
    //         <li>
    //           <NavLink exact to="/" activeClassName="active">About</NavLink>
    //         </li>
    //         <li>
    //           <NavLink exact to="/admin" activeClassName="active">Admin</NavLink>
    //         </li>
    //       </ul>
    //     </nav>
    //   </header>