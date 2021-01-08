import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { Col, Row, Container } from "reactstrap";
import Transition from "../Transition";

export const ResourcesCaseStudiesTemplate = ({
  title,
  subTitle,
  image,
  helmet,
  content,
  contentComponent,
}) => {
  const PageContent = contentComponent || Content;
  return (
    <Transition>
      <section className="resources-case-studies">
        {helmet || ""}
        <section className="header-section gap-y">
          <Container>
            <Row>
              <Col>
                <h1>{title}</h1>
                <h6>{subTitle}</h6>
                {/* {image && <PreviewCompatibleImage imageInfo={image} />} */}
              </Col>
            </Row>
          </Container>
        </section>
        <Container>
          <Row>
            <Col>
              <main className="content gap-y-half">
                <PageContent content={content} />
              </main>
            </Col>
          </Row>
        </Container>
      </section>
    </Transition>
  );
};

ResourcesCaseStudiesTemplate.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  helmet: PropTypes.object,
};

const ResourcesCaseStudies = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout pageTitle="Case Studies | Incede">
      <ResourcesCaseStudiesTemplate
        helmet={
          <Helmet titleTemplate="%s | Case Studies">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="subTitle" content={`${post.frontmatter.subTitle}`} />
          </Helmet>
        }
        title={post.frontmatter.title}
        subTitle={post.frontmatter.subTitle}
        image={post.frontmatter.image}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
};

ResourcesCaseStudies.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ResourcesCaseStudies;

export const pageQuery = graphql`
  query ResourcesCaseStudiesByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        subTitle
        image {
          childImageSharp {
            fluid(maxWidth: 240, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
