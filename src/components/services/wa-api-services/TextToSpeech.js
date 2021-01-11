import React, { Component } from "react";
import { Row, Col, Container } from "reactstrap";
import textToSpeech from "../../../img/wa-api/text-to-speech.png"

const TextToSpeech = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} xs={12} id="text-to-speech">
            <Row>
              <Col lg={7} md={12} sm={12} xs={12}>
                <h2 className="m-0">Text to Speech</h2>
                <br />
                <p>
                  Convert written text into natural-sounding audio in a variety of languages and voices. With Watson Text to Speech, you can generate human-like audio from written text. Improve the customer experience and engagement by interacting with users in multiple languages and tones. Increase content accessibility for users with different abilities, provide audio options to avoid distracted driving, or automate customer service interactions to increase efficiencies.
            </p>
                <br />
                <p>
                  Incede understands speech synthesis and how to use annotations such as speed, pauses and transformations to adapt speech to meet the user’s expectations and needs.
            </p>
              </Col>
              <Col lg={5} md={12} sm={12} xs={12}>
                <div class="image-section">
                  <img src={textToSpeech} alt="support image" />
                </div>
              </Col>
            </Row>
          </Col>
          <Col lg={12} md={12} sm={12} >
            <br />
            <strong>Advanced Machine Learning</strong>
            <p>
              Text to Speech service offers voices that rely on two types of technology: neural voice technology and concatenative synthesis. Both technologies synthesize speech from input text, but they use different approaches to produce audio with different characteristics. Neural (V3) voices are enhanced versions of the service's original concatenative voices.
            </p>
            <br />
            <strong>Create Custom Voices </strong>
            <p>
              Create a uniquely branded voice adapted to a target speaker of your choosing from as little as an hour of recordings.
            </p>
            <br />
            <strong>
              Languages and voices
            </strong>
            <p>
              The Text to Speech service supports a variety of languages, voices, and dialects. The service offers at least one female voice for each language. For some languages the service offers multiple voices, including both male and female voices. Each voice uses appropriate cadence and intonation for its dialect.
            </p>



          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default TextToSpeech;
