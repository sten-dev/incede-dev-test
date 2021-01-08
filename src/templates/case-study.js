import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";
import Content, { HTMLContent } from "../components/Content";
import { Col, Row, Container } from "reactstrap";
import Transition from "../Transition";

export const CaseStudyTemplate = ({
  title,
  description,
  image,
  helmet,
  content,
  contentComponent,
}) => {
  // console.log("case study", image)
  const PageContent = contentComponent || Content;
  return (
    <Transition>
      <section className="case-study">
        {helmet || ""}
        <section className="header-section gap-y">
          <Container>
            <Row>
              <Col>
                <h1>{title}</h1>
                <h6>{description}</h6>
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

CaseStudyTemplate.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  helmet: PropTypes.object,
};

const CaseStudy = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout pageTitle="Case Studies | Incede">
      <CaseStudyTemplate
        helmet={
          <Helmet titleTemplate="%s | Case Study">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.subTitle}`} />
          </Helmet>
        }
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        content={post.html}
        contentComponent={HTMLContent}
      />
    </Layout>
  );
};

CaseStudy.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default CaseStudy;

export const pageQuery = graphql`
  query CaseStudyByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
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
