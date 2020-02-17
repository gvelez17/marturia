import React from 'react';
import Header from './Header';

const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      { children }
      {/* TODO: Footer goes here */}
    </div>
  );
};

export default MainLayout;
