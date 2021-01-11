import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/industry-solution.scss";
import Enterprise1 from "../../img/industry-solution/cognitive-enterprise-1.png";
import Enterprise2 from "../../img/industry-solution/cognitive-enterprise-2.png";
// import Manufacturing from "../../img/industry-solution/communications.png";
import VidahoraCaseSudy from "../../img/industry-solution/vidahora.png";
import VodafoneCaseStudy from "../../img/industry-solution/vodafone-case-study.png";
import VideoCaseStudyCard from "../VideoCaseStudyCard";
import CaseStudyCard from "../CaseStudyCard";

class Communication extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="industry-solution-content gap-y-half" id="4">
        <Container>
          <h1 className="text-left heading mb-5">
            Communications and Services
          </h1>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Customer Self-Service</p>
              <p className="content-body">
                Watson Assistant allows telcos the ability to automate the high
                volume, low value transactions that customers regularly request
                such as service changes, payment processing and account
                inquiries, while providing a simple, efficient and thorough
                customer experience.
              </p>
              <br />
              <br />
              <br />
              <p className="content-body">
                <b>Incede</b> develops the virtual assistant’s dialog by
                integrating a trained model of intents for targeted services and
                products and establishing the associations of triggers that
                provide the information, answers and steps for the customer’s
                requests – securely, efficiently and easy.
              </p>
              <br />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <VideoCaseStudyCard
                imageUrl={VodafoneCaseStudy}
                embeddedUrl="https://www.youtube.com/embed/bYqazJ5jy2k?modestbranding=1"
                title="Vodafone"
                link="https://www.youtube.com/watch?v=bYqazJ5jy2k"
                viewClass="pl-4"
              >
                <ul className="my-3">
                  <li>
                    Remove high-volume, low-value activities from call center
                  </li>
                  <li>Empower human agents to become specialists</li>
                  <li>Achieve “Excellent” NPS Score</li>
                </ul>
              </VideoCaseStudyCard>
              <div className="image-section mt-5">
                <img
                  className="sm-w-100"
                  src={Enterprise1}
                  alt="support image"
                />
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Employee Self-Service </p>
              <p className="content-body">
                Services organizations who engage with their employees have
                employees who are engaged with their clients. Combining the
                capabilities of Watson Discovery and Watson Assistant allows
                employees to find answers about their vacation balances, expense
                reimbursements, job postings and HR policies anytime and from
                anywhere.
              </p>
              <br />
              <br />
              <br />
              <br />
              <p className="content-body">
                <b>Incede</b> develops a dialog that focuses on the key areas
                that employees and HR care most about. We integrate internal
                documents such as the employee handbook and state & local
                employment law documents. Watson Discovery can even integrate
                client-and employee-specific documents like a client travel
                policies or statements of work agreement that would apply to the
                employees on-site at the client.
              </p>
              <br />
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <CaseStudyCard
                imageUrl={VidahoraCaseSudy}
                title="Vidahora Case Study"
                link="https://www.ibm.com/case-studies/vidahora-watson-employee-engagement"
                viewClass="pl-4"
              >
                <ul className="my-3">
                  <li>
                    40% average time-saving for HR functions by reducing
                    administration workloads
                  </li>
                  <li>
                    Empowers HR personnel to spend more time on value-added
                    talent development
                  </li>
                  <li>
                    Helps Vidahora’s clients cultivate happier, healthier and
                    more productive workplaces
                  </li>
                </ul>
              </CaseStudyCard>
              <div className="image-section mt-5">
                <img
                  className="sm-w-100"
                  src={Enterprise2}
                  alt="support image"
                />
              </div>
            </Col>
          </Row>
          <br />
          {/* <br />
          <br />
          <Row>
            <Col>
              <div>
                <img
                  className="w-100 sm-w-100"
                  src={Manufacturing}
                  alt="support image"
                />
              </div>
            </Col>
          </Row> */}
        </Container>
      </section>
    );
  }
}

export default Communication;
