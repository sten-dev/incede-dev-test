import React from "react";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import SolutionsHeader from "../../components/Solutions/SolutionsHeader";
import { Container } from "reactstrap";
import Customer from "../../components/Solutions/Customer";

const MainSolutions = () => {
  return (
    <Layout pageTitle="Customer Service | Incede">
      <Transition>
        <section className="industry-solution">
          <SolutionsHeader
            header={"Customer Service"}
            title={"Conversational AI Creates an Engaging Customer Experience"}
          />
          <Container>
            <Customer />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default MainSolutions;
