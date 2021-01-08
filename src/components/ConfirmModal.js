import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.props.handelCloseOpen()}
        className='custom-modal'
        backdrop='static'>
        <ModalHeader toggle={this.props.handelCloseOpen}>
          {this.props.title || 'Modal Title'}
        </ModalHeader>
        <ModalBody>{this.props.children}</ModalBody>
        <ModalFooter>
          <Button
            color='secondary'
            outline
            onClick={this.props.handelCloseOpen}>
            Cancel
          </Button>
          <Button
            color='danger'
            onClick={() => this.props.handelCloseOpen(true)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default ConfirmModal;
