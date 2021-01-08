import React, { Component } from "react";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import IndustryHeader from "../../components/industry-solutions/IndustryHeader";
import { Container } from "reactstrap";
import RetailDistribution from "../../components/industry-solutions/RetailDistribution";

const MainIndustry = () => {
  return (
    <Layout pageTitle="Retail Distribution  | Incede">
      <Transition>
        <section className="industry-solution">
          <IndustryHeader />
          <Container>
            <RetailDistribution />
          </Container>
        </section>
      </Transition>
    </Layout>
  );
};

export default MainIndustry;
