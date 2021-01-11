import React from "react";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import { Container, Row, Col } from "reactstrap";
import CaseStudyCard from "./CaseStudyCard";
class CaseStudiesMain extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: caseStudies } = data.allMarkdownRemark;
    console.log("case studies list", caseStudies);
    return (
      <section className="wtd-list ">
        <section className="header-section gap-y text-center">
          <Container>
            <div className="text-left">
              <h1>Case Studies</h1>
            </div>
            <Row>
              {caseStudies.map(caseStudy => (
                <Col xs="12" sm="6" md="6" lg="4" className="mt-16 ">
                  <CaseStudyCard
                    title={caseStudy.node.frontmatter.title}
                    description={caseStudy.node.frontmatter.description}
                    image={caseStudy.node.frontmatter.image}
                    slug={caseStudy.node.fields.slug}
                  />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </section>
    );
  }
}

CaseStudiesMain.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query CaseStudiesMainQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "case-study" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                description
                image {
                  childImageSharp {
                    fluid(maxWidth: 500, quality: 100) {
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
    render={data => <CaseStudiesMain data={data} />}
  />
);
