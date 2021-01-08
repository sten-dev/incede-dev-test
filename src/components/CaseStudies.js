import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../styles/case-studies.scss";
import { Container, Row, Col } from "reactstrap";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import arrow from "../img/arrow.svg";
import { Link } from "gatsby";


class CaseStudies extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: caseStudies } = data.allMarkdownRemark;

    // console.log("caseStudies", caseStudies);
    return (
      <section className="case-studies">
        <Container>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop={false}
            showArrows={false}
          >
            {caseStudies.map((x, i) => {
              let caseStudy = x.node.frontmatter;
              return (
                <div key={i}>
                  <Row>
                    <Col lg={6} md={5} className="text-center text-md-left">
                      <h1 className="text-white header mb-5 mb-md-0">
                        Case Studies
                      </h1>
                      <div className="image-section-mobile text-center xs-image ml-3 mb-5 d-block d-md-none">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: caseStudy.image,
                            alt: `case study`
                          }}
                        />
                      </div>
                      <h4 className="text-white title mb-sm-3 mb-xs-3">
                        {caseStudy.title}
                      </h4>
                      <p className="text-white description">
                        {caseStudy.description}
                      </p>
                      <br />
                      <br />
                      <Link
                        to={x.node.fields.slug}
                        type="button"
                        className="btn btn-secondary btn-lg"
                      >
                        View Case Study{" "}
                        <img
                          src={arrow}
                          alt="next"
                          style={{ width: "12px", marginTop: "6px" }}
                        />
                      </Link>
                      <br />
                      <br />
                    </Col>
                    <Col
                      lg={6}
                      md={7}
                      className="d-none d-md-block position-initial"
                    >
                      <div className="image-section">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: caseStudy.image,
                            alt: `case study`,
                            style: { width: "100%" }
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </Carousel>
          <br />
        </Container>
      </section>
    );
  }
}

CaseStudies.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query CaseStudiesQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "case-study" } } }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                templateKey
                title
                description
                image {
                  childImageSharp {
                    fluid(maxWidth: 400, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={data => <CaseStudies data={data} />}
  />
);
