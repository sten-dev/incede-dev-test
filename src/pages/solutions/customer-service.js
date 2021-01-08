import React from "react";
import { Container } from "reactstrap";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import SolutionsHeader from "../../components/Solutions/SolutionsHeader";
import SolutionsPreviousNextHeader from "../../components/Solutions/SolutionsPreviousNextHeader";
import Customer from "../../components/Solutions/Customer";

const CustomerService = () => {
  return (
    <Layout pageTitle="Customer Service | Incede">
      <Transition>
        <section className="industry-solution">
          <SolutionsHeader
            header={"Customer Service"}
            title={"Conversational AI Creates an Engaging Customer Experience"}
          />
          <Container>
            {/* <SolutionsPreviousNextHeader
              nextName="Human Resource Services"
              nextLink="/solutions/human-resource-services"
            ></SolutionsPreviousNextHeader> */}
            <Customer />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default CustomerService;
