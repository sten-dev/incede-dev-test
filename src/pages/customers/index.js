import React from "react";
import Layout from "../../components/Layout";
import Customers from "../../components/Customers";
import Transition from "../../Transition";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout>
        <Transition>
          <Customers />
        </Transition>
      </Layout>
    );
  }
}
