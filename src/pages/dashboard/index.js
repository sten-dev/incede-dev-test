import React from "react";
import Layout from "../../components/Layout";
import Dashboard from "../../components/dashboard/Dashboard";
import Transition from "../../Transition";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Layout pageTitle="Incede" page="dashboard">
        <Transition>
          <Dashboard />
        </Transition>
      </Layout>
    );
  }
}
