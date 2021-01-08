import React, { Component } from "react";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-scroll";

class CookiesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Layout pageTitle="Cookie Policy | Incede" page="cookie/policy">
          <Transition>
            <Container className="gap-y-half cookie-policy">
              <Row>
                <Col xs={12}>
                  <div>
                    <h1 className="text-primary">
                      <b>Cookies and Similar Technology</b>
                    </h1>
                  </div>
                </Col>
                <Col>
                  <div style={{ backgroundColor: "#F2F2F2" }}>
                    <Container fluid>
                      <Row>
                        <Col
                          xs={12}
                          sm={12}
                          md={12}
                          lg={12}
                          className="pb-5 pt-4"
                        >
                          <Container fluid>
                            <Row>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <p className="sub-title">
                                    Cookies and related technology can be used to recognize you when visiting Incede.ai.  Cookies are used to store your preferences and settings to provide a personalized experience.  Cookies may improve the performance of Incede.ai such as completing information on forms.  Cookies can be used in marketing while on or off Incede.ai. to receive content such as white papers, promotions such as service offerings or event invitations.
                                  </p>
                                  <h5 className="title">
                                    <b className="color-gray">
                                      Information collected from and about you
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    We collect contact information including your name, your company name, job title or role, address, phone number and email requested on forms.
                                    </p>
                                  <p className="sub-title">
                                    When you make purchases on our site, we or our vendors collect payment information including your credit card information.
                                      </p>
                                  <p className="sub-title">
                                    We collect information you submit or post on our site. If you contact us, apply for a job, respond to a survey or download content, we will collect the information you provide.
                                        </p>
                                  <p className="sub-title">
                                    We collect other information such as information about your device, internet protocol address and your activity, including the browser you are using or the pages you visit.  We may collect what site you came from, or what site you visit when you leave our site.
                                          </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      How information collected is used
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    We use information to respond to your requests or questions.
                                    </p>
                                  <p className="sub-title">
                                    We use information for marketing purposes.
                                    </p>
                                  <p className="sub-title">
                                    We use information to improve our site, solutions and services.
                                  </p>
                                  <p className="sub-title">
                                    We use information to understand site trends and user interests.  We may use your information to make site improvements. We may also combine information we get from you with information about you we have received from third parties.
                                  </p>
                                  <p className="sub-title">
                                    We use information for security purposes. We may use information to protect our company and our customers. We also use information to protect our site.
                                    </p>
                                  <p className="sub-title">
                                    We use information to communicate with you to tell you about changes to this Policy or our site Terms. We may also communicate with you about issues with your purchases.
                                  </p>
                                  <p className="sub-title">
                                    We use information as otherwise permitted by law or as we may notify you. We will obtain your consent as required by law.
                                    </p>
                                  <p className="sub-title">
                                    We retain your information for business purposes and as long as is reasonably necessary.
                                    </p>
                                  <p className="sub-title">
                                    We retain your information as reasonably necessary to comply with our legal obligations.
                                    </p>
                                  <p className="sub-title">
                                    We may also retain cached or archived copies of your information for a reasonable period of time.
                                    </p>
                                  <p className="sub-title">
                                    We will share information with business partners and third parties who perform services on our behalf such as those who operate our sites, run promotions and send emails.
                                    </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      Updates to this Policy
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    We may update this policy from time to time. We will communicate with you of any material changes to our Policy as required by law. Please check our site periodically for updates.
                                  </p>
                                </div>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Col>
              </Row>
            </Container>
          </Transition>
        </Layout>
      </React.Fragment>
    );
  }
}

export default CookiesPage;
