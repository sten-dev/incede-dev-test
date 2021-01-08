import React from "react";
import Container from "reactstrap/lib/Container";
import Layout from "../../components/Layout";
import ResourceHeader from "../../components/resources/ResourceHeader";
import Event from "../../components/resources/Events";
import Transition from "../../Transition";

const Events = () => {
  return (
    <Layout pageTitle="Events | Incede">
      <Transition>
        <section className="industry-solution">
          <ResourceHeader />
          <Container>
            <Event />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default Events;
