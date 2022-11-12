import { Link } from 'react-router-dom';
import React,{ useState } from 'react';
import MainHeader from './MainHeader';
import NavLinks from './NavLinks';
import SideDrawer from './SideDrawer';
import './MainNavigation.css';
import Backdrop from '../UIElements/Backdrop';

const MainNavigation = props => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  }
  const closeDrawer = () => {
    setIsDrawerOpen(false);

  }

  return (
    <React.Fragment>
    {isDrawerOpen && <Backdrop onClick={closeDrawer}/>}

      {isDrawerOpen && <SideDrawer>
        <nav className="main-navigation__drawer-nav">
          <NavLinks />
        </nav>
      </SideDrawer>}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">YourPlaces</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
