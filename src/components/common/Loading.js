import * as React from "react";
import { Modal, ModalBody, Spinner } from "reactstrap";

class Loading extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <Modal
                isOpen={true}
                fade={true}
                backdrop="static"
                modalClassName="d-flex align-items-center loading-modal-container"
            >
                <ModalBody>
                    <div className="d-flex justify-content-center p-2">
                        <Spinner color="secondary" className="p-3" />
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default Loading;
