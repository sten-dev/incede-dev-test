import React from "react";
import { Container } from "reactstrap";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import ServicesHeader from "../../components/services/ServicesHeader";
import ServicesPreviousNextHeader from "../../components/services/ServicesPreviousNextHeader";
import WatsonDiscovery from "../../components/services/WatsonDiscovery";

const WatsonDiscoveryServices = () => {
  return (
    <Layout pageTitle="Watson Discovery Services | Incede">
      <Transition>
        <section className="industry-solution">
          <ServicesHeader header={"Watson Discovery Services"} title={""} />
          <Container fluid className="p-0">
            {/* <ServicesPreviousNextHeader
              previousLink="/services/watson-assistant-services"
              previousName="Watson Assistant Services"
            ></ServicesPreviousNextHeader> */}
            <WatsonDiscovery />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default WatsonDiscoveryServices;
