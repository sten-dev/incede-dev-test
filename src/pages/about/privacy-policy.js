import React, { Component } from "react";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-scroll";

class PrivacyPolicy extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Layout pageTitle="Privacy Policy | Incede" page="cookie/policy">
          <Transition>
            <Container className="gap-y-half">
              <Row>
                <Col xs={12}>
                  <div>
                    <h1 className="text-primary">
                      <b>Our Privacy Policy</b>
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
                          md={11}
                          lg={10}
                          className="pb-5 pt-4"
                        >
                          <Container fluid>
                            <Row>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <p className="sub-title">
                                    At Incede, accessible from{" "}
                                    <a
                                      href="https://www.incede.ai"
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      incede.ai
                                    </a>
                                    , one of our main priorities is the privacy
                                    of our visitors. This Privacy Policy
                                    document contains types of information that
                                    is collected and recorded by Incede and how
                                    we use it.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    If you have additional questions or require
                                    more information about our Privacy Policy,
                                    do not hesitate to contact us.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    This Privacy Policy applies only to our
                                    online activities and is valid for visitors
                                    to our website with regards to the
                                    information that they shared and/or collect
                                    in Incede. This policy is not applicable to
                                    any information collected offline or via
                                    channels other than this website.
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">Consent</b>
                                  </h5>
                                  <p className="sub-title">
                                    By using our website, you hereby consent to
                                    our Privacy Policy and agree to its terms.
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      Information we collect
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    The personal information that you are asked
                                    to provide, and the reasons why you are
                                    asked to provide it, will be made clear to
                                    you at the point we ask you to provide your
                                    personal information.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    If you contact us directly, we may receive
                                    additional information about you such as
                                    your name, email address, phone number, the
                                    contents of the message and/or attachments
                                    you may send us, and any other information
                                    you may choose to provide.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    When you register for an Account, we may ask
                                    for your contact information, including
                                    items such as name, company name, address,
                                    email address, and telephone number.
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      How we use your information
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    We use the information we collect in various
                                    ways, including to:
                                  </p>
                                  <ul>
                                    <li>
                                      <p>
                                        Provide, operate, and maintain our
                                        website
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        Improve, personalize, and expand our
                                        website
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        Understand and analyze how you use our
                                        website
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        Develop new products, services,
                                        features, and functionality
                                      </p>
                                    </li>
                                    <li>
                                      <p>
                                        Communicate with you, either directly or
                                        through one of our partners, including
                                        for customer service, to provide you
                                        with updates and other information
                                        relating to the website, and for
                                        marketing and promotional purposes
                                      </p>
                                    </li>
                                    <li>
                                      <p>Send you emails</p>
                                    </li>
                                    <li>
                                      <p>Find and prevent fraud</p>
                                    </li>
                                  </ul>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">Log Files</b>
                                  </h5>
                                  <p className="sub-title">
                                    Incede follows a standard procedure of using
                                    log files. These files log visitors when
                                    they visit websites. All hosting companies
                                    do this and a part of hosting services'
                                    analytics. The information collected by log
                                    files include internet protocol (IP)
                                    addresses, browser type, Internet Service
                                    Provider (ISP), date and time stamp,
                                    referring/exit pages, and possibly the
                                    number of clicks. These are not linked to
                                    any information that is personally
                                    identifiable. The purpose of the information
                                    is for analyzing trends, administering the
                                    site, tracking users' movement on the
                                    website, and gathering demographic
                                    information.
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      Cookies and Web Beacons
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    Like any other website, Incede uses
                                    'cookies'. These cookies are used to store
                                    information including visitors' preferences,
                                    and the pages on the website that the
                                    visitor accessed or visited. The information
                                    is used to optimize the users' experience by
                                    customizing our web page content based on
                                    visitors' browser type and/or other
                                    information.
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      Advertising Partners Privacy Policies
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    You may consult this list to find the
                                    Privacy Policy for each of the advertising
                                    partners of Incede.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    Third-party ad servers or ad networks uses
                                    technologies like cookies, JavaScript, or
                                    Web Beacons that are used in their
                                    respective advertisements and links that
                                    appear on Incede, which are sent directly to
                                    users' browser. They automatically receive
                                    your IP address when this occurs. These
                                    technologies are used to measure the
                                    effectiveness of their advertising campaigns
                                    and/or to personalize the advertising
                                    content that you see on websites that you
                                    visit.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    Note that Incede has no access to or control
                                    over these cookies that are used by
                                    third-party advertisers.
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      Third Party Privacy Policies
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    Incede's Privacy Policy does not apply to
                                    other advertisers or websites. Thus, we are
                                    advising you to consult the respective
                                    Privacy Policies of these third-party ad
                                    servers for more detailed information. It
                                    may include their practices and instructions
                                    about how to opt-out of certain options.You
                                    may find a complete list of these Privacy
                                    Policies and their links here:
                                  </p>
                                  <ul>
                                    <li>
                                      <a
                                        href="https://www.ibm.com/privacy/details/us/en/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        IBM Privacy Statement
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://www.gatsbyjs.com/privacy-policy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Gatsby Privacy Policy
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://www.netlify.com/privacy/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Netlify Privacy policy
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://reactjs.org/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        React JS
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="https://getbootstrap.com/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Bootstrap
                                      </a>
                                    </li>
                                  </ul>
                                  <br />
                                  <p className="sub-title">
                                    You can choose to disable cookies through
                                    your individual browser options. To know
                                    more detailed information about cookie
                                    management with specific web browsers, it
                                    can be found at the browsers' respective
                                    websites. What Are Cookies?
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      CCPA Privacy Rights (Do Not Sell My
                                      Personal Information)
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    Under the CCPA, among other rights,
                                    California consumers have the right to:
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    Request that a business that collects a
                                    consumer's personal data disclose the
                                    categories and specific pieces of personal
                                    data that a business has collected about
                                    consumers.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    Request that a business delete any personal
                                    data about the consumer that a business has
                                    collected.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    Request that a business that sells a
                                    consumer's personal data, not sell the
                                    consumer's personal data.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    If you make a request, we have one month to
                                    respond to you. If you would like to
                                    exercise any of these rights, please{" "}
                                    <Link
                                      className="text-primary pointer"
                                      to="contact-us-form"
                                    >
                                      contact us
                                    </Link>
                                    .
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      GDPR Data Protection Rights
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    We would like to make sure you are fully
                                    aware of all of your data protection rights.
                                    Every user is entitled to the following:
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    The right to access – You have the right to
                                    request copies of your personal data. We may
                                    charge you a small fee for this service.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    The right to rectification – You have the
                                    right to request that we correct any
                                    information you believe is inaccurate. You
                                    also have the right to request that we
                                    complete the information you believe is
                                    incomplete.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    The right to erasure – You have the right to
                                    request that we erase your personal data,
                                    under certain conditions.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    The right to restrict processing – You have
                                    the right to request that we restrict the
                                    processing of your personal data, under
                                    certain conditions.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    The right to object to processing – You have
                                    the right to object to our processing of
                                    your personal data, under certain
                                    conditions.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    The right to data portability – You have the
                                    right to request that we transfer the data
                                    that we have collected to another
                                    organization, or directly to you, under
                                    certain conditions.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    If you make a request, we have one month to
                                    respond to you. If you would like to
                                    exercise any of these rights, please{" "}
                                    <Link
                                      className="text-primary pointer"
                                      to="contact-us-form"
                                    >
                                      contact us
                                    </Link>
                                    .
                                  </p>
                                </div>
                              </Col>
                              <Col xs={12}>
                                <div className="cookie-body">
                                  <h5 className="title">
                                    <b className="color-gray">
                                      Children's Information
                                    </b>
                                  </h5>
                                  <p className="sub-title">
                                    Another part of our priority is adding
                                    protection for children while using the
                                    internet. We encourage parents and guardians
                                    to observe, participate in, and/or monitor
                                    and guide their online activity.
                                  </p>
                                  <br />
                                  <p className="sub-title">
                                    Incede does not knowingly collect any
                                    Personal Identifiable Information from
                                    children under the age of 13. If you think
                                    that your child provided this kind of
                                    information on our website, we strongly
                                    encourage you to contact us immediately and
                                    we will do our best efforts to promptly
                                    remove such information from our records.
                                  </p>
                                  <br />
                                  <br />
                                  <p className="sub-title">
                                    If you have any questions now or during your
                                    visit, please submit your request through
                                    our{" "}
                                    <Link
                                      className="text-primary pointer"
                                      to="contact-us-form"
                                    >
                                      Contact Us
                                    </Link>{" "}
                                    form.
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

export default PrivacyPolicy;
