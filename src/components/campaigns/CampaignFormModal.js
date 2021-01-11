import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  FormFeedback
} from 'reactstrap';
import { Formik } from 'formik';

class CampaignFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        companyName: '',
        website: ''
      }
    };
  }

  handleClose = data => {
    this.setState({ isOpen: false }, () => {
      setTimeout(() => {
        this.props.onClose(data);
      }, 300);
    });
  };

  render() {
    return (
      <React.Fragment>
        <Modal
          isOpen={this.state.isOpen}
          toggle={() => this.handleClose()}
          className=' modal-dialog-slideout'>
          <ModalHeader toggle={() => this.handleClose()}>
            Download Details
          </ModalHeader>
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={this.state.form}
              validate={values => {}}
              onSubmit={async (values, { setSubmitting }) => {
                this.handleClose();
              }}>
              {({
                values,
                errors,
                touched,
                handleChange,
                setFieldValue,
                handleSubmit /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Container fluid className='p-0'>
                    <Row>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='firstName'>First Name</Label>
                          <Input
                            name='firstName'
                            id='firstName'
                            placeholder='Enter First Name'
                            onChange={handleChange}
                            value={values.firstName}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='lastName'>Last Name</Label>
                          <Input
                            name='lastName'
                            id='lastName'
                            placeholder='Enter Last Name'
                            onChange={handleChange}
                            value={values.lastName}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='Email'>Email</Label>
                          <Input
                            name='Email'
                            id='Email'
                            placeholder='Enter Email'
                            onChange={handleChange}
                            value={values.email}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='companyName'>Company Name</Label>
                          <Input
                            name='companyName'
                            id='companyName'
                            placeholder='Enter Company Name'
                            onChange={handleChange}
                            value={values.companyName}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for='website'>Website</Label>
                          <Input
                            name='website'
                            id='website'
                            placeholder='Enter Website url'
                            onChange={handleChange}
                            value={values.website}
                          />
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <div className='d-flex justify-content-end'>
                          <Button
                            outline
                            onClick={() => this.props.onClose()}
                            color='secondary'
                            type='button'>
                            Cancel
                          </Button>{' '}
                          &nbsp;&nbsp;
                          <Button color='primary' type='submit'>
                            Submit
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </form>
              )}
            </Formik>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default CampaignFormModal;
