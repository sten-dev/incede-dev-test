import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CaseStudyCard from "../../CaseStudyCard";
import AutoGlassImage from "../../../img/services/auto-glass-body-repair.png";
const VisualRecognition = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={6} md={6} sm={12} id="visual-recognition">
            <h2 className="m-0">Visual Recognition</h2>
            <br />
            <p>
              Visual Recognition makes it easy to analyze images with objects,
              colors, food and other subjects to surface content through natural
              language.
            </p>
            <br />
            <p>
              Incede experts create and train custom, highly accurate models
              that understand your image content
            </p>
          </Col>
          <Col lg={6} md={6} sm={12}>
            <CaseStudyCard
              imageUrl={AutoGlassImage}
              title="Auto Glass Case Study"
              link="https://www.ibm.com/case-studies/autoglass-bodyrepair"
              viewClass="pl-4"
            >
              <ul className="my-3">
                <li>Generating repair quotes 70% faster</li>
                <li>Allows employees to focus on more complex claims</li>
                <li>AI analysis to determine repair costs</li>
              </ul>
            </CaseStudyCard>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default VisualRecognition;
