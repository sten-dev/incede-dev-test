import React from "react";
import { Container } from "reactstrap";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import ServicesHeader from "../../components/services/ServicesHeader";
import ApplicationsDevelopment from "../../components/services/ApplicationsDevelopment";

const WatsonApplicationsDevelopmentMain = () => {
    return (
        <Layout pageTitle="Applications Development | Incede">
            <Transition>
                <section className="industry-solution">
                    <ServicesHeader />
                    <Container fluid className="p-0">
                        <ApplicationsDevelopment />
                    </Container>
                </section>
            </Transition>
        </Layout>
    );
};

export default WatsonApplicationsDevelopmentMain;
