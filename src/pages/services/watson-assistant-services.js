import React from "react";
import { Container } from "reactstrap";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import ServicesHeader from "../../components/services/ServicesHeader";
import ServicesPreviousNextHeader from "../../components/services/ServicesPreviousNextHeader";
import WatsonAssistant from "../../components/services/WatsonAssistant";

const WatsonAssistantServices = () => {
  return (
    <Layout pageTitle="Watson Assistant Services | Incede">
      <Transition>
        <section className="industry-solution">
          <ServicesHeader header={"Watson Assistant Services"} title={""} />
          <Container fluid className="p-0">
            {/* <ServicesPreviousNextHeader
              nextName="Watson Discovery Services"
              nextLink="/services/watson-discovery-services"
            ></ServicesPreviousNextHeader> */}
            <WatsonAssistant />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default WatsonAssistantServices;
