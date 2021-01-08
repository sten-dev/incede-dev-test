import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CaseStudyCard from "../../CaseStudyCard";
import LingmoImage from "../../../img/services/lingmo.png";
const SpeechToText = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={6} md={6} sm={12} id="speech-to-text">
            <h2 className="m-0">Speech to Text</h2>
            <br />
            <p>
              Speech to text uses customizable speech recognition to generate
              text transcripts in real-time or batch.
            </p>
            <br />
            <p>
              Incede develops and trains language models to understand and
              recognize domain specifics, jargons, dialects and expressions in
              audio and voice natural language.
            </p>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <CaseStudyCard
              imageUrl={LingmoImage}
              title="Lingmo Case Study"
              link="https://www.ibm.com/case-studies/lingmo-international1"
              viewClass="pl-4"
            >
              <ul className="my-3">
                <li>Accurate, nuanced, real-time translation services.</li>
                <li>
                  More than the gist; understand the full context of a
                  conversation.
                </li>
                <li>
                  Boosts responsiveness to user feedback and enhances quality.
                </li>
              </ul>
            </CaseStudyCard>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SpeechToText;
