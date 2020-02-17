import React from 'react';
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <header className="main-header">
        <nav className="main-navigation">
          <ul>
            <li><Link to="/victims">Victims</Link></li>
            <li><Link to="/submit">Submit</Link></li>
            <li><Link to="/">About</Link></li>
            <li><input type="search" placeholder="Search..." /></li>
          </ul>
        </nav>
      </header>
      { children }
      {/* TODO: Footer goes here */}
    </div>
  );
};

export default MainLayout;
