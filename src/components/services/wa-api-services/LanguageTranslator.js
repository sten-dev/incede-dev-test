import React, { Component } from "react";
import { Row, Container, Col } from "reactstrap";

const LanguageTranslator = props => {
  return (
    <React.Fragment>
      <Container>
        <Row className="api-services-content">
          <Col lg={12} md={12} sm={12} id="language-translator">
            <h2 className="m-0">Language Translator</h2>
            <br />
            <p>
              Language translator offers domain-specific translations of text
              from one language to another to communicate with users in their
              own language
            </p>
            <br />
            <p>
              Incede provides the Watson Language Translator knowhow to
              implement translation models that leverage glossary pairing,
              phrase matching and corpus level customizations on converted
              documents, web pages, social media or conversational AI
              applications.
            </p>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default LanguageTranslator;
