import React, { Component } from 'react';
import { Container, Row, Card, CardBody, Col, FormGroup, Label, Input, Form, Button, Spinner, Alert } from 'reactstrap';
import logo from "../../img/logo.svg";
import { loginAgent } from '../../../Service';
import "../../styles/login.scss";
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                password: "",
            },
            isRequestPending: false,
            errorMessage: ""
        }
    }
    handleOnChange = event => {
        let eve = { ...event };
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                [eve.target.name]: eve.target.value
            }
        }))
    }
    handleSubmit = async (event) => {
        event.preventDefault();
        this.setState({
            isRequestPending: true
        })
        let result = await loginAgent({
            EMAIL: this.state.user.email,
            PASSWORD: this.state.user.password
        });
        console.log(result)
        if (result.success) {
            window.localStorage.setItem("incedeAuthToken", result.data);
            this.setState({
                isRequestPending: false,
            }, () => {
                window.location.href = "/"
            })
        } else {
            this.setState({
                errorMessage: "Error while Logging.",
                isRequestPending: false,
            })
        }
    }
    render() {
        return (
            <React.Fragment>
                <section className="gap-y">
                    <Container>
                        <Row className="d-flex justify-content-center">
                            <Col lg={6} md={8} sm={10} xs={12}>
                                <Card>
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                            <div className="text-center">
                                                <img src={logo} alt="incede" />
                                            </div>
                                            <br />
                                            {/* <h4 className="m-0 text-center">Login</h4> */}
                                            {/* <br /> */}
                                            <Row>
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                </Col>
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                    <FormGroup>
                                                        <Label>Email</Label>
                                                        <Input onChange={this.handleOnChange} value={this.state.user.email} type="email" name="email" placeholder="Email" required />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                    <FormGroup>
                                                        <Label>Password</Label>
                                                        <Input onChange={this.handleOnChange} value={this.state.user.password} type="password" name="password" placeholder="Password" required />
                                                    </FormGroup>
                                                </Col>
                                                <Col lg={12} md={12} sm={12} xs={12}>
                                                    <div className="text-center">
                                                        <Button disabled={this.state.isRequestPending} className="btn btn-primary login-btn" type="submit">
                                                            {this.state.isRequestPending &&
                                                                <React.Fragment>
                                                                    <Spinner size="sm" />
                                                                    &nbsp;
                                                                </React.Fragment>
                                                            }
                                                            Login</Button>
                                                    </div>
                                                </Col>
                                                {this.state.errorMessage && (
                                                    <Col lg={12} md={12} sm={12} xs={12}>
                                                        <br />
                                                        <Alert color="danger">
                                                            {this.state.errorMessage}
                                                        </Alert>
                                                    </Col>
                                                )}
                                            </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </React.Fragment>
        );
    }
}

export default Login;