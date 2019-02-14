import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

import {Navbar, Sidebar, Overlay, NavigationExit} from './styles';
import {HamburgerMenu} from '../../styles/Icons';
import {NavCross} from '../../styles/Icons';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = (props) => {

  return (
    <Navbar>
      <button name="menu" onClick={props.sidebarToggleClickHandler}><HamburgerMenu/></button>
      <Sidebar onClick={props.sidebarToggleClickHandler} open={props.open}>
        <Overlay open={props.open}>
          <AuthUserContext.Consumer>
            {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
          </AuthUserContext.Consumer>
        </Overlay>
      </Sidebar>
    </Navbar>
  );
};

const NavigationAuth = () => (
 <ul>
   <NavigationExit><NavCross/></NavigationExit>
   <li>
     <Link to={ROUTES.HOME}>
       <img src={require("../../assets/ball-spotted.png")} alt="app logo"/>
       <h3>PLAY</h3>
     </Link>
   </li>
   <li>
    <Link to={ROUTES.ADMIN}>Dashboard</Link>
   </li>
   <li>
     <Link to={ROUTES.ACCOUNT}>My Account</Link>
   </li>
   <SignOutButton />
 </ul>
);

const NavigationNonAuth = () => (
 <ul>
   <NavigationExit><NavCross/></NavigationExit>
   <li>
     <Link to={ROUTES.LANDING}> <img src={require("../../assets/ball-spotted.png")} alt="app logo"/> </Link>
   </li>
   <li>
     <Link to={ROUTES.SIGN_IN}>Sign In</Link>
   </li>
 </ul>
);

export default Navigation;
