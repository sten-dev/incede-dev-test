import React, { Component } from "react";
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
} from "reactstrap";
import { httpClient } from "../../../constants";
import { ChatPill } from "./ChatPill";
import * as DateTime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";
// var DateTime = require("react-datetime");
class CallBackForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactDetails: {
        name: "",
        email: "",
        phone: "",
        company: "",
        reason: "",
        date: ""
      },
      dateTime: { isOpen: false },
      message: "",
      hasDetailsSubmitted: false
    };
  }

  handleOnChange = event => {
    let eve = { ...event };
    this.setState(prevState => ({
      contactDetails: {
        ...prevState.contactDetails,
        [eve.target.name]: eve.target.value
      }
    }));
  };

  handleSubmit = async event => {
    event.preventDefault();
    // console.log("data added", this.state.contactDetails);
    // console.log("roomId", this.props.roomId);
    let result = await httpClient(
      `rooms/${this.props.roomId}/schedule`,
      "POST",
      {
        ...this.state.contactDetails,
        roomId: this.props.roomId
      }
    );
    if (result.success) {
      this.setState({
        hasDetailsSubmitted: true,
        message:
          `Thank you <strong>${this.state.contactDetails.name}</strong>. Your request for meeting at <strong>${moment(this.state.contactDetails.date).format("DD MMM YYYY, HH:mm A")}</strong> with an Incede expert has been successfully submitted and we look forward to speaking with you`
      }, () => {
        this.props.sendCustomMessage("what does incede do", false)
      });
    } else {
      this.setState({
        message: "Error while submitting the details"
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className={`d-flex ${this.state.hasDetailsSubmitted ? '' : 'justify-content-end'}`}>
          {this.state.hasDetailsSubmitted ? (
            <React.Fragment>
              <ChatPill
                isLastWAUser={false}
                right={false}
                user={"WA"}
                text={this.state.message}
              />
            </React.Fragment>
          ) : (
              <div className="call-back-form">
                <Card>
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <h4 className="m-0 text-center">Meeting Request Form</h4>
                      <br />
                      <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Name</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type="text"
                              name="name"
                              placeholder="Name"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Email</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type="email"
                              name="email"
                              placeholder="Email"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Phone</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type="text"
                              name="phone"
                              placeholder="Phone"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={6} md={6} sm={12} xs={12}>
                          <FormGroup>
                            <Label>Company</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type="text"
                              name="company"
                              placeholder="Company"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <FormGroup>
                            <Label>What do you want to talk about</Label>
                            <Input
                              onChange={this.handleOnChange}
                              type="text"
                              name="reason"
                              placeholder="What do you want to talk about"
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <FormGroup className="convenient-time">
                            <Label>Convenient Time</Label>
                            <DateTime
                              isValidDate={(current) => moment(current).add(1, "days").toDate() > new Date()}
                              onChange={value => {
                                this.setState({
                                  contactDetails: {
                                    ...this.state.contactDetails,
                                    date: value.toDate()
                                  }
                                });
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <Button className="btn btn-primary" type="submit">
                            Submit
                        </Button>
                        </Col>
                        {this.state.message && (
                          <Col lg={12} md={12} sm={12} xs={12}>
                            <br />
                            <Alert color="danger">{this.state.message}</Alert>
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

export default CallBackForm;
