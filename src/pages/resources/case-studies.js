import React from "react";
import Container from "reactstrap/lib/Container";
import Layout from "../../components/Layout";
import ResourceHeader from "../../components/resources/ResourceHeader";
import ResourcesCaseStudies from "../../components/resources/CaseStudies";
import Transition from "../../Transition";

const CaseStudies = () => {
  return (
    <Layout pageTitle="Case Studies | Incede">
      <Transition>
        <section className="industry-solution">
          <ResourceHeader />
          <Container>
            <ResourcesCaseStudies />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default CaseStudies;
