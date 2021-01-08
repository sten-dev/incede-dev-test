import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

const NaturalLanguageClassifier = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} id="natural-language">
            <h2 className="m-0">Natural Language Classifier</h2>
            <br />
            <p>
              Natural language classifier mimics the human ability to classify
              naturally expressive phrases into categories or classes using deep
              learning and shares those intentions with other applications such
              as conversation AI.
            </p>
            <br />
            <p>
              Incede trains Watson Natural Language Classifier to understand and
              associate representative text with the established terms and
              conventions.
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default NaturalLanguageClassifier;
