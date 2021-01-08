import React from 'react';
import IndustryHeader from '../../components/industry-solutions/IndustryHeader';
import IndustryManufacturing from '../../components/industry-solutions/IndustryManufacturing';
import { Container } from 'reactstrap';
import Transition from '../../Transition';
import Layout from '../../components/Layout';
import IndustryPreviousNextHeader from '../../components/industry-solutions/IndustryPreviousNextHeader';
const IndustrialManufacturing = () => {
    return (
        <Layout pageTitle="Industrial Manufacturing | Incede">
            <Transition>
                <section className="industry-solution">
                    <IndustryHeader />
                    <Container>
                        {/* <IndustryPreviousNextHeader
                            previousLink="/industries/retail-distribution"
                            previousName="Retail Distribution"
                            nextName="Banking Insurance"
                            nextLink="/industries/banking-insurance">

                        </IndustryPreviousNextHeader> */}
                        <IndustryManufacturing />
                    </Container>
                </section>
            </Transition>
        </Layout>
    );
}

export default IndustrialManufacturing;