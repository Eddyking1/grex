import React, { Component } from "react";
import { withFirebase } from "../Firebase";
import { withAuthorization } from "../Session";
import styled from "styled-components";
import { createGlobalStyle } from "styled-components";

const AdminStyle = styled.div`
  overflow: none;
  display: flex;
  justify-content: center;
  text-aling: center;
  padding: 20px;
  background: hsl(225, 70%, 5%);
  height: 100vh;
`;

const AdminText = styled.div`
  display: flex;
  width: 50vw;
  padding: 10px;
  border: 2px solid;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    width: 80vw;
  }

  @media screen and (max-width: 1000px) {
    width: 80vw;
  }
`;

const Players = styled.div`
  display: flex;
  flex-direction: row;

  p {
    display: flex;
    justify-content: flex-end;
    margin: 0 auto;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 10px;
  
  h1 {
    justify-content: center;
    margin: 0 auto;
    text-decoration: underline;
  }
`;

class AdminPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.users().on("value", snapshot => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));

      this.setState({
        users: usersList,
        loading: false
      });
    });
  }

  componentWillUnmount() {
  this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div>
        <h1>Admin</h1>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </div>
    );
  }
}

const UserList = ({ users }) => (
  <div>
    <Head>
      <h1>Leaderboard</h1>
    </Head>
    <Players>
      <p>Total players: {users.length}</p>
      <p>Players online: {users.length}</p>
    </Players>
    {users.map(user => (
      <AdminText >
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Highscore:</strong> {user.highscore ? user.highscore : "0"}
        </p>

        <p>
          <strong>Distance traveled:</strong>{user.traveled ? user.traveled : "0"} <strong>Meters</strong>
        </p>
      </AdminText>
    ))}
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
