import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Transition from '../../Transition';
import { getCampaignById } from '../../../Service';
import Loading from '../../components/common/Loading';
import { Container, Row, Col, Button } from 'reactstrap';
import CampaignFormModal from '../../components/campaigns/CampaignFormModal';

class ViewCampaign extends Component {
  window;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      campaignDetails: undefined,
      manageDownload: {
        isOpen: false
      }
    };
  }

  componentDidMount = async () => {
    this.window = window;
    await this.getCampaignDetails();
  };

  getCampaignDetails = async () => {
    if (this.window) {
      let campaignId = this.window.location.href.split('=').pop();
      if (campaignId) {
        this.setState({
          isLoading: true
        });

        let result = await getCampaignById(campaignId);
        if (result && result.success && result.data && result.data.length > 0) {
          this.setState({
            campaignDetails: result.data[0],
            isLoading: false
          });
        } else {
          this.setState({
            isLoading: false
          });
        }
      }
    }
  };

  handleOpenDownloadDialog = () => {
    this.setState({ manageDownload: { isOpen: true } });
  };

  handleCloseDownloadDialog = () => {
    this.setState({ manageDownload: { isOpen: false } });
  };

  render() {
    return (
      <React.Fragment>
        <Layout pageTitle='Campaign Details | Incede'>
          <Transition>
            {this.state.isLoading && <Loading />}
            {this.state.campaignDetails && (
              <section>
                {/* <section className='header-section gap-y'>
                  <Container>
                    <Row>
                      <Col>
                        <h1>{this.state.campaignDetails.TITLE}</h1>
                        <h6>{this.state.campaignDetails.SUB_TITLE}</h6>
                      </Col>
                    </Row>
                  </Container>
                </section> */}
                <Container>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <main className='content gap-y-half'>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: this.state.campaignDetails.MAIN_CONTENT
                          }}
                        />
                      </main>
                    </Col>
                    {/* <Col lg={12} md={12} sm={12} xs={12}>
                      <Button
                        color='primary'
                        onClick={this.handleOpenDownloadDialog}>
                        Download Details
                      </Button>
                      <br />
                      <br />
                      <br />
                    </Col> */}
                  </Row>
                </Container>
              </section>
            )}
          </Transition>
        </Layout>
        {this.state.manageDownload.isOpen && (
          <CampaignFormModal onClose={() => this.handleCloseDownloadDialog()} />
        )}
      </React.Fragment>
    );
  }
}

export default ViewCampaign;
