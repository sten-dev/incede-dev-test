import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/solutions.scss";
import ITServiceDesk from "../../img/solutions/it-services.png";
import { Link } from "gatsby";
import bankingImage from "../../img/solutions/banking-icon.png";
import communicationsImage from "../../img/solutions/communications-icon.png";
class ITService extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="solutions-content gap-y-half" id="3">
        <Container>
          <Row>
            <Col>
              <div className="content">
                <h1 className="text-primary">IT Service Desk</h1>
                <p>
                  Designed to automate parts of the service desk and to
                  effectively solve IT problems more quickly. These solutions
                  provide answers to product questions, return and exchange
                  policies, damaged in shipping claims and credit card disputes.
                </p>
                <br />
                <p>
                  <strong>Outcomes</strong>
                </p>
                <ul>
                  <li>
                    <p>Automate onboarding, offboarding tasks for employees.</p>
                  </li>
                  <li>
                    <p>Provide troubleshooting and suggestions to problems.</p>
                  </li>
                  <li>
                    <p>
                      Validate problem tickets containing relevant, required
                      information.
                    </p>
                  </li>
                  <li>
                    <p>
                      Augment suggestions with AI to recommend the most helpful
                      answers and resources.
                    </p>
                  </li>
                  <li>
                    <p>
                      Streamline and integrate channels for incoming requests
                      and outgoing answers.
                    </p>
                  </li>
                  <li>
                    <p>
                      Auto-escalate issues to human agents to serve
                      highest-urgency problems.
                    </p>
                  </li>
                  <li>
                    <p>Automation of routine tasks such as password resets.</p>
                  </li>
                </ul>
                <p>
                  <strong>Learn more in</strong>
                </p>
                <br />
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="learn-more-icon"
                      src={communicationsImage}
                      alt="banking"
                    />
                  </div>
                  <div className="pl-2">
                    <Link to="/industries/communications-services">
                      <strong>Communications and Services</strong>
                    </Link>
                  </div>
                </div>
                <br />
                <div className="d-flex align-items-center">
                  <div>
                    <img
                      className="learn-more-icon"
                      src={bankingImage}
                      alt="communications"
                    />
                  </div>
                  <div className="pl-2">
                    <Link to="/industries/banking-insurance">
                      <strong>Banking & Insurance</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0 d-flex">
              <div className="image-section">
                <img src={ITServiceDesk} alt="support image" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default ITService;
