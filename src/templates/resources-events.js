import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Transition from "../Transition";
import Card from "reactstrap/lib/Card";
import CardBody from "reactstrap/lib/CardBody";
import CardTitle from "reactstrap/lib/CardTitle";
import CardImg from "reactstrap/lib/CardImg";
import "../styles/resources.scss";
import moment from "moment";

export const ResourcesEventsTemplate = ({
  title,
  videoUrl,
  eventType,
  image,
  serviceType,
  eventDate,
  timeZone,
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
          {/* <div
            style={{
              backgroundColor: "#5c4abb",
              color: "white",
              textAlign: "center",
              height: 50,
            }}
          >
            <CardTitle style={{ marginBottom: 0, marginTop: 8, fontSize: 20 }}>
              {eventType}
            </CardTitle>
          </div> */}
          <div className="events-type-content">
            <p className="events-type">{eventType}</p>
          </div>
          <CardImg
            top
            width="100%"
            height="420px"
            src={
              videoUrl ? `https://img.youtube.com/vi/${videoId}/0.jpg` : image
            }
            alt=""
          />
          {/* <div
            style={{
              backgroundColor: "yellow",
              marginTop: -410,
              marginLeft: 0,
              color: "white",
            }}
          >
            {videoUrl}
          </div> */}
          {/* <CardBody>
            <p className="resource-card-title">{title}</p>
          </CardBody> */}
          <CardBody>
            <p className="event-date">
              {moment(eventDate).format("LL") +
                " | " +
                moment(eventDate).format("LT") +
                " " +
                timeZone}
            </p>
          </CardBody>
        </Card>
      </React.Fragment>
    </Transition>
  );
};

ResourcesEventsTemplate.propTypes = {
  title: PropTypes.string,
  videoUrl: PropTypes.string,
  eventType: PropTypes.string,
  serviceType: PropTypes.string,
  eventDate: PropTypes.any,
  timeZone: PropTypes.string,
};

const ResourcesEventsPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout pageTitle="Resources Events | Incede">
      <ResourcesEventsTemplate
        title={post.frontmatter.title}
        videoUrl={post.frontmatter.videoUrl}
        eventType={post.frontmatter.eventType}
        serviceType={post.frontmatter.serviceType}
        image={post.frontmatter.image}
        eventDate={post.frontmatter.eventDate}
        timeZone={post.frontmatter.timeZone}
      />
    </Layout>
  );
};

ResourcesEventsPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default ResourcesEventsPost;

export const pageQuery = graphql`
  query ResourcesEventsPostByID($id: String!) {
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
