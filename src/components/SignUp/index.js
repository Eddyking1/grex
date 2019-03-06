import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { FormStyle } from '../../styles/GlobalStyle';
import {SignUpIcon} from '../../styles/Icons';

const SignUpPage = () => (
  <div>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  position: {latitude: "59.32", longitude: "18.06"},
  passwordOne: '',
  passwordTwo: '',
  online: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = {...INITIAL_STATE};
  }

  onSubmit = event => {
    const {username, email, passwordOne, position, online } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            position,
            online,
            hasEggID: false
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({error});
      })

    event.preventDefault();
  };

  onChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return(
      <FormStyle>
      <form onSubmit={this.onSubmit}>
      <SignUpIcon/>

        <input name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isInvalid} type="submit">Sign Up!</button>

        {error && <p>{error.message}</p>}
      </form>
      </FormStyle>
    );
  }
}

const SignUpLink = () => (
  <p>
    Don´t have an account? <Link to={ROUTES.SIGN_UP}> <span> Sign Up! </span></Link>
  </p>
);

const SignUpForm = compose (
  withRouter,
  withFirebase
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink };
