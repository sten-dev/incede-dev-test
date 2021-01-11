import React, { Component } from "react";
import Home from "./Landing/Home";
import WhatWeDo from "./Landing/WhatWeDo";
import MoreDetail from "./Landing/MoreDetail";
class Main extends Component {
  render() {
    const { home } = this.props;
    return (
      <React.Fragment>
        <Home home={home} />
        {/* <AboutUs about={about} /> */}
        <MoreDetail />
        <WhatWeDo />
        {/* <CaseStudies /> */}
        {/* <ContactUs location={location} /> */}
      </React.Fragment>
    );
  }
}

export default Main;
