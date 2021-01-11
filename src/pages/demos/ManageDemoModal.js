import * as React from 'react';
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
import { Formik, FormikErrors } from 'formik';
import * as xlsx from 'xlsx';
import { withToastContext } from '../../components/common/ToastProvider';
import {
  getUnassignedDemos,
  addDemo,
  addDemoByJSON,
  checkIfLoadableInIFrame
} from '../../../Service';
import Loading from '../../components/common/Loading';

class ManageDemoModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isOpen: true,
      demoValues: {
        name: 'Chatbot by incede.ai',
        description: 'Chatbot by incede.ai',
        file: undefined,
        url: 'https://incede.ai/',
        assistant_Id: '',
        workspaceId: '',
        id: ''
      },
      demosList: []
    };
  }
  componentDidMount() {
    this.getUnAssignedDemos();
  }

  getUnAssignedDemos = async () => {
    this.setState({ isLoading: true });
    let res = await getUnassignedDemos();
    if (res && res.success) {
      let demoValues = { ...this.state.demoValues };
      if (res.data && res.data.length > 0) {
        demoValues.id = res.data[0].ID.toString();
      }
      this.setState({
        demosList: res.data,
        demoValues: demoValues
      });
    } else {
    }
    this.setState({ isLoading: false });
  };

  handleClose = data => {
    this.setState({ isOpen: false }, () => {
      setTimeout(() => {
        this.props.onClose(data);
      }, 300);
    });
  };

  getIntentName = name => {
    let removedExtraChars = this.removeExtraChars(name);
    return removedExtraChars
      .toLowerCase()
      .replace(/[&\\/\\#,+()$~%.'":*?<>{}]/g, '_')
      .replace(/ /g, '_');
  };

  removeExtraChars = name => {
    return name
      ? name
        .replace(/\n/g, '')
        .replace(/\r/g, '')
        .replace(/\t/g, '')
      : '';
  };

  checkIfLoadableInIFrame = async url => {
    // this.setState({
    //   isLoading: true
    // });
    let res = await checkIfLoadableInIFrame(url);
    if (res && res.success) {
      return true;
      // this.setState({
      //   isIFrameLoadble: true,
      //   isLoading: false
      // });
    } else {
      return false;
      // this.setState({
      //   isIFrameLoadble: false,
      //   isLoading: false
      // });
    }
  };

  addCustomDemo = async (values, data, isJson) => {
    let res;
    this.setState({ isLoading: true })
    let isLoadable = await this.checkIfLoadableInIFrame(
      values.url
    );

    if (isLoadable === false) {
      this.setState(
        {
          isLoading: false,
          iFrameError: 'This website is not loadable in Iframe.'
        },
        () => console.log(this.state.iFrameError)
      );
      return;
    }

    let selectedDemo = this.state.demosList.find(
      x => x.ID.toString() === values.id
    );
    let skillObj = {
      ...values,
      skills: data,
      id: selectedDemo.ID,
      assistant_Id: selectedDemo.ASSISTANT_ID,
      workspaceId: selectedDemo.WORKSPACEID
    };
    if (isJson) {
      res = await addDemoByJSON(skillObj);
    } else {
      res = await addDemo(skillObj);
    }
    this.setState({ isLoading: false });
    if (res && res.success) {
      this.props.toast.show(
        `Demo ${values._id ? 'updated' : 'created'} successfully`,
        'success'
      );
      this.props.onClose(res.data);
    } else {
      this.props.toast.show(
        res.message
          ? res.message
          : `Error while ${
          values._id ? 'updating' : 'creating'
          } demo`,
        'error'
      );
    }
    this.setState({
      isLoading: false
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.isLoading && <Loading />}
        <Modal
          isOpen={this.state.isOpen}
          toggle={() => this.handleClose()}
          className=' modal-dialog-slideout'>
          <ModalHeader toggle={() => this.handleClose()}>
            {this.props.data && this.props.data._id
              ? 'Update Demo'
              : 'Add a Demo'}
          </ModalHeader>
          <ModalBody>
            <Formik
              enableReinitialize
              initialValues={this.state.demoValues}
              validate={values => {
                let errors = {};
                if (!values.name) {
                  errors.name = 'Required';
                }
                if (!values.description) {
                  errors.description = 'Required';
                }
                if (!values.id) {
                  errors.id = 'Required';
                }
                if (!values.url) {
                  errors.url = 'Required';
                } else {
                  // let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
                  // if (regexp.test(values.url)) {
                  //   errors.url = "Enter valid URL";
                  // }
                }
                // if (!values.assistant_Id) {
                //   errors.assistant_Id = "Required";
                // }
                // if (!values.workspaceId) {
                //   errors.workspaceId = "Required";
                // }
                if (!values.file) {
                  errors.file = 'Required';
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                let obj = { ...values };
                let selectedFile = obj.file[0];
                let fileExtension = selectedFile.name.split(".").pop();
                if (["xlsx", "xls", "json"].indexOf(fileExtension) > -1) {
                  if (fileExtension === "json") {
                    this.setState({ isLoading: true });
                    var reader = new FileReader();
                    reader.onload = async event => {
                      var obj = JSON.parse(event.target.result);
                      if (obj.dialog_nodes) {
                        obj.dialogNodes = obj.dialog_nodes;
                        delete obj.dialog_nodes;
                      }
                      await this.addCustomDemo(values, obj, true)
                      setSubmitting(false);
                    }
                    reader.readAsText(selectedFile);
                  } else {
                    this.setState({ isLoading: true });
                    console.log('file', selectedFile);
                    let reader = new FileReader();
                    reader.onload = async e => {
                      let data = new Uint8Array(e.target.result);

                      let workbook = xlsx.read(data, { type: 'array' });

                      let first_sheet_name = workbook.SheetNames[0];

                      let worksheet = workbook.Sheets[first_sheet_name];

                      let jsonSheet = xlsx.utils.sheet_to_json(worksheet, {
                        raw: true
                      });
                      console.log(jsonSheet);

                      let assistantData = jsonSheet.reduce(
                        (acc, ele) => {
                          let obj = {
                            intent: ele['Intent Name']
                              ? this.getIntentName(ele['Intent Name'])
                              : '',
                            examples: ele['Examples']
                              ? this.removeExtraChars(ele['Examples'])
                                .split(',')
                                .map(x => x.trim())
                              : [ele['Intent Name'] ? ele['Intent Name'] : ''],
                            user_input: ele['User Input']
                              ? this.removeExtraChars(ele['User Input'].toString())
                              : undefined
                          };
                          if (ele['Response Type']) {
                            if (ele['Response Type'].toLowerCase() === 'options') {
                              obj.response_type = 'options';
                              obj.options = ele['Response Options']
                                .split(',')
                                .map(x => {
                                  let text = x.trim();
                                  return {
                                    label: this.removeExtraChars(text),
                                    value: {
                                      input: {
                                        text: this.removeExtraChars(text)
                                      }
                                    }
                                  };
                                });
                              obj.title = this.removeExtraChars(ele['Response']);
                            } else {
                              obj.answer = [this.removeExtraChars(ele['Response'])];
                              obj.response_type = 'text';
                            }
                          } else {
                            obj.answer = this.removeExtraChars(ele['Response']);
                            obj.response_type = 'text';
                          }

                          if (!ele['Intent Name']) {
                            obj.isChild = true;
                            obj.parent_node =
                              acc.parentNodes[acc.parentNodes.length - 1];
                          }
                          if (ele['Jump To']) {
                            obj.jump_to = this.getIntentName(ele['Jump To']);
                          }

                          acc.data.push(obj);
                          if (obj.intent) {
                            acc.parentNodes.push(obj.intent);
                          }
                          return acc;
                        },
                        {
                          intents: {},
                          data: [],
                          parentNodes: []
                        }
                      );

                      // check if website is loadable

                      await this.addCustomDemo(values, assistantData.data, false)
                      setSubmitting(false);
                    };
                    reader.readAsArrayBuffer(selectedFile);
                  }
                }
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
                            <Label for='name'>Demo Name</Label>
                            <Input
                              name='name'
                              id='name'
                              placeholder='Enter the name of the demo'
                              onChange={handleChange}
                              value={values.name}
                              invalid={
                                errors && touched && touched.name
                                  ? errors.name
                                    ? true
                                    : false
                                  : undefined
                              }
                              valid={values.name ? true : false}
                            />
                            {errors.name && touched && touched.name && (
                              <FormFeedback>{errors.name}</FormFeedback>
                            )}
                          </FormGroup>
                        </Col>

                        <Col xs={12}>
                          <FormGroup>
                            <Label for='name'>Description</Label>
                            <Input
                              name='description'
                              id='description'
                              placeholder='Enter the description of the demo'
                              onChange={handleChange}
                              value={values.description}
                              invalid={
                                errors && touched && touched.description
                                  ? errors.description
                                    ? true
                                    : false
                                  : undefined
                              }
                              valid={values.description ? true : false}
                            />
                            {errors.description &&
                              touched &&
                              touched.description && (
                                <FormFeedback>{errors.description}</FormFeedback>
                              )}
                          </FormGroup>
                        </Col>

                        <Col xs={12}>
                          <FormGroup>
                            <Label for='demo'>Select Demo</Label>
                            <Input
                              onChange={handleChange}
                              type='select'
                              name='id'
                              id='demo'
                              value={values.id}
                              invalid={
                                errors && touched && touched.id
                                  ? errors.id
                                    ? true
                                    : false
                                  : undefined
                              }
                              valid={values.id ? true : false}>
                              {!values.id && <option value=''></option>}
                              {this.state.demosList.map(x => (
                                <option value={x.ID} key={x.ID}>
                                  {x.SKILL_NAME}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>

                        {/* <Col xs={12}>
                        <FormGroup>
                          <Label for="assistant_id">Assistant ID</Label>
                          <Input
                            name="assistant_id"
                            id="assistant_id"
                            placeholder="Enter assistant ID"
                            onChange={e => {
                              setFieldValue("assistant_Id", e.target.value);
                            }}
                            value={values.assistant_Id}
                            invalid={
                              errors && touched && touched.assistant_Id
                                ? errors.assistant_Id
                                  ? true
                                  : false
                                : undefined
                            }
                            valid={values.assistant_Id ? true : false}
                          />
                          {errors.assistant_Id &&
                            touched &&
                            touched.assistant_Id && (
                              <FormFeedback>{errors.assistant_Id}</FormFeedback>
                            )}
                        </FormGroup>
                      </Col>
                      <Col xs={12}>
                        <FormGroup>
                          <Label for="workspaceId">Workspace ID</Label>
                          <Input
                            name="workspaceId"
                            id="workspaceId"
                            placeholder="Enter Workspace ID"
                            onChange={handleChange}
                            value={values.workspaceId}
                            invalid={
                              errors && touched && touched.workspaceId
                                ? errors.workspaceId
                                  ? true
                                  : false
                                : undefined
                            }
                            valid={values.workspaceId ? true : false}
                          />
                          {errors.workspaceId &&
                            touched &&
                            touched.workspaceId && (
                              <FormFeedback>{errors.workspaceId}</FormFeedback>
                            )}
                        </FormGroup>
                      </Col> */}
                        <Col xs={12}>
                          <FormGroup>
                            <Label for='url'>Website URL</Label>
                            <Input
                              name='url'
                              id='url'
                              placeholder='Enter URL'
                              onChange={handleChange}
                              value={values.url}
                              invalid={
                                this.state.iFrameError
                                  ? true
                                  : errors && touched && touched.url
                                    ? errors.url
                                      ? true
                                      : false
                                    : undefined
                              }
                              valid={values.url ? true : false}
                            />
                            {errors.url && touched && touched.url && (
                              <FormFeedback>{errors.url}</FormFeedback>
                            )}
                            {this.state.iFrameError && (
                              <FormFeedback>
                                {this.state.iFrameError}
                              </FormFeedback>
                            )}
                          </FormGroup>
                        </Col>
                        <Col xs={12}>
                          <FormGroup>
                            <Label for='file'>File</Label>
                            <Input
                              type='file'
                              name='file'
                              id='file'
                              // accept='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                              onChange={event => {
                                setFieldValue('file', event.target.files);
                              }}
                              invalid={
                                errors ? (errors.file ? true : false) : undefined
                              }
                              valid={values.file ? true : false}
                            />
                            {errors.file && (
                              <FormFeedback>{errors.file}</FormFeedback>
                            )}
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
                              Create
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

// export default ManageDemoModal;
export default withToastContext(ManageDemoModal);
