import React from "react";
import PropTypes from "prop-types";
import { ResourcesLibraryTemplate } from "../../templates/resources-library";

const ResourcesLibraryReview = ({ entry }) => {
  return (
    <React.Fragment>
      <ResourcesLibraryTemplate
        title={entry.getIn(["data", "title"])}
        videoUrl={entry.getIn(["data", "videoUrl"])}
        image={entry.getIn(["data", "image"])}
      />
    </React.Fragment>
  );
};

ResourcesLibraryReview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  //   widgetFor: PropTypes.func,
};

export default ResourcesLibraryReview;
