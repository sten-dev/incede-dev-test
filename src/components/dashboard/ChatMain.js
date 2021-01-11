import React, { Component } from "react";
import socketIO from "socket.io-client";
import { API_URL, SOCKET_PATHS } from "../../constants";
import { exitRoomChats, getDemoChats } from "../../../Service";
import {
  ListGroup,
  ListGroupItem,
  Spinner,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Badge
} from "reactstrap";
import "../../styles/dashboard.scss";
import ChatScreen from "./ChatScreen";
import { Loading } from "../ReuseableComponents";
import ConfirmModal from "../ConfirmModal";

const moment = require("moment");
class ChatMain extends Component {
  socket;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      demoChats: [],
      rooms: [],
      showChatScreen: false,
      selectedRoomId: undefined,
      selectedRoomName: undefined,
      roomJoinedIds: [],
      modal: { isOpen: false },
      isDemo: false
    };
  }
  componentDidMount = async () => {
    let roomJoinedIds = localStorage.getItem("roomJoinedIds");
    this.setState({
      roomJoinedIds: roomJoinedIds ? JSON.parse(roomJoinedIds) : []
    });
    await this.getDemoChats();
    this.initializeSocketIo();
  };
  getDemoChats = async () => {
    this.setState({ isLoading: true });
    let result = await getDemoChats();
    console.log("demo chats", result);
    if (result.success) {
      this.setState({
        demoChats: result.data,
        sLoading: false
      });
    }
  };
  initializeSocketIo = () => {
    // this.setState({ isLoading: true });
    let scope = this;
    this.socket = socketIO.connect(API_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });

    this.socket.on("connect", function () {
      //   console.warn("connected to server");
    });
    this.socket.emit(SOCKET_PATHS.CONNECT_ALL_ROOMS, {});
    this.socket.on(SOCKET_PATHS.GET_ALL_ROOMS, response => {
      let rooms = [];
      response.forEach(d =>
        rooms.push({
          id: d.id,
          title: d.title,
          createdAt: d.createdAt,
          lastInteractAt: d.lastInteractAt
        })
      );
      scope.setState({ rooms: rooms, isLoading: false });
    });
    this.socket.on(SOCKET_PATHS.NEW_ROOMS, response => {
      //   console.log("NEW_ROOMS => ", response);
      let rooms = this.state.rooms;
      let isFound = rooms.find(d => d.id === response.id);
      if (!isFound) scope.setState({ rooms: [response, ...rooms] });
    });
    this.socket.on(SOCKET_PATHS.NEW_ALL_ROOMS, response => {
      //   console.log("NEW_ROOMS => ", response);
      let rooms = this.state.rooms;
      let isFound = rooms.find(d => d.id === response.id);
      if (!isFound) scope.setState({ rooms: [response, ...rooms] });
    });
  };

  refreshRooms = () => {
    let scope = this;
    this.setState({ isLoading: true });
    this.socket.emit(SOCKET_PATHS.CONNECT_ALL_ROOMS, {});
    this.socket.on(SOCKET_PATHS.GET_ALL_ROOMS, response => {
      console.log("rooms", response);
      let rooms = [];
      response.forEach(d =>
        rooms.push({
          id: d.id,
          title: d.title,
          createdAt: d.createdAt,
          lastInteractAt: d.lastInteractAt
        })
      );
      scope.setState({ rooms: rooms, isLoading: false });
    });
  };

  openCloseChatScreen = (roomId, roomName, isDemo) => {
    // this.setState({ isLoading: true });
    this.setState(
      {
        showChatScreen: roomId ? true : false,
        selectedRoomId: roomId,
        selectedRoomName: roomName,
        isDemo: isDemo
      },
      () => this.props.handleRoomChange(this.state.selectedRoomId)
    );
  };

  updateRoomJoinedIds = (roomId, type) => {
    roomId = Number(roomId);
    let roomJoinedIds = this.state.roomJoinedIds;
    if (type === "joined") {
      roomJoinedIds.push(roomId);
      this.setState({ roomJoinedIds: roomJoinedIds });
      //   console.warn('joined', this.state.roomJoinedIds);
    } else {
      roomJoinedIds = roomJoinedIds.filter(d => d !== roomId);
      let rooms = this.state.rooms.filter(d => d.id !== roomId);
      this.setState(
        { roomJoinedIds: roomJoinedIds, rooms: rooms },
        this.openCloseChatScreen,
        this.refreshRooms
      );
    }
    localStorage.setItem("roomJoinedIds", JSON.stringify(roomJoinedIds));
  };

  disconnectChat = async () => {
    // this.setState({ isLoading: true });
    let result = await exitRoomChats({
      roomId: this.state.selectedRoomId
    });
    if (result && result.success) {
      let data = {
        comment: "Our agent has disconnected",
        roomName: this.state.selectedRoomName,
        senderType: "agent",
        roomId: this.state.selectedRoomId
      };
      this.socket.emit(SOCKET_PATHS.CONNECT, data);
      this.updateRoomJoinedIds(this.state.selectedRoomId);
      // this.setState({ isLoading: false });
      //   this.props.navigation.goBack();
    } else {
      // this.props.snackBar.show("Error while exiting room", "error");
      // this.setState({ isLoading: false });
    }
  };

  handelModalCloseOpen = ans => {
    if (ans === true) {
      this.disconnectChat();
    }
    this.setState({ modal: { isOpen: false } });
  };

  getTimes = date => {
    return moment
      .utc(date)
      .local()
      .format("Do MMM, YYYY HH:mm");
  };

  // for demo only ... need to remove
  getBG = name => {
    if (name.includes("session-1583828603926")) return "red-chat text-white demo";
    if (name.includes("session-1583840790252")) return "green-chat text-white demo";
    if (name.includes("session-1583840080456")) return "yellow-chat text-white demo";
    return "";
  };

  getRandomArbitrary = (min = 1, max = 5) => {
    return Number((Math.random() * (max - min) + min).toFixed());
  };

  getStartTime = value => {
    return moment()
      .subtract(value, "minute")
      .format("Do MMM, YYYY HH:mm");
  };
  getLastIntTime = (maxValue = 1) => {
    let value = this.getRandomArbitrary(1, maxValue);
    return moment()
      .subtract(value, "minute")
      .format("Do MMM, YYYY HH:mm");
  };

  render() {
    console.log("roomsJoined", this.state.roomJoinedIds);
    return (
      <React.Fragment>
        <div className="chat-main">
          <Breadcrumb className="custom-breadcrumb">
            {!this.state.showChatScreen ? (
              <>
                <span>Active Sessions</span>
                <img
                  alt="refresh"
                  className="pointer"
                  onClick={this.refreshRooms}
                  src={require("../../img/refresh.svg")}
                />
              </>
            ) : (
                <>
                  <span
                    onClick={() => this.openCloseChatScreen()}
                    style={{ color: "#18a88c", display: "flex" }}
                    className="pointer"
                  >
                    <img
                      alt="back"
                      className="pointer"
                      src={require("../../img/chevron-left.svg")}
                    />
                    Back
                </span>
                  <span style={{ color: "#5c4abb", fontSize: "15px" }}>
                    {this.state.selectedRoomName}
                  </span>
                  {this.state.roomJoinedIds.find(
                    roomId => roomId === this.state.selectedRoomId
                  ) && (
                      <Button
                        color="link"
                        style={{ color: "#ff6347", padding: 0 }}
                        onClick={() => this.setState({ modal: { isOpen: true } })}
                      >
                        DISCONNECT
                      </Button>
                    )}
                </>
              )}
          </Breadcrumb>
          <div className="room-list">
            {this.state.isLoading && (
              <div className="text-center">
                <Loading />
              </div>
            )}
            {!this.state.showChatScreen ? (
              <div className="">
                {!this.state.isLoading &&
                  this.state.rooms.length === 0 &&
                  this.state.demoChats.length === 0 && (
                    <div className="text-center">
                      {" "}
                      No Active Sessions found{" "}
                    </div>
                  )}
                <ListGroup className="">
                  {this.state.rooms.map(room => (
                    <ListGroupItem
                      key={room.id}
                      onClick={() =>
                        this.openCloseChatScreen(room.id, room.title, "false")
                      }
                      className="pointer "
                      action
                    >
                      <div className="title">
                        {room.title}
                        {this.state.roomJoinedIds.find(
                          roomId => roomId === room.id
                        ) && (
                            <div>
                              <Badge color="primary" pill>
                                Live
                            </Badge>
                            </div>
                          )}
                      </div>
                      <div style={{ fontSize: "12px" }}>
                        <div>
                          Start Time :{" "}
                          <span>{this.getTimes(room.createdAt)}</span>
                        </div>
                        {room.lastInteractAt && (
                          <div>
                            Last Interacted Time :{" "}
                            <span>{this.getTimes(room.lastInteractAt)}</span>
                          </div>
                        )}
                      </div>
                    </ListGroupItem>
                  ))}

                  {this.state.demoChats.map(room => {
                    let ranNumber = this.getRandomArbitrary();
                    let startTime = this.getStartTime(ranNumber);
                    let lastInteractTime = this.getLastIntTime(ranNumber);
                    return (
                      <ListGroupItem
                        key={room.ID}
                        onClick={() =>
                          this.openCloseChatScreen(room.ID, room.RNAME, true)
                        }
                        className={"pointer " + this.getBG(room.RNAME)}
                        action
                      >
                        {room.RNAME}
                        <div style={{ fontSize: "12px" }}>
                          <div>
                            start time : <span>{startTime}</span>
                            {/* <span>{this.getTimes(room.CREATED_DATE)}</span> */}
                          </div>
                          {room.AGENT_ETIME && (
                            <div>
                              last interact time :{" "}
                              <span>{lastInteractTime}</span>
                              {/* <span>{this.getTimes(room.AGENT_ETIME)}</span> */}
                            </div>
                          )}
                        </div>
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </div>
            ) : (
                <ChatScreen
                  isDemo={this.state.isDemo}
                  roomId={this.state.selectedRoomId}
                  roomName={this.state.selectedRoomName}
                  socket={this.socket}
                  updateRoomJoinedIds={this.updateRoomJoinedIds}
                  roomJoined={
                    this.state.roomJoinedIds.find(
                      roomId => roomId === this.state.selectedRoomId
                    )
                      ? true
                      : false
                  }
                />
              )}
          </div>
        </div>
        <ConfirmModal
          isOpen={this.state.modal.isOpen}
          handelCloseOpen={ans => this.handelModalCloseOpen(ans)}
          title="Leaving the session"
        >
          Do you want to end session?
        </ConfirmModal>
      </React.Fragment>
    );
  }
}

export default ChatMain;
