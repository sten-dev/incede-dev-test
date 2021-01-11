import React, { Component } from "react";
import { Row, Container, Col } from "reactstrap";
import mobileImage from "../../../img/services/development-applications/mobile-bg.png";
const MobileApplications = props => {
    return (
        <React.Fragment>
            <Container>
                <Row className="api-services-content">
                    <Col lg={12} md={12} sm={12} xs={12}>
                        <Row>
                            <Col lg={7} md={12} sm={12} xs={12}>
                                <h2 className="m-0">Mobile Applications</h2>
                                <br />
                                <p>
                                    Incede offers user-centric mobile application development services to design & code apps with seamless experience for mobile devices with the latest platform features. We have dedicated teams that is capable of building the latest app indexing-compliant products for the iPhone, iPad, and Android. Our goal is to create an app for you that has a commanding presence on both the iOS App Store and the Google Play Store.
                        </p>
                                <br />
                                <p>
                                    Incede develops mobile apps for iPhone, iPad and Android Devices. Our team of enthusiastic analysts and developers work closely with you to understand your ideas and emotions behind the app and suggest a suitable platform and technology, we normally prefer to use native technologies; however, based on requirements, we might suggest and provide cross platform solutions which are lean and scalable.
                        </p>
                            </Col>
                            <Col lg={5} md={12} sm={12} xs={12}>
                                <div class="image-section">
                                    <img src={mobileImage} alt="support image" />
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={12} md={12} sm={12}>
                        <br />
                        <p>
                            Incede can help you with various types of Mobile application development. Some of the most common applications we have built include App Prototyping & Strategy, Cloud Mobility Solutions, m-Commerce, Integration with existing enterprise services & data, Cross-platform Application Development and Chat Bots.
                        </p>
                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    );
};

export default MobileApplications;
