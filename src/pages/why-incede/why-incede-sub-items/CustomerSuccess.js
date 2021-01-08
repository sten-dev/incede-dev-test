import React from "react";
import { Row, Col, Container } from "reactstrap";
import { Link } from "gatsby";
import arrowPrimary from "../../../img/arrow-primary.png";
import customerSuccess from "../../../img/why-incede/customer-success.png";

const CustomerSuccess = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={7} className="d-flex">
            <div>
              <h1 className="text-left heading">Customer Successes</h1>
              <h4 className="my-4">
                Customer success is measured in business value
              </h4>
              <p>
                Our integrity and trust are established by our 450+ customers
                across several industries, large and mid-sized, for- and
                non-profit.
              </p>
              <br />
              <Container fluid>
                <Row>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/industries/retail-distribution"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      Retail/Distribution &nbsp;
                      <img
                        src={arrowPrimary}
                        alt="next"
                        style={{ width: "8px" }}
                      />
                    </Link>
                  </Col>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/industries/industrial-manufacturing"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      Industrial/Manufacturing &nbsp;
                      <img
                        src={arrowPrimary}
                        alt="next"
                        style={{ width: "8px" }}
                      />
                    </Link>
                  </Col>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/industries/banking-insurance"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      Banking & Insurance &nbsp;
                      <img
                        src={arrowPrimary}
                        alt="next"
                        style={{ width: "8px" }}
                      />
                    </Link>
                  </Col>
                  <Col md={6} xs={12} className="p-2">
                    <Link
                      to="/industries/communications-services"
                      className="btn why-incede-btn primary btn-outline-info btn-lg w-100"
                    >
                      Communication & Services &nbsp;
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
              <img src={customerSuccess} alt="customer success" />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default CustomerSuccess;
