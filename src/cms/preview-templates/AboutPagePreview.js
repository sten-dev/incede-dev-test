import React from "react";
import { AboutPageTemplate } from "../../templates/about-page";

const AboutPagePreview = ({ entry, widgetFor }) => {
  const data = entry.getIn(["data"]).toJS();
  console.log(data);
  return (
    <div>
      <AboutPageTemplate title={data.title} section={data.section} />
    </div>
  );
};

export default AboutPagePreview;
