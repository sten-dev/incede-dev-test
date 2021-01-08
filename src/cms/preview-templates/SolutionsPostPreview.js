import React from "react";
import PropTypes from "prop-types";
import { SolutionsPostTemplate } from "../../templates/solutions-post";
import { HTMLContent } from "../../components/Content";

const SolutionsPostPreview = ({ entry, widgetFor }) => {
  return (
    <React.Fragment>
      <SolutionsPostTemplate
        title={entry.getIn(["data", "title"])}
        subTitle={entry.getIn(["data", "subTitle"])}
        image={entry.getIn(["data", "image"])}
        content={widgetFor("body")}
      />
      {/* <HTMLContent className="content" content={widgetFor('body')} /> */}
    </React.Fragment>
  );
};

SolutionsPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
};

export default SolutionsPostPreview;
