import React from "react";
import Layout from "../../components/Layout";
import SolutionsMain from "../../components/Solutions/SolutionsMain";
import Transition from "../../Transition";

export default class SolutionsPage extends React.Component {
  render() {
    return (
      <Layout pageTitle="Solutions | Incede">
        <Transition>
          <SolutionsMain />
        </Transition>
      </Layout>
    );
  }
}
