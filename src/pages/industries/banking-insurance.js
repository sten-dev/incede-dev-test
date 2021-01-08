import React from 'react';
import IndustryHeader from '../../components/industry-solutions/IndustryHeader';
import { Container } from 'reactstrap';
import Banking from '../../components/industry-solutions/Banking';
import Layout from '../../components/Layout';
import Transition from '../../Transition';
import IndustryPreviousNextHeader from '../../components/industry-solutions/IndustryPreviousNextHeader';
const BankingInsurance = () => {
    return (
        <Layout pageTitle="Banking Insurance | Incede">
            <Transition>
                <section className="industry-solution">
                    <IndustryHeader />
                    <Container>
                        {/* <IndustryPreviousNextHeader
                            previousLink="/industries/industrial-manufacturing"
                            previousName="Industrial Manufacturing"
                            nextName="Communications Services"
                            nextLink="/industries/communications-services"></IndustryPreviousNextHeader> */}
                    </Container>
                    <Banking />
                </section>
            </Transition>
        </Layout>
    );
}

export default BankingInsurance;