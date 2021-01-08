import React from "react";
import PropTypes from "prop-types";
import { ResourcesEventsTemplate } from "../../templates/resources-events";

const ResourcesEventsReview = ({ entry }) => {
  return (
    <React.Fragment>
      <ResourcesEventsTemplate
        title={entry.getIn(["data", "title"])}
        videoUrl={entry.getIn(["data", "videoUrl"])}
        eventType={entry.getIn(["data", "eventType"])}
        serviceType={entry.getIn(["data", "serviceType"])}
        image={entry.getIn(["data", "image"])}
        eventDate={entry.getIn(["data", "eventDate"])}
        timeZone={entry.getIn(["data", "timeZone"])}
      />
    </React.Fragment>
  );
};

ResourcesEventsReview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  //   widgetFor: PropTypes.func,
};

export default ResourcesEventsReview;
