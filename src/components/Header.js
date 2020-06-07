import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <div className="header-container">
      <header className="main-header">
        <div className="logo"><p>Testimony Database</p></div>
        <nav className="main-navigation">
          <ul>
            <li>
              <NavLink to="/victims" activeClassName="active">Victims</NavLink>
            </li>
            <li>
              <NavLink to="/submit" activeClassName="active">Submit</NavLink>
            </li>
            <li>
              <NavLink exact to="/" activeClassName="active">About</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
