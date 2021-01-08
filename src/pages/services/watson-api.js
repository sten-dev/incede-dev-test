import React from "react";
import { Container } from "reactstrap";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import ServicesHeader from "../../components/services/ServicesHeader";
import WatsonApi from "../../components/services/WatsonApi";

const WatsonApiServices = () => {
  return (
    <Layout pageTitle="Watson Discovery Services | Incede">
      <Transition>
        <section className="industry-solution">
          <ServicesHeader header={"Watson API Services"} title={""} />
          <Container fluid className="p-0">
            <WatsonApi />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default WatsonApiServices;
