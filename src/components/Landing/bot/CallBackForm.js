import React, { Component } from 'react';
import {
  Form,
  Card,
  CardBody,
  FormGroup,
  Input,
  Button,
  Label,
  Row,
  Col,
  Alert
} from 'reactstrap';
import {
  httpClient,
  storeLinkedinUser,
  LINKEDIN,
  getLinkedinUser
} from '../../../constants';
import { ChatPill } from './ChatPill';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import LinkedInSignIn from 'react-linkedin-login-popup';
import { userDetailFromLinkedin } from '../../../../Service';
import linkedInPNG from '../../../img/social/linkedIn.png';
import { withToastContext } from '../../common/ToastProvider';

// var DateTime = require("react-datetime");
class CallBackForm extends Component {
  window;
  constructor(props) {
    super(props);
    this.state = {
      contactDetails: {
        name: '',
        email: '',
        phone: '',
        company: '',
        reason: '',
        date: ''
      },
      showLinkedin: true,
      // width: window.innerWidth,
      dateTime: { isOpen: false },
      message: '',
      hasDetailsSubmitted: false
    };
  }

  componentDidMount = () => {
    this.window = window;
    this.getLinkedUser();
  };

  getLinkedUser = () => {
    let data = getLinkedinUser();
    if (data != null) {
      console.warn('data', data);
      let firstName = data.firstName != null ? data.firstName : '';
      let lastName = data.lastName != null ? data.lastName : '';

      this.setState({
        showLinkedin: false,
        contactDetails: {
          ...this.state.contactDetails,
          name: firstName + ' ' + lastName,
          email: data.email
        }
      });
    }
  };

  handleOnChange = event => {
    let eve = { ...event };
    this.setState(prevState => ({
      contactDetails: {
        ...prevState.contactDetails,
        [eve.target.name]: eve.target.value
      }
    }));
  };

  handleSuccess = async code => {
    console.log('Success', code);
    // todo BE call
    let obj = {
      grant_type: LINKEDIN.grant_type,
      code: code,
      redirect_uri: LINKEDIN.redirectUrl,
      client_id: LINKEDIN.clientId
    };
    let res = await userDetailFromLinkedin(obj);
    if (res && res.success) {
      this.props.toast.show('Successfully logged in with LinkedIn', 'success');

      let data = res.data;
      // todo store in localstorage
      storeLinkedinUser(data);

      console.warn('data', data);
      let firstName = data.firstName != null ? data.firstName : '';
      let lastName = data.lastName != null ? data.lastName : '';

      this.setState({
        showLinkedin: false,
        contactDetails: {
          ...this.state.contactDetails,
          name: firstName + ' ' + lastName,
          email: data.email
        }
      });
    }
    // this.setState({
    //   code: data.code,
    //   errorMessage: ''
    // });
  };

  handleFailure = error => {
    console.log('error', error);
    // this.setState({
    //   code: '',
    //   errorMessage: error.errorMessage
    // });
  };

  handleSubmit = async event => {
    event.preventDefault();
    // console.log("data added", this.state.contactDetails);
    // console.log("roomId", this.props.roomId);
    let result = await httpClient(
      `rooms/${this.props.roomId}/schedule`,
      'POST',
      {
        ...this.state.contactDetails,
        roomId: this.props.roomId
      }
    );
    if (result.success) {
      this.setState(
        {
          hasDetailsSubmitted: true,
          message: `Thank you <strong>${
            this.state.contactDetails.name
            }</strong>. Your request for meeting at <strong>${moment(
              this.state.contactDetails.date
            ).format(
              'DD MMM YYYY, HH:mm A'
            )}</strong> with an Incede expert has been successfully submitted and we look forward to speaking with you`
        },
        () => {
          this.props.sendCustomMessage('what does incede do', false);
        }
      );
    } else {
      this.setState({
        message: 'Error while submitting the details'
      });
    }
  };

  render() {
    // const width = window.innerWidth;
    const width = this.window && this.window.innerWidth;
    return (
      <React.Fragment>
        <div
          className={`d-flex ${
            this.state.hasDetailsSubmitted ? '' : 'justify-content-end'
            }`}>
          {this.state.hasDetailsSubmitted ? (
            <React.Fragment>
              <ChatPill
                isLastWAUser={false}
                right={false}
                user={'WA'}
                text={this.state.message}
              />
            </React.Fragment>
          ) : (
              <div className='call-back-form'>
                <Card>
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h4 className='m-0 text-center'>Meeting Request Form</h4>
                      <br />
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Name *</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type='text'
                              name='name'
                              placeholder='Name'
                              value={this.state.contactDetails.name}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Email *</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type='email'
                              name='email'
                              placeholder='Email'
                              value={this.state.contactDetails.email}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Company *</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type='text'
                              name='company'
                              placeholder='Company'
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Phone</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type='text'
                              name='phone'
                              placeholder='Phone'
                            // required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <FormGroup>
                            <Label>What do you want to talk about</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type='text'
                              name='reason'
                              placeholder='What do you want to talk about'
                            // required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <FormGroup className='convenient-time'>
                            <Label>Convenient Time</Label>
                            <DateTime
                              isValidDate={current =>
                                moment(current)
                                  .add(1, 'days')
                                  .toDate() > new Date()
                              }
                              onChange={value => {
                                this.setState({
                                  contactDetails: {
                                    ...this.state.contactDetails,
                                    date: isNaN(new Date(value).getTime())
                                      ? ''
                                      : new Date(value)
                                  }
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <div className='d-flex'>
                            <Button className='btn btn-primary' type='submit'>
                              Submit
                          </Button>
                          &nbsp; &nbsp;
                          {this.state.showLinkedin && (
                              <LinkedInSignIn
                                clientId={LINKEDIN.clientId}
                                redirectUrl={LINKEDIN.redirectUrl}
                                onSuccess={this.handleSuccess}
                                onError={this.handleFailure}
                                scopes={['r_liteprofile', 'r_emailaddress']}>
                                {onclick => (
                                  <Button
                                    onClick={onclick}
                                    className='linkedin-btn'>
                                    <img
                                      src={linkedInPNG}
                                      alt='linkedIn'
                                      className='linkedin-logo'
                                    />
                                    {width && width <= 576
                                      ? 'linkedIn'
                                      : 'Login with LinkedIn'}
                                  </Button>
                                )}
                              </LinkedInSignIn>
                            )}
                          </div>
                        </Col>
                        {this.state.message && (
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <br />
                            <Alert color='danger'>{this.state.message}</Alert>
                          </Col>
                        )}
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </div>
            )}
        </div>
      </React.Fragment>
    );
  }
}

export default withToastContext(CallBackForm);
