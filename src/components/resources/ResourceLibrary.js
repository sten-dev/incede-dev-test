import React from "react";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import "../../styles/resources.scss";
import PropTypes from "prop-types";
import ResourcesLibraryCard from "./ResourcesLibraryCard";
import { graphql, StaticQuery } from "gatsby";

const ResourceLibrary = ({ data }) => {
  console.log("data", data);
  const { edges: resourcesLibrary } = data.allMarkdownRemark;
  return (
    <section className="resources-library-content gap-y-half" id="1">
      <Container>
        <h1 className="text-left heading mb-5">Resource Library</h1>
        <div className="bg-grey">
          <Row>
            {resourcesLibrary.map((rL) => (
              <Col xs={12} sm={6} md={6} lg={4} className="mt-16">
                <ResourcesLibraryCard
                  title={rL.node.frontmatter.title}
                  videoUrl={rL.node.frontmatter.videoUrl}
                  image={rL.node.frontmatter.image}
                  type="library"
                />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

ResourceLibrary.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query ResourceLibraryQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "resources-library" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              frontmatter {
                title
                templateKey
                videoUrl
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
    render={(data) => <ResourceLibrary data={data} />}
  />
);
