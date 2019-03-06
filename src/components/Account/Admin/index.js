import React, { Component } from "react";
import { withAuthorization } from "../Session";
import styled from "styled-components";

const AdminStyle = styled.div`
  overflow: none;
  display: flex;
  justify-content: center;
  text-aling: center;
  padding: 20px;
  background: var(--menu-color);
  height: 100vh;
`;

const AdminText = styled.div`
  display: flex;
  width: 80vw;
  margin: 15px;
  padding: 10px;
  border: 1px solid;
  border-radius: 15px 5px 30px;
  color: var(--nav-text-color);
  flex-direction: row;
  img {
    display: flex;
    margin: 10px;
    align-content: center;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: auto;
  }
`;

const Players = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 10px;
  padding: 10px 0px;
  background-color: var(--nav-text-color);
  color: white;
  border: 1px solid var(--nav-text-color);
  border-radius: 20px;
  p {
    text-align: center;
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-items: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--nav-text-color);
  padding-bottom: 10px;
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
      <AdminStyle>
        {loading && <div>Loading ...</div>}
        <UserList users={users} />
      </AdminStyle>
    );
  }
}

const UserList = ({ users }) => (
  <div>
    <Head>
      <h1>Leaderboard</h1>
      <Players>
        <p>Total players: {users.length}</p>
      </Players>
      <Players>
        <p>Players online: {users.online ? users.online : "0"}</p>
      </Players>
    </Head>
    {users.map(user => (
      <AdminText>
        <img src={require("../../assets/player.png")} alt="picture of user" />
        <div key={user.uid}>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Highscore:</strong> {user.highscore ? user.highscore : "0"}
          </p>

          <p>
            <strong>Distance:</strong> {user.traveled ? user.traveled : "0"}{" "}
            <strong> M </strong>
          </p>
        </div>
      </AdminText>
    ))}
  </div>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AdminPage);
