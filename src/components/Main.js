import React, { Component } from "react";
import Home from "./Landing/Home";
import AboutUs from "./Landing/AboutUs";
import WhatWeDo from "./Landing/WhatWeDo";
import CaseStudies from "./CaseStudies";
import ContactUs from "./Landing/ContactUs";
import MoreDetail from "./Landing/MoreDetail";
class Main extends Component {
  render() {
    const { home, about, location } = this.props;
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
