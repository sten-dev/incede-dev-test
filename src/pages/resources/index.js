import React from "react";
import Container from "reactstrap/lib/Container";
import Layout from "../../components/Layout";
import ResourceHeader from "../../components/resources/ResourceHeader";
import Transition from "../../Transition";

const MainResource = () => {
  return (
    <Layout pageTitle="Resource Library | Incede">
      <Transition>
        <section className="industry-solution">
          <ResourceHeader />
          <Container></Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default MainResource;
