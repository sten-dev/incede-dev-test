import React from "react";
import PageTransition from "gatsby-plugin-page-transitions";

const Transition = props => {
  return <PageTransition>{props.children}</PageTransition>;
};

export default Transition;
