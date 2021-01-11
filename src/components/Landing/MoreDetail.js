import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/more_detail.scss";
import AiImage from "../../img/incede-home-page-middle.png";
class MoreDetail extends React.Component {
  state = {};
  render() {
    return (
      <section className="more-detail">
        <Container>
          <Row>
            <Col lg={8} md={7} sm={12} xs={12}>
              <article className="gap-y-half text-left mt-0 mt-sm-3 mt-lg-4">
                <h1 className="title">
                  Incede harnesses the power of Data, AI and Machine Learning
                </h1>
                <h5 className="text-white sub-title">
                  With more than half of the world’s data in natural language,
                  we solve business problems and create a competitive advantage
                  by leveraging the power of Watson AI and machine learning. We
                  collaborate with you to understand areas where AI or
                  automation will deliver value to the business and define a
                  roadmap of incremental steps to roll-out real solutions that
                  deliver to that value.
                </h5>
                <p id="business-terms" className="pt-2"></p>
                {/* <div className="py-2">
                  <Row>
                    <Col lg={4} md={6} sm={6} xs={12}>
                      <button className="btn more-btn btn-outline-info btn-lg w-100">
                        Why Incede
                        <img
                          src={arrow}
                          alt="next"
                          // style={{ width: "12px", }}
                        />
                      </button>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={12}>
                      <Link
                        to="/contact"
                        className="btn  more-btn btn-outline-info btn-lg w-100"
                      >
                        Contact Us
                        <img
                          src={arrow}
                          alt="next"
                          // style={{ width: "12px", }}
                        />
                      </Link>
                    </Col>
                    <Col lg={4} md={6} sm={6} xs={12}>
                      <Link
                        to="/about"
                        className="btn more-btn btn-outline-info btn-lg w-100"
                      >
                        About Us
                        <img
                          src={arrow}
                          alt="next"
                          // style={{ width: "12px", }}
                        />
                      </Link>
                    </Col>
                  </Row>
                </div> */}
              </article>
            </Col>
            <Col lg={4} md={5} className="d-none d-md-block position-initial">
              <div className="image-section gap-y-half">
                <img src={AiImage} alt="hero" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default MoreDetail;
