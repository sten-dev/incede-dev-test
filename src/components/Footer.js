import React from 'react';
import { Link } from 'gatsby';
import '../styles/footer.scss';
import logo from '../img/logo_white.png';
import twitterPNG from '../img/social/twitter.png';
import linkedInPNG from '../img/social/linkedIn.png';
import * as DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import LinkedInSignIn from 'react-linkedin-login-popup';

import {
  Row,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert
} from 'reactstrap';

import FooterLocation from './FooterLocation';
import {
  httpClient,
  LINKEDIN,
  storeLinkedinUser,
  getLinkedinUser
} from '../constants';
import { userDetailFromLinkedin } from '../../Service';
import { withToastContext } from './common/ToastProvider';
class Footer extends React.Component {
  window;
  constructor(props) {
    super(props);
    this.state = {
      contactInfo: {
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
      hasDetailsSubmitted: undefined
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
        contactInfo: {
          ...this.state.contactInfo,
          name: firstName + ' ' + lastName,
          email: data.email
        }
      });
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state.contactInfo);
    // let result = {
    //   success: true
    // };

    let result = await httpClient(`contact-details`, 'POST', {
      ...this.state.contactInfo
    });

    console.log('contactInfo', this.state.contactInfo);
    if (result && result.success) {
      this.setState({
        hasDetailsSubmitted: true,
        contactInfo: {
          name: '',
          email: '',
          phone: '',
          company: '',
          reason: '',
          date: ''
        },
        message: 'Thank you for contacting us. We will respond to you ASAP!'
      });
    } else {
      this.setState({
        hasDetailsSubmitted: false,
        message: 'Error while submitting the details'
      });
    }
  };
  handleOnChange = event => {
    let eve = { ...event };
    this.setState(prevState => ({
      contactInfo: {
        ...prevState.contactInfo,
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
      let data = res.data;
      // todo store in localstorage
      this.props.toast.show('Successfully logged in with LinkedIn', 'success');

      storeLinkedinUser(data);

      console.warn('data', data);
      let firstName = data.firstName != null ? data.firstName : '';
      let lastName = data.lastName != null ? data.lastName : '';

      this.setState({
        showLinkedin: false,
        contactInfo: {
          ...this.state.contactInfo,
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

  render() {
    const width = this.window && this.window.innerWidth;

    return (
      <footer className='footer gap-y-half'>
        <Container>
          <Row className='d-flex flex-column-reverse flex-md-row'>
            <Col sm={12} md={6}>
              <Container fluid>
                <Row>
                  <Col className='incede-img' md='12' sm='12' lg='12'>
                    <Row>
                      <Col>
                        <img src={logo} alt='incede.ai' />
                      </Col>
                    </Row>
                  </Col>
                  <Col md='12' sm='6' xs='12' className='py-2'>
                    <section className='half-menu'>
                      <ul className='list-unstyled'>
                        <li>
                          <Link to='/' className='navbar-item'>
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link className='navbar-item' to='/why-incede'>
                            Why Incede
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </Col>
                  <Col md='12' sm='6' xs='12' className='py-2'>
                    <section className='menu'>
                      <FooterLocation />
                    </section>
                  </Col>
                  <Col lg='12' md='12' sm='12' xs='12'>
                    <p className='m-0'>© Copyright 2020 incede.ai</p>
                  </Col>
                  <Col lg='12' md='12' sm='12' xs='12'>
                    <br />
                    <section className='social'>
                      <a
                        className='pl-0'
                        title='LinkedIn'
                        target='_blank'
                        href='https://www.linkedin.com/company/incede-ai'>
                        <img src={linkedInPNG} alt='LinkedIn' />
                      </a>
                      <a
                        title='twitter'
                        target='_blank'
                        href='https://twitter.com/incedeAI'>
                        <img
                          className='fas fa-lg'
                          src={twitterPNG}
                          alt='Twitter'
                        />
                      </a>
                      <a
                        title='Youtube'
                        target='_blank'
                        href='https://www.youtube.com/channel/UCQwz5MBtdWHuqpoKpU21xRQ'>
                        {/* <i class="fab fa-youtube"></i> */}
                        {/* <img src={youtubePNG} alt="youtube" /> */}

                        <svg
                          style={{ width: 42, height: 42 }}
                          viewBox='0 0 24 24'>
                          <path
                            fill='#ff0000'
                            d='M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.5,18.78 17.18,18.84C15.88,18.91 14.69,18.94 13.59,18.94L12,19C7.81,19 5.2,18.84 4.17,18.56C3.27,18.31 2.69,17.73 2.44,16.83C2.31,16.36 2.22,15.73 2.16,14.93C2.09,14.13 2.06,13.44 2.06,12.84L2,12C2,9.81 2.16,8.2 2.44,7.17C2.69,6.27 3.27,5.69 4.17,5.44C4.64,5.31 5.5,5.22 6.82,5.16C8.12,5.09 9.31,5.06 10.41,5.06L12,5C16.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z'
                          />
                        </svg>
                      </a>

                      {/* <a className="pl-0" title="twitter" href="https://facebook.com">
                        <img src={facebook} alt="Facebook" />
                      </a>
                      <a title="instagram" href="https://instagram.com">
                        <img src={instagram} alt="Instagram" />
                      </a> */}
                    </section>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col sm={12} md={6} id='contact-us-form'>
              <Container fluid>
                <Row>
                  <Col xs={12}>
                    <h3 className='text-white'>
                      <b>Got any questions ?</b>
                      {/* &nbsp; */}
                      {/* <LinkedInSignIn
                        clientId={LINKEDIN.clientId}
                        redirectUrl={LINKEDIN.redirectUrl}
                        onSuccess={this.handleSuccess}
                        onError={this.handleFailure}
                        scopes={['r_liteprofile', 'r_emailaddress']}>
                        {onclick => (
                          <small onClick={onclick} className='pointer'>
                            Sync with linkedin
                          </small>
                        )}
                      </LinkedInSignIn> */}
                    </h3>
                  </Col>
                  <Col xs={12}>
                    <div className='contact-us-section'>
                      <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className='contact-us-mat-input'
                            type='text'
                            name='name'
                            placeholder='Name *'
                            value={this.state.contactInfo.name}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className='contact-us-mat-input'
                            type='email'
                            name='email'
                            value={this.state.contactInfo.email}
                            placeholder='Email *'
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className='contact-us-mat-input'
                            type='text'
                            name='company'
                            value={this.state.contactInfo.company}
                            placeholder='Company *'
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className='contact-us-mat-input'
                            type='text'
                            name='phone'
                            value={this.state.contactInfo.phone}
                            placeholder='Phone'
                          // required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className='contact-us-mat-input'
                            type='text'
                            name='reason'
                            value={this.state.contactInfo.reason}
                            placeholder='What do you want to talk about'
                          // required
                          />
                        </FormGroup>
                        <FormGroup className='footer-date-time'>
                          <DateTime
                            inputProps={{ placeholder: 'Convenient Time' }}
                            isValidDate={current =>
                              moment(current)
                                .add(1, 'days')
                                .toDate() > new Date()
                            }
                            onChange={value => {
                              this.setState({
                                contactInfo: {
                                  ...this.state.contactInfo,
                                  date: isNaN(new Date(value).getTime())
                                    ? ''
                                    : new Date(value)
                                }
                              });
                            }}
                          />
                        </FormGroup>
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
                                    alt='linkedin'
                                    className='linkedin-logo'
                                  />
                                  {width && width <= 992 && width >= 768
                                    ? 'linkedin'
                                    : 'Login with LinkedIn'}
                                </Button>
                              )}
                            </LinkedInSignIn>
                          )}
                        </div>
                        <br />
                        {this.state.message &&
                          (this.state.hasDetailsSubmitted !== undefined &&
                            this.state.hasDetailsSubmitted === true ? (
                              <Col lg={12} md={12} sm={12} xs={12}>
                                <br />
                                <Alert color='success'>
                                  {this.state.message}
                                </Alert>
                              </Col>
                            ) : (
                              <Col lg={12} md={12} sm={12} xs={12}>
                                <br />
                                <Alert color='danger'>{this.state.message}</Alert>
                              </Col>
                            ))}
                      </Form>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  }
}

export default withToastContext(Footer);
