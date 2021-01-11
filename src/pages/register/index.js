import React from 'react';
import Transition from '../../Transition';
import CampaignBanking from '../../components/campaign-bankings/CampaignBanking';
import MetaData from '../../components/MetaData';

export default class CampaignBankingPage extends React.Component {
  window
  componentDidMount() {
    this.window = window;
    this.window.document.body.style.overflow = "auto";
    this.window.document.body.style.position = "initial";
  }
  render() {
    return (
      <>
        {/* <Layout pageTitle='Campaign Bankings | Incede'> */}
        <Transition>
          <MetaData pageTitle="Employee Self Service" />
          <CampaignBanking />
        </Transition>
        {/* </Layout> */}
      </>
    );
  }
}
