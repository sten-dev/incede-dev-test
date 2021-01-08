import React from "react";
import { Row, Col, Container } from "reactstrap";
import technologyPartners from "../../../img/why-incede/partners.png";

const TechnologyPartners = () => {
  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col xs={12} sm={12} md={12} lg={7} className="d-flex">
            <div>
              <h1 className="text-left heading">Incede Technology Partners</h1>
              <h4 className="my-4">
                We service every aspect of planning, licensing, developing,
                deploying & training
              </h4>
              <p className="sub-title">
                Our decade-long relationship with IBM has enabled us deliver
                numerous successful implementations. This success is primarily
                based on our shared vision to deliver the greatest business
                value for our customers.
              </p>
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
              <img src={technologyPartners} alt="customer success" />
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default TechnologyPartners;
