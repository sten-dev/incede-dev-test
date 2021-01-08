import React from 'react';
import IndustryHeader from '../../components/industry-solutions/IndustryHeader';
import { Container } from 'reactstrap';
import RetailDistribution from '../../components/industry-solutions/RetailDistribution';
import Transition from '../../Transition';
import Layout from '../../components/Layout';
import IndustryPreviousNextHeader from '../../components/industry-solutions/IndustryPreviousNextHeader';
const RetailDistributionMain = () => {
    return (
        <Layout pageTitle="Retail Distribution  | Incede">
            <Transition>
                <section className="industry-solution">
                    <IndustryHeader />
                    <Container>
                        {/* <IndustryPreviousNextHeader
                            nextName="Industrial Manufacturing"
                            nextLink="/industries/industrial-manufacturing"></IndustryPreviousNextHeader> */}
                        <RetailDistribution />
                    </Container>
                </section>
            </Transition>
        </Layout>
    );
}

export default RetailDistributionMain;