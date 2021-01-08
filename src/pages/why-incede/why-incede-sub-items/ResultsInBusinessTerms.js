import React from "react";
import { Row, Col, Container } from "reactstrap";
import businessTerms from "../../../img/why-incede/business-terms.png";
import { Link } from "gatsby";
import arrowPrimary from "../../../img/arrow-primary.png";

const ResultsInBusinessTerms = props => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={7}
            className="d-flex align-items-center"
          >
            <div>
              <h1 className="text-left heading">Results in Business Terms</h1>
              <h4 className="my-4">
                Incede creates outcome-based IBM Watson AI solutions for your
                business
              </h4>
              <p className="sub-title">
                We are a business-savvy consulting and development firm using
                Watson technology. Results-oriented, our unique blend of
                industry knowledge and technical expertise solves our customer’s
                most challenging business problems
              </p>
              <br />
              <Container fluid>
                <Row>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/solutions/customer-service"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      Customer Service &nbsp;
                      <img src={arrowPrimary} alt="next" />
                    </Link>
                  </Col>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/solutions/human-resource-services"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      Human Resource Services &nbsp;
                      <img
                        src={arrowPrimary}
                        alt="next"
                        style={{ width: "8px" }}
                      />
                    </Link>
                  </Col>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/solutions/it-service-desk"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      IT Service Desk &nbsp;
                      <img
                        src={arrowPrimary}
                        alt="next"
                        style={{ width: "8px" }}
                      />
                    </Link>
                  </Col>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/solutions/sales-support-solutions"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      Sales Support Solutions &nbsp;
                      <img
                        src={arrowPrimary}
                        alt="next"
                        style={{ width: "8px" }}
                      />
                    </Link>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={5}
            className="mt-4 mt-lg-0 d-flex align-items-center"
          >
            <div className="image-section">
              <img src={businessTerms} alt="business team" />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ResultsInBusinessTerms;
