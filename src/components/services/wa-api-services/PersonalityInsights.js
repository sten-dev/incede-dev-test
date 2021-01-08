import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

const PersonalityInsights = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} id="personality-insights">
            <h2 className="m-0">Personality Insights</h2>
            <br />
            <p>
              Personality Insights Uses linguistic analytics to infer
              personality traits, needs, values and their consumption
              preferences from natural language text. These insights are used to
              understand user inclinations and adapt interactions.
            </p>
            <br />
            <p>
              Incede assists in the creation of user profiles and targeted
              profile values to optimize Watson Personality Insights.
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default PersonalityInsights;
