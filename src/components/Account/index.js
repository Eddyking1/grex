import React from 'react';
import { AccPage } from './styles';


import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';


const AccountPage = () => (
 <AuthUserContext.Consumer>
   {authUser => (
     
     <AccPage>
     <h1>Account email: {authUser.email}</h1>
       <PasswordChangeForm />
     </AccPage>
   )}
 </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);

