import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/industry-solution.scss";
import CrevalCaseStudy from "../../img/industries/creval.png";
import CaixaBankCaseStudy from "../../img/industries/caixa_bank.png";
import CaixaBankMain from "../../img/industries/caixa_bank_main.png";
// import bankingImage from "../../img/industries/baking-1.png";
import CaseStudyCard from "../CaseStudyCard";
import VideoCaseStudyCard from "../VideoCaseStudyCard";
import BankOfScotland from "../../img/industry-solution/bank-of-scotland.png";

class Banking extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="industry-solution-content gap-y-half" id="3">
        <Container>
          <h1 className="text-left heading mb-5">Banking & Insurance </h1>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Conversational Banking </p>
              <p className="content-body">
                Watson Assistant enables customers to ask questions or request
                services using natural language – anytime, anywhere and on any
                device. While customers perform important requests such as
                transferring funds between accounts, applying for a mortgage or
                inquiring about the bank’s commercial loan policies, Watson is
                secure, fast and simple.
              </p>
              <br />
              <p className="content-body">
                <b>Incede</b> develops the virtual assistant’s dialog by
                integrating a trained model of targeted intents, associated
                entities,and triggers that personalizes the experiences while
                ensuring accuracy and compliance.
              </p>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={6}
              className="mt-4 mt-lg-0 image-center flex-column"
            >
              {/* <div className="image-section">
                <img src={SupportField} alt="support image" />
              </div> */}
              <VideoCaseStudyCard
                imageUrl={BankOfScotland}
                embeddedUrl="https://www.youtube.com/embed/KQAMo4tFyYQ?modestbranding=1"
                title="Royal Bank of Scotland"
                link="https://www.youtube.com/watch?v=KQAMo4tFyYQ"
                viewClass="pl-4"
              >
                <ul className="my-3">
                  <li>Increased Net Promoter Score (NPS) by 20%</li>
                  <li>Surface the actual questions customers are asking</li>
                  <li>
                    understand customer sentiment, like unhappiness or
                    frustration, and change its tone and actions accordingly
                  </li>
                </ul>
              </VideoCaseStudyCard>
              <CaseStudyCard
                imageUrl={CrevalCaseStudy}
                title="Creval Banking Group"
                link="/docs/creval-banking.pdf"
                viewClass="pl-4"
              >
                <ul className="my-3">
                  <li>Increased Net Promoter Score (NPS) by 20%</li>
                  <li>Surface the actual questions customers are asking</li>
                  <li>
                    understand customer sentiment, like unhappiness or
                    frustration, and change its tone and actions accordingly
                  </li>
                </ul>
              </CaseStudyCard>
              {/* <div className="woodside p-2 d-flex mt-5 flex-column flex-sm-row">
                <div className="text-center">
                  <img
                    src={CrevalCaseStudy}
                    alt="Creval"
                    className="case-study-image"
                  />
                </div>
                <div className="flex-grow-1 ml-3">
                  <p className="pp-1">Creval Banking Case Study</p>
                  <p className="pp-2 my-2">
                    Here’s a great example of how AI can be used to store and
                    utilize staff knowledge. Which resulted in 75% reduction in
                    reseach time for new employees.
                  </p>
                  <p className="pp-3">
                    <a
                      href="/docs/creval-banking.pdf"
                      target="_blank"
                      className="case-study"
                      rel="noopener noreferrer"
                    >
                      View Case Study
                    </a>
                  </p>
                </div>
              </div> */}
            </Col>
          </Row>
          <br />
          <br />
        </Container>
        {/* <Container fluid style={{ background: "rgba(122, 121, 121, 0.06)" }}>
          <Container>
            <section className="gap-y">
              <img className="sm-w-100" src={bankingImage} alt="banking" />
            </section>
          </Container>
        </Container> */}
        <Container>
          <Row className="gap-y">
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">
                Automating Call Center Services{" "}
              </p>
              <p className="content-body">
                Integrating Watson Discovery with Watson Assistant allows
                employees to ask questions about products, services or
                regulations – instantly and without burdening the call center.
                The virtual assistant’s dialog is enhanced by marking,
                annotating and training a model to understand documents such as
                financial statements, credit bureau reports and business
                agreements.
              </p>
              <br />
              <br />
              <br />
              <br />

              <p className="content-body">
                Using Smart Document Understanding (SDU), <b>Incede</b>{" "}
                customizes the solution to ingest new documents and recognize
                structure and elements such as title, subtitle, author and
                complex content such as tables, images and citations.
              </p>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <CaseStudyCard
                imageUrl={CaixaBankCaseStudy}
                title="CaixaBank Case Study"
                link="https://www.ibm.com/case-studies/caixabank"
                viewClass="pl-4"
              >
                <ul className="my-3">
                  <li>
                    80% of queries answered instantly, reducing call center
                    volumes
                  </li>
                  <li>
                    Accelerates access to product and service information for
                    employees
                  </li>
                  <li>Enables faster and more responsive customer services</li>
                </ul>
              </CaseStudyCard>
              <div className="image-section">
                <img
                  src={CaixaBankMain}
                  alt="Caixa Bank"
                  className="sm-w-100"
                />
              </div>

              {/* <div className="woodside p-2 d-flex mt-5 flex-column flex-sm-row">
                <div className="text-center">
                  <img
                    src={CaixaBankCaseStudy}
                    alt="Caixa Bank"
                    className="case-study-image"
                  />
                </div>
                <div className="flex-grow-1 ml-3">
                  <p className="pp-1">CaixaBank Case Study</p>
                  <p className="pp-2 my-2">
                    Here’s a great example of how AI can be used to store and
                    utilize staff knowledge. Which resulted in 75% reduction in
                    reseach time for new employees.
                  </p>
                  <p className="pp-3">
                    <a
                      href="https://www.ibm.com/case-studies/caixabank"
                      target="_blank"
                      className="case-study"
                      rel="noopener noreferrer"
                    >
                      View Case Study
                    </a>
                  </p>
                </div>
              </div> */}
            </Col>
            {/* <Col xs={12} sm={12} md={12} lg={12} className="text-center">
              <img src={CaixaBankMain} alt="Caixa Bank" className="sm-w-100" />
            </Col> */}
          </Row>
        </Container>
      </section>
    );
  }
}

export default Banking;
