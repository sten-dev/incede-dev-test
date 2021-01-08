import React from "react";
import PropTypes from "prop-types";
import { ResourcesCaseStudiesTemplate } from "../../templates/resources-case-studies";

const ResourcesCaseStudiesPreview = ({ entry, widgetFor }) => {
  return (
    <React.Fragment>
      <ResourcesCaseStudiesTemplate
        title={entry.getIn(["data", "title"])}
        subTitle={entry.getIn(["data", "subTitle"])}
        image={entry.getIn(["data", "image"])}
        content={widgetFor("body")}
      />
    </React.Fragment>
  );
};

ResourcesCaseStudiesPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default ResourcesCaseStudiesPreview;
