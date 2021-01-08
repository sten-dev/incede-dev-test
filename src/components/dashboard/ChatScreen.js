import React, { Component } from "react";
import {
  SOCKET_PATHS,
  USER_ABB,
  IF_USER_IS,
  IGNORE_MSG
} from "../../constants";
import { getRoomChats, joinOrExitRoomChats } from "../../../Service";
import { Spinner, Button } from "reactstrap";
import "../../styles/dashboard.scss";
import send from "../../img/Send.svg";
import { Loading } from "../ReuseableComponents";

let agentMessage = [];

class ChatScreen extends Component {
  socket;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      isLoading: true,
      msg: "",
      joined: this.props.roomJoined,
      isFabLoading: false
    };
  }
  componentDidMount = () => {
    console.log("chat cdm rendered", this.state.joined);

    this.socket = this.props.socket;
    this.getRoomChats();
    if (!this.props.isDemo) {
      this.socketIO();
    }
  };

  socketIO = () => {
    let scope = this;
    this.socket.emit(SOCKET_PATHS.CONNECT, {
      comment: "",
      roomName: this.props.roomName,
      senderType: "agent"
    });
    this.socket.on(SOCKET_PATHS.BOT_RESPONSE, (eventName, response) => {
      if (eventName === IF_USER_IS.watson) {
        let data = response.data;
        if (data && Array.isArray(data)) {
          if (
            response.roomId == scope.props.roomId ||
            response.roomName == scope.props.roomName
          ) {
            let messages = scope.state.messages;
            let id = messages[messages.length - 1]
              ? messages[messages.length - 1].id
              : 0;
            data.forEach(x => {
              if (x.text || x.title) {
                let msg = x.options ? x.title : x.text;
                if (!IGNORE_MSG.includes(msg)) {
                  messages.push({
                    user: USER_ABB[IF_USER_IS.watson],
                    message: x.options ? x.title : x.text,
                    id: id + 1
                  });
                }
              }
            });
            scope.setState({ messages: messages }, scope.scrollToBottom);
          }
        }
      }
      if (eventName === IF_USER_IS.user) {
        let data = response.data;
        let messages = scope.state.messages;
        if (data && !IGNORE_MSG.includes(data)) {
          if (
            response.roomId == scope.props.roomId ||
            response.roomName == scope.props.roomName
          ) {
            messages.push({
              user: USER_ABB[IF_USER_IS.user],
              message: data,
              id:
                (messages[messages.length - 1]
                  ? messages[messages.length - 1].id
                  : 0) + 1
            });
            scope.setState({ messages: messages }, scope.scrollToBottom);
          }
        }
      }
      if (eventName === IF_USER_IS.agent) {
        let data = response.data;
        let messages = scope.state.messages;
        if (data && !IGNORE_MSG.includes(data)) {
          if (
            response.roomId == scope.props.roomId ||
            response.roomName == scope.props.roomName
          ) {
            if (!agentMessage.find(d => d === data))
              messages.push({
                user: USER_ABB[IF_USER_IS.agent],
                message: data,
                id:
                  (messages[messages.length - 1]
                    ? messages[messages.length - 1].id
                    : 0) + 1
              });
            scope.setState({ messages: messages }, scope.scrollToBottom);
          }
        }
      }
    });
  };

  joinRoom = async () => {
    this.setState({ isFabLoading: true });

    if (!this.props.roomId) {
      //   this.props.snackBar.show("Error try again later", "error");
      return;
    }
    let result = await joinOrExitRoomChats({
      roomId: this.props.roomId,
      statusUpdate: "yes"
    });
    if (result && result.success) {
      let data = {
        comment: "You are now chatting with an agent",
        roomName: this.props.roomName,
        senderType: "agent",
        roomId: this.props.roomId
      };
      this.socket.emit(SOCKET_PATHS.CONNECT, data);
      this.setState({ joined: true, isFabLoading: false });
      this.props.updateRoomJoinedIds(this.props.roomId, "joined");
    } else {
      //   this.props.snackBar.show("Error while joining room", "error");
      this.setState({ isFabLoading: false });
    }
  };

  getRoomChats = async () => {
    let result = await getRoomChats({
      roomId: this.props.roomId
    });
    if (result && result.success) {
      let len = result.data.length;
      let messages = [];

      for (let i = len - 1; i >= 0; i--) {
        let data = result.data[i];
        if (data.TEXT && !IGNORE_MSG.includes(data.TEXT))
          messages.push({
            user: USER_ABB[data.USER],
            message: data.TEXT,
            id: -(i - (len - 1))
          });
      }
      this.setState(
        { messages: messages, isLoading: false },
        this.scrollToBottom
      );
    } else {
      this.setState({ isLoading: false });
      //   this.props.snackBar.show(result.message, "error");
    }
  };

  renderFlatListItem = (item, index) => {
    let myMessage = item.user !== USER_ABB[IF_USER_IS.user];

    let isPrevMsgContiguous = this.state.messages[index - 1]
      ? myMessage
        ? this.state.messages[index - 1].user !== USER_ABB[IF_USER_IS.user]
        : this.state.messages[index - 1].user === item.user
      : false;

    let containerStyle = myMessage
      ? styles.myMessageContainer
      : styles.otherMessageContainer;

    containerStyle = isPrevMsgContiguous
      ? { ...containerStyle, marginTop: 2 }
      : containerStyle;

    let messageStyle = myMessage
      ? isPrevMsgContiguous
        ? { ...styles.myMessage, borderRadius: "16px 4px 2px 16px" }
        : styles.myMessage
      : isPrevMsgContiguous
        ? { ...styles.otherMessage, borderRadius: "4px 16px 16px 2px" }
        : styles.otherMessage;
    // let messageStyle = myMessage ? styles.myMessage : styles.otherMessage;
    let textColor = myMessage ? { color: "#fff" } : {};

    return (
      <div key={`chat${index}`} style={containerStyle}>
        <div style={messageStyle}>
          <span style={textColor} dangerouslySetInnerHTML={{ __html: item.message }}>
            {/* {item.message} */}
          </span>
        </div>
      </div>
    );
  };

  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.sendMessage();
    }
  };

  handleMessageChange = event => {
    let eve = { ...event };
    this.setState({
      msg: eve.target.value
    });
  };

  sendMessage = () => {
    agentMessage.push(this.state.msg);
    let data = {
      comment: this.state.msg,
      roomName: this.props.roomName,
      senderType: "agent",
      roomId: this.props.roomId
    };
    this.socket.emit(SOCKET_PATHS.CONNECT, data);
    let messages = this.state.messages;
    messages.push({
      user: USER_ABB["AGENT"],
      message: this.state.msg,
      id: messages[messages.length - 1].id + 1
    });
    this.setState({ messages: messages, msg: "" }, this.scrollToBottom);
  };

  scrollToBottom = () => {
    setTimeout(function () {
      var objDiv = document.getElementById("messages_container");
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 500);
  };

  render() {
    console.log("messages", this.state.messages);

    return (
      <React.Fragment>
        <div className="chat-screen">
          <div className="chat-container" id="messages_container">
            {this.state.isLoading && (
              <div className="text-center">
                <Loading />
              </div>
            )}
            {this.state.messages.filter(x => ["agent_not_available", "welcome_back"].indexOf(x.message) === -1).map(this.renderFlatListItem)}
          </div>
          <div className="send-chat-container">
            {this.state.joined ? (
              <>
                <input
                  type="text"
                  className="chat-textField flex-grow-1"
                  placeholder="Type here .."
                  onChange={this.handleMessageChange}
                  value={this.state.msg}
                  onKeyDown={this.handleKeyDown}
                  autoFocus
                />
                <div className="d-flex send send-msg">
                  <Button
                    disabled={!this.state.msg || this.state.msg.length === 0}
                    color="secondary"
                    onClick={this.sendMessage}
                  >
                    <img alt="send" src={send} />
                  </Button>
                </div>
              </>
            ) : (
                <Button
                  onClick={this.joinRoom}
                  block
                  className="interact"
                  color="primary"
                >
                  {this.state.isFabLoading && <Spinner size="sm" />}
                  Interact
              </Button>
              )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const styles = {
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffc107"
  },

  myMessageContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: 8
  },
  otherMessageContainer: {
    display: "flex",
    marginTop: 8,
    justifyContent: "flex-start"
  },
  myMessage: {
    backgroundColor: "#18a88c",
    borderColor: "#18a88c",
    marginHorizontal: 12,
    minWidth: 96,
    maxWidth: "90%",
    borderRadius: "16px 16px 2px 16px",
    padding: 8
  },
  otherMessage: {
    backgroundColor: "rgb(224, 219, 219)",
    borderColor: "rgb(224, 219, 219)",
    marginHorizontal: 12,
    maxWidth: "90%",
    padding: 8,
    minWidth: 96,
    alignItems: "flex-start",
    borderRadius: "16px 16px 16px 2px"
  }
};

export default ChatScreen;
