import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about/career.scss";
import { HTMLContent } from "../Content";

class Career extends React.Component {
  state = {};
  render() {
    const { careerSummary } = this.props;
    return (
      <div>
        <section className="career gap-x">
          <Container>
            <Row>
              <Col>
                <article className="gap-y">
                  <h1 className="title">Careers</h1>
                  <h6 className="lead sub-title">
                    <HTMLContent content={careerSummary} />
                  </h6>
                </article>
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    );
  }
}

export default Career;
