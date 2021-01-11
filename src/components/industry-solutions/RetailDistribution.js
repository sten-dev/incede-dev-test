import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/industry-solution.scss";
import DelticCaseStudy from "../../img/industry-solution/deltic-group.png";
import FlowersCaseStudy from "../../img/industry-solution/1800-flowers.png";
import CaseStudyCard from "../CaseStudyCard";

class RetailDistribution extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="industry-solution-content gap-y-half" id="1">
        <Container>
          <h1 className="text-left heading mb-5">Retail/Distribution/CPB</h1>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Messages-to-Conversations</p>
              <p className="content-body">
                Social media is a vital channel for retailers and Watson AI
                enables them to keep up with the message inflow and find ways of
                converting messengers into customers.
              </p>
              <br />
              <p className="content-body">
                <b>Incede</b> designs the virtual assistant to integrate with
                leading messenger applications such as Facebook, Slack, Intercom
                to select targeted message content and convert them into
                conversations and then transactions.
              </p>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <CaseStudyCard
                imageUrl={DelticCaseStudy}
                title="Deltic Group Case Study"
                link="/docs/deltic-group.pdf"
                viewClass="pl-4"
              >
                <ul className="my-3">
                  <li>
                    100% reply rate for 350,000 digital enquires will maximize
                    every opportunity to engage
                  </li>
                  <li>
                    10% uplift in pre-booked sales predicted by delivering fast
                    responses on social channels
                  </li>
                  <li>
                    5% increase in group revenues anticipated, driving
                    nationwide business growth
                  </li>
                </ul>
              </CaseStudyCard>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Customer Order & Pick-up</p>
              <p className="content-body">
                Brick and mortar stores are utilizing Watson Assistant to enable
                customers to inquire, order and pay for products – anytime and
                anywhere. The store's purpose is doubled from the traditional
                street business to a mobile customer’s distribution outlet.
              </p>
              <br />
              <p className="content-body">
                <b>Incede</b> develops the conversational flow to answer
                inquiries, process payments and confirm pick-up details with the
                store and customer.
              </p>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <CaseStudyCard
                imageUrl={FlowersCaseStudy}
                title="1-800 Flowers Case Study"
                link="https://www.ibm.com/services/ibmix/case-studies/1-800-flowers.html"
              >
                <ul className="my-3">
                  <li>help consumers find exactly what they’re looking for</li>
                  <li>cultivates that one-to-one relationship</li>
                  <li>increased the number of return customers</li>
                  <li>
                    increased the company’s revenue over the previous year
                  </li>
                </ul>
              </CaseStudyCard>
              {/* <div className="image-section mt-5">
                <img
                  className="sm-w-100"
                  src={RetailImage}
                  alt="support image"
                />
              </div> */}
            </Col>
          </Row>
          {/* <br />
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Expert Knowledge Base </p>
              <p className="content-body">
                The historical knowledge of a product, a plant, a line or a
                machine is no longer limited to the wisdom of the current staff
                or the latest frequently asked questions documents
              </p>
              <br />
              <p className="content-body">
                Incede uses Watson Discovery to ingest and index the libraries
                of maintenance logs, purchase histories, downtime reports,
                throughput data logs, quality control reports and even complex
                engineering specifications to vastly expand the organization’s
                knowledge base. Using natural language, employees use the
                simple, natural language interface of Watson Assistant to tap
                the organization’s now-expanded knowledge base for answers.
                Incede ingests, categorizes and marks the documents and then
                iteratively trains and tests the model to ensure document
                relevancy is obtained.
              </p>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={6}
              className="mt-4 mt-lg-0 image-center"
            >
              <div className="woodside p-2 d-flex mt-5 flex-column flex-sm-row">
                <div className="text-center">
                  <img
                    src={FlowersCaseStudy}
                    alt="Woodside"
                    className="case-study-image"
                  />
                </div>
                <div className="flex-grow-1 ml-3">
                  <p className="pp-1">1-800 Flowers Case Study</p>
                  <p className="pp-2 my-2">
                    Here’s a great example of how AI can be used to store and
                    utilize staff knowledge. Which resulted in 75% reduction in
                    reseach time for new employees.
                  </p>
                  <p className="pp-3">
                    <a
                      href="https://www.ibm.com/services/ibmix/case-studies/1-800-flowers.html"
                      target="blank"
                      className="case-study"
                    >
                      View Case Study
                    </a>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row>
            <Col>
              <div>
                <img width="100%" src={Manufacturing} alt="support image" />
              </div>
            </Col>
          </Row> */}
        </Container>
      </section>
    );
  }
}

export default RetailDistribution;
