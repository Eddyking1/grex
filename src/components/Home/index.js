import React, { Component } from 'react';
import { compose } from 'recompose';
import Game from '../Game';
import {
  withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';

class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: null,
      loading: false,
    };
  }

  componentDidMount() {
    console.log(this.props.authUser, "home");
    this.setState({loading: true});

    this.props.firebase.users().on("value", snapshot => {
      this.setState({
        users: snapshot.val(),
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    return (
      <div>
        { this.state.users && this.props.authUser ? <div>
          <GameComponent user={this.props.authUser} users={this.state.users}/> </div>: <h1>Website is loading...</h1> }
      </div>
    );
  }
}

const GameComponent = withFirebase(Game);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);
