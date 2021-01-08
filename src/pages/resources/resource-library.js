import React from "react";
import Container from "reactstrap/lib/Container";
import Layout from "../../components/Layout";
import ResourceHeader from "../../components/resources/ResourceHeader";
import ResourcesLibrary from "../../components/resources/ResourceLibrary";
import Transition from "../../Transition";

const ResourceLibrary = () => {
  return (
    <Layout pageTitle="Resource Library | Incede">
      <Transition>
        <section className="industry-solution">
          <ResourceHeader />
          <Container>
            <ResourcesLibrary />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default ResourceLibrary;
