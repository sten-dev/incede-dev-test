import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import toneAnalyzerPng from "../../../img/wa-api/tone-analyzer.png"
const ToneAnalyzer = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} xs={12}>
            <Row>
              <Col lg={7} md={12} sm={12} xs={12}>
                <h2 className="m-0">Tone Analyzer</h2>
                <br />
                <p>
                  The Watson Tone Analyzer service outputs various tones—such as joy, sadness, anger, and agreeableness—in daily communications. These tones can impact the effectiveness of communication in different contexts. Tone Analyzer leverages cognitive linguistic analysis to identify a variety of tones at both the sentence and document level.
            </p>
                <br />
                <p>
                  Incede uses the Watson Tone Analyzer service to integrate your text sources and provide the tone results.
            </p>
              </Col>
              <Col lg={5} md={12} sm={12} xs={12}>
                <div class="image-section">
                  <img src={toneAnalyzerPng} alt="support image" />
                </div>
              </Col>
            </Row>
          </Col>

          <Col lg={12} md={12} sm={12} id="tone-analyzer">
            <br />
            <strong>
              Enhance customer service
           </strong>
            <p>
              Monitor customer service and support conversations so you can respond to your customers appropriately and at scale. See if customers are satisfied or frustrated, and if agents are polite and sympathetic. Use the Tone Analyzer for Customer Engagement endpoint to monitor customer support conversations. Escalate customer conversations when they turn sour, or find opportunities to improve customer service scripts, dialogs and customer journeys. Tones detected with this endpoint include frustrated, sad, satisfied, excited, polite, impolite and sympathetic.
           </p>
            <br />
            <strong>
              Online Product Review
           </strong>
            <p>
              In this age of rapid e-commerce growth, online product reviews hold a great deal of clout over customer shopping behaviors. Use social listening to Analyze emotions and tones in what people write online, like tweets or reviews. Predict whether they are happy, sad, confident, and more.
           </p>
            <br />
            <strong>
              Integrate with chatbots
           </strong>
            <p>
              Enable your chatbot to detect customer tones so you can build dialog strategies to adjust the conversation accordingly.
           </p>

          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default ToneAnalyzer;
