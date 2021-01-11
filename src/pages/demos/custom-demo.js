import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Transition from '../../Transition';
import { Row, Col } from 'reactstrap';
import { getDemoById, getWorkspaceStatus } from '../../../Service';
import Loading from '../../components/common/Loading';

const TIME_OUT = 5 * 1000;
class CustomDemoPage extends Component {
  window;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      demoDetails: undefined
    };
  }

  componentDidMount = async () => {
    this.window = window;
    await this.getDemoDetails();
    // if (this.state.demoDetails && this.state.demoDetails.ID) {
    //   setTimeout(() => {
    //     this.loadWAAssistant();
    //   }, 1500);
    // }
  };

  loadWAAssistant = () => {
    if (this.window.loadWatsonAssistantChat == null) {
      console.log('Error while loading assistant. Please disable ad-block');
      return;
    }

    this.window
      .loadWatsonAssistantChat({
        integrationID: this.state.demoDetails.INTEGRATION_ID, // The ID of this integration.
        region: this.state.demoDetails.REGION // The region your integration is hosted in.
      })
      .then(function(instance) {
        instance.render();
      });
  };

  getDemoDetails = async () => {
    if (this.window) {
      let demoId = this.window.location.href.split('=').pop();
      if (demoId) {
        this.setState({
          isLoading: true
        });

        let result = await getDemoById(demoId);
        if (result.success) {
          this.setState({
            demoDetails: result.data,
            isLoading: false
          });
          this.checkWorkspaceStatus(result.data.WORKSPACEID);
        } else {
          this.setState({
            isLoading: false
          });
        }
      }
    }
  };

  checkWorkspaceStatus = async workspaceId => {
    let res = await getWorkspaceStatus(workspaceId);
    if (res && res.success) {
      if (res.data.status === 'Available') {
        this.loadWAAssistant();
      } else {
        setTimeout(
          async () => this.checkWorkspaceStatus(workspaceId),
          TIME_OUT
        );
      }
    } else {
      setTimeout(async () => this.checkWorkspaceStatus(workspaceId), TIME_OUT);
    }
  };

  render() {
    return (
      <React.Fragment>
        <Layout pageTitle='Custom Demo | Incede' page='custom-demo-view'>
          <Transition>
            {this.state.isLoading && <Loading />}
            {this.state.demoDetails && (
              <div className='custom-demo-iframe-container'>
                <iframe
                  title='web iframe'
                  src={this.state.demoDetails.URL}
                  height='100%'
                  width='100%'></iframe>
              </div>
            )}
          </Transition>
        </Layout>
      </React.Fragment>
    );
  }
}

export default CustomDemoPage;
