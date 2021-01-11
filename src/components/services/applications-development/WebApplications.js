import React, { Component } from "react";
import { Row, Container, Col } from "reactstrap";
import webImage from "../../../img/services/development-applications/web-bg.png";
const WebApplications = props => {
    return (
        <React.Fragment>
            <Container>
                <Row className="api-services-content">
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Row>
                            <Col lg={7} md={12} sm={12} xs={12}>
                                <h2 className="m-0">Web Applications</h2>
                                <br />
                                <p>
                                    Successful web applications have a front-end that excites users and functions properly on all devices. We design and develop websites on all major open source platforms and also create web services to provide online tools and backend for mobile applications. We are experts in latest technologies, including HTML5, CSS3, JavaScript frameworks like Angular, React, and NodeJS along with technologies such as .Net and Java.
                        </p>
                                <br />
                                <p>
                                    At Incede, we are a team of professional developers and designers employing Agile and Scrum to build growth-driven web applications. Our web development forte includes developing Single-page applications, Progressive Web Applications, enterprise portals, e-commerce portals, custom web applications, large-scale websites, web tools and SaaS solutions that fulfills your end-users as well as business needs.
                        </p>
                            </Col>
                            <Col lg={5} md={12} sm={12} xs={12}>
                                <div class="image-section">
                                    <img src={webImage} alt="support image" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <br />
                        <p>
                            At Incede, we are a team of professional developers and designers employing Agile and Scrum to build growth-driven web applications. Our web development forte includes developing Single-page applications, Progressive Web Applications, enterprise portals, e-commerce portals, custom web applications, large-scale websites, web tools and SaaS solutions that fulfills your end-users as well as business needs.
                        </p>
                        <br />
                        <strong>E-Commerce Development</strong>
                        <p>
                            Our e-commerce development provides you far more than a mere buying and selling platform. We focus on developing solutions for your retail store that piques customer engagement and retention. We can help with visual-try-on, personalized recommendation, push notifications to conversational marketing (live chat, chatbots) and admin panel. We can build the state-of-the-art capabilities that your retail e-commerce store needs. We can also integrate and customize third-party tools for inventory management and supply chain management.
                        </p>
                        <br />
                        <strong>Mobile Backend Development</strong>
                        <p>We understand the role of an efficient and feature-rich backend for a successful mobile application. We develop a,high performing mobile backend that is features-rich and provides a simple way to manage your application. We build custom APIs, develop your business logic and integrate admin tools that provide you more control over your mobile application and include monitoring & analytics tools.</p>
                        <br />
                        <strong>Enterprise Application Development</strong>
                        <p>
                            We develop enterprise-level applications that require intensive knowledge, research, innovative approach and cutting-edge technologies. These web applications require a high level of security, coding standards, efficient project management and scalable infrastructure - and our web development team caters to all of these.
                        </p>
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    );
};

export default WebApplications;
