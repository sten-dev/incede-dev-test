import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/solutions.scss";
import SalesSupportImage from "../../img/solutions/sales-services.png";
import ManufacturingImage from "../../img/solutions/manufacturing.png";
import { Link } from "gatsby";

class SalesSupport extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="solutions-content gap-y-half" id="3">
        <Container>
          <Row>
            <Col xs={12} sm={12} md={6} lg={6}>
              <div className="content">
                <h1 className="text-primary">Sales Support</h1>
                <p>
                  It supports the sales team during the sales cycle using AI
                  solutions. It provides answers to product questions, upsell
                  and cross-sell recommendations, retrieves product or service
                  documentation and verifies product compatibility and
                  cross-references.
                </p>
                <br />
                <p>
                  <strong>Outcomes</strong>
                </p>
                <ul>
                  <li>
                    <p>
                      Allows support engineers and technicians to support
                      exceptional, high-value opportunities.
                    </p>
                  </li>
                  <li>
                    <p>
                      Provide customer-specific answers based on past and
                      current histories and activities.
                    </p>
                  </li>
                  <li>
                    <p>
                      Available to support sellers anytime – when their
                      prospects expect answers.
                    </p>
                  </li>
                  <li>
                    <p>
                      Prompt sellers to gather and provide relevant, required
                      information about a product or service.
                    </p>
                  </li>
                  <li>
                    <p>
                      Guided automation of tasks such as returns, exchanges or
                      warranty claims.
                    </p>
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
                      src={ManufacturingImage}
                      alt="manufacturing"
                    />
                  </div>
                  <div className="pl-2">
                    <Link to="/industries/industrial-manufacturing">
                      <strong>Industrial/Manufacturing</strong>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={12} sm={12} md={6} lg={6} className="mt-4 mt-lg-0 d-flex">
              <div className="image-section">
                <img src={SalesSupportImage} alt="support image" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default SalesSupport;
