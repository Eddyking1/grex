import React, { Component } from 'react';
import { compose } from 'recompose';
import Game from '../Game';
import MessagesBase from '../Chat'
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
        <Messages users={this.state.users} />
        { this.state.users && this.props.authUser ? <div>
          <GameComponent userId={this.props.authUser.uid} />
          <Messages users={this.state.users} authUser={this.props.authUser.uid} /> </div>: <h1>Website is loading...</h1> }
      </div>
    );
  }
}

const Messages = withFirebase(MessagesBase);
const GameComponent = withFirebase(Game);

const condition = authUser => !!authUser;

export default compose(
  withFirebase,
  withAuthorization(condition),
)(HomePage);
