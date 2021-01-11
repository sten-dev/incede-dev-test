import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import CaseStudyCard from "../../CaseStudyCard";
import LingmoImage from "../../../img/services/lingmo.png";
const SpeechToText = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={7} md={6} sm={12} id="speech-to-text">
            <h2 className="m-0">Speech to Text</h2>
            <br />
            <p>
              Speech to text uses customizable speech recognition to generate text transcripts in real-time or batch.
            </p>
            <br />
            <br />
            <p>
              Incede develops and trains language models to understand and recognize domain specifics, jargons, dialects and expressions in audio and voice natural language.
            </p>
          </Col>
          <Col lg={5} md={6} sm={12}>
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
          <Col lg={12} md={12} sm={12}>
            <br />
            <strong>Powerful speech recognition</strong>
            <p>
              Customized speech-to-text capabilities, driven by machine learning, let customers ask their questions in natural language – fast-tracking them to the answer. You can also blend texting and voice simultaneously for instant information exchange by connecting Watson Speech to Text with Watson Assistant over the phone.
            </p>
            <br />
            <strong>Advanced Machine Learning</strong>
            <p>
              Speech to Text service relies on two key modeling capabilities: language modeling, that leverages a neural network-based language model to generate training text and acoustic modeling, that uses a fairly compact model to accommodate the resource limitations of the cloud. To train this compact model, IBM uses "teacher-student training / knowledge distillation." Large and strong neural networks such as Long Short-Term Memory (LSTM), VGG, and the Residual Network (ResNet) are first trained. The output of these networks is then used as teacher signals to train a compact model for actual deployment.
            </p>
            <br />
            <strong>Automatically transcribes proper nouns and context-specific formatting</strong>
            <p>
              Speech-to-Text is tailored to work well with real-life speech and can accurately transcribe your audio in real-time or via uploaded batch files using any of our available out-of-the-box language models, audio frequency options and transcription output features. Format and organize your transcripts as you need by using features such as speaker labels, smart formatting, keyword spotting, numeric redaction, word timestamps, confidence and alternatives.
            </p>
            <br />
            <strong>Hands-on speech training capabilities</strong>
            <p>
              Improve accuracy for your use case, especially around domain-specific terminology, acronyms, names, jargons, expressions, dialects and acoustical
            </p></Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default SpeechToText;
