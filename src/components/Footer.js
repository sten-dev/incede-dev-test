import React from "react";
import { Link } from "gatsby";
import "../styles/footer.scss";
import logo from "../img/logo_white.svg";
import facebook from "../img/social/facebook.svg";
import instagram from "../img/social/instagram.svg";
import twitter from "../img/social/twitter.svg";
import * as DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
import {
  Row,
  Container,
  Col,
  Form,
  FormGroup,
  Input,
  Button,
  Alert,
  Label
} from "reactstrap";
import FooterLocation from "./FooterLocation";
import { httpClient } from "../constants";
class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contactInfo: {
        name: "",
        email: "",
        phone: "",
        company: "",
        reason: "",
        date: ""
      },
      dateTime: { isOpen: false },
      hasDetailsSubmitted: undefined
    };
  }

  handleSubmit = async event => {
    event.preventDefault();
    console.log(this.state.contactInfo);
    let result = {
      success: true
    };
    // let result = await httpClient(`contact-details`, "POST", {
    //   ...this.state.contactInfo
    // });
    if (result && result.success) {
      this.setState({
        hasDetailsSubmitted: true,
        contactInfo: {
          name: "",
          email: "",
          phone: "",
          company: "",
          reason: "",
          date: ""
        },
        message: "Thank you for contacting us. We will respond to you ASAP!"
      });
    } else {
      this.setState({
        hasDetailsSubmitted: false,
        message: "Error while submitting the details"
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

  render() {
    return (
      <footer className="footer gap-y-half">
        <Container>
          <Row className="d-flex flex-column-reverse flex-md-row">
            <Col sm={12} md={6}>
              <Container fluid>
                <Row>
                  <Col className="incede-img" md="12" sm="12" lg="12">
                    <Row>
                      <Col>
                        <img src={logo} alt="incede.ai" />
                      </Col>
                      <Col className="text-right">
                        {/* <section className="social">
                      <img src={facebook} alt="Facebook" />
                    </a>
                    <a title="twitter" href="https://twitter.com">
                      <img className="fas fa-lg" src={twitter} alt="Twitter" />
                    </a>
                    <a title="instagram" href="https://instagram.com">
                      <img src={instagram} alt="Instagram" />
                    </a>
                  </section> */}
                      </Col>
                    </Row>
                  </Col>
                  <Col md="12" sm="6" xs="12" className="py-2">
                    <section className="half-menu">
                      <ul className="list-unstyled">
                        <li>
                          <Link to="/" className="navbar-item">
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link className="navbar-item" to="/why-incede">
                            Why Incede
                          </Link>
                        </li>
                      </ul>
                    </section>
                  </Col>
                  <Col md="12" sm="6" xs="12" className="py-2">
                    <section className="menu">
                      <FooterLocation />
                    </section>
                  </Col>


                  <Col lg="12" md="12" sm="12" xs="12">
                    <p className="m-0">© Copyright 2020 incede.ai</p>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col sm={12} md={6} id="contact-us-form">
              <Container fluid>
                <Row>
                  <Col xs={12}>
                    <h3 className="text-white">
                      <b>Got any questions ?</b>
                    </h3>
                  </Col>
                  <Col xs={12}>
                    <div className="contact-us-section">
                      <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className="contact-us-mat-input"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={this.state.contactInfo.name}
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className="contact-us-mat-input"
                            type="email"
                            name="email"
                            value={this.state.contactInfo.email}
                            placeholder="Email"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className="contact-us-mat-input"
                            type="text"
                            name="phone"
                            value={this.state.contactInfo.phone}
                            placeholder="Phone"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className="contact-us-mat-input"
                            type="text"
                            name="company"
                            value={this.state.contactInfo.company}
                            placeholder="Company"
                            required
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            onChange={this.handleOnChange}
                            className="contact-us-mat-input"
                            type="text"
                            name="reason"
                            value={this.state.contactInfo.reason}
                            placeholder="What do you want to talk about"
                            required
                          />
                        </FormGroup>
                        <FormGroup className="footer-date-time">
                          <DateTime
                            inputProps={{ placeholder: "Convenient Time" }}
                            isValidDate={current =>
                              moment(current)
                                .add(1, "days")
                                .toDate() > new Date()
                            }
                            onChange={value => {
                              this.setState({
                                contactInfo: {
                                  ...this.state.contactInfo,
                                  date:
                                    typeof value !== "string"
                                      ? ""
                                      : value.toDate()
                                }
                              });
                            }}
                          />
                        </FormGroup>
                        <Button className="btn btn-primary" type="submit">
                          Submit
                        </Button>
                        <br />
                        {this.state.message &&
                          (this.state.hasDetailsSubmitted !== undefined &&
                            this.state.hasDetailsSubmitted === true ? (
                              <Col lg={12} md={12} sm={12} xs={12}>
                                <br />
                                <Alert color="success">
                                  {this.state.message}
                                </Alert>
                              </Col>
                            ) : (
                              <Col lg={12} md={12} sm={12} xs={12}>
                                <br />
                                <Alert color="danger">{this.state.message}</Alert>
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

export default Footer;
