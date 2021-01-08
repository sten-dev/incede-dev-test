import React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import "../styles/bot.scss";
import Main from "../components/Main";
import Transition from "../Transition";

export const IndexPageTemplate = ({ home, about, location }) => {
  return (
    <Transition>
      <Main home={home} about={about} location={location} />
    </Transition>
  );
};

IndexPageTemplate.propTypes = {
  home: PropTypes.object,
  about: PropTypes.object,
  location: PropTypes.object
};

const IndexPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark;
  // console.log("data index", data);
  return (
    <Layout pageTitle="Incede" page="home">
      <IndexPageTemplate
        home={frontmatter.home}
        about={frontmatter.about}
        location={frontmatter.location}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object
    })
  })
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      frontmatter {
        home {
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
        about {
          title
          subTitle
          button
        }
        location {
          title
          subTitle
          phone
          email
          address
        }
      }
    }
  }
`;
