import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";

const ToneAnalyzer = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} id="tone-analyzer">
            <h2 className="m-0">Tone Analyzer</h2>
            <br />
            <p>
              Tone Analyzer uses linguistic analytics to detect emotional,
              social and language tones in natural language text to determine if
              and how to fine-tune application functions or interactions.
            </p>
            <br />
            <p>
              Incede uses the Watson Tone Analyzer service to integrate your
              text sources and provide the tone results.
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ToneAnalyzer;
