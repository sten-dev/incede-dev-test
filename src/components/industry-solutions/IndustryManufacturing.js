import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/industry-solution.scss";
import SupportField from "../../img/industry-solution/support-field.png";
import Manufacturing from "../../img/industry-solution/Manufacturing.png";
import Woodside from "../../img/industry-solution/woodside-logo.png";
import KPMGImage from "../../img/industries/kpmg-logo.png";

import CaseStudyCard from "../CaseStudyCard";

class IndustryManufacturing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="industry-solution-content gap-y-half" id="2">
        <Container>
          <h1 className="text-left heading mb-5">Industrial / Manufacturing</h1>
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Supporting Field Support </p>
              <p className="content-body">
                Field technicians are deployed to install, service and repair
                equipment at customer, supplier or company-owned locations
                around the world – sometimes in remote or rural locations. Once
                on site, the tech must be able to diagnose and correct an
                enormous array of problems, relying ultimately on their personal
                expertise and experience.
              </p>
              <br />
              <p className="content-body">
                Watson Assistant bridges the inexperienced, the unfamiliar and
                the uncommon for the tech to find answers without delays or a
                return trip. <b>Incede</b> develops the virtual assistant’s
                dialog by training a model to the targeted products, machines or
                locations with details such as model numbers, diagnostic steps
                and maintenance procedures.
              </p>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              {/* <div className="image-section mt-5">
                <img className="sm-w-100" src={SupportField} alt="support image" />
              </div> */}
              <CaseStudyCard
                imageUrl={KPMGImage}
                title="KPMG Case Study"
                link="https://www.ibm.com/watson/stories/kpmg/"
              >
                <ul className="my-3">
                  <li>
                    Helps tax advisors determine tax relief eligibility for
                    clients
                  </li>
                  <li>
                    Quickly examine massive amounts of loan assets and nuanced
                    tax interpretations
                  </li>
                  <li>Provide clients richer, more detailed recommendations</li>
                </ul>
              </CaseStudyCard>
            </Col>
          </Row>
          <br />
          <br />
          <br />
          <Row>
            <Col xs={12} sm={12} md={12} lg={6}>
              <p className="content-heading mb-3">Expert Knowledge Base </p>
              <p className="content-body">
                The historical knowledge of a product, a plant, a line or a
                machine is no longer limited to the wisdom of the current staff
                or the latest frequently asked questions documents. Watson
                Discovery ingests and indexes the libraries of maintenance logs,
                purchase histories, downtime reports, throughput data logs,
                quality control reports and even complex engineering
                specifications to vastly expand the organization’s knowledge
                base. Using natural language, employees use the simple, natural
                language interface of Watson Assistant to tap the organization’s
                now-expanded knowledge base for answers. <b>Incede</b> ingests,
                categorizes and marks the documents and then iteratively trains
                and tests the model to ensure document relevancy is obtained.
              </p>
            </Col>
            <Col xs={12} sm={12} md={12} lg={6} className="mt-4 mt-lg-0">
              <CaseStudyCard
                imageUrl={Woodside}
                title="Woodside Case Study"
                link="https://www.ibm.com/watson/stories/woodside/"
                viewClass="pl-4"
              >
                <ul className="my-3">
                  <li>
                    Engineer-time spent on researching has been reduced by 75%
                  </li>
                  <li>
                    Saved $10 million-worth of time and kept employees safe
                  </li>
                  <li>
                    Bridged knowledge transfer from the past wisdom and
                    learnings
                  </li>
                </ul>
              </CaseStudyCard>
            </Col>
          </Row>
          <br />
          {/* <br />
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

export default IndustryManufacturing;
