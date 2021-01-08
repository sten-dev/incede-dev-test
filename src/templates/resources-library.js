import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Transition from "../Transition";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import "../styles/resources.scss";
import CardTitle from "reactstrap/lib/CardTitle";
import CardImg from "reactstrap/lib/CardImg";

export const ResourcesLibraryTemplate = ({
  title,
  videoUrl,
  //   helmet,
  image,
}) => {
  let videoId = videoUrl?.split("v=")[1];
  let ampersandPosition = videoId?.indexOf("&");
  if (ampersandPosition != -1) {
    videoId = videoId?.substring(0, ampersandPosition);
  }

  return (
    <Transition>
      <React.Fragment>
        <Card>
          <span className="card-label">{videoUrl ? "Video" : "Image"}</span>
          <CardImg
            top
            width="100%"
            height="420px"
            src={
              videoUrl ? `https://img.youtube.com/vi/${videoId}/0.jpg` : image
            }
            alt=""
          />
          <CardBody>
            <p className="resource-card-title">{title}</p>
          </CardBody>
        </Card>
      </React.Fragment>
    </Transition>
  );
};

ResourcesLibraryTemplate.propTypes = {
  title: PropTypes.string,
  videoUrl: PropTypes.string,
  //   helmet: PropTypes.object,
};

const ResourcesLibraryPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout pageTitle="Resources Library | Incede">
      <ResourcesLibraryTemplate
        // helmet={
        //   <Helmet titleTemplate="%s | Resources Library">
        //     <title>{`${post.frontmatter.title}`}</title>
        //   </Helmet>
        // }
        title={post.frontmatter.title}
        videoUrl={post.frontmatter.videoUrl}
        image={post.frontmatter.image}
      />
    </Layout>
  );
};

ResourcesLibraryPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ResourcesLibraryPost;

export const pageQuery = graphql`
  query ResourcesLibraryPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
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
