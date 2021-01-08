import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/industry-solution.scss";
import SupportField from "../../img/industry-solution/support-field.png";
import Manufacturing from "../../img/industry-solution/Manufacturing.png";
import Woodside from "../../img/industry-solution/Woodside.svg";

class ViewMore extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <section className="industry-solution-content gap-y-half">
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
                return trip. Incede develops the virtual assistant’s dialog by
                training a model to the targeted products, machines or locations
                with details such as model numbers, diagnostic steps and
                maintenance procedures.
              </p>
            </Col>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={6}
              className="mt-4 mt-lg-0 image-center"
            >
              <div className="image-section">
                <img src={SupportField} alt="support image" />
              </div>
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
                now-expanded knowledge base for answers. Incede ingests,
                categorizes and marks the documents and then iteratively trains
                and tests the model to ensure document relevancy is obtained.
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
                  <img src={Woodside} alt="Woodside" />
                </div>
                <div className="flex-grow-1 ml-3">
                  <p className="pp-1">Woodside Case Study</p>
                  <p className="pp-2 my-2">
                    Here’s a great example of how AI can be used to store and
                    utilize staff knowledge. Which resulted in 75% reduction in
                    reseach time for new employees.
                  </p>
                  <p className="pp-3">View Case Study</p>
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
          </Row>
        </Container>
      </section>
    );
  }
}

export default ViewMore;
