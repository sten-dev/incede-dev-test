import React from "react";
import { Container } from "reactstrap";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import SolutionsHeader from "../../components/Solutions/SolutionsHeader";
import SolutionsPreviousNextHeader from "../../components/Solutions/SolutionsPreviousNextHeader";
import SalesSupport from "../../components/Solutions/SalesSupport";

const ITServiceDesk = () => {
  return (
    <Layout pageTitle="Sales Support Solutions | Incede">
      <Transition>
        <section className="industry-solution">
          <SolutionsHeader
            header={"Sales Support Solutions"}
            title={"Enabling Sales to Sell and Engineering to Engineer"}
          />
          <Container>
            {/* <SolutionsPreviousNextHeader
              previousLink="/solutions/it-service-desk"
              previousName="IT Service Desk"
            ></SolutionsPreviousNextHeader> */}
            <SalesSupport />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default ITServiceDesk;
