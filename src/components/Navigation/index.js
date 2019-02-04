import React from 'react';
import { Link } from 'react-router-dom';
import { AuthUserContext } from '../Session';

import {Navbar, Sidebar} from './styles';
import {HamburgerMenu} from '../../styles/Icons';

import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';

const Navigation = (props) => {

  return (
    <Navbar>
      <button name="menu" onClick={props.sidebarToggleClickHandler}><HamburgerMenu/></button>
      <Sidebar open={props.open}>
        <AuthUserContext.Consumer>
          {authUser => authUser ? <NavigationAuth /> : <NavigationNonAuth />}
        </AuthUserContext.Consumer>
      </Sidebar>
    </Navbar>
  );
};

const NavigationAuth = () => (
 <ul>
   <li>
     <Link to={ROUTES.LANDING}>Landing</Link>
   </li>
   <li>
     <Link to={ROUTES.HOME}>Home</Link>
   </li>
   <li>
     <Link to={ROUTES.ACCOUNT}>Account</Link>
   </li>
   <li>
    <Link to={ROUTES.ADMIN}>Admin</Link>
   </li>
   <li>
     <SignOutButton />
   </li>
 </ul>
);

const NavigationNonAuth = () => (
 <ul>
   <li>
     <Link to={ROUTES.LANDING}>Landing</Link>
   </li>
   <li>
     <Link to={ROUTES.SIGN_IN}>Sign In</Link>
   </li>
 </ul>
);

export default Navigation;
