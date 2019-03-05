import React, { Component } from 'react';
import {Chat, ChatList} from './styles';

class MessagesBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      messages: [],
      limit: 5,
    };
  }

  getEggMessages = () => {
    this.props.firebase.egg(this.props.eggId).child('messages').on('value', snapshot => {
      const messageObject = snapshot.val();

      if (messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key,
        }));

        this.setState({
          messages: messageList,
        });
      } else {
        this.setState({ messages: null });
      }
    });
  }

  componentDidMount() {
    this.getEggMessages();
  }

  componentWillUnmount() {
    this.props.firebase.egg(this.props.eggId).child('messages').off();
  }

  onChangeText = event => {
    this.setState({ text: event.target.value });
  };

  onCreateMessage = (event) => {
    this.props.firebase.egg(this.props.eggId).child('messages').push({
      text: this.state.text,
      userId: this.props.userId,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });

    this.setState({ text: '' });

    event.preventDefault();
  };

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.getEggMessages,
    );
  };

  render() {
    const { users } = this.props;
    const { text, messages, loading } = this.state;
    return (
          <Chat>
            <h2>Egg Chat</h2>
            {!loading && messages && (
              <button type="button" onClick={this.onNextPage}>
                More
              </button>
            )}

            {loading && <div>Loading ...</div>}

            {messages && (
              <MessageList
                messages={messages.map(message => ({
                  ...message,
                  user: users
                    ? users[message.userId]
                    : { userId: message.userId },
                }))}
              />
            )}

            {!messages && <div>There are no messages ...</div>}

            <form
              onSubmit={event =>
                this.onCreateMessage(event)
              }
            >
              <input
                type="text"
                value={text}
                onChange={this.onChangeText}
              />
              <button type="submit">Send</button>
            </form>
          </Chat>
    );
  }
}

const MessageList = ({
  messages,
}) => (
  <ChatList>
    {messages.map(message => (
      <MessageItem
        key={message.uid}
        message={message}
      />
    ))}
  </ChatList>
);

class MessageItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message } = this.props;

    return (
      <li>
          <span>
            <strong>
              {message.user.username || message.user.userId}
            </strong>{' '}
            {message.text}
          </span>
      </li>
    );
  }
}

export default MessagesBase;
