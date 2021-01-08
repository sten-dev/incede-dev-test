import React from "react";
import Layout from "../../components/Layout";
// import IndustriesMain from "../../components/Landing/industry/IndustriesMain";
import IndustrySolutionMain from "../../components/industry-solutions/IndustrySolutionMain";
import Transition from "../../Transition";

export default class IndustriesPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Industries | Incede">
        <Transition>
          <IndustrySolutionMain />
          {/* <IndustriesMain /> */}
        </Transition>
      </Layout>
    );
  }
}
