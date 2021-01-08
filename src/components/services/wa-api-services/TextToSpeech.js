import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";

const TextToSpeech = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} id="text-to-speech">
            <h2 className="m-0">Text to Speech</h2>
            <br />
            <p>
              Text to speech converts written text into human-like audio in a
              variety of languages and voices.
            </p>
            <br />
            <p>
              Incede understands speech synthesis and how to use annotations
              such as speed, pauses and transformations to adapt speech to meet
              the user’s expectations and needs.
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default TextToSpeech;
