import * as React from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
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
// import RichTextEditor from 'react-rte';
import { addCampaign } from '../../../Service';
import Loading from '../common/Loading';
import { withToastContext } from '../common/ToastProvider';

const toolbarConfig = {
    display: [
        'INLINE_STYLE_BUTTONS',
        'BLOCK_TYPE_BUTTONS',
        'BLOCK_TYPE_DROPDOWN'
        // "LINK_BUTTONS",
    ],
    INLINE_STYLE_BUTTONS: [
        { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
        { label: 'Italic', style: 'ITALIC' },
        { label: 'Underline', style: 'UNDERLINE' }
    ],
    BLOCK_TYPE_DROPDOWN: [
        { label: 'Normal', style: 'unstyled' },
        { label: 'Heading XLarge', style: 'header-one' },
        { label: 'Heading Large', style: 'header-two' },
        { label: 'Heading Medium', style: 'header-three' },
        { label: 'Heading Small', style: 'header-five' },
        { label: 'Heading Tiny', style: 'header-six' }
    ],
    BLOCK_TYPE_BUTTONS: [
        { label: 'UL', style: 'unordered-list-item' },
        { label: 'OL', style: 'ordered-list-item' },
        { label: 'Block Quote', style: 'blockquote' }
    ]
};

class ManageCampaignDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isOpen: true,
            campaign: {
                TITLE: '',
                // SUB_TITLE: '',
                MAIN_CONTENT: "",
                FILE: ""
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
                {this.state.isLoading && <Loading />}
                <Modal
                    isOpen={this.state.isOpen}
                    toggle={() => this.handleClose()}
                    className='add-campaign-dialog modal-dialog-slideout'>
                    <ModalHeader toggle={() => this.handleClose()}>
                        Add Campaign
          </ModalHeader>
                    <ModalBody>
                        <Formik
                            enableReinitialize
                            initialValues={this.state.campaign}
                            validate={values => {
                                let errors = {};
                                if (!values.TITLE) {
                                    errors.TITLE = 'Required';
                                }
                                // if (!values.SUB_TITLE) {
                                //     errors.SUB_TITLE = 'Required';
                                // }
                                if (!values.MAIN_CONTENT) {
                                    errors.MAIN_CONTENT = 'Please select file';
                                }
                                return errors;
                            }}
                            onSubmit={async (values, { setSubmitting }) => {
                                this.setState({ isLoading: true });
                                let obj = { ...values };
                                obj.MAIN_CONTENT = obj.MAIN_CONTENT.toString('html');
                                let res = await addCampaign(obj);
                                this.setState({ isLoading: false });
                                if (res && res.success) {
                                    this.props.toast.show(
                                        `Campaign added successfully`,
                                        'success'
                                    );
                                    this.props.onClose(res.data[0]);
                                } else {
                                    this.props.toast.show(
                                        res.message
                                            ? res.message
                                            : `Error while adding campaign`,
                                        'error'
                                    );
                                }
                                setSubmitting(false);
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
                                                        <Label for='TITLE'>Title</Label>
                                                        <Input
                                                            name='TITLE'
                                                            id='TITLE'
                                                            placeholder='Enter the title'
                                                            onChange={handleChange}
                                                            value={values.TITLE}
                                                            invalid={
                                                                errors && touched && touched.TITLE
                                                                    ? errors.TITLE
                                                                        ? true
                                                                        : false
                                                                    : undefined
                                                            }
                                                            valid={values.TITLE ? true : false}
                                                        />
                                                        {errors.TITLE && touched && touched.TITLE && (
                                                            <FormFeedback>{errors.TITLE}</FormFeedback>
                                                        )}
                                                    </FormGroup>
                                                </Col>
                                                {/* <Col xs={12}>
                                                    <FormGroup>
                                                        <Label for='sub_title'>Sub Title</Label>
                                                        <Input
                                                            name='SUB_TITLE'
                                                            id='sub_title'
                                                            placeholder='Enter the sub title'
                                                            onChange={handleChange}
                                                            value={values.SUB_TITLE}
                                                            invalid={
                                                                errors && touched && touched.SUB_TITLE
                                                                    ? errors.SUB_TITLE
                                                                        ? true
                                                                        : false
                                                                    : undefined
                                                            }
                                                            valid={values.SUB_TITLE ? true : false}
                                                        />
                                                        {errors.SUB_TITLE && touched && touched.SUB_TITLE && (
                                                            <FormFeedback>{errors.SUB_TITLE}</FormFeedback>
                                                        )}
                                                    </FormGroup>
                                                </Col> */}

                                                <Col xs={12}>
                                                    <FormGroup>
                                                        <Label for='file'>File</Label>
                                                        <Input
                                                            name='file'
                                                            id='file'
                                                            type="file"
                                                            placeholder='File'
                                                            onChange={(event) => {
                                                                let extension = undefined;
                                                                let files = undefined
                                                                if (event.target.files && event.target.files.length > 0) {
                                                                    files = event.target.files
                                                                    extension = files[0].name.split(".").pop()
                                                                }

                                                                if (["html", "htm"].indexOf(extension) > -1) {
                                                                    var reader = new FileReader();
                                                                    reader.readAsText(event.target.files[0], "UTF-8");
                                                                    reader.onload = function (evt) {
                                                                        setFieldValue("FILE", "")
                                                                        setFieldValue('MAIN_CONTENT', evt.target.result);
                                                                    }
                                                                    reader.onerror = function (evt) {
                                                                        this.props.toast.show("Error while reading the file", "error");
                                                                        setFieldValue('MAIN_CONTENT', "");
                                                                        setFieldValue('FILE', "");
                                                                        document.getElementById("file").value = "";
                                                                    }
                                                                } else {
                                                                    document.getElementById("file").value = "";
                                                                    setFieldValue('MAIN_CONTENT', "");
                                                                    setFieldValue('FILE', "");
                                                                    this.props.toast.show("Please select html file", "error");
                                                                }
                                                            }}
                                                            // value={values.FILE}
                                                            invalid={
                                                                errors && touched.MAIN_CONTENT
                                                                    ? errors.MAIN_CONTENT
                                                                        ? true
                                                                        : false
                                                                    : undefined
                                                            }
                                                            valid={values.MAIN_CONTENT ? true : false}
                                                        />
                                                        {errors && errors.MAIN_CONTENT && (
                                                            <FormFeedback>{errors.MAIN_CONTENT}</FormFeedback>
                                                        )}
                                                    </FormGroup>
                                                </Col>

                                                {/* <Col xs={12}>
                                                    <FormGroup>
                                                        <Label for='content'>Content</Label>
                                                        <RichTextEditor
                                                            className='rich-text-editor'
                                                            toolbarConfig={toolbarConfig}
                                                            value={values.MAIN_CONTENT}
                                                            onChange={content => {
                                                                setFieldValue('MAIN_CONTENT', content);
                                                            }}
                                                        />
                                                        {errors.MAIN_CONTENT && touched.MAIN_CONTENT && (
                                                            <FormFeedback variant='caption' color='error'>
                                                                &nbsp; &nbsp; {errors.MAIN_CONTENT}
                                                            </FormFeedback>
                                                        )}
                                                    </FormGroup>
                                                </Col> */}

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

// export default ManageCampaignDialog;
export default withToastContext(ManageCampaignDialog);
