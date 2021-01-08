import React from "react";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import ServicesHeader from "../../components/services/ServicesHeader";
import { Container } from "reactstrap";
import WatsonAssistant from "../../components/services/WatsonAssistant";

const MainService = () => {
  return (
    <Layout pageTitle="Watson Assistant Services | Incede">
      <Transition>
        <section className="industry-solution">
          <ServicesHeader header={"Watson Assistant Services"} title={""} />
          <Container fluid className="p-0">
            <WatsonAssistant />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default MainService;
