import React, { Component } from 'react';
import CampaignsCard from './CampaignsCard';
import { getCampaigns } from '../../../Service';
import { Row, Col, Container } from 'reactstrap';
import ManageCampaignDialog from './ManageCampaignDialog';
import Loading from '../common/Loading';
class CampaignsMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      campaignsList: [],
      manageCampaignDialog: {
        isOpen: false,
        data: undefined
      }
    };
  }
  componentDidMount() {
    this.getCampaignsList();
  }
  getCampaignsList = async () => {
    this.setState({ isLoading: true });
    let res = await getCampaigns();
    if (res && res.success) {
      this.setState({ campaignsList: res.data });
    } else {
    }
    this.setState({ isLoading: false });
  };
  handleAddCampaignDialog = () => {
    this.setState({
      manageCampaignDialog: {
        data: undefined,
        isOpen: true
      }
    });
  };

  handleCloseCampaignDialog = data => {
    let campaigns = [...this.state.campaignsList];
    if (data) {
      campaigns.push(data);
    }
    this.setState({
      campaignsList: campaigns,
      manageCampaignDialog: {
        data: undefined,
        isOpen: false
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading && <Loading />}
        <section className='wtd-list'>
          <section className='header-section gap-y'>
            <Container>
              <Row className='justify-content-between align-items-center'>
                <div className='pl-3'>
                  <h1 className='mt-0'>Campaigns</h1>
                </div>
                <button
                  onClick={this.handleAddCampaignDialog}
                  className='btn btn-outline-light'>
                  Add
                </button>
              </Row>
              <Row>
                {this.state.campaignsList.map((campaign, index) => (
                  <Col
                    key={index}
                    xs='12'
                    sm='6'
                    md='6'
                    lg='4'
                    className='mt-16 '>
                    <CampaignsCard campaign={campaign} index={index} />
                  </Col>
                ))}

                {this.state.campaignsList.length === 0 && (
                  <Col>
                    <div className='text-center'>No results found</div>
                  </Col>
                )}
              </Row>
            </Container>
          </section>
        </section>
        {this.state.manageCampaignDialog.isOpen && (
          <ManageCampaignDialog
            data={this.state.manageCampaignDialog.data}
            onClose={data => {
              this.handleCloseCampaignDialog(data);
            }}
          />
        )}
      </React.Fragment>
    );
  }
}

export default CampaignsMain;
