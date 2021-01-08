import React from "react";
import Layout from "../../components/Layout";
import ServicesMain from "../../components/services/ServicesMain";
import Transition from "../../Transition";
export default class ServicesPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Services | Incede">
        <Transition>
          <ServicesMain />
        </Transition>
      </Layout>
    );
  }
}
