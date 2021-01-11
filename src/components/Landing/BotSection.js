import React, { Component } from 'react';
import '../../styles/bot.scss';
import {
  Container,
  Row,
  Col,
  Button,
  Spinner,
  Card,
  CardImg,
  UncontrolledPopover,
  PopoverBody
} from 'reactstrap';
import logo from '../../img/bot_logo.png';
import { ChatPill } from './bot/ChatPill';
import { ChatPillAsk } from './bot/ChatPillAsk';
import socketIO from 'socket.io-client';
import {
  API_URL,
  SOCKET_PATHS,
  httpClient,
  DEMO_SOCKET_URL,
  IGNORE_MSG,
  MEETING_MSG,
  SUPPORTED_LANGUAGES
} from '../../constants';
import chat from '../../img/chat.svg';
import ChatLocation from '../ChatLocation';
import CallBackForm from './bot/CallBackForm';
import DiscoverySearchResults from './bot/DiscoverySearchResults';
import ConfirmModal from '../ConfirmModal';
import { getSpeechToTextConfig } from '../../../Service';
// import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import samples from './samples.json';
import voices from '../../../voices';

const VOICE = voices[1];


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
  validPin = "2201"
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          user: 'WA',
          message:
            "Welcome! I am your virtual assistant to help you learn more about Incede's services, locations and experitse with IBM Watson AI",
          type: 'text'
        }
      ],

      TTS: {
        voice: VOICE,
        error: null,
        text: VOICE.demo.text, // default text
        // ssml: VOICE.demo.ssml, // SSML text
        // ssml_voice: VOICE.demo.ssml_voice, // Voice SSML text, only some voices support this
        // ssmlLabel: 'SSML',
        loading: false
      },

      msg: '',
      isDemo: false,
      shouldConnectApi: true,
      isLoading: true,
      STT: {
        accessToken: undefined,
        serviceUrl: undefined
      },
      model: 'en-US_BroadbandModel',
      keywords: this.getKeywords('en-US_BroadbandModel'),
      speakerLabels: false,
      rawMessages: [],
      formattedMessages: [],
      audioSource: null,
      settingsAtStreamStart: {
        model: '',
        keywords: [],
        speakerLabels: false
      },
      modal: {
        isOpen: false
      },
      selectedLanguage: "en",
      isLanguagePopUpOpen: false,
      isXSLanguagePopUpOpen: false,
      selectedDemo: "",
      isPinValid: false
    };
    this.audioElementRef = React.createRef();
  }
  componentDidMount = async () => {
    // text to speech
    if (this.audioElementRef.current) {
      this.audioElementRef.current.addEventListener('play', this.onAudioLoaded);
      this.audioElementRef.current.addEventListener(
        'error',
        this.handleAudioError
      );
    }

    this.roomName = localStorage.getItem('roomName');
    this.roomId = localStorage.getItem('roomId');
    this.wASessionId = localStorage.getItem('wASessionId');
    this.waCreatedTime = localStorage.getItem('waCreatedTime');

    await this.getSpeechToTextConfig();
    this.setState({
      tokenInterval: setInterval(this.getSpeechToTextConfig, 50 * 60 * 1000)
    });

    await this.initializeSocketIo();
    await this.initializeDemoSocket();
  };

  /********************************************Text to Speech ************************************************************* */

  // downloadDisabled = () => {
  //   return !this.downloadAllowed();
  // };

  // speakDisabled = () => {
  //   return this.downloadDisabled();
  // };

  // downloadAllowed = () => {
  //   const { text } = this.state;
  //   return text != null && String(text).trim() != '';
  // };

  // onAudioLoaded = () => {
  //   this.setState({ loading: false, hasAudio: true });
  // };

  // handleAudioError = error => {
  //   console.error(error);
  //   this.setState({ error: { error: 'Could not play audio' }, loading: false });
  //   setTimeout(() => this.setState({ error: null }), 5000);
  // };

  // onSpeak = event => {
  //   event.target.blur();
  //   const params = this.setupParamsFromState(true);

  //   const audio = this.audioElementRef.current;
  //   audio.setAttribute('type', 'audio/ogg;codecs=opus');
  // audio.setAttribute('src', `${API_URL}synthesize?${params.toString()}`);

  //   this.setState({ loading: true, hasAudio: false });
  // };

  // setupParamsFromState = doDownload => {
  //   const { text, voice } = this.state;

  //   const params = getSearchParams();

  //   params.set('text', text);
  //   params.set('voice', voice.name);

  //   params.set('download', doDownload);

  //   if (canPlayAudioFormat('audio/mp3')) {
  //     params.set('accept', 'audio/mp3');
  //   } else if (canPlayAudioFormat('audio/ogg;codec=opus')) {
  //     params.set('accept', 'audio/ogg;codec=opus');
  //   } else if (canPlayAudioFormat('audio/wav')) {
  //     params.set('accept', 'audio/wav');
  //   }
  //   console.log(JSON.stringify(params));
  //   return params;
  // };

  /****************************************************Speech to text******************************************************** */
  getSpeechToTextConfig = async () => {
    let res = await getSpeechToTextConfig();
    if (res && res.success) {
      this.setState({
        STT: {
          accessToken: res.data.accessToken,
          serviceUrl: res.data.serviceUrl
        }
      });
    }
  };

  getKeywords = model => {
    // a few models have more than two sample files, but the demo can only handle
    // two samples at the moment
    // so this just takes the keywords from the first two samples
    const files = samples[model];
    return (
      (files &&
        files.length >= 2 &&
        `${files[0].keywords}, ${files[1].keywords}`) ||
      ''
    );
  };

  handleMicClick = () => {
    if (this.state.audioSource === 'mic') {
      this.stopTranscription();
      return;
    }
    this.reset();
    this.setState({ audioSource: 'mic' });

    // The recognizeMicrophone() method is a helper method provided by the watson-speech package
    // It sets up the microphone, converts and downsamples the audio, and then transcribes it
    // over a WebSocket connection
    // It also provides a number of optional features, some of which are enabled by default:
    //  * enables object mode by default (options.objectMode)
    //  * formats results (Capitals, periods, etc.) (options.format)
    //  * outputs the text to a DOM element - not used in this demo because it doesn't play nice
    // with react (options.outputElement)
    //  * a few other things for backwards compatibility and sane defaults
    // In addition to this, it passes other service-level options along to the RecognizeStream that
    // manages the actual WebSocket connection.
    // this.handleStream(recognizeMicrophone(this.getRecognizeOptions()));
  };

  getRecognizeOptions = extra => {
    return Object.assign(
      {
        // formats phone numbers, currency, etc. (server-side)
        accessToken: this.state.STT.accessToken,
        token: this.state.token,
        smart_formatting: true,
        format: true, // adds capitals, periods, and a few other things (client-side)
        model: this.state.model,
        objectMode: true,
        interimResults: true,
        // note: in normal usage, you'd probably set this a bit higher
        // word_alternatives_threshold: 0.01,
        // keywords,
        // keywords_threshold: keywords.length ? 0.01 : undefined, // note: in normal usage, you'd probably set this a bit higher
        timestamps: true, // set timestamps for each word - automatically turned on by speaker_labels
        // includes the speaker_labels in separate objects unless resultsBySpeaker is enabled
        speakerLabels: this.state.speakerLabels,
        // combines speaker_labels and results together into single objects,
        // making for easier transcript outputting
        resultsBySpeaker: this.state.speakerLabels,
        // allow interim results through before the speaker has been determined
        speakerlessInterim: this.state.speakerLabels,
        url: this.state.STT.serviceUrl
      },
      extra
    );
  };

  stopTranscription = () => {
    if (this.stream) {
      this.stream.stop();
      // this.stream.removeAllListeners();
      // this.stream.recognizeStream.removeAllListeners();
    }
    this.setState({ audioSource: null });
  };

  // cleans up the keywords string and produces a unique list of keywords
  getKeywordsArrUnique = () => {
    return this.state.keywords
      .split(',')
      .map(k => k.trim())
      .filter((value, index, self) => self.indexOf(value) === index);
  };

  handleFormattedMessage = msg => {
    const { formattedMessages } = this.state;
    let r = msg;

    if (r.results && r.results.length) {
      console.log('msg', r);
      this.setState({
        msg: r.results[0].alternatives[0].transcript
      });
    }

    if (r.results && r.results.length && r.results[0].final) {
      console.log('msg', r);
      this.setState({
        msg: r.results[0].alternatives[0].transcript
      });
    }
    this.setState({ formattedMessages: formattedMessages.concat(msg) });
  };
  getFinalResults = () => {
    console.log('this.state.formattedMessages', this.state.formattedMessages);
    return this.state.formattedMessages.filter(
      r => r.results && r.results.length && r.results[0].final
    );
  };

  // getCurrentInterimResult = () => {
  //   const r = this.state.formattedMessages[
  //     this.state.formattedMessages.length - 1
  //   ];

  //   // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
  //   // However, all results in a given message will be either final or interim, so just checking
  //   // the first one still works here.
  //   if (!r || !r.results || !r.results.length || r.results[0].final) {
  //     return null;
  //   }
  //   return r;
  // };

  getFinalAndLatestInterimResult = () => {
    const final = this.getFinalResults();
    console.log('final', final);
    // const interim = this.getCurrentInterimResult();
    // if (interim) {
    //   final.push(interim);
    // }
    return final;
  };

  handleError = (err, extra) => {
    console.error(err, extra);
    if (err.name === 'UNRECOGNIZED_FORMAT') {
      err =
        'Unable to determine content type from file name or header; mp3, wav, flac, ogg, opus, and webm are supported. Please choose a different file.';
    } else if (
      err.name === 'NotSupportedError' &&
      this.state.audioSource === 'mic'
    ) {
      err = 'This browser does not support microphone input.';
    } else if (err.message === "('UpsamplingNotAllowed', 8000, 16000)") {
      err =
        'Please select a narrowband voice model to transcribe 8KHz audio files.';
    } else if (err.message === 'Invalid constraint') {
      // iPod Touch does this on iOS 11 - there is a microphone, but Safari claims there isn't
      err = 'Unable to access microphone';
    }
    this.setState({ error: err.message || err });
  };

  // captureSettings = () => {
  //   const { model, speakerLabels } = this.state;
  //   this.setState({
  //     settingsAtStreamStart: {
  //       model,
  //       keywords: this.getKeywordsArrUnique(),
  //       speakerLabels
  //     }
  //   });
  // };

  handleStream = stream => {
    console.log(stream);
    // cleanup old stream if appropriate
    if (this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
      this.stream.recognizeStream.removeAllListeners();
    }
    this.stream = stream;
    // this.captureSettings();

    // grab the formatted messages and also handle errors and such
    stream
      .on('data', this.handleFormattedMessage)
      .on('end', this.handleTranscriptEnd)
      .on('error', this.handleError);

    // when errors occur, the end event may not propagate through the helper streams.
    // However, the recognizeStream should always fire a end and close events
    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });

    // grab raw messages from the debugging events for display on the JSON tab
    // stream.recognizeStream
    //   .on('message', (frame, json) =>
    //     this.handleRawMessage({ sent: false, frame, json })
    //   )
    //   .on('send-json', json => this.handleRawMessage({ sent: true, json }))
    //   .once('send-data', () =>
    //     this.handleRawMessage({
    //       sent: true,
    //       binary: true,
    //       data: true // discard the binary data to avoid waisting memory
    //     })
    //   )
    //   .on('close', (code, message) =>
    //     this.handleRawMessage({ close: true, code, message })
    //   );

    // ['open','close','finish','end','error', 'pipe'].forEach(e => {
    //     stream.recognizeStream.on(e, console.log.bind(console, 'rs event: ', e));
    //     stream.on(e, console.log.bind(console, 'stream event: ', e));
    // });
  };

  handleTranscriptEnd = () => {
    // note: this function will be called twice on a clean end,
    // but may only be called once in the event of an error
    this.setState({ audioSource: null });
  };

  reset = () => {
    if (this.state.audioSource) {
      this.stopTranscription();
    }
    this.setState({ rawMessages: [], formattedMessages: [], error: null });
  };

  handleRawMessage = msg => {
    const { rawMessages } = this.state;
    this.setState({ rawMessages: rawMessages.concat(msg) });
  };
  /**************************************************************************************** */

  componentWillUnmount() {
    // text to speech
    if (this.audioElementRef.current) {
      this.audioElementRef.current.removeEventListener(
        'play',
        this.onAudioLoaded
      );
      this.audioElementRef.current.removeEventListener(
        'error',
        this.handleAudioError
      );
    }
    if (this.demoSocket) {
      this.demoSocket.close();
    }
    if (this.socket) {
      this.socket.close();
    }
  }

  handleMessageChange = event => {
    let eve = { ...event };
    this.setState({
      msg: eve.target.value
    });
  };

  checkWASession = () => {
    this.waCreatedTime = localStorage.getItem('waCreatedTime');
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
        this.roomName = localStorage.getItem('demoRoomName');
        this.roomId = localStorage.getItem('demoRoomId');
        this.wASessionId = localStorage.getItem('demoWASessionId');
      } else {
        this.roomName = localStorage.getItem('roomName');
        this.roomId = localStorage.getItem('roomId');
        this.wASessionId = localStorage.getItem('wASessionId');
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
    this.socket.on('connect', function () {
      console.debug('connected to server');
    });
    let messages = [
      {
        user: 'WA',
        message:
          "Welcome! I am your virtual assistant to help you learn more about Incede's services, locations and experitse with IBM Watson AI",
        type: 'text'
      }
    ];
    let time = new Date().getTime();

    await this.checkWASession();

    if (this.roomId) {
      this.setState({
        isLoading: true
      });
      let chatsResp = await httpClient('chats', 'POST', {
        roomId: this.roomId
      });
      if (chatsResp.success === true) {
        let data = chatsResp.data
          .reverse()
          .filter(x => IGNORE_MSG.indexOf(x.TEXT) === -1);
        data.forEach((x) => {
          switch (x.TYPE) {
            case 'text':
            case 'options':
              if (x.TEXT) {
                messages.push({
                  user:
                    x.USER === 'WATSON'
                      ? 'WA'
                      : x.USER === 'AGENT'
                        ? 'AG'
                        : 'ME',
                  message: x.TEXT,
                  type: x.TYPE === 'options' ? 'options' : 'text',
                  options: x.TYPE === 'options' ? JSON.parse(x.OPTIONS) : [],
                  intent: x.intent
                });
              }
              break;
            case 'location':
              messages.push({
                user: 'WA',
                message: '',
                type: 'location',
                options: []
              });
              break;
            case 'callback':
              messages.push({ user: 'ME', message: '', type: 'callback_form' });
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
      payload: '',
      roomName: this.roomName ? this.roomName : 'session-' + time,
      roomId: this.roomId ? this.roomId : undefined,
      wASessionId: this.wASessionId ? this.wASessionId : undefined
    });

    this.socket.on(SOCKET_PATHS.BOT_RESPONSE, (eventName, response) => {
      if (eventName === 'SERVER_CONNECT') {
        console.info('Bot connected, waiting for bot to wake up');
        return;
      }
      if (response.newRoom === true && eventName === 'WATSON') {
        if (response.sessionId) {
          if (response.type === 'demo') {
            localStorage.setItem('demoWASessionId', response.sessionId);
            localStorage.setItem('demoRoomId', response.roomId);
            localStorage.setItem('demoRoomName', response.roomName);
            this.setState({
              isDemo: true
            });
          } else {
            this.setState({
              isDemo: false
            });
            localStorage.setItem('waCreatedTime', new Date().getTime());
            localStorage.setItem('wASessionId', response.sessionId);
            localStorage.setItem('roomId', response.roomId);
            localStorage.setItem('roomName', response.roomName);
          }
          this.roomName = response.roomName;
          this.roomId = response.roomId;
          this.wASessionId = response.sessionId;
        } else {
          console.error(response);
        }
      }

      if (eventName === 'WATSON') {
        this.isAgentPending = false;
        if (response.intent === 'location') {
          let messages = [...this.state.messages];
          messages.push({
            user: 'WA',
            message: '',
            type: 'location',
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
        } else if (response.intent === 'agent') {
          this.isAgentPending = true;
          this.pushWAMessage(response);
          setTimeout(() => {
            if (this.isAgentPending) {
              this.setState({ isLoading: false });
              this.sendCustomMessage('agent_not_available', false);
            }
          }, this.agentTimeOut);
          setTimeout(() => {
            if (this.isAgentPending) {
              let messages = [...this.state.messages];
              messages.push({
                user: 'WA',
                message: 'Our agents are assisting others. Please hold on.',
                type: 'text',
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
          response.type === 'demo' &&
          response.intent === 'exit_demo'
        ) {
          this.resetLocalStorage(true);
          this.roomId = localStorage.getItem('roomId');
          this.roomName = localStorage.getItem('roomName');
          this.wASessionId = localStorage.getItem('wASessionId');
          this.setState({
            isDemo: false
          });
          let data = {
            comment: 'completed demo',
            wASessionId: this.wASessionId,
            user: 'user',
            roomName: this.roomName,
            roomId: this.roomId
          };
          data.selectedLanguage = this.state.selectedLanguage;
          this.socket.emit(SOCKET_PATHS.CONNECT, data);
        } else {
          this.pushWAMessage(response);
        }
      } else if (eventName === 'AGENT') {
        this.isAgentPending = false;
        let data = response.data;
        let messages = this.state.messages;
        if (data) {
          messages.push({
            user: 'AG',
            message: response.data
          });
          this.setState(
            { messages: messages, isLoading: false },
            this.scrollToBottom
          );
        }
      } else {
        if (
          response &&
          response.shouldAddToMessages &&
          response.comment &&
          response.comment.trim().length > 0
        ) {
          let messages = [...this.state.messages];
          messages.push({
            user: 'ME',
            message: response.comment.trim(),
            type: 'text'
          });
          this.setState({
            messages: messages
          });
        }
        console.warn(eventName, response);
      }
    });
  };

  resetLocalStorage = isDemo => {
    localStorage.removeItem('demoProperty');
    localStorage.removeItem('demoWASessionId');
    localStorage.removeItem('demoRoomId');
    localStorage.removeItem('demoRoomName');
    if (isDemo !== true) {
      localStorage.removeItem('waCreatedTime');
      localStorage.removeItem('wASessionId');
      localStorage.removeItem('roomId');
      localStorage.removeItem('roomName');
    }
  };
  pushWAMessage = response => {
    let data = response.data;
    let shouldUpdate = true;
    if (data && Array.isArray(data)) {
      let messages = [...this.state.messages];
      let isSearchResponse = data.findIndex(x => x.response_type === 'search');
      if (isSearchResponse && isSearchResponse === data.length - 1) {
        data = data.reverse();
      }
      data.forEach(x => {
        if (x.response_type === 'search') {
          if (x.results && x.results.length > 0) {
            messages.push({
              user: 'WA',
              message: x.header,
              data: x.results.filter(x => x.title !== 'Cookie Policy | Incede'),
              type: 'search-result'
            });
          } else {
            messages.push({
              user: 'WA',
              message: x.header || "I didn't understand. Please try again",
              type: 'text'
            });
          }
        } else if (x.response_type === 'suggestion') {
          if (
            x.suggestions &&
            x.suggestions.length > 0 &&
            x.suggestions[0].output &&
            x.suggestions[0].output.generic &&
            x.suggestions[0].output.generic.length > 0
          ) {
            messages.push({
              user: 'WA',
              message: 'Did you mean?',
              type: 'options',
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
            user: 'WA',
            message: x.options ? x.title : x.text,
            type: x.options ? 'options' : 'text',
            options: x.options || [],
            intent: response.intent
          });
          if (x.text && x.text === MEETING_MSG) {
            messages.push({ user: 'ME', message: '', type: 'callback_form' });
          }
        } else if (x.response_type === 'image') {
          messages.push({
            user: 'WA',
            message: '',
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
      this.setState({ isLoading: this.state.selectedDemo === "COVID-19b" && this.state.isPinValid === false ? false : true });
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
        isDemo: false,
        selectedLanguage: "en",
        isPinValid: false,
        selectedDemo: ""
      },
      () => {
        this.sendCustomMessage('user_demo_exit_done', false);
      }
    );
    // }, 500);
  };

  resetDemo = () => {
    this.resetLocalStorage();
    // this.demoSocket = undefined;
    this.demoSocket.close();
    this.sendCustomMessage('', true);
    this.setState({
      messages: [
        {
          user: 'WA',
          message:
            "Welcome! I am your virtual assistant to help you learn more about Incede's services, locations and experitse with IBM Watson AI",
          type: 'text'
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
        : 'session-' + new Date().getTime(),
      roomId: this.roomId,
      type: this.state.isDemo ? 'demo' : 'chat',
      demoProperty: this.state.isDemo
        ? localStorage.getItem('demoProperty')
        : undefined,
      selectedLanguage: this.state.selectedLanguage
    };

    if (this.state.isDemo && this.state.selectedDemo === "COVID-19b" && this.state.isPinValid === false) {
      if (msg && msg.trim() === this.validPin) {
        let messages = [...this.state.messages];
        messages.push({ user: 'ME', message: msg, type: 'text' });
        this.setState({
          isPinValid: true,
          messages
        }, () => {
          data.comment = ""
          data.selectedLanguage = this.state.selectedLanguage
          this.sendMessage(data, msg, shouldAddToMessages);
        })
      } else {
        let messages = [...this.state.messages];
        messages.push({ user: 'ME', message: msg, type: 'text' });
        messages.push({ user: 'WA', message: "Please enter valid pin to continue", type: 'text' });
        this.setState({
          messages,
          msg: "",
          isLoading: false,
        }, this.scrollToBottom)
      }
    } else {
      this.sendMessage(data, msg, shouldAddToMessages);
    }
  };

  handleOnOptionClick = (message, optionIndex) => {
    let option = message.options[optionIndex];
    let type = 'chat';
    let isDemoUpdate = false;
    let comment = option.value.input.text;
    let demoType = ""
    if (option.value.input.text.toLowerCase() === 'launch demo') {
      if (
        message.intent &&
        message.intent.toLowerCase() === 'customer_service'
      ) {
        type = 'demo';
        demoType = "Customer Service";
        localStorage.setItem('demoProperty', 'Customer Service');
      } else if (
        message.intent &&
        message.intent.toLowerCase() === 'pizza_ordering'
      ) {
        type = 'demo';
        demoType = "Pizza Ordering";
        localStorage.setItem('demoProperty', 'Pizza Ordering');
      } else if (message.intent && message.intent.toLowerCase() === 'banking') {
        type = 'demo';
        demoType = "Banking";
        localStorage.setItem('demoProperty', 'Banking');
      } else if (
        message.intent &&
        message.intent.toLowerCase() === 'covid-19'
      ) {
        type = 'demo';
        demoType = "Covid-19";
        localStorage.setItem('demoProperty', 'Covid-19');
      } else if (
        message.intent &&
        message.intent.toLowerCase() === 'covid-19-language'
      ) {
        type = 'demo';
        demoType = "COVID-19b";
        localStorage.setItem('demoProperty', 'COVID-19b');
        localStorage.setItem('selectedLanguage', this.state.selectedLanguage);
      }
      if (type === 'demo') {
        this.wASessionId = undefined;
        this.roomId = undefined;
        isDemoUpdate = true;
        comment = '';
        this.roomName = 'session-' + new Date().getTime();
      }
    }
    if (message.intent === 'demo_done' && comment.toLowerCase() === 'yes') {
      comment = 'talk to agent';
    }
    this.setState(
      {
        isDemo: type === 'demo' && isDemoUpdate ? true : this.state.isDemo,
        selectedDemo: type === 'demo' && isDemoUpdate ? demoType : this.state.selectedDemo,
      },
      () => {
        let isAdd = true;
        if (type === 'demo' && isDemoUpdate) {
          isAdd = false;
        }
        // if (message.message && message.message.toLowerCase() == "contact us" && comment.toLowerCase() === "cancel") {
        //   comment = "What we do";
        //   isAdd = false
        // }
        let data = {
          comment: comment,
          wASessionId: this.wASessionId,
          user: 'user',
          roomName: this.roomName,
          roomId: this.roomId,
          type: type,
          demoProperty:
            type === 'demo' ? localStorage.getItem('demoProperty') : undefined,
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
    this.demoSocket.on('connect', function () {
      console.debug('demo socket connected to server');
    });
    this.demoSocket.on('chat message', message => {
      let data = message;
      let session_id = localStorage.getItem('demoWASessionId');
      let messages = [...this.state.messages];
      if (data.success === undefined) {
        if (!session_id || session_id === data.session_id) {
          localStorage.setItem('demoWASessionId', data.session_id);
          if (data && data.context && data.context.skills) {
            data.output.generic.forEach(x => {
              if (x.text || x.title) {
                messages.push({
                  user: 'WA',
                  message: x.options ? x.title : x.text,
                  type: x.options ? 'options' : 'text',
                  options: x.options || []
                });
              }
            });
          }
        }
      } else {
        if (!session_id || session_id === data.session_id) {
          if (data.message && (!data.type || data.type != 'user')) {
            messages.push({
              user: data.type === 'user' ? 'US' : 'WA',
              message: data.message
            });
          }
        }
      }
      this.setState(
        {
          messages,
          msg: '',
          isLoading: false
        },
        this.scrollToBottom
      );
    });
  };

  sendMessage = (data, message, shouldAddToMessages) => {
    let messages = [...this.state.messages];
    if (!this.state.isLoading) {
      let demoProperty = localStorage.getItem('demoProperty');
      if (this.state.isDemo && demoProperty === 'Customer Service') {
        if (!this.demoSocket) {
          this.resetLocalStorage(true);
          this.demoSocket.connect();
          // this.initializeDemoSocket();
        } else if (!data.wASessionId) {
          this.demoSocket.connect();
        }
        let demoWASessionId = localStorage.getItem('demoWASessionId');
        this.demoSocket.emit('chat message', {
          payload: data.comment,
          params: { session_id: demoWASessionId },
          user: 'user'
        });
        data.demoProperty = demoProperty;
      } else {
        data.demoProperty = demoProperty;
        data.type = this.state.isDemo === true ? 'demo' : 'chat';

        data.shouldAddToMessages = shouldAddToMessages;
        if (!data.intent) {
          let lastMessage = this.state.messages[this.state.messages.length - 1];
          data.intent = lastMessage.message;
        }
        if (this.state.isDemo && data.demoProperty === "COVID-19b") {
          if (this.state.isPinValid) {
            data.selectedLanguage = this.state.selectedLanguage;
            this.socket.emit(SOCKET_PATHS.CONNECT, data);
          } else {
            messages.push({ user: 'WA', message: "Please enter pin to continue", type: 'text' });
          }
        } else {
          data.selectedLanguage = this.state.selectedLanguage;
          this.socket.emit(SOCKET_PATHS.CONNECT, data);
        }
      }
      if (
        shouldAddToMessages &&
        data &&
        data.demoProperty === 'Customer Service'
      ) {
        messages.push({ user: 'ME', message: message, type: 'text' });
      }

      // if (shouldAddToMessages) {
      //   messages.push({ user: "ME", message: message, type: "text" });
      // }
      this.setState(
        {
          messages,
          msg: '',
          isLoading: data.demoProperty === "COVID-19b" && this.state.isPinValid === false ? false : true
        },
        this.scrollToBottom
      );
    }

  };

  scrollToBottom = () => {
    setTimeout(function () {
      var objDiv = document.getElementById('messages_container');
      if (objDiv) {
        objDiv.scrollTop = objDiv.scrollHeight;
      }
    }, 500);
  };
  handleKeyDown = event => {
    if (event.key === 'Enter') {
      this.send();
    }
  };

  handleDiscoveryViewContent = (messageIndex, discoveryIndex) => {
    let messages = [...this.state.messages];
    messages[messageIndex].data[discoveryIndex].isExpanded = !messages[messageIndex].data[discoveryIndex].isExpanded;
    this.setState({
      messages,
    })
  }

  getChatUiByType = (data, index, lastWAIndex) => {
    switch (data.type) {
      case 'location':
        return <ChatLocation isLastWAUser={index === lastWAIndex} />;
      case 'image':
        return (
          <div className='chat-location'>
            <Card>
              <CardImg
                top
                width='100%'
                src={data.source}
                alt='Card image cap'
              />
            </Card>
          </div>
        );
      case 'callback_form':
        return (
          <CallBackForm
            roomId={this.roomId}
            sendCustomMessage={this.sendCustomMessage}
          />
        );
      case 'search-result':
        return (
          <React.Fragment>
            {data.data && data.data.length > 0 ? (
              <DiscoverySearchResults
                data={data}
                index={index}
                selectedDemo={this.state.selectedDemo}
                isLastWAUser={index === lastWAIndex}
                handleDiscoveryViewContent={this.handleDiscoveryViewContent}
              />
            ) : (
                <React.Fragment>
                  <ChatPill
                    isLastWAUser={index === lastWAIndex && !this.state.isLoading}
                    right={data.user === 'ME'}
                    user={data.user}
                    text=''
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
                right={data.user === 'ME'}
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

  toggleLanguagePopUp = (isXS) => {
    if (isXS) {
      this.setState({
        isXSLanguagePopUpOpen: !this.state.isXSLanguagePopUpOpen
      })
    } else {
      this.setState({
        isLanguagePopUpOpen: !this.state.isLanguagePopUpOpen
      })
    }
  }

  changeLanguage = (language) => {
    this.setState({
      selectedLanguage: language,
      isLanguagePopUpOpen: false,
      isXSLanguagePopUpOpen: false,
    })
  }

  render() {
    let messages = [...this.state.messages];

    let lastWAIndex = messages
      .slice()
      .reverse()
      .findIndex(
        x =>
          ['WA', 'AG'].indexOf(x.user) > -1 && x.message && x.message.length > 0
      );
    if (lastWAIndex > -1) {
      lastWAIndex = messages.length - lastWAIndex - 1;
    }
    return (
      <section className='bot'>
        <div onClick={this.props.toggle} className='bot-menu-btn right'>
          <img src={chat} alt='chat' />
          <div className='d-none d-md-block'>Explore our site</div>
        </div>
        <Container>
          <Row className='chat-header'>
            <Col className='d-flex flex-column'>
              <div className='d-flex justify-content-center flex-grow-1'>
                <img
                  src={logo}
                  alt='incede.ai'
                  style={{ width: '200px' }}
                />
              </div>
              <div className='d-flex justify-content-center flex-grow-1'>
                <p className='lead text-white d-none d-md-block'>
                  Experts in developing AI Infused Business Applications. (
                  <small className='power-by'>
                    Powered by Watson Assistant
                  </small>
                  )
                </p>
              </div>
              <br />
            </Col>
          </Row>
          <Row>
            <Col className='bot-container '>
              <section
                id='messages_container'
                className='chat d-flex flex-column flex-grow-1'>
                {this.state.messages.map((x, i) => (
                  <div key={i}>
                    {this.getChatUiByType(x, i, lastWAIndex)}
                    {i === this.state.messages.length - 1 &&
                      x.type === 'options' && (
                        <div className='options-container'>
                          <Row>
                            {x.options.map((option, index) => {
                              let optionsLength = x.options.length;
                              let isCol3 = optionsLength % 3 === 0;
                              return (
                                <React.Fragment key={`option${index}`}>
                                  {option.value.input.text.startsWith('<a') &&
                                    option.value.input.text.indexOf('href') >
                                    -1 ? (
                                      <Col
                                        key={`option${index}`}
                                        lg={isCol3 ? 4 : 6}
                                        md={isCol3 ? 4 : 6}
                                        sm={6}
                                        xs={12}>
                                        <div
                                          className={`wa-option ${option.label
                                            .replace(/ /g, '-')
                                            .toLowerCase()}`}>
                                          <p
                                            className='link'
                                            dangerouslySetInnerHTML={{
                                              __html: option.value.input.text
                                            }}></p>
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
                                        }>
                                        <div
                                          className={`wa-option ${option.label
                                            .replace(/ /g, '-')
                                            .toLowerCase()}`}>
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
                  <ChatPill isLastWAUser={true} right={false} user={'WA'}>
                    <Spinner size='sm' type='grow' color='primary' />
                    <Spinner size='sm' type='grow' color='primary' />
                    <Spinner size='sm' type='grow' color='primary' />
                    <Spinner size='sm' type='grow' color='primary' />
                  </ChatPill>
                )}
              </section>
              <div className='d-flex justify-content-end'>
                {this.state.isDemo ? (
                  <React.Fragment>
                    <Button
                      onClick={this.exitWADemo}
                      className='exit-demo-btn  xs mr-1 d-block d-sm-none'>
                      Exit Demo
                  </Button>
                    {this.state.selectedDemo === "COVID-19b" && this.state.isPinValid && (
                      <React.Fragment>
                        <Button id="languages_popup_xs"
                          className='exit-demo-btn xs mr-1 d-block d-sm-none'>
                          {/* <img src={globeImg} alt="globe" />  */}
                          <svg style={{ width: 24, height: 24, marginTop: -2, marginRight: 3 }} viewBox="0 0 24 24">
                            <path fill="#fff" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                          </svg>
                          {SUPPORTED_LANGUAGES[this.state.selectedLanguage]}
                          <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                            <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                          </svg>
                        </Button>
                        <div className="d-block d-sm-none">
                          <UncontrolledPopover className="pop-up-container xs" trigger="click" toggle={() => this.toggleLanguagePopUp(true)} isOpen={this.state.isXSLanguagePopUpOpen} placement="top" target="languages_popup_xs">
                            <PopoverBody className="p-0">
                              <ul className="languages-container xs">
                                {Object.keys(SUPPORTED_LANGUAGES).map(x => (
                                  <li key={x} onClick={() => this.changeLanguage(x)} className={`${this.state.selectedLanguage === x ? 'selected' : ''}`}>{SUPPORTED_LANGUAGES[x]}</li>
                                ))}
                              </ul>
                            </PopoverBody>
                          </UncontrolledPopover>
                        </div>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ) : (
                    <React.Fragment>
                      {this.state.messages.length > 0 && (
                        <Button
                          onClick={() => {
                            this.setState({ modal: { isOpen: true } });
                          }}
                          className='exit-demo-btn xs mr-1 d-block d-sm-none'>
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
            className={`chat-section d-flex justify-content-end align-items-center ask-container`}>
            {this.state.isDemo ? (
              <React.Fragment>
                <Button
                  onClick={this.exitWADemo}
                  className='exit-demo-btn mr-1 d-none d-sm-block'>
                  Exit Demo
              </Button>
                {this.state.selectedDemo === "COVID-19b" && this.state.isPinValid && (
                  <React.Fragment>
                    <Button id="languages_popup"
                      className='exit-demo-btn mr-1 d-none d-sm-block'>
                      {/* <img src={globeImg} alt="globe" />  */}
                      <svg style={{ width: 24, height: 24, marginTop: -2, marginRight: 3 }} viewBox="0 0 24 24">
                        <path fill="#fff" d="M16.36,14C16.44,13.34 16.5,12.68 16.5,12C16.5,11.32 16.44,10.66 16.36,10H19.74C19.9,10.64 20,11.31 20,12C20,12.69 19.9,13.36 19.74,14M14.59,19.56C15.19,18.45 15.65,17.25 15.97,16H18.92C17.96,17.65 16.43,18.93 14.59,19.56M14.34,14H9.66C9.56,13.34 9.5,12.68 9.5,12C9.5,11.32 9.56,10.65 9.66,10H14.34C14.43,10.65 14.5,11.32 14.5,12C14.5,12.68 14.43,13.34 14.34,14M12,19.96C11.17,18.76 10.5,17.43 10.09,16H13.91C13.5,17.43 12.83,18.76 12,19.96M8,8H5.08C6.03,6.34 7.57,5.06 9.4,4.44C8.8,5.55 8.35,6.75 8,8M5.08,16H8C8.35,17.25 8.8,18.45 9.4,19.56C7.57,18.93 6.03,17.65 5.08,16M4.26,14C4.1,13.36 4,12.69 4,12C4,11.31 4.1,10.64 4.26,10H7.64C7.56,10.66 7.5,11.32 7.5,12C7.5,12.68 7.56,13.34 7.64,14M12,4.03C12.83,5.23 13.5,6.57 13.91,8H10.09C10.5,6.57 11.17,5.23 12,4.03M18.92,8H15.97C15.65,6.75 15.19,5.55 14.59,4.44C16.43,5.07 17.96,6.34 18.92,8M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                      </svg>
                      {SUPPORTED_LANGUAGES[this.state.selectedLanguage]}
                      <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                        <path fill="currentColor" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                      </svg>
                    </Button>
                    <div className="d-none d-sm-block">
                      <UncontrolledPopover className="pop-up-container" trigger="click" toggle={() => this.toggleLanguagePopUp(false)} isOpen={this.state.isLanguagePopUpOpen} placement="top" target="languages_popup">
                        <PopoverBody className="p-0">
                          <ul className="languages-container">
                            {Object.keys(SUPPORTED_LANGUAGES).map(x => (
                              <li key={x} onClick={() => this.changeLanguage(x)} className={`${this.state.selectedLanguage === x ? 'selected' : ''}`}>{SUPPORTED_LANGUAGES[x]}</li>
                            ))}
                          </ul>
                        </PopoverBody>
                      </UncontrolledPopover>
                    </div>
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {this.state.messages.length > 0 && (
                    <Button
                      onClick={() => {
                        this.setState({ modal: { isOpen: true } });
                      }}
                      className='reset-btn mr-1 d-none d-sm-block'>
                      Reset
                    </Button>
                  )}
                </React.Fragment>
              )}
            <ChatPillAsk
              handleKeyDown={this.handleKeyDown}
              value={this.state.msg}
              onChange={this.handleMessageChange}
              placeholder='Type here'
              onClick={this.send}
              audioSource={this.state.audioSource}
              handleMicClick={this.handleMicClick}
            />
          </div>
          <ConfirmModal
            isOpen={this.state.modal.isOpen}
            handelCloseOpen={ans => this.handelModalCloseOpen(ans)}
            title='Are you sure?'>
            Do you want to reset chat history?
          </ConfirmModal>
        </Container>
      </section>
    );
  }
}

export default BotSection;
