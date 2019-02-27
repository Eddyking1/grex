import React from 'react';
import {GlobalStyle, FormStyle} from '../../styles/GlobalStyle';


import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';


const AccountPage = () => (
 <AuthUserContext.Consumer>
   {authUser => (
     
     <FormStyle>
     <h1>Account email: {authUser.email}</h1>
       <PasswordChangeForm />
     </FormStyle>
   )}
 </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);

