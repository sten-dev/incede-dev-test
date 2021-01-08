import React, { useState } from "react";
import PropTypes from "prop-types";
import Col from "reactstrap/lib/Col";
import Container from "reactstrap/lib/Container";
import Row from "reactstrap/lib/Row";
import "../../styles/resources.scss";
import ResourcesLibraryCard from "./ResourcesLibraryCard";
import { graphql, StaticQuery } from "gatsby";

const Events = ({ data }) => {
  const { edges: resourcesEvents } = data.allMarkdownRemark;
  console.log(resourcesEvents);
  // const [type, setType] = useState("Webinar");
  const [events, setEvents] = useState(resourcesEvents);
  const [state, setState] = useState({
    eventType: "All",
    serviceType: "All",
  });

  const handleEventsTypeChange = (e) => {
    setState({
      ...state,
      eventType: e.target.value,
    });

    console.log("state", state);
    let filteredEvents;
    if (e.target.value === "All" && state.serviceType === "All") {
      filteredEvents = resourcesEvents;
      // setEvents(events)
    } else if (e.target.value === "All" && state.serviceType !== "All") {
      filteredEvents = resourcesEvents?.filter(
        (i) => i.node.frontmatter.serviceType === state.serviceType
      );
      // setEvents(filteredEvents);
    } else if (e.target.value !== "All" && state.serviceType == "All") {
      filteredEvents = resourcesEvents?.filter(
        (i) => i.node.frontmatter.eventType === e.target.value
      );
    } else {
      let filterEvents = resourcesEvents?.filter(
        (i) => i.node.frontmatter.eventType === e.target.value
      );
      filteredEvents = filterEvents?.filter(
        (i) => i.node.frontmatter.serviceType === state.serviceType
      );
    }
    setEvents(filteredEvents);
  };

  const handleTypeOfServicesChange = (e) => {
    setState({
      ...state,
      serviceType: e.target.value,
    });

    console.log("state", state);
    let filteredEvents;
    if (state.eventType === "All" && e.target.value === "All") {
      filteredEvents = resourcesEvents;
      // setEvents(events)
    } else if (state.eventType === "All" && e.target.value !== "All") {
      filteredEvents = resourcesEvents?.filter(
        (i) => i.node.frontmatter.serviceType === e.target.value
      );
      // setEvents(filteredEvents);
    } else if (state.eventType !== "All" && e.target.value == "All") {
      filteredEvents = resourcesEvents?.filter(
        (i) => i.node.frontmatter.eventType === state.eventType
      );
    } else {
      let filterEvents = resourcesEvents?.filter(
        (i) => i.node.frontmatter.eventType === state.eventType
      );
      filteredEvents = filterEvents?.filter(
        (i) => i.node.frontmatter.serviceType === e.target.value
      );
    }
    setEvents(filteredEvents);
  };

  return (
    <section className="resources-library-content gap-y-half" id="1">
      <Container>
        <h1 className="text-left heading mb-5">Events</h1>
        <Row>
          <Col xs={12} sm={12} md={3} lg={3}>
            {/* <div className="bg-grey"> */}
            <div className="form-group">
              <label>Event Type</label>
              <select
                className="form-control"
                onChange={handleEventsTypeChange}
                value={state.eventType}
                name="eventType"
              >
                <option value={"All"}>All</option>
                <option value={"Webinar"}>Webinar</option>
              </select>
            </div>
            <div className="form-group">
              <label>Service Type</label>
              <select
                className="form-control"
                onChange={handleTypeOfServicesChange}
                value={state.serviceType}
                name="serviceType"
              >
                <option value={"All"}>All</option>
                <option value={"Watson Assistant"}>Watson Assistant</option>
                <option value={"Watson Discovery"}>Watson Discovery</option>
              </select>
            </div>
          </Col>
          <Col xs={12} sm={12} md={9} lg={9}>
            <div className="bg-grey">
              <Row>
                {events.map((rE) => (
                  <Col xs={12} sm={6} md={6} lg={4} className="mt-16">
                    <ResourcesLibraryCard
                      title={rE.node.frontmatter.title}
                      videoUrl={rE.node.frontmatter.videoUrl}
                      image={rE.node.frontmatter.image}
                      eventType={rE.node.frontmatter.eventType}
                      eventDate={rE.node.frontmatter.eventDate}
                      timeZone={rE.node.frontmatter.timeZone}
                      type="events"
                    />
                  </Col>
                ))}
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

Events.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
};

export default () => (
  <StaticQuery
    query={graphql`
      query EventsQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "resources-events" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              frontmatter {
                title
                templateKey
                videoUrl
                eventType
                serviceType
                eventDate
                timeZone
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
    render={(data) => <Events data={data} />}
  />
);
