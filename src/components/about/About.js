import React from "react";
import { Container, Row, Col } from "reactstrap";
import "../../styles/about/about.scss";
import PreviewCompatibleImage from "../PreviewCompatibleImage";
import { HTMLContent } from "../Content";

class About extends React.Component {
  render() {
    const { title, section } = this.props;
    return (
      <div>
        <section className="about-top-section">
          <Container>
            <Row>
              <Col>
                <article className="gap-y">
                  <h1 className="title">About Us</h1>
                  <h6 className="lead sub-title">{title}</h6>
                </article>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="about-bottom-section">
          <Container fluid>
            <Row>
              <Col sm={6} lg={6} md={6} className="pl-0 d-none d-sm-block">
                <div className="image-section">
                  <PreviewCompatibleImage
                    imageInfo={{
                      image: section.image,
                      alt: `case study`
                    }}
                  />
                </div>
              </Col>
              <Col sm={6} lg={6} md={6}>
                <article className="gap-y text-center text-sm-left pr-0 pr-md-3 pr-lg-5">
                  <h1 className="title ">{section.title}</h1>
                  <div className="image-section2  d-block d-sm-none">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: section.image,
                        alt: `case study`
                      }}
                    />
                  </div>
                  <h6 className="lead sub-title">
                    <HTMLContent content={section.description} />
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

export default About;
