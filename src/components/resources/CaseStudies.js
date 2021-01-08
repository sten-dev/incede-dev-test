import React from "react";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import "../../styles/resources.scss";
import PropTypes from "prop-types";
import { graphql, StaticQuery } from "gatsby";
import CaseStudyCard from "../../components/case-study/CaseStudyCard";

const ResourcesCaseStudies = ({ data }) => {
  const { edges: caseStudies } = data.allMarkdownRemark;
  console.log("case-studies", caseStudies);

  return (
    <section className="resources-library-content gap-y-half" id="1">
      <Container>
        <h1 className="text-left heading mb-5">Case Studies</h1>
        <div className="bg-grey">
          <Row>
            {caseStudies.map((caseStudy) => (
              <Col xs="12" sm="6" md="6" lg="4" className="mt-16 ">
                <CaseStudyCard
                  title={caseStudy.node.frontmatter.title}
                  description={caseStudy.node.frontmatter.subTitle}
                  image={caseStudy.node.frontmatter.image}
                  slug={caseStudy.node.fields.slug}
                  type={true}
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

ResourcesCaseStudies.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query ResourcesCaseStudiesQuery {
        allMarkdownRemark(
          filter: {
            frontmatter: { templateKey: { eq: "resources-case-studies" } }
          }
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
                subTitle
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
    render={(data) => <ResourcesCaseStudies data={data} />}
  />
);
