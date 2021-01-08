import React from "react";
import Layout from "../../components/Layout";
import ContactUs from "../../components/ContactUs";
import Transition from "../../Transition";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout pageTitle="Contact Us | Incede">
        <Transition>
          <ContactUs />
        </Transition>
      </Layout>
    );
  }
}
