import React from "react";
import Layout from "../../components/Layout";
import Transition from "../../Transition";
import CampaignsMain from "../../components/campaigns/CampaignsMain";

export default class CampaignsPage extends React.Component {
    render() {
        return (
            <Layout pageTitle="Campaigns | Incede">
                <Transition>
                    <CampaignsMain />
                </Transition>
            </Layout>
        );
    }
}
