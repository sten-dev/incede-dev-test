import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Transition from '../../Transition';
import { Row, Col, Card, CardBody, Container } from 'reactstrap';
import DemoCard from '../../components/demo/DemoCard';
import { getDemosLists, deleteDemo } from '../../../Service';
import Loading from '../../components/common/Loading';
import '../../styles/custom-demo.scss';
import ConfirmModal from '../../components/ConfirmModal';
import ManageDemoModal from './ManageDemoModal';
class CustomDemos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      demosList: [],
      modal: {
        isOpen: false,
        index: undefined,
        id: undefined
      },
      manageDemo: {
        isOpen: false,
        data: undefined
      }
    };
  }

  componentDidMount = async () => {
    await this.getDemosList();
  };

  getDemosList = async () => {
    this.setState({ isLoading: true });
    let res = await getDemosLists();
    if (res && res.success) {
      this.setState({ demosList: res.data });
    } else {
    }
    this.setState({ isLoading: false });
  };

  onDeleteDemo = (id, index) => {
    this.setState({ modal: { isOpen: true, index: index, id: id } });

    // this.props.confirmDialog.show(
    //   'Are you sure',
    //   'Do you want to delete',
    //   async () => {
    //     this.setState({
    //       isLoading: true
    //     });
    //     let res = await deleteDemo(id);
    //     if (res.success) {
    //       this.props.toast.show('Demo deleted successfully', 'success');
    //       let demosList = [...this.state.demosList];
    //       demosList.splice(index, 1);
    //       this.setState({
    //         demosList,
    //         isLoading: false
    //       });
    //     } else {
    //       this.setState({
    //         isLoading: false
    //       });
    //       this.props.toast.show('Error while deleting', 'error');
    //     }
    //   }
    // );
  };

  onAddDemoModalClose = data => {
    let d = undefined;
    let demos = [...this.state.demosList];
    if (data) {
      d = data;
      demos.push(d);
    }
    this.setState({
      manageDemo: {
        data: undefined,
        isOpen: false
      },
      demosList: demos
    });
  };

  handelModalCloseOpen = async ans => {
    if (ans === true) {
      this.setState({
        isLoading: true
      });
      let res = await deleteDemo(this.state.modal.id);
      if (res.success) {
        // this.props.toast.show('Demo deleted successfully', 'success');
        let demosList = [...this.state.demosList];
        demosList.splice(this.state.modal.index, 1);
        this.setState({
          demosList,
          isLoading: false
        });
      } else {
        this.setState({
          isLoading: false
        });
        // this.props.toast.show('Error while deleting', 'error');
      }
    }
    this.setState({
      modal: { isOpen: false, index: undefined, id: undefined }
    });
  };

  handleAddDemo = () => {
    this.setState({
      manageDemo: {
        data: undefined,
        isOpen: true
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <Layout pageTitle='Custom Demo | Incede' page='custom-demo'>
          <Transition>
            {/* <Loading /> */}
            {this.state.isLoading && <Loading />}
            <section className='case-study'>
              <section className='header-section gap-y'>
                <Container fluid>
                  <Row>
                    <Col>
                      <h1>Incede.ai Demos</h1>
                    </Col>
                  </Row>
                </Container>
              </section>
            </section>
            <section>
              <Row className='m-0 gap-y-half'>
                {this.state.demosList &&
                  this.state.demosList.length > 0 &&
                  this.state.demosList.map((x, index) => {
                    return (
                      <Col
                        key={`${index}`}
                        className='mb-3'
                        xs={12}
                        sm={6}
                        md={4}>
                        <DemoCard
                          data={x}
                          index={index}
                          onMapClick={() => this.handleMapClick(true, x)}
                          onDelete={(id, index) => this.onDeleteDemo(id, index)}
                        />
                      </Col>
                    );
                  })}
                <Col className='mb-3' xs={12} sm={6} md={4} title='Add Demo'>
                  <Card
                    className='h-100 demo-card'
                    onClick={this.handleAddDemo}>
                    <CardBody className='demo-add-card pointer text-center'>
                      <svg className='add-demo-icon' viewBox='0 0 24 24'>
                        <path
                          fill='currentColor'
                          d='M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z'
                        />
                      </svg>
                    </CardBody>
                  </Card>
                </Col>
                {this.state.demosList.length === 0 && (
                  <React.Fragment>
                    <Col xs={12} className='text-center'>
                      <h5>No Demos available !</h5>
                    </Col>
                  </React.Fragment>
                )}
              </Row>
            </section>

            {this.state.manageDemo.isOpen && (
              <ManageDemoModal
                data={this.state.manageDemo.data}
                onClose={data => {
                  this.onAddDemoModalClose(data);
                }}
              />
            )}
            <ConfirmModal
              isOpen={this.state.modal.isOpen}
              handelCloseOpen={ans => this.handelModalCloseOpen(ans)}
              title='Are you sure'>
              Do you want to delete?
            </ConfirmModal>
          </Transition>
        </Layout>
      </React.Fragment>
    );
  }
}

export default CustomDemos;
