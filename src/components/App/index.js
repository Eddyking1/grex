import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import GlobalStyle from '../../styles/GlobalStyle';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';

class App extends Component {

  state = {
    open: false,
  };

  sidebarToggleClickHandler = (e) => {
      e.preventDefault();
      this.setState(prevState => {
        return {open: !prevState.open};
    });
  };

  sidebarClose = () => {
      this.setState(prevState => {
        return {open: false};
    });
  };

  render() {
    const { open } = this.state;

    return (
       <Router>
         <div>
           <GlobalStyle />
           <Navigation sidebarToggleClickHandler={this.sidebarToggleClickHandler} open={open}/>
           <div onClick={this.sidebarClose}>
             <Route exact path={ROUTES.LANDING} component={LandingPage} />
             <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
             <Route path={ROUTES.SIGN_IN} component={SignInPage} />
             <Route
               path={ROUTES.PASSWORD_FORGET}
               component={PasswordForgetPage}
             />
             <Route path={ROUTES.HOME} component={HomePage} />
             <Route path={ROUTES.ACCOUNT} component={AccountPage} />
             <Route path={ROUTES.ADMIN} component={AdminPage} />
           </div>

         </div>
       </Router>
    );
  };
};

export default withAuthentication(App);
