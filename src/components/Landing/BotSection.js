import React, { Component } from "react";
import "../../styles/bot.scss";
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  CardImg
} from "reactstrap";
import logo from "../../img/logo_white.svg";
import { ChatPill } from "./bot/ChatPill";
import { ChatPillAsk } from "./bot/ChatPillAsk";
import socketIO from "socket.io-client";
import {
  API_URL,
  SOCKET_PATHS,
  httpClient,
  DEMO_SOCKET_URL,
  IGNORE_MSG,
  MEETING_MSG
} from "../../constants";
import chat from "../../img/chat.svg";
import ChatLocation from "../ChatLocation";
import CallBackForm from "./bot/CallBackForm";
import DiscoverySearchResults from "./bot/DiscoverySearchResults";
import { Loading } from "../ReuseableComponents";
import ConfirmModal from "../ConfirmModal";
class BotSection extends Component {
  roomName = undefined;
  roomId;
  wASessionId;
  isAgentPending = false;
  agentTimeOut = 30 * 1000;
  waTimeOut = 1 * 60 * 60 * 1000; // one hour
  waCreatedTime;
  currentIntent;
  demoSocket = undefined;
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          user: "WA",
          message:
            "Welcome! I am your virtual assistant to help you learn more about Incede's services, locations and experitse with IBM Watson AI",
          type: "text"
        }
      ],
      msg: "",
      isDemo: false,
      shouldConnectApi: true,
      isLoading: true,
      modal: {
        isOpen: false
      }
    };
  }
  componentDidMount = async () => {
    this.roomName = localStorage.getItem("roomName");
    this.roomId = localStorage.getItem("roomId");
    this.wASessionId = localStorage.getItem("wASessionId");
    this.waCreatedTime = localStorage.getItem("waCreatedTime");
    await this.initializeSocketIo();
    await this.initializeDemoSocket();
  };

  componentWillUnmount() {
    this.demoSocket.close();
    this.socket.close();
  }

  handleMessageChange = event => {
    let eve = { ...event };
    this.setState({
      msg: eve.target.value
    });
  };

  checkWASession = () => {
    this.waCreatedTime = localStorage.getItem("waCreatedTime");
    let isInWaSession = true;
    if (!this.waCreatedTime) {
      isInWaSession = false;
      this.resetLocalStorage();
    } else {
      let now = new Date().getTime();
      let createdTime = new Date(Number(this.waCreatedTime)).getTime();
      if (now - createdTime >= this.waTimeOut) {
        isInWaSession = false;
      }
    }
    if (isInWaSession === false) {
      this.roomName = undefined;
      this.roomId = undefined;
      this.wASessionId = undefined;
    } else {
      if (this.state.isDemo) {
        this.roomName = localStorage.getItem("demoRoomName");
        this.roomId = localStorage.getItem("demoRoomId");
        this.wASessionId = localStorage.getItem("demoWASessionId");
      } else {
        this.roomName = localStorage.getItem("roomName");
        this.roomId = localStorage.getItem("roomId");
        this.wASessionId = localStorage.getItem("wASessionId");
      }
    }
  };

  initializeSocketIo = async () => {
    // let scope = this;
    this.socket = socketIO.connect(API_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });
    this.socket.on("connect", function () {
      console.debug("connected to server");
    });
    let messages = [
      {
        user: "WA",
        message:
          "Welcome! I am your virtual assistant to help you learn more about Incede's services, locations and experitse with IBM Watson AI",
        type: "text"
      }
    ];
    let time = new Date().getTime();

    await this.checkWASession();

    if (this.roomId) {
      this.setState({
        isLoading: true
      });
      let chatsResp = await httpClient("chats", "POST", {
        roomId: this.roomId
      });
      if (chatsResp.success === true) {
        let data = chatsResp.data
          .reverse()
          .filter(x => IGNORE_MSG.indexOf(x.TEXT) === -1);
        data.forEach((x, i) => {
          switch (x.TYPE) {
            case "text":
            case "options":
              if (x.TEXT) {
                messages.push({
                  user:
                    x.USER === "WATSON"
                      ? "WA"
                      : x.USER === "AGENT"
                        ? "AG"
                        : "ME",
                  message: x.TEXT,
                  type: x.TYPE === "options" ? "options" : "text",
                  options: x.TYPE === "options" ? JSON.parse(x.OPTIONS) : [],
                  intent: x.intent
                });
              }
              break;
            case "location":
              messages.push({
                user: "WA",
                message: "",
                type: "location",
                options: []
              });
              break;
            case "callback":
              messages.push({ user: "ME", message: "", type: "callback_form" });
              break;
          }
        });
        this.setState(
          {
            messages: messages,
            isLoading: false
          },
          () => {
            this.scrollToBottom();
            // this.sendCustomMessage("welcome_back", false);
          }
        );
      }
    }

    this.socket.emit(SOCKET_PATHS.CONNECT, {
      payload: "",
      roomName: this.roomName ? this.roomName : "session-" + time,
      roomId: this.roomId ? this.roomId : undefined,
      wASessionId: this.wASessionId ? this.wASessionId : undefined
    });

    this.socket.on(SOCKET_PATHS.BOT_RESPONSE, (eventName, response) => {
      if (eventName === "SERVER_CONNECT") {
        console.info("Bot connected, waiting for bot to wake up");
        return;
      }
      if (response.newRoom === true && eventName === "WATSON") {
        if (response.sessionId) {
          if (response.type === "demo") {
            localStorage.setItem("demoWASessionId", response.sessionId);
            localStorage.setItem("demoRoomId", response.roomId);
            localStorage.setItem("demoRoomName", response.roomName);
            this.setState({
              isDemo: true
            });
          } else {
            this.setState({
              isDemo: false
            });
            localStorage.setItem("waCreatedTime", new Date().getTime());
            localStorage.setItem("wASessionId", response.sessionId);
            localStorage.setItem("roomId", response.roomId);
            localStorage.setItem("roomName", response.roomName);
          }
          this.roomName = response.roomName;
          this.roomId = response.roomId;
          this.wASessionId = response.sessionId;
        } else {
          console.error(response);
        }
      }

      if (eventName === "WATSON") {
        this.isAgentPending = false;
        if (response.intent === "location") {
          let messages = [...this.state.messages];
          messages.push({
            user: "WA",
            message: "",
            type: "location",
            options: []
          });

          this.setState(
            {
              messages: messages,
              isLoading: false
            },
            () => {
              let data = [...response.data];
              data.splice(0, 1);
              response.data = data;
              this.pushWAMessage(response);
            }
          );
        } else if (response.intent === "agent") {
          this.isAgentPending = true;
          this.pushWAMessage(response);
          setTimeout(() => {
            if (this.isAgentPending) {
              this.setState({ isLoading: false });
              this.sendCustomMessage("agent_not_available", false);
            }
          }, this.agentTimeOut);
          setTimeout(() => {
            if (this.isAgentPending) {
              let messages = [...this.state.messages];
              messages.push({
                user: "WA",
                message: "Our agents are assisting others. Please hold on.",
                type: "text",
                options: [],
                intent: undefined
              });
              this.setState(
                {
                  messages,
                  isLoading: false
                },
                this.scrollToBottom
              );
            }
          }, this.agentTimeOut / 3);
        } else if (
          response.type === "demo" &&
          response.intent === "exit_demo"
        ) {
          this.resetLocalStorage(true);
          this.roomId = localStorage.getItem("roomId");
          this.roomName = localStorage.getItem("roomName");
          this.wASessionId = localStorage.getItem("wASessionId");
          this.setState({
            isDemo: false
          });
          let data = {
            comment: "completed demo",
            wASessionId: this.wASessionId,
            user: "user",
            roomName: this.roomName,
            roomId: this.roomId
          };
          this.socket.emit(SOCKET_PATHS.CONNECT, data);
        } else {
          this.pushWAMessage(response);
        }
      } else if (eventName === "AGENT") {
        this.isAgentPending = false;
        let data = response.data;
        let messages = this.state.messages;
        if (data) {
          messages.push({
            user: "AG",
            message: response.data
          });
          this.setState(
            { messages: messages, isLoading: false },
            this.scrollToBottom
          );
        }
      } else {
        if (response && response.shouldAddToMessages && response.comment && response.comment.trim().length > 0) {
          let messages = [...this.state.messages];
          messages.push({ user: "ME", message: response.comment.trim(), type: "text" });
          this.setState({
            messages: messages
          })
        }
        console.warn(eventName, response);
      }
    });
  };

  resetLocalStorage = isDemo => {
    localStorage.removeItem("demoProperty");
    localStorage.removeItem("demoWASessionId");
    localStorage.removeItem("demoRoomId");
    localStorage.removeItem("demoRoomName");
    if (isDemo !== true) {
      localStorage.removeItem("waCreatedTime");
      localStorage.removeItem("wASessionId");
      localStorage.removeItem("roomId");
      localStorage.removeItem("roomName");
    }
  };
  pushWAMessage = response => {
    let data = response.data;
    let shouldUpdate = true;
    if (data && Array.isArray(data)) {
      let messages = [...this.state.messages];
      let isSearchResponse = data.findIndex(x => x.response_type === "search");
      if (isSearchResponse && isSearchResponse === data.length - 1) {
        data = data.reverse();
      }
      data.forEach(x => {
        if (x.response_type === "search") {
          if (x.results && x.results.length > 0) {
            messages.push({
              user: "WA",
              message: x.header,
              data: x.results.filter(x => x.title !== "Cookie Policy | Incede"),
              type: "search-result"
            });
          } else {
            messages.push({
              user: "WA",
              message: "I didn't understand. Please try again",
              type: "text"
            });
          }
        } else if (x.response_type === "suggestion") {
          if (
            x.suggestions &&
            x.suggestions.length > 0 &&
            x.suggestions[0].output &&
            x.suggestions[0].output.generic &&
            x.suggestions[0].output.generic.length > 0
          ) {
            messages.push({
              user: "WA",
              message: "Did you mean?",
              type: "options",
              options: x.suggestions.map(x => {
                return {
                  label: x.label,
                  value: {
                    input: {
                      text: x.label
                    }
                  }
                };
              }),
              intent: response.intent
            });
            // .filter(x => x.label.toLowerCase().indexOf("none of these") === -1)
            // shouldUpdate = false;
            // this.pushWAMessage({ data: x.suggestions[0].output.generic });
          }
        } else if (x.text || x.title || (x.options && x.options.length > 0)) {
          messages.push({
            user: "WA",
            message: x.options ? x.title : x.text,
            type: x.options ? "options" : "text",
            options: x.options || [],
            intent: response.intent
          });
          if (x.text && x.text === MEETING_MSG) {
            messages.push({ user: "ME", message: "", type: "callback_form" });
          }
        } else if (x.response_type === "image") {
          messages.push({
            user: "WA",
            message: "",
            type: x.response_type,
            options: [],
            intent: response.intent,
            source: x.source
          });
        }
      });
      if (shouldUpdate)
        this.setState(
          {
            messages,
            isLoading: false
          },
          this.scrollToBottom
        );
    }
  };

  send = () => {
    if (this.state.msg && this.state.msg.length > 0) {
      this.sendCustomMessage(this.state.msg, true);
      this.setState({ isLoading: true });
    }
  };

  exitWADemo = () => {
    this.resetLocalStorage(true);
    if (this.demoSocket) {
      this.demoSocket.close();
    }
    // setTimeout(() => {
    this.setState(
      {
        isDemo: false
      },
      () => {
        this.sendCustomMessage("user_demo_exit_done", false);
      }
    );
    // }, 500);
  };

  resetDemo = () => {
    this.resetLocalStorage();
    // this.demoSocket = undefined;
    this.demoSocket.close();
    this.sendCustomMessage("", true);
    this.setState({
      messages: [
        {
          user: "WA",
          message:
            "Welcome! I am your virtual assistant to help you learn more about Incede's services, locations and experitse with IBM Watson AI",
          type: "text"
        }
      ]
    });
  };

  sendCustomMessage = (msg, shouldAddToMessages) => {
    this.checkWASession();
    let data = {
      comment: msg,
      wASessionId: this.wASessionId,
      roomName: this.roomName
        ? this.roomName
        : "session-" + new Date().getTime(),
      roomId: this.roomId,
      type: this.state.isDemo ? "demo" : "chat",
      demoProperty: this.state.isDemo
        ? localStorage.getItem("demoProperty")
        : undefined
    };

    this.sendMessage(data, msg, shouldAddToMessages);
  };

  handleOnOptionClick = (message, optionIndex) => {
    let option = message.options[optionIndex];
    let type = "chat";
    let isDemoUpdate = false;
    let comment = option.value.input.text;
    if (option.value.input.text.toLowerCase() === "launch demo") {
      if (
        message.intent &&
        message.intent.toLowerCase() === "customer_service"
      ) {
        type = "demo";
        localStorage.setItem("demoProperty", "Customer Service");
      } else if (
        message.intent &&
        message.intent.toLowerCase() === "pizza_ordering"
      ) {
        type = "demo";
        localStorage.setItem("demoProperty", "Pizza Ordering");
      } else if (message.intent && message.intent.toLowerCase() === "banking") {
        type = "demo";
        localStorage.setItem("demoProperty", "Banking");
      } else if (message.intent && message.intent.toLowerCase() === "covid-19") {
        type = "demo";
        localStorage.setItem("demoProperty", "Covid-19");
      }
      if (type === "demo") {
        this.wASessionId = undefined;
        this.roomId = undefined;
        isDemoUpdate = true;
        comment = "";
        this.roomName = "session-" + new Date().getTime();
      }
    }
    if (message.intent === "demo_done" && comment.toLowerCase() === "yes") {
      comment = "talk to agent";
    }
    this.setState(
      {
        isDemo: type === "demo" && isDemoUpdate ? true : this.state.isDemo
      },
      () => {
        let isAdd = true;
        if (type === "demo" && isDemoUpdate) {
          isAdd = false;
        }
        // if (message.message && message.message.toLowerCase() == "contact us" && comment.toLowerCase() === "cancel") {
        //   comment = "What we do";
        //   isAdd = false
        // }
        let data = {
          comment: comment,
          wASessionId: this.wASessionId,
          user: "user",
          roomName: this.roomName,
          roomId: this.roomId,
          type: type,
          demoProperty:
            type === "demo" ? localStorage.getItem("demoProperty") : undefined,
          intent: message.intent
        };

        this.sendMessage(data, comment, isAdd);
      }
    );
  };

  initializeDemoSocket = () => {
    this.demoSocket = socketIO.connect(DEMO_SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5
    });
    this.demoSocket.on("connect", function () {
      console.debug("demo socket connected to server");
    });
    this.demoSocket.on("chat message", message => {
      let data = message;
      let session_id = localStorage.getItem("demoWASessionId");
      let messages = [...this.state.messages];
      if (data.success === undefined) {
        if (!session_id || session_id === data.session_id) {
          localStorage.setItem("demoWASessionId", data.session_id);
          if (data && data.context && data.context.skills) {
            data.output.generic.forEach(x => {
              if (x.text || x.title) {
                messages.push({
                  user: "WA",
                  message: x.options ? x.title : x.text,
                  type: x.options ? "options" : "text",
                  options: x.options || []
                });
              }
            });
          }
        }
      } else {
        if (!session_id || session_id === data.session_id) {
          if (data.message && (!data.type || data.type != "user")) {
            messages.push({
              user: data.type === "user" ? "US" : "WA",
              message: data.message
            });
          }
        }
      }
      this.setState(
        {
          messages,
          msg: "",
          isLoading: false
        },
        this.scrollToBottom
      );
    });
  };

  sendMessage = (data, message, shouldAddToMessages) => {
    let messages = [...this.state.messages];
    let demoProperty = localStorage.getItem("demoProperty");
    if (this.state.isDemo && demoProperty === "Customer Service") {
      if (!this.demoSocket) {
        this.resetLocalStorage(true);
        this.demoSocket.connect();
        // this.initializeDemoSocket();
      } else if (!data.wASessionId) {
        this.demoSocket.connect();
      }
      let demoWASessionId = localStorage.getItem("demoWASessionId");
      this.demoSocket.emit("chat message", {
        payload: data.comment,
        params: { session_id: demoWASessionId },
        user: "user"
      });
      data.demoProperty = demoProperty;
    } else {
      data.demoProperty = demoProperty;
      data.type = this.state.isDemo === true ? "demo" : "chat";

      data.shouldAddToMessages = shouldAddToMessages;
      if (!data.intent) {
        let lastMessage = this.state.messages[this.state.messages.length - 1];
        data.intent = lastMessage.message;
      }
      this.socket.emit(SOCKET_PATHS.CONNECT, data);
    }

    if (shouldAddToMessages && data && data.demoProperty === "Customer Service") {
      messages.push({ user: "ME", message: message, type: "text" });
    }

    // if (shouldAddToMessages) {
    //   messages.push({ user: "ME", message: message, type: "text" });
    // }
    this.setState(
      {
        messages,
        msg: "",
        isLoading: true
      },
      this.scrollToBottom
    );
  };

  scrollToBottom = () => {
    setTimeout(function () {
      var objDiv = document.getElementById("messages_container");
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 500);
  };
  handleKeyDown = event => {
    if (event.key === "Enter") {
      this.send();
    }
  };

  getChatUiByType = (data, index, lastWAIndex) => {
    switch (data.type) {
      case "location":
        return <ChatLocation isLastWAUser={index === lastWAIndex} />;
      case "image":
        return (
          <div className="chat-location">
            <Card>
              <CardImg
                top
                width="100%"
                src={data.source}
                alt="Card image cap"
              />
            </Card>
          </div>
        );
      case "callback_form":
        return (
          <CallBackForm
            roomId={this.roomId}
            sendCustomMessage={this.sendCustomMessage}
          />
        );
      case "search-result":
        return (
          <React.Fragment>
            {data.data && data.data.length > 0 ? (
              <DiscoverySearchResults
                data={data}
                isLastWAUser={index === lastWAIndex}
              />
            ) : (
                <React.Fragment>
                  <ChatPill
                    isLastWAUser={index === lastWAIndex && !this.state.isLoading}
                    right={data.user === "ME"}
                    user={data.user}
                    text=""
                  />
                </React.Fragment>
              )}
          </React.Fragment>
        );
      default:
        return (
          <React.Fragment>
            {data.message && (
              <ChatPill
                isLastWAUser={index === lastWAIndex && !this.state.isLoading}
                right={data.user === "ME"}
                user={data.user}
                text={data.message}
              />
            )}
          </React.Fragment>
        );
    }
  };

  handelModalCloseOpen = ans => {
    if (ans === true) {
      this.resetDemo();
    }
    this.setState({ modal: { isOpen: false } });
  };

  render() {
    let messages = [...this.state.messages];

    let lastWAIndex = messages
      .slice()
      .reverse()
      .findIndex(
        x =>
          ["WA", "AG"].indexOf(x.user) > -1 && x.message && x.message.length > 0
      );
    if (lastWAIndex > -1) {
      lastWAIndex = messages.length - lastWAIndex - 1;
    }
    return (
      <section className="bot">
        <div onClick={this.props.toggle} className="bot-menu-btn right">
          <img src={chat} alt="chat" />
          <div className="d-none d-md-block">Explore our site</div>
        </div>
        <Container>
          <Row className="chat-header">
            <Col className="d-flex flex-column">
              <div className="d-flex justify-content-center flex-grow-1">
                <img
                  src={logo}
                  alt="incede.ai"
                  style={{ width: "10em", height: "5em" }}
                />
              </div>
              <div className="d-flex justify-content-center flex-grow-1">
                <p className="lead text-white d-none d-md-block">
                  Experts in developing AI Infused Business Applications. (
                  <small className="power-by">
                    Powered by Watson Assistant
                  </small>
                  )
                </p>
              </div>
              <br />
            </Col>
          </Row>
          <Row>
            <Col className="bot-container ">
              <section
                id="messages_container"
                className="chat d-flex flex-column flex-grow-1"
              >
                {this.state.messages.map((x, i) => (
                  <div key={i}>
                    {this.getChatUiByType(x, i, lastWAIndex)}
                    {i === this.state.messages.length - 1 &&
                      x.type === "options" && (
                        <div className="options-container">
                          <Row>
                            {x.options.map((option, index) => {
                              let optionsLength = x.options.length;
                              let isCol3 = optionsLength % 3 === 0;
                              return (
                                <React.Fragment key={`option${index}`}>
                                  {option.value.input.text.startsWith("<a") &&
                                    option.value.input.text.indexOf("href") >
                                    -1 ? (
                                      <Col
                                        key={`option${index}`}
                                        lg={isCol3 ? 4 : 6}
                                        md={isCol3 ? 4 : 6}
                                        sm={6}
                                        xs={12}
                                      >
                                        <div
                                          className={`wa-option ${option.label
                                            .replace(/ /g, "-")
                                            .toLowerCase()}`}
                                        >
                                          <p
                                            className="link"
                                            dangerouslySetInnerHTML={{
                                              __html: option.value.input.text
                                            }}
                                          ></p>
                                        </div>
                                      </Col>
                                    ) : (
                                      <Col
                                        key={`option${index}`}
                                        lg={isCol3 ? 4 : 6}
                                        md={isCol3 ? 4 : 6}
                                        sm={6}
                                        xs={12}
                                        onClick={() =>
                                          this.handleOnOptionClick(x, index)
                                        }
                                      >
                                        <div
                                          className={`wa-option ${option.label
                                            .replace(/ /g, "-")
                                            .toLowerCase()}`}
                                        >
                                          <p>{option.label}</p>
                                        </div>
                                      </Col>
                                    )}
                                </React.Fragment>
                              );
                            })}
                          </Row>
                        </div>
                      )}
                  </div>
                ))}
                {(this.state.isLoading || this.state.messages.length === 0) && (
                  <ChatPill isLastWAUser={true} right={false} user={"WA"}>
                    <Spinner size="sm" type="grow" color="primary" />
                    <Spinner size="sm" type="grow" color="primary" />
                    <Spinner size="sm" type="grow" color="primary" />
                    <Spinner size="sm" type="grow" color="primary" />
                  </ChatPill>
                )}
              </section>
              <div className="d-flex justify-content-end">
                {this.state.isDemo ? (
                  <Button
                    onClick={this.exitWADemo}
                    className="exit-demo-btn  xs mr-1 d-block d-sm-none"
                  >
                    Exit Demo
                  </Button>
                ) : (
                    <React.Fragment>
                      {this.state.messages.length > 0 && (
                        <Button
                          onClick={() => {
                            this.setState({ modal: { isOpen: true } });
                          }}
                          className="exit-demo-btn xs mr-1 d-block d-sm-none"
                        >
                          Reset
                        </Button>
                      )}
                    </React.Fragment>
                  )}
              </div>
              {/* <ChatPillAsk
                handleKeyDown={this.handleKeyDown}
                value={this.state.msg}
                onChange={this.handleMessageChange}
                placeholder="Type here"
                onClick={this.send}
              /> */}
            </Col>
          </Row>
          {/* <div className="d-flex justify-content-end">
            {this.state.isDemo ? (
              <Button
                onClick={this.exitWADemo}
                className="exit-demo-btn  xs mr-1 d-block d-sm-none"
              >
                Exit Demo
              </Button>
            ) : (
              <React.Fragment>
                {this.state.messages.length > 0 && (
                  <Button
                    onClick={() => {
                      this.setState({ modal: { isOpen: true } });
                    }}
                    className="exit-demo-btn xs mr-1 d-block d-sm-none"
                  >
                    Reset
                  </Button>
                )}
              </React.Fragment>
            )}
          </div> */}
          <div
            className={`chat-section d-flex justify-content-end align-items-center ask-container`}
          >
            {this.state.isDemo ? (
              <Button
                onClick={this.exitWADemo}
                className="exit-demo-btn mr-1 d-none d-sm-block"
              >
                Exit Demo
              </Button>
            ) : (
                <React.Fragment>
                  {this.state.messages.length > 0 && (
                    <Button
                      onClick={() => {
                        this.setState({ modal: { isOpen: true } });
                      }}
                      className="reset-btn mr-1 d-none d-sm-block"
                    >
                      Reset
                    </Button>
                  )}
                </React.Fragment>
              )}
            <ChatPillAsk
              handleKeyDown={this.handleKeyDown}
              value={this.state.msg}
              onChange={this.handleMessageChange}
              placeholder="Type here"
              onClick={this.send}
            />
          </div>
          <ConfirmModal
            isOpen={this.state.modal.isOpen}
            handelCloseOpen={ans => this.handelModalCloseOpen(ans)}
            title="Are you sure?"
          >
            Do you want to reset chat history?
          </ConfirmModal>
        </Container>
      </section>
    );
  }
}

export default BotSection;
