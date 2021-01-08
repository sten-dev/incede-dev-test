import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";
import { Col, Row, Container } from "reactstrap";
import ServiceImageBySlug from "../components/services/ServiceImageBySlug";
import Transition from "../Transition";

export const ServicesTemplate = ({
  title,
  subTitle,
  image,
  slug,
  helmet,
  content,
  contentComponent
}) => {
  const PageContent = contentComponent || Content;
  return (
    <Transition>
      <section className="service-page">
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
            <Col lg={7} md={8} sm={12} xs={12}>
              <main className="content gap-y-half">
                <PageContent content={content} />
              </main>
            </Col>
            <Col lg={5} md={4} sm={12} xs={12}>
              <main className="content gap-y-half">
                <ServiceImageBySlug slug={slug} />
              </main>
            </Col>
          </Row>
        </Container>
      </section>
    </Transition>
  );
};

ServicesTemplate.propTypes = {
  title: PropTypes.string,
  subTitle: PropTypes.string,
  helmet: PropTypes.object
};

const Services = ({ data }) => {
  const { markdownRemark: post } = data;
  return (
    <Layout pageTitle="Services | Incede">
      <ServicesTemplate
        helmet={
          <Helmet titleTemplate="%s | Service">
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.subTitle}`} />
          </Helmet>
        }
        subTitle={post.frontmatter.subTitle}
        title={post.frontmatter.title}
        image={post.frontmatter.image}
        content={post.html}
        contentComponent={HTMLContent}
        slug={post.fields.slug
          .split("/")
          .filter(x => x)
          .pop()}
      />
    </Layout>
  );
};

Services.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default Services;

export const pageQuery = graphql`
  query ServicesByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
      }
      frontmatter {
        title
        subTitle
        image {
          childImageSharp {
            fluid(maxWidth: 240, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
