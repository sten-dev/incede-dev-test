import React from "react";
import { Container } from "reactstrap";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import SolutionsHeader from "../../components/Solutions/SolutionsHeader";
import SolutionsPreviousNextHeader from "../../components/Solutions/SolutionsPreviousNextHeader";
import ITService from "../../components/Solutions/ITService";

const ITServiceDesk = () => {
  return (
    <Layout pageTitle="IT Service Desk | Incede">
      <Transition>
        <section className="industry-solution">
          <SolutionsHeader
            header={"IT Service Desk"}
            title={
              "Level-2 Quality Enabled through Natural Language Understanding"
            }
          />
          <Container>
            {/* <SolutionsPreviousNextHeader
              previousLink="/solutions/human-resource-services"
              previousName="Human Resource Services"
              nextName="Sales Support Solutions"
              nextLink="/solutions/sales-support-solutions"
            ></SolutionsPreviousNextHeader> */}
            <ITService />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default ITServiceDesk;
